import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { Form, Formik } from 'formik';
import Validate from '@/roanuz/lib/validate';
import { Text14, DisplayBold24 } from '@/roanuz/typopgraphy';
import { EnquiryFormFieldsView, FormSuccessView } from '@/roanuz/view/enquiryFormFieldsView';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseEnquiryFormViewWrapper = styled.div`
  .section-form {
    margin-top: ${asRem(10)};
  }
  .success {
    padding-top: ${asRem(15)};
    color: var(--color-active-2);
  }
  .title {
    margin-bottom: ${asRem(20)};
  }
`;

export const CartProductsEnquiryFormView = ({
  onSave,
  saving,
  saveError,
  saveSuccess,
  title,
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
    // lname: {
    //   type: 'text',
    //   name: translateV2('fields.COMPANY'),
    //   id: 'lname',
    //   validateFn: Validate.all([
    //     Validate.required,
    //     Validate.lengthMinMax(3, 50, { fieldTitle: 'Name' }),
    //   ]),
    // },
    email: {
      type: 'email',
      name: translateV2('fields.EMAIL'),
      id: 'email',
      validateFn: Validate.all([
        Validate.required,
        Validate.email,
      ]),
    },
    telephone: {
      type: 'text',
      name: translateV2('fields.TELEPHONE'),
      id: 'telephone',
      validateFn: Validate.all([
        Validate.required,
        Validate.telephone,
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
    // lname: '',
    message: '',
    telephone: '',
  });
  const buildSaveInput = (values) => {
    return {
      email: values.email,
      fname: values.fname,
      // lname: values.lname,
      telephone: values.telephone,
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
      {!saveSuccess && (
        <div className="section-form">
          {title && (
            <DisplayBold24 className="title">{title}</DisplayBold24>
          )}
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
                <span>
                  {translateV2('fields.ENQUIRY_SUBMITTED')}
                </span>
              </Text14>
            )}
          />
        )}
      </div>
    </EnquiryFormViewWrapper>
  );
};

CartProductsEnquiryFormView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  saveSuccess: PropTypes.object,
  title: PropTypes.string,
};

export const EnquiryFormViewWrapper = withDependencySupport(BaseEnquiryFormViewWrapper, 'EnquiryFormViewWrapper');
