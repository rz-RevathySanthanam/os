import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { Row, Col } from '@/roanuz/layout';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { FormItem } from '@/roanuz/view/input';
import { Button } from '@/roanuz/view/button';
import { DisplayBold18 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { StepAddressForm } from '@/roanuz/view/checkout/stepShippingAddressForm';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseNewAddressViewWrapper = styled.div`
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
  >.content-inner {
    display: block;
    padding: 0;
    .row {
      display: block;
      @media screen and (min-width: ${Breakpoint.sm}) {
        display: flex;
      }    
    }
  }
  .rz-row {
    .rz-form-item {
      flex: 1;
    }
  }
  .form-next-step {
    margin: ${asRem(18)} 0;
    .button {
      display: block;
      width: 100%;
      @media screen and (min-width: ${Breakpoint.sm}) {
        width: auto;
      }
    }
  }
`;

export const NewAddressView = ({
  onSave,
  saving,
  saveError,
  fields,
  formInitVal,
}) => {
  return (
    <NewAddressViewWrapper className="address-view">
      <Row className="content-inner">
        <Col className="page-section-main">
          <Formik
            initialValues={formInitVal}
            onSubmit={onSave}
            validateOnMount
          >
            {({
              isValid, values, errors, touched,
            }) => (
              <Form>
                <StepAddressForm
                  fields={fields}
                  isGuestUser={false}
                  onPincodeChange={() => ({})}
                  formikStateFields={{
                    errors,
                    touched,
                  }}
                  formInitVal={formInitVal}
                />
                {fields.default_billing && (
                  <div className="section-field-billing">
                    <FormItem field={fields.default_billing} />
                  </div>
                )}
                {fields.default_shipping && (
                  <div className="section-field-shipping">
                    <FormItem field={fields.default_shipping} />
                  </div>
                )}
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
                    disabled={(!isValid) || saving || !values.postcode}
                    mode="primary"
                    type="submit"
                    large
                    filled
                    className="button"
                    ariaLabel="Save address"
                  >
                    <DisplayBold18 as="span">
                      {translateV2('button.UPDATE')}
                    </DisplayBold18>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </NewAddressViewWrapper>
  );
};

NewAddressView.propTypes = {
  onSave: PropTypes.func,
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  fields: PropTypes.object,
  formInitVal: PropTypes.object,
};

export const NewAddressViewWrapper = withDependencySupport(BaseNewAddressViewWrapper, 'NewAddressViewWrapper');
