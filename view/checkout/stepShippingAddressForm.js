import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '@/roanuz/layout';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { DisplayMedium20 } from '@/roanuz/typopgraphy';
import { translateV2 } from '@/roanuz/lib/utils';
import { FormItem } from '../input';

export const BaseStepShippingAddressFormWrapper = styled.div`
  .sub-heading {
    padding-top: ${asRem(15)};
    padding-bottom: ${asRem(16)};
  }

  .rz-row {
    .rz-form-item {
      flex: 1;
    }
    .rz-form-field {
      margin-bottom: 0;
      ~ .error-message {
        margin-top: ${asRem(8)};
      }
    }
    flex-direction: column;
    @media screen and (min-width: ${Breakpoint.sm}) {
      flex-direction: row;
    }
  }

  .rz-form-item {
    margin-bottom: ${asRem(16)};
  }

  .sibling-fields {
    flex-wrap: wrap;
  }

  @media screen and (min-width: ${Breakpoint.sm}) {
    .sibling-fields {
      >div:first-child {
        margin-right: ${asRem(10)};
      }
    }
  }
`;

export const StepAddressForm = ({
  fields,
  isGuestUser,
  onPincodeChange,
  formikStateFields,
  formInitVal,
  title,
}) => {
  const { values, errors, touched } = formikStateFields;
  return (
    <StepShippingAddressFormWrapper>
      <div>
        <DisplayMedium20 className="sub-heading">{title || translateV2('fields.PERSONAL_INFORMATION')}</DisplayMedium20>
        {fields.email && (
          <div>
            <FormItem
              field={fields.email}
              showInitialError={(formInitVal.email && !touched.email) && errors.email}
            />
          </div>
        )}
        {fields.rz_is_ssn && (
          <div>
            <FormItem
              field={fields.rz_is_ssn}
              showInitialError={(formInitVal.rz_is_ssn && !touched.rz_is_ssn) && errors.rz_is_ssn}
            />
          </div>
        )}
        {!isGuestUser ? (
          <Row className="sibling-fields">
            <FormItem field={fields.firstname} />
            <FormItem field={fields.lastname} />
          </Row>
        ) : (
          <div>
            <FormItem field={fields.firstname} />
          </div>
        )}
      </div>
      <div>
        <DisplayMedium20 className="sub-heading">{translateV2('fields.DELIVERY')}</DisplayMedium20>
        <div>
          <FormItem field={fields.street} />
        </div>
        <Row className="sibling-fields">
          <FormItem field={{
            ...fields.postcode,
            onSmartChange: (value) => {
              onPincodeChange(value, values);
            },
          }}
          />
          <FormItem field={fields.city} />
        </Row>
        <div>
          <FormItem
            field={fields.telephone}
            showInitialError={(formInitVal.telephone && !touched.telephone) && errors.telephone}
          />
        </div>
      </div>
    </StepShippingAddressFormWrapper>
  );
};

StepAddressForm.propTypes = {
  fields: PropTypes.object,
  isGuestUser: PropTypes.bool,
  onPincodeChange: PropTypes.func,
  formikStateFields: PropTypes.object,
  formInitVal: PropTypes.object,
  title: PropTypes.string,
};

export const StepShippingAddressFormWrapper = withDependencySupport(BaseStepShippingAddressFormWrapper, 'StepShippingAddressFormWrapper');
