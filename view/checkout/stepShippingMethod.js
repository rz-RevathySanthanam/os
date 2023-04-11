import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem } from '@/roanuz/lib/css';
import { logRzShippingAttributes } from '@/roanuz/view/checkout/v3/model';
import { ShippingMethodInput } from './shippingMethodInput';

export const BaseStepShippingMethodViewWrapper = styled.div`
  .sub-heading {
    margin-bottom: ${asRem(10)};
  }
  .error, .loading {
    margin-top: ${asRem(10)};
  }
  .available-methods {
    margin-top: ${asRem(16)};
  }
`;

export const StepShippingMethodView = ({
  cart,
  formikStateFields,
  saving,
  savedShippmentMethodType,
}) => {
  const { values } = formikStateFields;

  return (
    <StepShippingMethodViewWrapper>
      {saving && (
        <div className="loading">Uppfæri afhendingarmáta</div>
      )}
      <div className="available-methods">
        {cart.availableShippingMethods.map((method) => (
          <>
            {(!method.method.shippingType
              || method.method.shippingType === savedShippmentMethodType)
              && (
              <ShippingMethodInput
                key={method.method.uid}
                field={{
                  type: 'radio',
                  id: 'shippingMethod',
                  name: method.priceText,
                  value: method.method.value,
                  onChange: (event) => {
                    logRzShippingAttributes(event.target.value, method);
                  },
                }}
                cart={cart}
                method={method}
                saving={saving}
                selected={method.method.value === values.shippingMethod}
              />
              )}
          </>
        ))}
      </div>
    </StepShippingMethodViewWrapper>
  );
};

StepShippingMethodView.propTypes = {
  cart: PropTypes.object.isRequired,
  formikStateFields: PropTypes.object,
  saving: PropTypes.bool,
  savedShippmentMethodType: PropTypes.string,
};

export const StepShippingMethodViewWrapper = withDependencySupport(BaseStepShippingMethodViewWrapper, 'StepShippingMethodViewWrapper');
