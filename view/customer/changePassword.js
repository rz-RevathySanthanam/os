/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import { applyMask, translateV2 } from '@/roanuz/lib/utils';

export const BaseEditPasswordViewWrapper = styled.div`
  h1 {
    padding-top: ${asRem(18)};
    padding-bottom: ${asRem(18)};
    @media screen and (min-width: ${Breakpoint.sm}) {
      font-size: ${asRem(30)};
      line-height: ${asRem(37)};
    }    
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

export const EditPasswordView = ({
  onSave,
  saving, saveError,
}) => {
  const fields = {
    password: {
      type: 'password',
      name: translateV2('myPages.NEW_PASSWORD'),
      id: 'password',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(4, 50, { fieldTitle: 'Password' }),
      ]),
    },
    newPassword: {
      type: 'password',
      name: translateV2('myPages.NEW_PASSWORD'),
      id: 'newPassword',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(4, 50, { fieldTitle: 'Password' }),
      ]),
    },
  };

  const [formInitValue] = useState({
    password: '',
    newPassword: '',
  });

  const buildSaveInput = (values) => {
    return {
      currentPassword: applyMask(values.password),
      newPassword: applyMask(values.newPassword),
    };
  };

  const onSubmit = (values) => {
    if (onSave) {
      onSave(buildSaveInput(values));
    }
  };

  return (
    <EditPasswordViewWrapper>
      <Formik
        initialValues={formInitValue}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ isValid }) => (
          <Form>
            <div className="container">
              <div className="inner-container">
                <DisplayBold20 className="main-title edit-account-title" as="h1">{translateV2('myPages.PASSWORD')}</DisplayBold20>
                <div>
                  <FormItem field={fields.password} />
                </div>
                <div>
                  <FormItem field={fields.newPassword} />
                </div>
              </div>
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
                disabled={(!isValid) || saving}
                mode="primary"
                type="submit"
                large
                filled
                className="button"
                ariaLabel={translateV2('myPages.UPDATE_PASSWORD')}
              >
                <DisplayBold18 as="span">
                  {translateV2('myPages.UPDATE_PASSWORD')}
                </DisplayBold18>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </EditPasswordViewWrapper>
  );
};

EditPasswordView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
};

export const EditPasswordViewWrapper = withDependencySupport(BaseEditPasswordViewWrapper, 'EditPasswordViewWrapper');
