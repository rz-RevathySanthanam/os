// `/customer`
// Customer Information.
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Form, Formik } from 'formik';
import { translateV2 } from '@/roanuz/lib/utils';

import { DisplayBold24, DisplayBold20 } from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';

import { CheckoutStepTypes } from '@/roanuz/controller/checkout/v3/process';
import {
  prepareCustomerAddressFields,
  buildCustomerDetailFieldsSaveInput,
  prepareCustomerDetailFormInitVals,
  validateAddressField,
} from './model';
import { ShipmentActionView } from '../stepActionView';
import {
  ShippingOrCollectionSwitchView, StepNumberView,
  CheckoutStepsCommonViewWrapper,
} from './quickViews';
import { ShippingAddressCardView } from '../stepShippingAndDeliveryDisplay';
import { CustomerAddressSelectionView } from './customerAddressView';
import { Button } from '../../button';

export const CheckoutStepOneViewWrapper = styled(CheckoutStepsCommonViewWrapper)`
  ${(p) => !p.isShippingType && css`
    .street-details {
      display: none;
    }
  `}
  .checkout-step-content {
    .rz-address-card .address-container {
      b, p, .address {
        font-size: ${asRem(16)};
        line-height: ${asRem(24)};
        padding: 0;
      }
      .name {
        font-size: ${asRem(20)};
      }
    }
  }
`;

export const CheckoutStepOneView = ({
  cart, methodTypeDetails, updateAddressModel,
  isActive, switchToTheStep, userContext,
  addressCreationModel,
  quickLoginOrSignup,
}) => {
  const {
    selectedShippmentMethodType,
    setSelectedShippmentMethodType,
    types,
  } = methodTypeDetails;

  const isShippingType = selectedShippmentMethodType === types.Shipping;

  const shippingAddress = cart.shippingAddress || {};

  const isGuestUser = !userContext.token;

  const {
    onShippingAddressReqChange,
    updateAddressError,
    updateAddressLoading,
  } = updateAddressModel;

  const [fields, setFields] = useState({
    ...prepareCustomerAddressFields(isGuestUser, isShippingType),
  });
  const [formInitVal, setFormInitVal] = useState({
    ...prepareCustomerDetailFormInitVals(
      cart, shippingAddress, isShippingType,
    ),
  });

  useEffect(() => {
    setFormInitVal({
      ...prepareCustomerDetailFormInitVals(
        cart, shippingAddress, isShippingType,
      ),
    });
  }, [cart]);

  const setSelectedMethodTypeHandler = (type, values) => {
    console.debug(`Left for future use ${values}`);
    setSelectedShippmentMethodType(type);
    const isShippingTypeClone = type === types.Shipping;
    setFields({
      ...prepareCustomerAddressFields(isGuestUser, isShippingTypeClone),
    });
    // setFormInitVal({
    //   ...prepareCustomerDetailFormInitVals(
    //     cart, values || shippingAddress, isShippingTypeClone,
    //   ),
    // }); I think not required
  };

  const onSubmitChange = (values) => {
    if (onShippingAddressReqChange) {
      const valuesRef = { ...values };
      if (!isShippingType) {
        delete valuesRef.street;
        delete valuesRef.city;
        delete valuesRef.postcode;
        delete valuesRef.countryCode;
      }
      onShippingAddressReqChange(buildCustomerDetailFieldsSaveInput(valuesRef, cart.id));
    }
  };

  const onPincodeChange = (newCode, values) => {
    if (fields.postcode.validateFn(newCode)) return;
    console.log(newCode, values);
  };

  const onCountryChange = (newCode, values) => {
    if (fields.countryCode.validateFn(newCode)) return;
    console.log(newCode, values);
  };

  const stepNumberView = (
    <StepNumberView stepNumber={1} isActive={isActive} className="step-number" />
  );

  if (!isActive) {
    return (
      <CheckoutStepOneViewWrapper isShippingType={isShippingType}>
        <div className="title-with-num">
          {stepNumberView}
          <DisplayBold20 as="h1" className="edit-btn-wrap">
            {translateV2('orders.YOUR_DETAILS')}
            <Button
              mode="primary"
              noborder
              nomargin
              onClick={() => switchToTheStep(CheckoutStepTypes.customer.id)}
              ariaLabel="Edit"
            >
              {translateV2('orders.EDIT')}
            </Button>
          </DisplayBold20>
        </div>
        <div className="checkout-step-content">
          <ShippingAddressCardView
            data={cart.shippingAddress}
            onClick={() => switchToTheStep(CheckoutStepTypes.customer.id)}
            hideEdit
          />
        </div>
      </CheckoutStepOneViewWrapper>
    );
  }

  return (
    <CheckoutStepOneViewWrapper isActive={isActive} isShippingType={isShippingType}>
      {quickLoginOrSignup}
      <Formik
        initialValues={formInitVal}
        onSubmit={onSubmitChange}
        validateOnMount
        enableReinitialize
      >
        {({
          values, errors, isValid, touched, setFieldValue,
        }) => (
          <>
            <Form>
              <div className="title-with-num">
                {stepNumberView}
                <DisplayBold24 as="h1" className="step-title">{translateV2('orders.SHIPPING_METHOD')}</DisplayBold24>
              </div>
              <div className="checkout-step-content">
                <ShippingOrCollectionSwitchView
                  methodTypeDetails={methodTypeDetails}
                  values={values}
                  setSelectedMethodTypeHandler={setSelectedMethodTypeHandler}
                  isShippingType={isShippingType}
                />
                <CustomerAddressSelectionView
                  fields={fields}
                  formInitVal={formInitVal}
                  formikStateFields={{
                    values,
                    errors,
                    touched,
                    onCountryChange,
                    onPincodeChange,
                    setFieldValue,
                  }}
                  profileData={cart.profileData}
                  userContext={userContext}
                  addressCreationModel={addressCreationModel}
                />
                <ShipmentActionView
                  saving={updateAddressLoading}
                  saveError={updateAddressError}
                  buttonLabel={translateV2(`orders.${isShippingType ? 'SELECT_SHIPPING_METHOD' : 'SELECT_PICKUP_LOCATION'}`)}
                  scrollViewTop={() => {}}
                  validationRule={
                    !isValid
                    || updateAddressLoading
                    || validateAddressField(isGuestUser, values, cart.profileData, fields.postcode)
                  }
                />
              </div>
            </Form>
          </>
        )}
      </Formik>
    </CheckoutStepOneViewWrapper>
  );
};

CheckoutStepOneView.propTypes = {
  cart: PropTypes.object.isRequired,
  methodTypeDetails: PropTypes.object.isRequired,
  updateAddressModel: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  switchToTheStep: PropTypes.func.isRequired,
  userContext: PropTypes.object.isRequired,
  addressCreationModel: PropTypes.object.isRequired,
  quickLoginOrSignup: PropTypes.element.isRequired,
};
