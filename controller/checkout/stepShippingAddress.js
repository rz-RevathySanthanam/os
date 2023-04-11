import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StepShippingAddressControllerWrapper = styled.div`
`;

export const StepShippingAddressController = ({
  cart,
}) => {
  return (
    <StepShippingAddressControllerWrapper>
      <p>Step-StepShippingAddress</p>
    </StepShippingAddressControllerWrapper>
  );
};

StepShippingAddressController.propTypes = {
  cart: PropTypes.object.isRequired,
};
