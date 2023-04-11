import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseProductPageDescLayoutWrapper = styled.div`
  section {
    >strong {
      display: block;
      padding-bottom: ${asRem(12)};
    }
  }
  .returnDays {
    margin-top: ${asRem(20)};
  }
`;

export const BaseProductPageDescLayout = ({
  shortDesc,
  energyLabel,
  storesStatus,
  returnDays,
  delivery,
  price,
  loan,
  options,
  actions,
}) => {
  console.debug(`Left for future use ${shortDesc} / ${energyLabel} / ${delivery} / ${price} / ${loan} / ${options} / ${actions}`);
  return (
    <ProductPageDescLayoutWrapper>
      {storesStatus}
      {returnDays}
    </ProductPageDescLayoutWrapper>
  );
};

BaseProductPageDescLayout.propTypes = {
  shortDesc: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  energyLabel: PropTypes.element,
  storesStatus: PropTypes.element,
  returnDays: PropTypes.element,
  delivery: PropTypes.element,
  price: PropTypes.element,
  loan: PropTypes.element,
  options: PropTypes.element,
  actions: PropTypes.element,
};

export const ProductPageDescLayoutWrapper = withDependencySupport(BaseProductPageDescLayoutWrapper, 'ProductPageDescLayoutWrapper');
export const ProductPageDescLayout = withDependencySupport(BaseProductPageDescLayout, 'ProductPageDescLayout');
