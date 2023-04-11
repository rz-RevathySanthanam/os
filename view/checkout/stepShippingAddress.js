/*
  FYI, This component has been re-written / modified in few clients wise.
*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { getTermsAndConditionField } from '@/roanuz/view/customer/formModel';
import {
  prepareShippingAddrFields,
  prepareFormInitVals,
  prepareShippingMethodInitVals,
  getCustomerNotesField,
  prepareCustomerNotesInitVals,
  checkIfBillingAddress,
} from './model';
import { StepShippingAddressSwitch } from './stepShippingAddressSwitch';
import { StepBillingAddressView } from './stepBillingAddress/view';
import { StepShippingMethodView } from './stepShippingMethod';
import { ShipmentActionView } from './stepActionView';
import { TAndCView } from './stepUtils/termsAndConditionsView';
import { CustomerNotesView } from './stepUtils/customerNotes';

const StepShippingAddressViewWrapper = styled.div`
`;

// Rebuild this entire component in client level to rebuild accordingly.
export const BaseStepShippingAddressView = ({
  cart,
  isGuestUser,
  onPincodeChangeHandler,
  saving,
  saveError,
  scrollViewTop,
  onSubmitMethodHandlers,
  billingAddressAction,
  stepsModal,
  userBook,
  addOrUpdateAddressModel,
  userContext,
}) => {
  console.debug(`Left for future use ${stepsModal}`);
  const shippingAddress = cart.shippingAddress || {};
  const { onSubmitShippingAddressAndMethodTogether } = onSubmitMethodHandlers;

  const shippingAddressFields = {
    ...prepareShippingAddrFields(isGuestUser),
    ...getTermsAndConditionField(),
    ...getCustomerNotesField(),
  };

  const [formInitVal] = useState({
    ...prepareFormInitVals(cart, shippingAddress, isGuestUser),
    ...prepareShippingMethodInitVals(cart),
    ...prepareCustomerNotesInitVals(cart),
  });

  const onPincodeChange = (newCode, values) => {
    if (shippingAddressFields.postcode.validateFn(newCode)) return;
    onPincodeChangeHandler(newCode, values);
  };

  const fromAddressBook = (address, values, setFieldValue) => {
    // console.log('not', address, values, setFieldValue);
    setFieldValue('postcode', address.postcode);
    const valuesRef = { ...values };
    valuesRef.customerAddressId = address.id;
    onPincodeChange(address.postcode, valuesRef);
  };

  return (
    <StepShippingAddressViewWrapper>
      <Formik
        initialValues={formInitVal}
        onSubmit={onSubmitShippingAddressAndMethodTogether}
        validateOnMount
      >
        {({
          values, errors, isValid, touched, setFieldValue,
        }) => (
          <Form>
            <StepShippingAddressSwitch
              userBook={userBook}
              fields={shippingAddressFields}
              isGuestUser={isGuestUser}
              onPincodeChange={onPincodeChange}
              formikStateFields={{
                values,
                errors,
                touched,
                setFieldValue,
              }}
              formInitVal={formInitVal}
              fromAddressBookHandler={(e) => fromAddressBook(e, values, setFieldValue)}
              addOrUpdateAddressModel={addOrUpdateAddressModel}
              userContext={userContext}
            />
            <StepBillingAddressView
              cart={cart}
              isGuestUser={isGuestUser}
              billingAddressAction={billingAddressAction}
              userBook={userBook}
            />
            <StepShippingMethodView
              cart={cart}
              formikStateFields={{
                values,
                errors,
              }}
              saving={saving}
            />
            <CustomerNotesView fields={shippingAddressFields} />
            <TAndCView isGuestUser={isGuestUser} fields={shippingAddressFields} />
            <ShipmentActionView
              fields={shippingAddressFields}
              isGuestUser={isGuestUser}
              saveError={saveError}
              formikStateFields={{
                isValid,
                values,
              }}
              scrollViewTop={scrollViewTop}
              validationRule={
                (!isValid) || saving
                || (values && !values.shippingMethod)
                || (!checkIfBillingAddress(billingAddressAction))
              }
            />
          </Form>
        )}
      </Formik>
    </StepShippingAddressViewWrapper>
  );
};

BaseStepShippingAddressView.propTypes = {
  cart: PropTypes.object.isRequired,
  isGuestUser: PropTypes.bool,
  onPincodeChangeHandler: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  scrollViewTop: PropTypes.func,
  onSubmitMethodHandlers: PropTypes.object,
  billingAddressAction: PropTypes.object,
  stepsModal: PropTypes.object,
  userBook: PropTypes.object,
  addOrUpdateAddressModel: PropTypes.object,
  userContext: PropTypes.object,
};

export const StepShippingAddressView = withDependencySupport(BaseStepShippingAddressView, 'StepShippingAddressView');
