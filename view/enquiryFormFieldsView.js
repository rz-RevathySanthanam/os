import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { FormItem } from '@/roanuz/view/input';
import { Button } from '@/roanuz/view/button';
import { DisplayBold20 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '../lib/utils';

export const EnquiryFormFieldsViewWrapper = styled.div`
  .rz-form-item {
    margin-right: 0;
    margin-bottom: ${asRem(20)};
  }
  .form-next-step {
    text-align: right;
  }
  .error-msg {
    color: var(--color-error);
    font-size: ${asRem(14)};
    line-height: ${asRem(18)};
  }
`;

export const EnquiryFormFieldsView = ({
  fields,
  isValid,
  saving,
  saveError,
}) => {
  const fieldsRef = Object.keys(fields);
  return (
    <EnquiryFormFieldsViewWrapper>
      {fieldsRef.map((field) => (
        <div>
          <FormItem field={fields[field]} />
        </div>
      ))}
      <div className="error-msg">
        {saveError && (
          <div>
            {translateV2('button.ERROR')}
            {saveError.message}
          </div>
        )}
      </div>
      <div className="form-next-step">
        <Button
          disabled={(!isValid) || saving}
          mode="primary"
          type="submit"
          filled
          className="button"
          ariaLabel={translateV2('button.SEND')}
        >
          {translateV2('button.SEND')}
        </Button>
      </div>
    </EnquiryFormFieldsViewWrapper>
  );
};

EnquiryFormFieldsView.propTypes = {
  fields: PropTypes.object,
  isValid: PropTypes.bool,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
};

const FormSuccessViewWrapper = styled.div`
`;

export const BaseFormSuccessView = ({ msg }) => {
  return (
    <FormSuccessViewWrapper>
      <DisplayBold20>{msg || 'Request Submitted Successfully 🎉'}</DisplayBold20>
    </FormSuccessViewWrapper>
  );
};

BaseFormSuccessView.propTypes = {
  msg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

export const FormSuccessView = withDependencySupport(BaseFormSuccessView, 'FormSuccessView');
