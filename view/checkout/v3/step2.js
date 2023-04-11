// `/delivery`
// Shipping Method Selection.
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
// import { asRem } from '@/roanuz/lib/css';

import { DisplayBold24, DisplayBold20 } from '@/roanuz/typopgraphy';
import { CheckoutStepTypes } from '@/roanuz/controller/checkout/v3/process';
import { translateV2 } from '@/roanuz/lib/utils';

import {
  prepareCustomerNotesField,
  prepareShippingMethodInitVals,
  buildShippingMethodSaveInput,
  getSavedShippmentMethodType,
  ShippmentMethodTypes,
} from './model';
import { ShipmentActionView } from '../stepActionView';
import { StepShippingMethodView } from '../stepShippingMethod';
import { CustomerNotesView } from '../stepUtils/customerNotes';
import { ShippingMethodCardView } from '../stepShippingAndDeliveryDisplay';
import { StepNumberView, CheckoutStepsCommonViewWrapper, CheckoutStepOnInActiveView } from './quickViews';
import { Button } from '../../button';

export const CheckoutStepTwoViewWrapper = styled(CheckoutStepsCommonViewWrapper)`
`;

export const CheckoutStepTwoView = ({
  cart, updateShippingMethodModel,
  isActive, switchToTheStep,
}) => {
  const savedShippmentMethodType = getSavedShippmentMethodType();
  const {
    onShippingMethodReqChange,
    updateShippingMethodError,
    updateShippingMethodLoading,
  } = updateShippingMethodModel;

  const fields = {
    ...prepareCustomerNotesField(),
  };
  const [formInitVal, setFormInitVal] = useState({
    ...prepareShippingMethodInitVals(cart),
  });

  useEffect(() => {
    setFormInitVal({
      ...prepareShippingMethodInitVals(cart),
    });
  }, [cart]);

  const isShippingType = savedShippmentMethodType === ShippmentMethodTypes.Shipping;
  const title = translateV2(isShippingType ? 'orders.SHIPPING_TYPE' : 'orders.PICKUP');

  const stepNumberView = (
    <StepNumberView stepNumber={2} isActive={isActive} className="step-number" />
  );

  if (!isActive) {
    if (!cart || !cart.shippingMethod) {
      return (
        <CheckoutStepTwoViewWrapper>
          <CheckoutStepOnInActiveView
            stepNumberView={stepNumberView}
            title={
              <DisplayBold20 as="h1">{translateV2('orders.SHIPPING_TYPE')}</DisplayBold20>
            }
            stepNumber={2}
          />
        </CheckoutStepTwoViewWrapper>
      );
    }
    return (
      <CheckoutStepTwoViewWrapper>
        <CheckoutStepOnInActiveView
          stepNumberView={stepNumberView}
          title={(
            <DisplayBold20 as="h1" className="edit-btn-wrap">
              {title}
              <Button
                mode="primary"
                noborder
                nomargin
                onClick={() => switchToTheStep(CheckoutStepTypes.delivery.id)}
                ariaLabel="Edit"
              >
                {translateV2('orders.EDIT')}
              </Button>
            </DisplayBold20>
          )}
          card={(
            <ShippingMethodCardView
              data={cart}
              onClick={() => switchToTheStep(CheckoutStepTypes.delivery.id)}
              hideEdit
            />
          )}
          stepNumber={2}
        />
      </CheckoutStepTwoViewWrapper>
    );
  }

  const onSubmitChange = (values) => {
    if (onShippingMethodReqChange) {
      onShippingMethodReqChange(buildShippingMethodSaveInput(values, cart.id));
    }
  };
  return (
    <CheckoutStepTwoViewWrapper isActive={isActive}>
      <div className="title-with-num">
        {stepNumberView}
        <DisplayBold24 as="h1">{title}</DisplayBold24>
      </div>
      <div className="checkout-step-content">
        <Formik
          initialValues={formInitVal}
          onSubmit={onSubmitChange}
          validateOnMount
        >
          {({
            values, errors, isValid,
          }) => (
            <Form>
              <StepShippingMethodView
                cart={cart}
                formikStateFields={{
                  values,
                  errors,
                }}
                saving={updateShippingMethodLoading}
                savedShippmentMethodType={savedShippmentMethodType}
              />
              <CustomerNotesView fields={fields} />
              <ShipmentActionView
                saving={updateShippingMethodLoading}
                saveError={updateShippingMethodError}
                buttonLabel={translateV2('orders.PROCEED_TO_PAYMENT')}
                scrollViewTop={() => {}}
                validationRule={
                  !isValid
                  || updateShippingMethodLoading
                  || !values.shippingMethod
                  || !cart.segregatedShippingMethods[savedShippmentMethodType]
                    .includes(values.shippingMethod)
                }
              />
            </Form>
          )}
        </Formik>
      </div>
    </CheckoutStepTwoViewWrapper>
  );
};

CheckoutStepTwoView.propTypes = {
  cart: PropTypes.object.isRequired,
  updateShippingMethodModel: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  switchToTheStep: PropTypes.func.isRequired,
};
