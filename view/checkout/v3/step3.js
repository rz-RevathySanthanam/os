// `/payment`
// Payment Selection.
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Formik } from 'formik';

import { DisplayBold24, DisplayBold20 } from '@/roanuz/typopgraphy';
import { fetchUserLocalData, saveUserLocalData } from '@/roanuz/lib/cart';
import { translateV2 } from '@/roanuz/lib/utils';
import {
  preparePaymentMethodInitVals,
  preparePaymentMethodFields,
  buildBillingAddressFieldsSaveInput,
  validateTerms,
  validateBillingAddressField,
  ShippmentMethodTypes,
  getSavedShippmentMethodType,
} from './model';
import { ShipmentActionView } from '../stepActionView';
import { TAndCView } from '../stepUtils/termsAndConditionsView';
import { PaymentMethodsView } from './paymentMethodsPicker';
import { BillingAddressSelectionView } from './billingAddressView';
import { StepNumberView, CheckoutStepsCommonViewWrapper, CheckoutStepOnInActiveView } from './quickViews';

export const CheckoutStepThreeViewWrapper = styled(CheckoutStepsCommonViewWrapper)`
`;

export const CheckoutStepThreeView = ({
  cart,
  isActive,
  updateBillingAddressModel,
  paymentModel,
  userContext,
  addressCreationModel,
}) => {
  const isGuestUser = !userContext.token;

  const savedIsBillingSameAsShipping = fetchUserLocalData('rzIsBillingSameAsShipping', true);

  const savedShippmentMethodType = getSavedShippmentMethodType();
  const isShippingType = savedShippmentMethodType === ShippmentMethodTypes.Shipping;

  const [
    isBillingSameAsShipping, setIsBillingSameAsShipping,
  ] = useState(savedIsBillingSameAsShipping);

  const [fields, setFields] = useState({
    ...preparePaymentMethodFields(isBillingSameAsShipping, isGuestUser),
  });

  useEffect(() => {
    if (!isShippingType) {
      setIsBillingSameAsShipping(false);
      setFields({
        ...preparePaymentMethodFields(false, isGuestUser),
      });
      // INFO: The above linked with isShippingType,
      // Because on Pickup, we should not always to use Billing same as shipping.
    }
  }, [isShippingType]);

  const [formInitVal, setFormInitVal] = useState({
    ...preparePaymentMethodInitVals(isBillingSameAsShipping, cart, {}),
  });

  useEffect(() => {
    setFormInitVal({
      ...preparePaymentMethodInitVals(isBillingSameAsShipping, cart, {}),
    });
  }, [cart]);

  const setIsBillingSameAsShippingHandler = (e, values) => {
    setIsBillingSameAsShipping(e);
    const updates = { rzIsBillingSameAsShipping: e };
    saveUserLocalData(updates);
    setFields({
      ...preparePaymentMethodFields(e, isGuestUser),
    });
    setFormInitVal({
      ...preparePaymentMethodInitVals(e, cart, values),
    });
  };

  const {
    onBillingAddressAndPaymentReqChange,
    updateBillingAddressError,
    updateBillingAddressLoading,
  } = updateBillingAddressModel;

  const {
    paymentLoading,
    paymentError,
  } = paymentModel;

  const onSubmitChange = (values) => {
    const { shippingAddress } = cart;
    const billingAddr = !isBillingSameAsShipping ? values : shippingAddress;
    if (onBillingAddressAndPaymentReqChange) {
      onBillingAddressAndPaymentReqChange(
        buildBillingAddressFieldsSaveInput(billingAddr, cart.id, isBillingSameAsShipping, false),
        values.paymentMethod,
      );
    }
  };

  const stepNumberView = (
    <StepNumberView stepNumber={3} isActive={isActive} className="step-number" />
  );

  if (!isActive) {
    return (
      <CheckoutStepThreeViewWrapper>
        <CheckoutStepOnInActiveView
          stepNumberView={stepNumberView}
          title={
            <DisplayBold20 as="h1">{translateV2('orders.PAYMENT')}</DisplayBold20>
          }
          stepNumber={3}
        />
      </CheckoutStepThreeViewWrapper>
    );
  }

  return (
    <CheckoutStepThreeViewWrapper isActive={isActive}>
      <div className="title-with-num">
        {stepNumberView}
        <DisplayBold24 as="h1">{translateV2('orders.PAYMENT')}</DisplayBold24>
      </div>
      <div className="checkout-step-content">
        <Formik
          initialValues={formInitVal}
          onSubmit={onSubmitChange}
          validateOnMount
          enableReinitialize
        >
          {({
            values, errors, isValid, touched,
            setFieldValue,
          }) => (
            <Form>
              <PaymentMethodsView
                cart={cart}
                formikStateFields={{
                  values,
                  errors,
                }}
                paymentModel={paymentModel}
              />
              <BillingAddressSelectionView
                fields={fields}
                formInitVal={formInitVal}
                formikStateFields={{
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }}
                profileData={cart.profileData}
                userContext={userContext}
                addressCreationModel={addressCreationModel}
                isBillingSameAsShipping={isBillingSameAsShipping}
                setIsBillingSameAsShippingHandler={
                  (e) => setIsBillingSameAsShippingHandler(e, values)
                }
                hideBillingAddressEnableView={!isShippingType}
              />
              <TAndCView isGuestUser={isGuestUser} fields={fields} />
              <ShipmentActionView
                saving={updateBillingAddressLoading || paymentLoading}
                saveError={updateBillingAddressError || paymentError}
                buttonLabel={`${translateV2('orders.PAY')} ${cart.grandTotalPriceText}`}
                scrollViewTop={() => {}}
                validationRule={
                  !isValid || !values.paymentMethod || validateTerms(isGuestUser, values)
                  || validateBillingAddressField(
                    isGuestUser, values, cart.profileData, isBillingSameAsShipping, fields.postcode,
                  )
                }
              />
            </Form>
          )}
        </Formik>
      </div>
    </CheckoutStepThreeViewWrapper>
  );
};

CheckoutStepThreeView.propTypes = {
  cart: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  updateBillingAddressModel: PropTypes.object.isRequired,
  paymentModel: PropTypes.object.isRequired,
  userContext: PropTypes.object.isRequired,
  addressCreationModel: PropTypes.object.isRequired,
};
