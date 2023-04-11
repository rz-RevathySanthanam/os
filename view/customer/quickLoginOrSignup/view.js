import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { DisplayBold24, Text16, Text14 } from '@/roanuz/typopgraphy';
import { Button } from '@/roanuz/view/button';
import { ReactComponent as UserIcon } from '@/roanuz/view/imgs/UserIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { Formik, Form } from 'formik';
import { FormItem } from '@/roanuz/view/input';

export const BaseQuickLoginOrSignupViewWrapper = styled.div`
  margin-bottom: ${asRem(48)};
  @media screen and (min-width: ${Breakpoint.lg}) {
    margin-left: ${asRem(76)};
  }
  .message-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${asRem(24)};
    gap: ${asRem(10)};
    >p {
      max-width: ${asRem(423)};
    }
    .rz-button {
      transition: 0.3s;
      flex-shrink: 0;
      .rz-svg-icon {
        height: ${asRem(16)};
      }
      &:hover {
        border-color: var(--color-button-hover);
        background-color: transparent;
        color: var(--color-button-hover);
      }
    }
    .as-link {
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .rz-form-item {
    margin-top: ${asRem(10)};
    .input-label {
      display: none;
    }

    .type-email {
      .input-label {
        display: none;
      }
    }
  }
`;

export const QuickLoginOrSignupProcessView = styled.div`
  .forgot-password,
  .form-next-step {
    text-align: center;
    display: block !important;
    margin-bottom: ${asRem(15)};
  }

  .error-message {
    max-width: ${asRem(375)};
  }

  .login-link {
    display: none;
  }
  .form-next-step .rz-button {
    margin: auto;
  }
`;

export const BaseQuickLoginOrSignupView = ({
  modalSwitch,
  fields,
  formInitVal,
  passEmail,
  displayEmailField,
  contentKey,
}) => {
  const { setSelectedAccessTypeHandler, accessTypes } = modalSwitch;

  const applyLinkToSubString = (sent) => {
    const regex = /%%(.*?)%%/; // Making a specifc substring as link in a sentence. Identifiying by %%Omnishop%%.
    const findStrEnclosedWith = sent.match(regex);

    const textArray = sent.split(regex);

    return textArray.map((str) => {
      if (str === (findStrEnclosedWith && findStrEnclosedWith[1])) {
        return (
          <Text16
            as="span"
            onClick={() => setSelectedAccessTypeHandler(accessTypes.QuickSignup)}
            onKeyDown={() => setSelectedAccessTypeHandler(accessTypes.QuickSignup)}
            role="presentation"
            className="as-link"
          >
            {str}
          </Text16>
        );
      }
      return str;
    });
  };

  return (
    <QuickLoginOrSignupViewWrapper className="quick-login-signup-wrapper">
      <DisplayBold24>{translateV2('orders.ALREADY_HAVE_AN_ACCOUNT')}</DisplayBold24>
      <div className="message-wrapper">
        <Text16 as="p">
          {applyLinkToSubString(translateV2(contentKey))}
        </Text16>
        <Button
          mode="primary"
          ariaLabel="Login"
          icon={<UserIcon />}
          onClick={() => setSelectedAccessTypeHandler(accessTypes.QuickLogin)}
        >
          <Text14 as="span">
            {translateV2('orders.LOG_IN')}
          </Text14>
        </Button>
      </div>
      {displayEmailField && (
        <>
          <label>{translateV2('orders.CONTINUE_AS_GUEST')}</label>
          <Formik initialValues={formInitVal} onSubmit={null}>
            {(errors, touched) => (
              <Form>
                <FormItem
                  showInitialError={
                    (formInitVal.email && touched && !touched.email) && errors.email
                  }
                  field={{
                    ...fields.email,
                    onBlur: (event) => {
                      passEmail(event.target.value);
                    },
                  }}
                />
              </Form>
            )}
          </Formik>
        </>
      )}
    </QuickLoginOrSignupViewWrapper>
  );
};

BaseQuickLoginOrSignupView.propTypes = {
  fields: PropTypes.object.isRequired,
  formInitVal: PropTypes.object.isRequired,
  modalSwitch: PropTypes.object.isRequired,
  passEmail: PropTypes.func.isRequired,
  displayEmailField: PropTypes.bool,
  contentKey: PropTypes.string.isRequired,
};

export const QuickLoginOrSignupView = withDependencySupport(BaseQuickLoginOrSignupView, 'QuickLoginOrSignupView');
export const QuickLoginOrSignupViewWrapper = withDependencySupport(BaseQuickLoginOrSignupViewWrapper, 'QuickLoginOrSignupViewWrapper');
