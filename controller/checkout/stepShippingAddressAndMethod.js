import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StepShippingAddressView } from '@/roanuz/view/checkout/stepShippingAddress';

import { useCreateOrUpdateCustomerAddress } from '@/roanuz/controller/customer/addressUpdations';

import {
  SetShippingMethodAloneMutation,
  SetShippingAddressAloneGuestMutation,
  SetShippingAddressAloneMutation,
  SetShippingAddressAndMethodGuestMutation,
  SetShippingAddressAndMethodMutation,
} from '@/roanuz/store/cart/query';

import {
  buildShippingAddressSaveInput,
  buildShippingSaveInput,
} from '@/roanuz/view/checkout/model';

import { fetchUserLocalData, saveUserLocalData } from '@/roanuz/lib/cart';

const StepShippingAddressAndMethodControllerWrapper = styled.div`
`;

export const StepShippingAddressAndMethodController = ({
  cart,
  userContext,
  onShippingAddressReqChange,
  saving,
  saveError,
  onReqSave,
  billingAddressAction,
  stepsModal,
}) => {
  const isGuestUser = !userContext.token;
  const { checkoutSteps } = stepsModal;
  const {
    addresses, email, lastname, firstname,
  } = cart.profileData;

  const customerProfile = {
    email, lastname, firstname,
  };

  const scrollViewTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onPincodeChangeHandler = (newCode, values) => {
    console.log('New Pincode', newCode, values.postcode);
    console.log('onPincodeChange Triggered', values);
    if (onShippingAddressReqChange) {
      onShippingAddressReqChange(buildShippingAddressSaveInput(values, isGuestUser, cart.id));
    }
  };

  const isUserSetBillingIsSameAsShipping = fetchUserLocalData('billingIsSameAsShipping', true);
  const [
    billingIsSameAsShipping, setBillingIsSameAsShipping,
  ] = useState(isUserSetBillingIsSameAsShipping);

  useEffect(() => {
    const updates = {
      billingIsSameAsShipping,
    };
    saveUserLocalData(updates);
  }, [billingIsSameAsShipping]);

  const onSubmitShippingAddressAndMethodTogether = (values) => {
    if (onReqSave) {
      onReqSave(
        isGuestUser
          ? SetShippingAddressAndMethodGuestMutation : SetShippingAddressAndMethodMutation,
        buildShippingSaveInput(values, isGuestUser, cart.id,
          {
            billingIsSameAsShipping,
            userBillingAddress: billingAddressAction.userBillingAddress,
            shouldSaveInBook: billingAddressAction.saveBillingAddressInBookOption,
          }),
      );
    }
  };

  const onSubmitShippingAddressAlone = (values) => {
    if (onReqSave) {
      onReqSave(
        isGuestUser ? SetShippingAddressAloneGuestMutation : SetShippingAddressAloneMutation,
        buildShippingSaveInput(values, isGuestUser, cart.id,
          {
            onlyAddress: true,
            billingIsSameAsShipping,
            userBillingAddress: billingAddressAction.userBillingAddress,
            shouldSaveInBook: billingAddressAction.saveBillingAddressInBookOption,
          }),
        checkoutSteps.delivery.id,
      );
    }
  };

  const onSubmitShippingMethodAlone = (values, includeFewShippingAddrFeilds = null) => {
    if (onReqSave) {
      onReqSave(
        SetShippingMethodAloneMutation,
        buildShippingSaveInput(
          values, isGuestUser, cart.id,
          {
            onlyMethod: true,
            includeFewShippingAddrFeilds,
            billingIsSameAsShipping,
            userBillingAddress: billingAddressAction.userBillingAddress,
            shouldSaveInBook: billingAddressAction.saveBillingAddressInBookOption,
          },
        ),
        checkoutSteps.payment.id,
      );
    }
  };

  const onDataModified = (data, word) => {
    if (data && data[word]) {
      console.log(`${word} Done ✅.`);
    }
  };

  const [createCustomerAddress, { loading, error }] = useCreateOrUpdateCustomerAddress({
    onCompleted: (data) => {
      onDataModified(data, 'createCustomerAddress');
    },
  });

  const [
    updateCustomerAddress,
    { loading: updateLoading, error: updateError },
  ] = useCreateOrUpdateCustomerAddress({
    onCompleted: (data) => {
      onDataModified(data, 'updateCustomerAddress');
    },
  });

  return (
    <StepShippingAddressAndMethodControllerWrapper>
      <StepShippingAddressView
        cart={cart}
        isGuestUser={isGuestUser}
        onShippingAddressReqChange={onShippingAddressReqChange}
        saving={saving}
        saveError={saveError}
        scrollViewTop={scrollViewTop}
        billingAddressAction={{
          ...billingAddressAction,
          billingIsSameAsShipping,
          setBillingIsSameAsShipping,
        }}
        onPincodeChangeHandler={onPincodeChangeHandler}
        onSubmitMethodHandlers={{
          onSubmitShippingAddressAndMethodTogether,
          onSubmitShippingAddressAlone,
          onSubmitShippingMethodAlone,
        }}
        stepsModal={stepsModal}
        userBook={{
          addressBook: addresses,
          customerProfile,
        }}
        addOrUpdateAddressModel={{
          loading,
          error,
          createCustomerAddress,
          updateLoading,
          updateError,
          updateCustomerAddress,
        }}
        userContext={userContext}
      />
    </StepShippingAddressAndMethodControllerWrapper>
  );
};

StepShippingAddressAndMethodController.propTypes = {
  cart: PropTypes.object.isRequired,
  userContext: PropTypes.object,
  onShippingAddressReqChange: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  onReqSave: PropTypes.func,
  billingAddressAction: PropTypes.object,
  stepsModal: PropTypes.object,
};
