import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  TextMedium16, Text14,
} from '@/roanuz/typopgraphy';
import Validate from '@/roanuz/lib/validate';
import { FormItem } from '@/roanuz/view/input';
import { asRem } from '@/roanuz/lib/css';
import { Formik, Form } from 'formik';
import { translateV2 } from '@/roanuz/lib/utils';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Button } from '../button';

export const BaseStockAlertViewWrapper = styled.div`
>.desc-section {
  p {
    padding-bottom: ${asRem(8)};
  }
}
>.form-section {
  padding-top: ${asRem(12)};
  padding-bottom: ${asRem(20)};

  .is-text-box {
    display: flex;
    align-items: end;

    button {
      margin-left: ${asRem(12)};
      padding: ${asRem(14)} ${asRem(18)};
    }
  }
}
`;

export const StockAlertView = ({
  saving,
  saveError,
  onSubmit,
}) => {
  const [initValue] = useState({ email: '' });
  return (
    <StockAlertViewWrapper>
      <div className="desc-section">
        <TextMedium16>
          {translateV2('cart.EMAIL_STOCK_STATUS')}
        </TextMedium16>
        <Text14>
          {translateV2('cart.EMAIL_STOCK_STATUS_BRIEF')}
          {saveError}
        </Text14>
      </div>
      <div className="form-section">
        <Formik
          initialValues={initValue}
          onSubmit={(values) => onSubmit(values.email)}
        >
          {({ isValid }) => (
            <Form>
              <FormItem
                field={{
                  name: translateV2('fields.EMAIL'),
                  id: 'email',
                  validateFn: Validate.all([
                    Validate.required,
                    Validate.email,
                  ], { message: `Enter ${translateV2('fields.EMAIL')}` }),
                  action: (
                    <Button
                      mode="primary"
                      type="submit"
                      disabled={saving || (!isValid)}
                      ariaLabel={translateV2('button.SEND')}
                    >
                      {translateV2('button.SEND')}
                    </Button>
                  ),
                }}
              />
              {saveError && (
                <div>
                  {translateV2('button.ERROR')}
                  :
                  {saveError.message}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </StockAlertViewWrapper>
  );
};

StockAlertView.propTypes = {
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export const StockAlertViewWrapper = withDependencySupport(BaseStockAlertViewWrapper, 'StockAlertViewWrapper');
