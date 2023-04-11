// `/customer`
// Customer Information.
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { CheckoutStepOneView } from '@/roanuz/view/checkout/v3/step1';

import { SetCustomerDetailsGuestMutation, SetCustomerDetailsMutation } from '@/roanuz/store/cart/query';
import { saveUserLocalData } from '@/roanuz/lib/cart';
import { ShippmentMethodTypes, getSavedShippmentMethodType } from '@/roanuz/view/checkout/v3/model';

import { QuickLoginOrSignupController } from '@/roanuz/controller/customer/quickLoginOrSignup';

export const CheckoutStepOneController = ({
  cart, switchToTheStep, isActive,
  userContext, addressCreationModel,
}) => {
  const savedShippmentMethodType = getSavedShippmentMethodType();
  const [
    selectedShippmentMethodType,
    setSelectedShippmentMethodType,
  ] = useState(savedShippmentMethodType || ShippmentMethodTypes.Shipping);
  // TODO: Also try to link based on existing shipping method type for loggedin user.

  useEffect(() => {
    const updates = {
      rzSelectedShippmentMethodType: selectedShippmentMethodType,
    };
    saveUserLocalData(updates);
  }, [selectedShippmentMethodType]);

  const isGuestUser = !userContext.token;

  const [userEmail, setUserEmail] = useState();

  const [
    updateCustomerDetails,
    { error: updateAddressError, loading: updateAddressLoading, data: updateAddressData },
  ] = useMutation(isGuestUser ? SetCustomerDetailsGuestMutation : SetCustomerDetailsMutation, {
    onCompleted: (data) => {
      console.log('Cart Address Updated', data);
    },
  });

  const onShippingAddressReqChange = (update) => {
    console.log('Updating Shipping Address', update);
    const input = { ...update };
    if (userEmail && !userContext.token) {
      input.email.email = userEmail;
    }
    updateCustomerDetails({
      variables: input,
    });
  };

  useEffect(() => {
    if (updateAddressData) {
      if (updateAddressData.setShippingAddressesOnCart && !updateAddressError) {
        switchToTheStep();
      }
    }
  }, [
    updateAddressData,
    updateAddressError,
  ]);

  return (
    <>
      <CheckoutStepOneView
        methodTypeDetails={{
          selectedShippmentMethodType,
          setSelectedShippmentMethodType,
          types: ShippmentMethodTypes,
        }}
        cart={cart}
        updateAddressModel={{
          onShippingAddressReqChange,
          updateAddressError,
          updateAddressLoading,
        }}
        isActive={isActive}
        switchToTheStep={switchToTheStep}
        userContext={userContext}
        addressCreationModel={addressCreationModel}
        quickLoginOrSignup={(
          <QuickLoginOrSignupController
            userContext={userContext}
            cartEmail={cart.email}
            passEmail={(e) => setUserEmail(e)}
            displayEmailField
            contentKey="orders.GUEST_SIGN_UP_STATIC_TEXT"
          />
        )}
      />
    </>
  );
};

CheckoutStepOneController.propTypes = {
  cart: PropTypes.object.isRequired,
  switchToTheStep: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  userContext: PropTypes.object.isRequired,
  addressCreationModel: PropTypes.object.isRequired,
};
