import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Form, Formik } from 'formik';
import Validate from '@/roanuz/lib/validate';
import { Text14 } from '@/roanuz/typopgraphy';
import { ProductPreviewDisplayMode } from '@/roanuz/layout/product/preview';
import { EnquiryFormFieldsView, FormSuccessView } from '@/roanuz/view/enquiryFormFieldsView';
import { translateV2 } from '@/roanuz/lib/utils';
import { ProductPreviewView } from './preview';

export const BaseEnquiryFormViewWrapper = styled.div`
  .section-form {
    margin-top: ${asRem(10)};
  }
  .success {
    padding-top: ${asRem(15)};
    color: var(--color-active-2);
  }
`;

export const EnquiryFormView = ({
  product,
  onSave,
  saving,
  saveError,
  saveSuccess,
}) => {
  const fields = {
    fname: {
      type: 'text',
      name: translateV2('fields.NAME'),
      id: 'fname',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(3, 50, { fieldTitle: 'Name' }),
      ]),
    },
    email: {
      type: 'email',
      name: translateV2('fields.EMAIL'),
      id: 'email',
      validateFn: Validate.all([
        Validate.required,
        Validate.email,
      ]),
    },
    message: {
      type: 'textarea',
      name: translateV2('fields.COMMENTS'),
      id: 'message',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(1, 512),
      ]),
    },
  };

  const [formInitValue] = useState({
    email: '',
    fname: '',
    message: '',
  });
  const buildSaveInput = (values) => {
    return {
      email: values.email,
      fname: values.fname,
      message: `${translateV2('fields.EMAIL')}: ${values.email} \n ${values.message}`,
    };
  };

  const onSubmit = (values) => {
    if (onSave) {
      onSave(buildSaveInput(values));
    }
  };

  return (
    <EnquiryFormViewWrapper>
      <div className="section-preview">
        <ProductPreviewView
          product={product}
          hidePrice
          shouldLinkTitle={false}
          displayMode={ProductPreviewDisplayMode.TwoCol}
        />
      </div>
      {!saveSuccess && (
        <div className="section-form">
          <Formik
            initialValues={formInitValue}
            onSubmit={onSubmit}
            validateOnMount
          >
            {({ isValid }) => (
              <Form>
                <EnquiryFormFieldsView
                  fields={fields}
                  isValid={isValid}
                  saving={saving}
                  saveError={saveError}
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
      <div>
        {saveSuccess && (
          <FormSuccessView
            msg={(
              <Text14 as="p" className="success">
                <span>{translateV2('fields.MAIL_SENT')}</span>
              </Text14>
            )}
          />
        )}
      </div>
    </EnquiryFormViewWrapper>
  );
};

EnquiryFormView.propTypes = {
  product: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  saveSuccess: PropTypes.object,
};

export const EnquiryFormViewWrapper = withDependencySupport(BaseEnquiryFormViewWrapper, 'EnquiryFormViewWrapper');
