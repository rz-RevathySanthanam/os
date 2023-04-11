import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import Validate from '@/roanuz/lib/validate';
import { FormItem } from '@/roanuz/view/input';
import { Button } from '@/roanuz/view/button';
import { asRem } from '@/roanuz/lib/css';
import {
  TextBold14,
  DisplayBold18,
} from '@/roanuz/typopgraphy';
import Link from 'next/link';
import { translateV2 } from '@/roanuz/lib/utils';

const LoginAccountFormViewWrapper = styled.div`
  .error-message {
    color: var(--color-error);
    &:not(:empty) {
      margin-bottom: ${asRem(10)};
    }
  }
  .forgot-password {
    display: inline-block;
    margin: ${asRem(16)} auto;
    cursor: pointer;
    text-decoration: none;
  }
  .form-next-step {
    margin-top: ${asRem(32)};
  }
`;

export const LoginAccountFormView = ({
  onSave,
  saving, saveError,
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
    password: {
      type: 'password',
      name: translateV2('fields.PASSWORD'),
      id: 'password',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(4, 50, { fieldTitle: 'Password' }),
      ]),
    },
  };

  const [formInitValue] = useState({
    email: '',
    password: '',
  });

  const buildSaveInput = (values) => {
    return {
      email: values.email,
      password: values.password,
    };
  };

  const onSubmit = (values) => {
    if (onSave) {
      onSave(buildSaveInput(values));
    }
  };

  return (
    <LoginAccountFormViewWrapper>
      <Formik
        initialValues={formInitValue}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ isValid }) => (
          <Form>
            <div>
              <FormItem field={fields.email} />
            </div>
            <div>
              <FormItem field={fields.password} />
            </div>
            <div className="error-message">
              {saveError && (
                <div>
                  {translateV2('loadingMsg.ERROR') || saveError.message}
                  {': '}
                  {translateV2('login.SIGN_IN_ERROR') || saveError.message}
                </div>
              )}
            </div>
            <div className="form-next-step">
              <Button
                disabled={(!isValid) || saving}
                mode="primary"
                type="submit"
                filled
                ariaLabel="Login"
              >
                <DisplayBold18 as="span">
                  {translateV2('button.CHECK_IN')}
                </DisplayBold18>
              </Button>
            </div>
            <Link href="/customer/account/reset-password/">
              <TextBold14 as="a" alt="Goto Reset Password" className="forgot-password">
                {translateV2('button.FORGOT_PASSWORD')}
              </TextBold14>
            </Link>
          </Form>
        )}
      </Formik>
    </LoginAccountFormViewWrapper>
  );
};

LoginAccountFormView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
};
