// `/delivery`
// Shipping Method Selection.
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { CheckoutStepTwoView } from '@/roanuz/view/checkout/v3/step2';
// import { StepNumberView } from '@/roanuz/view/checkout/v3/quickViews';

import { SetShippingMethodMutation } from '@/roanuz/store/cart/query';

export const CheckoutStepTwoController = ({
  cart, switchToTheStep, isActive,
}) => {
  const [
    updateCartMethod,
    {
      error: updateShippingMethodError,
      loading: updateShippingMethodLoading,
      data: updateShippingMethodData,
    },
  ] = useMutation(SetShippingMethodMutation, {
    onCompleted: (data) => {
      console.log('Cart Method Updated', data);
    },
  });
  const onShippingMethodReqChange = (update) => {
    console.log('Updating Cart Method', update);
    const input = { ...update };
    updateCartMethod({
      variables: input,
    });
  };

  useEffect(() => {
    if (updateShippingMethodData) {
      if (updateShippingMethodData.setShippingMethodsOnCart && !updateShippingMethodError) {
        setTimeout(() => {
          switchToTheStep();
        }, 1000);
      }
    }
  }, [
    updateShippingMethodData,
    updateShippingMethodError,
  ]);

  return (
    <>
      <CheckoutStepTwoView
        cart={cart}
        updateShippingMethodModel={{
          onShippingMethodReqChange,
          updateShippingMethodError,
          updateShippingMethodLoading,
        }}
        isActive={isActive}
        switchToTheStep={switchToTheStep}
      />
    </>
  );
};

CheckoutStepTwoController.propTypes = {
  cart: PropTypes.object.isRequired,
  switchToTheStep: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
