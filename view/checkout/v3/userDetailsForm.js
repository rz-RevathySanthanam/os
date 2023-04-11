import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Row } from '@/roanuz/layout';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Text12 } from '@/roanuz/typopgraphy';
import { translateV2 } from '@/roanuz/lib/utils';
import { FormItem } from '../../input';

export const BaseUserDetailsFormFieldsViewWrapper = styled.div`
  .sibling-fields {
    gap: ${asRem(16)};
    flex-direction: column;
    @media screen and (min-width: ${Breakpoint.sm}) {
      flex-direction: row;
    }
    >div {
      @media screen and (min-width: ${Breakpoint.sm}) {
        // width: 50%;
        width: 100%;
      }
    }
    .rz-form-item .rz-form-field {
      margin: 0;
    }
  }
  .select-input {
    background-color: var(--color-text-rev);
  }
  .company {
    position: relative;
    .optional {
      position: absolute;
      right: 0;
      top: ${asRem(5)};
      color: var(--color-text-secondary);
    }
  }
`;

export const BaseUserDetailsFormFieldsView = ({
  fields, formInitVal, formikStateFields,
}) => {
  const {
    values, errors, touched,
    onCountryChange, onPincodeChange,
  } = formikStateFields;

  const onPincodeChangeHandler = (value, valuesRef) => {
    if (onPincodeChange) {
      onPincodeChange(value, valuesRef);
    }
  };

  const onCountryChangeHandler = (value, valuesRef) => {
    if (onCountryChange) {
      onCountryChange(value, valuesRef);
    }
  };

  return (
    <UserDetailsFormFieldsViewWrapper>
      <Row className="sibling-fields">
        {fields.firstname && (
          <FormItem field={fields.firstname} />
        )}
        {fields.lastname && (
          <FormItem field={fields.lastname} />
        )}
      </Row>
      {fields.rz_is_ssn && (
        <div>
          <FormItem
            field={fields.rz_is_ssn}
            showInitialError={
              (formInitVal.rz_is_ssn && !touched.rz_is_ssn) && errors.rz_is_ssn
            }
          />
        </div>
      )}

      {fields.company && (
        <div className="company">
          {fields.company.isOptional && <Text12 className="optional">{translateV2('fields.OPTIONAL')}</Text12>}
          <FormItem field={fields.company} />
        </div>
      )}
      {fields.street && (
        <div>
          <FormItem field={fields.street} />
        </div>
      )}
      {fields.city && (
        <div>
          <FormItem field={fields.city} />
        </div>
      )}
      <Row className="sibling-fields">
        {fields.countryCode && (
          <FormItem field={{
            ...fields.countryCode,
            onSmartChange: (value) => {
              onCountryChangeHandler(value, values);
            },
          }}
          />
        )}
        {fields.postcode && (
          <FormItem field={{
            ...fields.postcode,
            onSmartChange: (value) => {
              onPincodeChangeHandler(value, values);
            },
          }}
          />
        )}
      </Row>
      {fields.telephone && (
        <div>
          <FormItem
            field={fields.telephone}
            showInitialError={
              (formInitVal.telephone && !touched.telephone) && errors.telephone
            }
          />
        </div>
      )}
    </UserDetailsFormFieldsViewWrapper>
  );
};

BaseUserDetailsFormFieldsView.propTypes = {
  fields: PropTypes.object.isRequired,
  formInitVal: PropTypes.object.isRequired,
  formikStateFields: PropTypes.object.isRequired,
};

export const UserDetailsFormFieldsView = withDependencySupport(BaseUserDetailsFormFieldsView, 'UserDetailsFormFieldsView');
export const UserDetailsFormFieldsViewWrapper = withDependencySupport(BaseUserDetailsFormFieldsViewWrapper, 'UserDetailsFormFieldsViewWrapper');
