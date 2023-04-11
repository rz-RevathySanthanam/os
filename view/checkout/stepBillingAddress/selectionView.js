import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SliderModal } from '@/roanuz/components/SliderType';
import { Form, Formik } from 'formik';
import { StyledCheckbox } from '@/roanuz/layout';
import { AllAddressesListView } from '@/roanuz/view/customer/addressBook/list';
import { Button } from '@/roanuz/view/button';
import { ReactComponent as AddAddress } from '@/roanuz/view/imgs/AddAddress.svg';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { prepareBillingAddressFields, prepareFormInitVals, buildBillingSaveInput } from '../model';
import { StepAddressForm } from '../stepShippingAddressForm';
import { ShipmentActionView } from '../stepActionView';
import { SelectedBillingAddress } from './selectedAddress';

const StepBillingAddressWrapper = styled.div`
`;

export const BaseAddressBillingFormWrapper = styled.div`
  .check-option {
    label {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
  }
  .add-edit-btn {
    padding: 0;
    gap: ${asRem(5)};
  }
`;

export const StepBillingAddress = ({
  billingAddressInfo,
  modelSettings,
  isGuestUser,
  cart,
  saveBillingAddressInBookOption,
  setSaveBillingAddressInBookOption,
  onAddNewAddress,
  updateBillingAddressError,
  updateBillingAddressLoading,
  isBillingIsSameAsShipping,
  userBook,
}) => {
  const fields = { ...prepareBillingAddressFields(isGuestUser) };

  const {
    showBillingAddressModal,
    closeBillingAddressModal,
    setShowBillingAddressModal,
  } = modelSettings;

  const { billingAddress, isBillingAddressExist } = billingAddressInfo;

  const isRzAddressIdExists = billingAddress.rz_address_id;

  const [formInitVal, setFormInitVal] = useState(!isRzAddressIdExists ? {
    ...prepareFormInitVals(cart, billingAddress, isGuestUser),
  } : {});

  const [addNewBillingAddress, setAddNewBillingAddress] = useState(!isRzAddressIdExists);

  useEffect(() => {
    setTimeout(() => {
      if (!isRzAddressIdExists) {
        setFormInitVal({
          ...prepareFormInitVals(cart, billingAddress, isGuestUser),
        });
      } else {
        const billingAddressRef = {
          rz_address_id: isRzAddressIdExists,
          ...prepareFormInitVals(cart, {}, isGuestUser),
        };
        setFormInitVal({
          ...prepareFormInitVals(cart, billingAddressRef, isGuestUser),
        });
      }
    }, 70);
  }, [showBillingAddressModal]); // Reupdate form with previosly saved info on everytime modal open.

  const onSubmit = (values) => {
    if (onAddNewAddress) {
      const valuesRef = { ...values };
      if (addNewBillingAddress) {
        delete valuesRef.customerAddressId;
      }
      onAddNewAddress(buildBillingSaveInput(
        valuesRef, isGuestUser, cart.id,
        saveBillingAddressInBookOption,
        isBillingIsSameAsShipping,
      ));
    }
  };

  const { addressBook } = userBook;

  const setAddNewBillingAddressHandler = () => {
    setAddNewBillingAddress(!addNewBillingAddress);
    setFormInitVal({
      ...prepareFormInitVals(cart, billingAddress, isGuestUser),
    });
  };

  return (
    <StepBillingAddressWrapper>
      {!isBillingIsSameAsShipping && isBillingAddressExist && (
        <SelectedBillingAddress
          billingAddress={billingAddress}
          onEdit={() => setShowBillingAddressModal(true)}
        />
      )}
      <SliderModal
        showSliderModal={showBillingAddressModal}
        closeModal={() => [
          closeBillingAddressModal(),
          setAddNewBillingAddress(!isRzAddressIdExists),
        ]}
        titleText="Greiðandi"
      >
        <AddressBillingFormWrapper>
          <Formik
            initialValues={formInitVal}
            onSubmit={onSubmit}
            validateOnMount
          >
            {({
              errors, isValid, touched,
            }) => (
              <Form>
                {addressBook && addressBook.length > 0 && (
                  <Button
                    onClick={() => setAddNewBillingAddressHandler()}
                    mode="primary"
                    noborder
                    icon={<AddAddress />}
                    ariaLabel="Bæta við heimilisfangi"
                    className="add-edit-btn"
                  >
                    Add / Edit
                  </Button>
                )}
                {!addNewBillingAddress && addressBook && addressBook.length > 0 ? (
                  <>
                    <AllAddressesListView
                      addresses={addressBook}
                      formInitVal={formInitVal}
                      selectFormFieldModel={{
                        selectFormFieldId: 'customerAddressId',
                        selectFormFieldHandler: () => ({}),
                      }}
                    />
                  </>
                ) : (
                  <>
                    <StepAddressForm
                      fields={fields}
                      isGuestUser={isGuestUser}
                      onPincodeChange={() => ({})}
                      formikStateFields={{
                        errors,
                        touched,
                      }}
                      formInitVal={formInitVal}
                      title="Kaupanda upplýsingar"
                    />
                    {!isGuestUser && (
                      <div className="check-option">
                        <label>
                          <span className="input-label">Vista greiðanda</span>
                          <StyledCheckbox>
                            <input
                              type="checkbox"
                              name="switch"
                              checked={saveBillingAddressInBookOption}
                              onChange={(event) => {
                                setSaveBillingAddressInBookOption(event.target.checked);
                              }}
                            />
                          </StyledCheckbox>
                        </label>
                      </div>
                    )}
                  </>
                )}
                <ShipmentActionView
                  fields={fields}
                  isGuestUser={isGuestUser}
                  saveError={updateBillingAddressError}
                  saving={updateBillingAddressLoading}
                  formikStateFields={{
                    isValid,
                  }}
                  scrollViewTop={() => ({})}
                  buttonLabel="Vista"
                  validationRule={
                    (!isValid) || updateBillingAddressLoading
                  }
                />
              </Form>
            )}
          </Formik>
        </AddressBillingFormWrapper>
      </SliderModal>
    </StepBillingAddressWrapper>
  );
};

StepBillingAddress.propTypes = {
  billingAddressInfo: PropTypes.object,
  modelSettings: PropTypes.object,
  isGuestUser: PropTypes.bool,
  cart: PropTypes.object.isRequired,
  saveBillingAddressInBookOption: PropTypes.bool,
  setSaveBillingAddressInBookOption: PropTypes.func,
  onAddNewAddress: PropTypes.func,
  updateBillingAddressError: PropTypes.object,
  updateBillingAddressLoading: PropTypes.bool,
  isBillingIsSameAsShipping: PropTypes.bool,
  userBook: PropTypes.object,
};

export const AddressBillingFormWrapper = withDependencySupport(BaseAddressBillingFormWrapper, 'AddressBillingFormWrapper');
