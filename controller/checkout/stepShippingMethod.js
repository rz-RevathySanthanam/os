import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StepShippingMethodControllerWrapper = styled.div`
`;

export const StepShippingMethodController = ({
  cart,
}) => {
  return (
    <StepShippingMethodControllerWrapper>
      <p>Step-StepShippingMethod</p>
    </StepShippingMethodControllerWrapper>
  );
};

StepShippingMethodController.propTypes = {
  cart: PropTypes.object.isRequired,
};
