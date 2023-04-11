import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { UserContext } from '@/roanuz/store/core/context';
import { MenuModelContext } from '@/roanuz/store/core/menuContext';
import Config from '@/config';

import {
  SetShippingAddressOnCart,
  SetBillingAddressOnCart,
  SetShippingAddressAndMethodGuestMutation,
} from '@/roanuz/store/cart/query';

import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';

import { CheckoutPageLayout } from '@/roanuz/layout/checkoutPage';
import { WizardProgressViewController } from '@/roanuz/view/checkout/wizard';
import { CartSideView } from '@/roanuz/view/cart/side';

import { ShippingAndDeliveryDisplayView } from '@/roanuz/view/checkout/stepShippingAndDeliveryDisplay';

import { DisplayBold30 } from '@/roanuz/typopgraphy';
import { LocalOrderStorage } from '@/roanuz/lib/cart';
import { OrderSummaryModalView } from '@/roanuz/view/cart/orderSummaryModal';

import { translateV2 } from '@/roanuz/lib/utils';
import { CartEmptyView } from '@/roanuz/view/cart/cartModalView';
import { StepPaymentMethodController } from './stepPaymentMethod';

import { StepShippingAddressAndMethodController } from './stepShippingAddressAndMethod';

const { CheckoutSettings } = Config;
const { CheckoutSteps } = CheckoutSettings || {};

export const CheckoutPageController = ({ cart, stepStatus, cartFetchingStatus }) => {
  const userContext = useContext(UserContext);
  const menuContext = useContext(MenuModelContext);
  const router = useRouter();
  // const isRetryPayment = router.query && router.query.isRetry;

  const { activeStep } = stepStatus;

  const [
    updateAddress,
    { error: updateAddressError, loading: updateAddressLoading },
  ] = useMutation(SetShippingAddressOnCart, {
    onCompleted: () => {
      console.log('Cart Address Updated');
    },
  });

  const onShippingAddressReqChange = (update) => {
    console.log('Updating Shipping Address', update);
    const input = { ...update };
    updateAddress({
      variables: input,
    });
  };

  const [userBillingAddress, setUserBillingAddress] = useState(cart ? cart.billingAddress : {});
  const [
    saveBillingAddressInBookOption,
    setSaveBillingAddressInBookOption,
  ] = useState(!useContext.token);

  const updateCartBillingCopy = (data) => {
    setUserBillingAddress(data);
  };

  const [
    updateBillingAddress,
    { error: updateBillingAddressError, loading: updateBillingAddressLoading },
  ] = useMutation(SetBillingAddressOnCart, {
    onCompleted: (updatedData) => {
      console.log('Cart Billing Address Updated');
      if (
        updatedData
        && updatedData.setBillingAddressOnCart
        && updatedData.setBillingAddressOnCart.cart
      ) {
        updateCartBillingCopy(updatedData.setBillingAddressOnCart.cart.billing_address);
        // Don't want to trigger event to parent component
        // to parse cart with updated billing address. So followed this approach.
      }
    },
  });

  const onBillingAddressReqChange = (update) => {
    console.log('Updating Billing Address', update);
    const input = { ...update };
    updateBillingAddress({
      variables: input,
    });
  };

  const pushTheStateToNext = (stepName) => {
    const checkoutSteps = Object.keys(CheckoutSteps);
    const stepState = stepName || checkoutSteps[checkoutSteps.length - 1];
    router.push({
      pathname: `/checkout/${stepState}`,
    }, null, { shallow: true });
  };

  const [executableQuery, setExecutableQuery] = useState(SetShippingAddressAndMethodGuestMutation);

  const [
    updateCartMethod,
    { error: updateError, loading: updateLoading },
  ] = useMutation(executableQuery, {
    onCompleted: () => {
      console.log('Cart Method Updated');
      pushTheStateToNext();
    },
  });

  const onShippingMethodReqSave = (query, update, nextStep) => {
    if (!query) {
      console.log('Ugh.. Query Name Missing', query);
      return;
    }
    console.log('Updating Cart Method', update, nextStep);
    const input = { ...update };
    setExecutableQuery(query);
    updateCartMethod({
      variables: { ...input },
    }).then((data) => {
      if (data && data.data) {
        pushTheStateToNext(nextStep);
      }
    }).catch((err) => {
      console.error(err);
    });
  };

  const [orderHandleStatus, setOrderHandleStatus] = useState({
    loading: false,
    completed: false,
    error: null,
    orderId: null,
    orderNumber: null,
  });

  const onOrderHandleStatus = (status) => {
    setOrderHandleStatus({
      ...orderHandleStatus,
      ...status,
    });
  };

  useEffect(() => {
    LocalOrderStorage.store({
      id: orderHandleStatus.orderId,
      orderNumber: orderHandleStatus.orderNumber,
      date: new Date(),
      completed: orderHandleStatus.completed,
    });

    if (orderHandleStatus.completed) {
      console.log('Moving to order page', orderHandleStatus.completed, orderHandleStatus.orderId);
      window.location.href = '/customer/latest-order/';
    }
  }, [orderHandleStatus.completed, orderHandleStatus.orderId]);

  const isPaymentStep = router.query.step === CheckoutSteps.payment.id;

  const shippingAndDeliveryDisplayView = cart && (
    <ShippingAndDeliveryDisplayView
      cart={cart}
      activeStep={activeStep}
      onEditShippingDetails={(e) => pushTheStateToNext(e)}
    />
  );

  const {
    pageLoading,
    profileLoading,
    pageError,
    isCartDataEmpty,
  } = cartFetchingStatus;

  const buildCheckoutContent = () => {
    if (pageLoading || !userContext.cartVerified) return (<PageLoadingView message={translateV2('loadingMsg.CHECKOUT_PAGE')} />);
    if (profileLoading) return (<PageLoadingView message={translateV2('loadingMsg.CHECKOUT_PAGE')} />);
    if (pageError) return (<PageErrorView error={pageError} />);
    if (isCartDataEmpty) return (<CartEmptyView />);

    return (
      <>
        {!isPaymentStep && (
          <StepShippingAddressAndMethodController
            cart={cart}
            userContext={userContext}
            saving={updateAddressLoading || updateLoading}
            saveError={updateAddressError || updateError}
            onShippingAddressReqChange={onShippingAddressReqChange}
            onReqSave={onShippingMethodReqSave}
            billingAddressAction={{
              updateBillingAddressLoading,
              updateBillingAddressError,
              onBillingAddressReqChange,
              userBillingAddress,
              saveBillingAddressInBookOption,
              setSaveBillingAddressInBookOption,
            }}
            stepsModal={{
              activeStep,
              // setActiveStep,
              checkoutSteps: CheckoutSteps,
              pushTheStateToNext,
              isPaymentStep,
            }}
          />
        )}
        {isPaymentStep && cart && (
          <StepPaymentMethodController
            cart={cart}
            onOrderStatus={onOrderHandleStatus}
          />
        )}
      </>
    );
  };

  return (
    <CheckoutPageLayout
      title={(
        <DisplayBold30>{translateV2('orders.ORDER_PROCESS')}</DisplayBold30>
      )}
      wizardFlow={(
        <WizardProgressViewController
          activeStep={activeStep}
          pushTheStateToNext={pushTheStateToNext}
          checkoutSteps={CheckoutSteps}
        />
      )}
      additionalContent={shippingAndDeliveryDisplayView}
      content={buildCheckoutContent()}
      side={cart && (
        <CartSideView
          cart={cart}
          isCartPage={false}
          menuContext={menuContext}
          shippingAndDeliveryDisplayView={shippingAndDeliveryDisplayView}
        />
      )}
      summaryBand={(
        <OrderSummaryModalView
          cart={cart}
          isCartPage={false}
          menuContext={menuContext}
          shippingAndDeliveryDisplayView={shippingAndDeliveryDisplayView}
          isPaymentStep={isPaymentStep}
        />
      )}
    />
  );
};

CheckoutPageController.propTypes = {
  cart: PropTypes.object.isRequired,
  stepStatus: PropTypes.object.isRequired,
  cartFetchingStatus: PropTypes.object.isRequired,
};
