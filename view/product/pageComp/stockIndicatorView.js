import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Config from '@/config';
import { StatusIndicator } from '@/roanuz/components/statusIndicator';

export const StockIndicatorViewWrapper = styled.div`
  text-transform: uppercase;
`;

export const Label = {
  IN_STOCK: 'Á lager',
  OUT_OF_STOCK: 'Uppselt',
  FEW_LEFT: 'Fá eintök eftir',
};

export const formatLabel = (product) => {
  let label = Label.IN_STOCK;
  let color = '--color-stock-indicator-available';
  const { available, qtyLeft } = product;
  if (!available) {
    label = Label.OUT_OF_STOCK;
    color = '--color-stock-indicator-not-available';
  }
  if (available && qtyLeft < Config.ThressholdQuantityOfStock) {
    label = Label.FEW_LEFT;
    color = '--color-stock-indicator-fewleft';
  }
  return { label, color };
};

export const StockIndicatorView = ({ product }) => {
  return (
    <StockIndicatorViewWrapper>
      <StatusIndicator color={formatLabel(product).color} />
      {formatLabel(product).label}
    </StockIndicatorViewWrapper>
  );
};

StockIndicatorView.propTypes = {
  product: PropTypes.object,
};
