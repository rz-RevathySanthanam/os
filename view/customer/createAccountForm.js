import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Row } from '@/roanuz/layout';
import { FormItem } from '@/roanuz/view/input';
import { Button } from '@/roanuz/view/button';
import { DisplayBold18 } from '@/roanuz/typopgraphy';
import {
  getTermsAndConditionField,
  getSSNField,
  getBasicRegistrationFields,
  prepareBasicRegistrationFormInitVals,
  buildBasicRegistrationFields,
} from '@/roanuz/view/customer/formModel';
import { translateV2 } from '@/roanuz/lib/utils';

const CreateAccountFormViewWrapper = styled.div`
  .form-next-step {
    margin: ${asRem(26)} 0;

    .button {
      display: block;
      width: 100%;
      padding: ${asRem(10)} ${asRem(24)};

      @media screen and (min-width: ${Breakpoint.sm}) {
        width: auto;
      }
    }
  }

  .rz-row {
    flex-direction: column;
    .rz-form-item {
      flex: 1;
      margin-bottom: ${asRem(16)};
    }
    .rz-form-field {
      margin-bottom: 0;
    }

    .type-checkbox {
      padding-left: 0;

      .input {
        label {
          align-items: center;
        }
      }
    }
  }

  .error-message:not(:empty) {
    margin-top: ${asRem(20)};
  }

  .error-message {
    color: var(--color-error);
  }

  .terms-container {
    display: flex;
    align-items: center;
        
    >.rz-form-item {
      margin: 0;
      max-width: max-content;

      >.rz-form-field {
        padding: 0;
        margin-bottom: 0;
      }
    }
  }

  @media screen and (min-width: ${Breakpoint.sm}) {
    .sibling-fields {
      flex-direction: row;
      flex-wrap: wrap;
      >div:first-child {
        margin-right: ${asRem(10)};
      }
    }
  }

  .newsletter {
    label {
      justify-content: left;
    }
  }
`;

export const CreateAccountFormView = ({
  onSave,
  saving, saveError,
}) => {
  const fields = {
    ...getTermsAndConditionField(),
    ...getSSNField(),
    ...getBasicRegistrationFields(),
  };

  const [formInitValue] = useState({
    ...prepareBasicRegistrationFormInitVals(),
  });

  const onSubmit = (values) => {
    if (onSave) {
      onSave(buildBasicRegistrationFields(values));
    }
  };

  return (
    <CreateAccountFormViewWrapper>
      <Formik
        initialValues={formInitValue}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ isValid }) => (
          <Form>
            <Row className="sibling-fields">
              <FormItem field={fields.firstname} />
              <FormItem field={fields.lastname} />
            </Row>
            <div>
              <FormItem field={fields.rz_is_ssn} />
            </div>
            <div>
              <FormItem field={fields.email} />
            </div>
            <div>
              <FormItem field={fields.password} />
            </div>
            <div className="newsletter">
              <FormItem field={fields.subscribed} />
            </div>
            <div className="terms-container">
              <FormItem field={fields.termsAndConditions} />
              <a href="/vidskiptaskilmalar" target="_blank" rel="noreferrer">
                {translateV2('fields.ACCEPT_TERMS_CHECKBOX')}
              </a>
            </div>
            <div className="error-message">
              {saveError && (
                <div>
                  {translateV2('fields.ERROR')}
                  :
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
                ariaLabel="Create Account"
              >
                <DisplayBold18 as="span">
                  {translateV2('button.CREATE_ACCESS')}
                </DisplayBold18>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </CreateAccountFormViewWrapper>
  );
};

CreateAccountFormView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
};
