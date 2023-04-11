import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StepPaymentMethodView } from '@/roanuz/view/checkout/stepPaymentMethod';
import { PaymentMethodPickerController } from './payment/picker';

const StepPaymentMethodControllerWrapper = styled.div`
`;

export const StepPaymentMethodController = ({
  cart,
  onOrderStatus,
}) => {
  return (
    <StepPaymentMethodControllerWrapper>
      <StepPaymentMethodView>
        <PaymentMethodPickerController
          cart={cart}
          onOrderStatus={onOrderStatus}
        />
      </StepPaymentMethodView>
    </StepPaymentMethodControllerWrapper>
  );
};

StepPaymentMethodController.propTypes = {
  cart: PropTypes.object.isRequired,
  onOrderStatus: PropTypes.func,
};
