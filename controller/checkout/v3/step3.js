// `/payment`
// Payment Selection.
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

// import { StepNumberView } from '@/roanuz/view/checkout/v3/quickViews';

import { CheckoutStepThreeView } from '@/roanuz/view/checkout/v3/step3';

import { SetBillingAddressOnCart } from '@/roanuz/store/cart/query';
import { PaymentMethod } from '@/roanuz/view/checkout/payment/model';
import { useOfflinePayment } from '../payment/asHooks/offlinePayment';
import { useBorgunPayment } from '../payment/asHooks/borgun';

export const CheckoutStepThreeController = ({
  cart, switchToTheStep, isActive,
  // stepNumber,
  onOrderHandleStatus,
  userContext,
  addressCreationModel,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const [loaderTillNextRoute, setLoaderTillNextRoute] = useState(false);

  const paymentHandlerVals = {
    cart, onOrderStatus: onOrderHandleStatus, method: selectedPaymentMethod, setLoaderTillNextRoute,
  };

  const [
    handleBorgunPayment,
    { loading: createBorgunOrderLoading, error: createBorgunOrderError },
  ] = useBorgunPayment(paymentHandlerVals);

  const [
    handleOfflinePayment,
    { loading: createOfflinePaymentLoading, error: createOfflinePaymentError },
  ] = useOfflinePayment(paymentHandlerVals);

  const triggerPaymentHandler = (billingInfo) => {
    const methodConfig = PaymentMethod[selectedPaymentMethod];
    if (methodConfig.isBorgunPay) {
      handleBorgunPayment(billingInfo);
      return;
    }
    // Treating all other payments as offline, on failing above cases.
    handleOfflinePayment(billingInfo);
  };

  const paymentLoading = createOfflinePaymentLoading
  || createBorgunOrderLoading || loaderTillNextRoute;
  const paymentError = createOfflinePaymentError
  || createBorgunOrderError;

  const [
    updateBillingAddress,
    { error: updateBillingAddressError, loading: updateBillingAddressLoading },
  ] = useMutation(SetBillingAddressOnCart, {
    onCompleted: (data) => {
      if (data && data.setBillingAddressOnCart) {
        triggerPaymentHandler(
          data.setBillingAddressOnCart.cart && data.setBillingAddressOnCart.cart.billing_address,
        );
      }
      console.log('Cart Billing Address Updated');
    },
  });

  const onBillingAddressAndPaymentReqChange = (update, paymentMethod) => {
    console.log('Updating Billing Address', update, paymentMethod);
    console.log('Selected Payemt', paymentMethod);
    setSelectedPaymentMethod(paymentMethod);
    const input = { ...update };
    updateBillingAddress({
      variables: input,
    });
  };

  return (
    <>
      {/* <StepNumberView stepNumber={stepNumber} isActive={isActive} /> */}
      <CheckoutStepThreeView
        cart={cart}
        isActive={isActive}
        switchToTheStep={switchToTheStep}
        updateBillingAddressModel={{
          onBillingAddressAndPaymentReqChange,
          updateBillingAddressError,
          updateBillingAddressLoading,
        }}
        paymentModel={{
          paymentLoading,
          paymentError,
          triggerPaymentHandler,
        }}
        userContext={userContext}
        addressCreationModel={addressCreationModel}
      />
    </>
  );
};

CheckoutStepThreeController.propTypes = {
  cart: PropTypes.object.isRequired,
  switchToTheStep: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  // stepNumber: PropTypes.string.isRequired,
  onOrderHandleStatus: PropTypes.string.isRequired,
  userContext: PropTypes.object.isRequired,
  addressCreationModel: PropTypes.object.isRequired,
};
