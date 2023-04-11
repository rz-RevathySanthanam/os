import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckoutPageLayout } from '@/roanuz/layout/checkoutPage';

import { CartSideView as CheckoutSideView, CartSideBarSliderView } from '@/roanuz/view/checkout/v3/side';

import { useRouter } from 'next/router';
import { CheckoutStepTypes, switchToStep } from '@/roanuz/controller/checkout/v3/process';
import { MenuModelContext } from '@/roanuz/store/core/menuContext';
import { LocalOrderStorage } from '@/roanuz/lib/cart';
import { UserContext } from '@/roanuz/store/core/context';
import { CheckoutLoadingView } from '@/roanuz/components/floatingPlaceholders/checkoutPage';
import PageErrorView from '@/roanuz/components/PageErrorView';

import { useCreateOrUpdateCustomerAddress } from '@/roanuz/controller/customer/addressUpdations';
import { CheckoutPageLogoView } from '@/roanuz/view/checkout/v3/quickViews';

import { DisplayBold30 } from '@/roanuz/typopgraphy';
import { WizardProgressViewController } from '@/roanuz/view/checkout/wizard';
import { CartEmptyView } from '@/roanuz/view/cart/cartModalView';

import { CheckoutStepOneController } from './step1';
import { CheckoutStepTwoController } from './step2';
import { CheckoutStepThreeController } from './step3';

export const CheckoutPageController = ({ activeStep, cartModel }) => {
  const router = useRouter();
  const menuContext = useContext(MenuModelContext);
  const userContext = useContext(UserContext);

  const switchToStepHandler = (stepName) => {
    switchToStep(router, stepName);
  };

  const [cloneCartModel, setCloneCartModel] = useState(cartModel);
  useEffect(() => {
    // if (!cloneCart && cart) {
    if (cartModel && cartModel.cart) {
      setCloneCartModel(cartModel);
      return;
    }
    if (!cartModel.cartLoading && !cartModel.cart) {
      setCloneCartModel();
    }
  }, [cartModel, cartModel.cart]);

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

  const [createCustomerAddress, { loading, error }] = useCreateOrUpdateCustomerAddress({
    onCompleted: (data) => {
      console.log('Done ✅.', data);
    },
  });

  const sideBarView = (
    cloneCartModel
    && cloneCartModel.cart
    && <CheckoutSideView cart={cloneCartModel.cart} menuContext={menuContext} />
  );

  const cartSideBarSliderView = (
    cloneCartModel
    && cloneCartModel.cart
    && <CartSideBarSliderView cart={cloneCartModel.cart} menuContext={menuContext} />
  );

  const buildStepView = () => {
    return (
      <>
        <CheckoutPageLogoView />
        {cartSideBarSliderView}
        <CheckoutStepOneController
          cart={cloneCartModel.cart}
          switchToTheStep={(id) => switchToStepHandler(id || CheckoutStepTypes.delivery.id)}
          isActive={activeStep === CheckoutStepTypes.customer.id}
          userContext={userContext}
          addressCreationModel={{
            createCustomerAddress,
            loading,
            error,
          }}
        />
        <CheckoutStepTwoController
          cart={cloneCartModel.cart}
          switchToTheStep={(id) => switchToStepHandler(id || CheckoutStepTypes.payment.id)}
          isActive={activeStep === CheckoutStepTypes.delivery.id}
        />
        <CheckoutStepThreeController
          cart={cloneCartModel.cart}
          switchToTheStep={(id) => switchToStepHandler(id)}
          isActive={activeStep === CheckoutStepTypes.payment.id}
          onOrderHandleStatus={onOrderHandleStatus}
          userContext={userContext}
          addressCreationModel={{
            createCustomerAddress,
            loading,
            error,
          }}
        />
      </>
    );
  };

  const buildPageLoadingView = () => {
    const {
      cartLoading,
      cartError,
      profileLoading,
      isCartDataEmpty,
    } = cartModel;
    if (cartLoading || !userContext.cartVerified) return (<CheckoutLoadingView hasBg />);
    if (profileLoading) return (<CheckoutLoadingView hasBg />);
    if (cartError) return (<PageErrorView error={cartError} />);
    if (isCartDataEmpty) return (<CartEmptyView />);
    return (<CheckoutLoadingView hasBg />); // In Worst case;
  };

  let stepsFlow = (
    <>
      <CheckoutPageLogoView />
      {buildPageLoadingView()}
    </>
  );

  if (!cloneCartModel || !cloneCartModel.cart) {
    return buildPageLoadingView();
  }

  if (cloneCartModel && cloneCartModel.cart) {
    stepsFlow = buildStepView();
  }

  return (
    <CheckoutPageLayout
      title={(
        <DisplayBold30>Pöntunarferli</DisplayBold30>
      )}
      wizardFlow={(
        <WizardProgressViewController
          activeStep={activeStep}
          pushTheStateToNext={(id) => switchToStepHandler(id)}
          checkoutSteps={CheckoutStepTypes}
        />
      )}
      sideBar={sideBarView}
      content={stepsFlow}
    />
  );
};

CheckoutPageController.propTypes = {
  activeStep: PropTypes.string.isRequired,
  cartModel: PropTypes.object.isRequired,
};
