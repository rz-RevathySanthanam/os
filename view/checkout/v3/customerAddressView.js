import React from 'react';
import PropTypes from 'prop-types';
import { AddressBook } from '@/roanuz/view/checkout/stepShippingAddressSwitch';
import { UserDetailsFormFieldsView } from './userDetailsForm';

export const CustomerAddressSelectionView = ({
  profileData,
  fields, formInitVal, formikStateFields,
  userContext, addressCreationModel,
}) => {
  const { addresses } = profileData;
  if (addresses && addresses.length > 0) {
    return (
      <AddressBook
        addressList={addresses}
        formInitVal={formInitVal}
        formikStateFields={formikStateFields}
        userContext={userContext}
        addressCreationModel={addressCreationModel}
      />
    );
  }
  return (
    <UserDetailsFormFieldsView
      fields={fields}
      formInitVal={formInitVal}
      formikStateFields={formikStateFields}
    />
  );
};

CustomerAddressSelectionView.propTypes = {
  profileData: PropTypes.object,
  fields: PropTypes.object.isRequired,
  formInitVal: PropTypes.object.isRequired,
  formikStateFields: PropTypes.object.isRequired,
  userContext: PropTypes.object.isRequired,
  addressCreationModel: PropTypes.object.isRequired,
};
