import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BillingAddressEnableOption } from './enableSwitch';
import { StepBillingAddress } from './selectionView';

const StepBillingAddressViewWrapper = styled.div`
`;

export const StepBillingAddressView = ({
  cart, isGuestUser, billingAddressAction,
  userBook,
}) => {
  const {
    updateBillingAddressLoading,
    updateBillingAddressError,
    onBillingAddressReqChange,
    userBillingAddress,
    billingIsSameAsShipping,
    setBillingIsSameAsShipping,
    saveBillingAddressInBookOption,
    setSaveBillingAddressInBookOption,
  } = billingAddressAction;

  // const [billingIsSameAsShipping, setBillingIsSameAsShipping] = useState(true);
  const [showBillingAddressModal, setShowBillingAddressModal] = useState(false);

  // const [
  //   saveBillingAddressInBookOption,
  //   setSaveBillingAddressInBookOption,
  // ] = useState(!isGuestUser);

  const isBillingAddressExist = Object.keys(userBillingAddress).length > 0;

  useEffect(() => {
    if (!userBillingAddress || !isBillingAddressExist) {
      setShowBillingAddressModal(!billingIsSameAsShipping);
    }
  }, [billingIsSameAsShipping]);

  const closeBillingAddressModal = () => {
    setShowBillingAddressModal(false);
    if (!userBillingAddress || !isBillingAddressExist) {
      setBillingIsSameAsShipping(true);
    }
  };

  useEffect(() => {
    setShowBillingAddressModal(false); // Close if successfully saved.
  }, [userBillingAddress]);
  return (
    <StepBillingAddressViewWrapper>
      <BillingAddressEnableOption
        billingIsSameAsShipping={billingIsSameAsShipping}
        setBillingIsSameAsShipping={(e) => setBillingIsSameAsShipping(e)}
      />
      <StepBillingAddress
        billingAddressInfo={{
          billingAddress: userBillingAddress,
          isBillingAddressExist,
        }}
        modelSettings={{
          showBillingAddressModal,
          closeBillingAddressModal,
          setShowBillingAddressModal,
        }}
        isGuestUser={isGuestUser}
        cart={cart}
        saveBillingAddressInBookOption={saveBillingAddressInBookOption}
        setSaveBillingAddressInBookOption={setSaveBillingAddressInBookOption}
        onAddNewAddress={onBillingAddressReqChange}
        updateBillingAddressError={updateBillingAddressError}
        updateBillingAddressLoading={updateBillingAddressLoading}
        isBillingIsSameAsShipping={billingIsSameAsShipping}
        userBook={userBook}
      />
    </StepBillingAddressViewWrapper>
  );
};

StepBillingAddressView.propTypes = {
  cart: PropTypes.object.isRequired,
  isGuestUser: PropTypes.bool,
  billingAddressAction: PropTypes.object,
  userBook: PropTypes.object,
};
