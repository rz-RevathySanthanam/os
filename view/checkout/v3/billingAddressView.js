import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DisplayBold20 } from '@/roanuz/typopgraphy';
import { translateV2 } from '@/roanuz/lib/utils';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { BillingAddressEnableOption } from '../stepBillingAddress/enableSwitch';
import { CustomerAddressSelectionView } from './customerAddressView';

export const BaseBillingAddressSelectionViewWrapper = styled.div`
`;

export const BillingAddressSelectionView = ({
  profileData,
  fields, formInitVal, formikStateFields,
  userContext, addressCreationModel,
  isBillingSameAsShipping, setIsBillingSameAsShippingHandler,
  hideBillingAddressEnableView,
}) => {
  return (
    <BillingAddressSelectionViewWrapper>
      {!hideBillingAddressEnableView && (
        <BillingAddressEnableOption
          billingIsSameAsShipping={isBillingSameAsShipping}
          setBillingIsSameAsShipping={(e) => setIsBillingSameAsShippingHandler(e)}
        />
      )}
      {!isBillingSameAsShipping && (
        <>
          <div className="form-wrapper">
            <DisplayBold20 as="h2" className="form-name">
              {translateV2('orders.BILLING_ADDRESS')}
            </DisplayBold20>
          </div>
          <CustomerAddressSelectionView
            fields={fields}
            formInitVal={formInitVal}
            formikStateFields={formikStateFields}
            profileData={profileData}
            userContext={userContext}
            addressCreationModel={addressCreationModel}
          />
        </>
      )}
    </BillingAddressSelectionViewWrapper>
  );
};

BillingAddressSelectionView.propTypes = {
  profileData: PropTypes.object,
  fields: PropTypes.object.isRequired,
  formInitVal: PropTypes.object.isRequired,
  formikStateFields: PropTypes.object.isRequired,
  addressCreationModel: PropTypes.object.isRequired,
  userContext: PropTypes.object.isRequired,
  isBillingSameAsShipping: PropTypes.bool,
  setIsBillingSameAsShippingHandler: PropTypes.func,
  hideBillingAddressEnableView: PropTypes.bool,
};

export const BillingAddressSelectionViewWrapper = withDependencySupport(BaseBillingAddressSelectionViewWrapper, 'BillingAddressSelectionViewWrapper');
