import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import Validate from '@/roanuz/lib/validate';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { FormItem } from '@/roanuz/view/input';
import { Button } from '@/roanuz/view/button';
import { DisplayBold18, DisplayBold20 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { replaceMask, applyMask, translateV2 } from '@/roanuz/lib/utils';

export const BaseEditAccountViewWrapper = styled.div`
  h1 {
    padding-top: ${asRem(18)};
    padding-bottom: ${asRem(18)};
    @media screen and (min-width: ${Breakpoint.sm}) {
      font-size: ${asRem(30)};
      line-height: ${asRem(37)};
    }    
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  .rz-form-item {
    margin-bottom: ${asRem(30)};
  }
  .form-next-step {
    margin: ${asRem(18)} 0;
    .button {
      display: block;
      width: 100%;
      @media screen and (min-width: ${Breakpoint.sm}) {
        width: auto;
        span {
          margin: 0;
        }
      }
    }
  }
`;

export const EditAccountView = ({
  onSave,
  saving, saveError, data,
}) => {
  const fields = {
    email: {
      type: 'email',
      name: translateV2('fields.EMAIL'),
      id: 'email',
      validateFn: Validate.all([
        Validate.required,
        Validate.email,
      ]),
    },
    firstname: {
      type: 'text',
      name: translateV2('fields.FIRST_NAME'),
      id: 'firstname',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(3, 50, { fieldTitle: 'Name' }),
      ]),
    },
    lastname: {
      type: 'text',
      name: translateV2('fields.LAST_NAME'),
      id: 'lastname',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(1, 50, { fieldTitle: 'Name' }),
      ]),
    },
    password: {
      type: 'password',
      name: translateV2('fields.CURRENT_PASSWORD'),
      id: 'password',
    },
    updateEmail: {
      type: 'checkbox',
      name: translateV2('fields.UPDATE_EMAIL'),
      id: 'updateEmail',
    },
  };

  const [formInitValue] = useState({
    email: replaceMask((data && data.email) || ''),
    firstname: replaceMask((data && data.firstname) || ''),
    lastname: replaceMask((data && data.lastname) || ''),
  });

  const buildSaveInput = (values) => {
    return {
      email: applyMask(values.email),
      firstname: applyMask(values.firstname),
      lastname: applyMask(values.lastname),
      password: values.updateEmail && applyMask(values.password),
    };
  };

  const onSubmit = (values) => {
    if (onSave) {
      onSave(buildSaveInput(values));
    }
  };

  const manualValidationForPassword = (values) => {
    if (values.updateEmail) {
      if (values.password) {
        return false;
      }
      return true;
    }
    return false;
  };

  return (
    <EditAccountViewWrapper>
      <Formik
        initialValues={formInitValue}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ values, isValid }) => (
          <Form>
            <div className="container">
              <div className="inner-container">
                <DisplayBold20 className="main-title edit-account-title" as="h1">{translateV2('myPages.PERSONAL_INFORMATION')}</DisplayBold20>
                <div>
                  <FormItem field={fields.firstname} />
                </div>
                <div>
                  <FormItem field={fields.lastname} />
                </div>
                <div>
                  <FormItem
                    field={fields.updateEmail}
                  />
                </div>
              </div>
              {values.updateEmail && (
                <div>
                  <DisplayBold20 className="edit-account-title" as="h1">
                    {translateV2('fields.UPDATE_EMAIL')}
                  </DisplayBold20>
                  <div>
                    <FormItem field={fields.email} />
                  </div>
                  <div>
                    <FormItem field={fields.password} />
                  </div>
                </div>
              )}
            </div>
            <div>
              {saveError && (
              <div>
                Villa:
                {saveError.message}
              </div>
              )}
            </div>
            <div className="form-next-step">
              <Button
                disabled={(!isValid) || saving || manualValidationForPassword(values)}
                mode="primary"
                type="submit"
                large
                filled
                className="button"
                ariaLabel="Update Account"
              >
                <DisplayBold18 as="span">
                  {translateV2('fields.UPDATE_ACCOUNT')}
                </DisplayBold18>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </EditAccountViewWrapper>
  );
};

EditAccountView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  data: PropTypes.object,
};

export const EditAccountViewWrapper = withDependencySupport(BaseEditAccountViewWrapper, 'EditAccountViewWrapper');
