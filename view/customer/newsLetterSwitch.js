import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DisplayBold18, DisplayBold20 } from '@/roanuz/typopgraphy';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { Button } from '../button';
import { FormItem } from '../input';

export const BaseNewsLetterSwitchViewWrapper = styled.div`
  .edit-account-title {
    margin-bottom: ${asRem(10)};
    display: none;
  }
  .form-next-step {
    margin-top: ${asRem(40)};
    .button {
      width: 100%;
      display: flex;
      justify-content: center;
      @media screen and (min-width: ${Breakpoint.sm}) {
        display: block;
        width: auto;

        span {
          margin: 0;
        }
      }
    }
  }
`;

export const NewsLetterSwitchView = ({
  onSave,
  saveError,
  data,
  saving,
}) => {
  const initialData = data && data.customer && data.customer.is_subscribed;

  const fields = {
    subscribed: {
      type: 'checkbox',
      name: translateV2('fields.GENERAL_REGISTRATION'),
      id: 'subscribed',
    },
  };

  const buildSaveInput = (values) => {
    return {
      is_subscribed: values.subscribed,
    };
  };

  const onSubmit = (values) => {
    if (onSave) {
      onSave(buildSaveInput(values));
    }
  };

  const [formInitValue] = useState({
    subscribed: initialData,
  });

  const [disableAtFirst, setDisableAtFirst] = useState(true);

  return (
    <NewsLetterSwitchViewWrapper>
      <DisplayBold20
        className="main-title edit-account-title"
        as="h1"
      >
        {translateV2('myPages.MAIL_SUBSCRIPTION')}
      </DisplayBold20>
      <Formik
        initialValues={formInitValue}
        onSubmit={onSubmit}
      >
        <Form>
          <FormItem field={{
            ...fields.subscribed,
            onChange: (value) => {
              setDisableAtFirst(initialData ? value.target.checked : !value.target.checked);
            },
          }}
          />
          <div>
            {saveError && (
              <div>
                {translateV2('loadingMsg.ERROR')}
                :
                {saveError.message}
              </div>
            )}
          </div>
          <div className="form-next-step">
            <Button
              mode="primary"
              type="submit"
              large
              filled
              className="button"
              disabled={saving || disableAtFirst}
              ariaLabel={initialData ? translateV2('myPages.UNREGISTER') : translateV2('myPages.REGISTER')}
            >
              <DisplayBold18 as="span">
                {initialData ? translateV2('myPages.UNREGISTER') : translateV2('myPages.REGISTER')}
              </DisplayBold18>
            </Button>
          </div>
        </Form>
      </Formik>
    </NewsLetterSwitchViewWrapper>
  );
};

NewsLetterSwitchView.propTypes = {
  onSave: PropTypes.func,
  saveError: PropTypes.object,
  data: PropTypes.object,
  saving: PropTypes.bool,
};

export const NewsLetterSwitchViewWrapper = withDependencySupport(BaseNewsLetterSwitchViewWrapper, 'NewsLetterSwitchViewWrapper');
