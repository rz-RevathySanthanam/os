import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Row } from '@/roanuz/layout';
import { FormItem } from '@/roanuz/view/input';
import { Button } from '@/roanuz/view/button';
import { DisplayBold18, DisplayBold20 } from '@/roanuz/typopgraphy';
import {
  getTermsAndConditionField,
  getSSNField,
  getBasicRegistrationFields,
  prepareBasicApplyForBussinessFormInitVals,
  buildBasicApplyForBussinessFields,
  getCommonFields,
  getCompanyFields,
} from '@/roanuz/view/customer/formModel';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { DocumentUploader } from './documentUploader';

export const BaseApplyForBussinessFormViewWrapper = styled.div`
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

  form {
    > div {
      margin-bottom: ${asRem(40)};
      > h3 {
        margin-bottom: ${asRem(20)};
      }
      &.terms-container {
        align-items: flex-start;
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
      }
    }
  }

  @media screen and (min-width: ${Breakpoint.sm}) {
    .sibling-fields {
      flex-direction: row;
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

export const ApplyForBussinessFormView = ({
  onSave,
  saving, saveError,
  docsContainer,
}) => {
  const fields = {
    ...getTermsAndConditionField(),
    ...getSSNField(),
    ...getBasicRegistrationFields(),
    ...getCommonFields(true),
    ...getCompanyFields(),
  };

  const [formInitValue] = useState({
    ...prepareBasicApplyForBussinessFormInitVals(),
  });

  const scrollViewTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onSubmit = (values) => {
    if (onSave) {
      scrollViewTop();
      onSave(buildBasicApplyForBussinessFields(values));
    }
  };

  return (
    <ApplyForBussinessFormViewWrapper>
      <Formik
        initialValues={formInitValue}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ isValid }) => (
          <Form>
            <div className="user-info">
              <DisplayBold20 as="h3">{translateV2('labelAndTitle.USER_INFORMATION')}</DisplayBold20>
              <Row className="sibling-fields">
                <FormItem field={fields.firstname} />
                <FormItem field={fields.lastname} />
              </Row>
              <div>
                <FormItem field={fields.email} />
              </div>
              <div>
                <FormItem field={fields.telephone} />
              </div>
              <div>
                <FormItem field={fields.password} />
              </div>
            </div>
            <div className="company-info">
              <DisplayBold20 as="h3">{translateV2('labelAndTitle.COMPANY_INFORMATION')}</DisplayBold20>
              <div>
                <FormItem field={fields.rzCompanyName} />
              </div>
              <div>
                <FormItem field={fields.rz_is_ssn} />
              </div>
              <div>
                <FormItem field={fields.street} />
              </div>
              <Row className="sibling-fields">
                <FormItem field={fields.postcode} />
                <FormItem field={fields.city} />
              </Row>
              {/* <div>
                <FormItem field={fields.rzCompanyTelephone} />
              </div> */}
            </div>
            <div className="supporting-docs">
              <DisplayBold20 as="h3">{translateV2('myPages.SUPPORTING_DOCUMENTS')}</DisplayBold20>
              <DocumentUploader
                container={docsContainer}
              />
            </div>
            <div className="actions-view">
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
                    {translateV2('myPages.APPLY_FOR_BUSINESS')}
                  </DisplayBold18>
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ApplyForBussinessFormViewWrapper>
  );
};

ApplyForBussinessFormView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  docsContainer: PropTypes.object,
};

export const ApplyForBussinessFormViewWrapper = withDependencySupport(BaseApplyForBussinessFormViewWrapper, 'ApplyForBussinessFormViewWrapper');
