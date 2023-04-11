import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseProductPageSidebarLayoutWrapper = styled.div`
  section {
    >strong {
      display: block;
      padding-bottom: ${asRem(12)};
    }
    .rz-magento-html {
      iframe {
        padding: ${asRem(20)} 0;
        max-width: 100%;
      }
    }
  }
`;

export const BaseProductPageSidebarLayout = ({
  price,
  loan,
  actions,
  shortDesc,
  energyLabel,
  storesStatus,
  returnDays,
  delivery,
  options,
  hasCrossSellProducts,
  stocksAndDeliveryViews,
}) => {
  console.debug(`Left for future use
    ${delivery} / ${shortDesc} / ${energyLabel} / ${storesStatus} / ${returnDays} / ${options} / ${hasCrossSellProducts}
  `);
  return (
    <ProductPageSidebarLayoutWrapper className="page-spacing-bottom">
      {shortDesc}
      {price}
      {loan}
      {actions}
      {stocksAndDeliveryViews}
      {/* {storesStatus}
      {delivery} */}
    </ProductPageSidebarLayoutWrapper>
  );
};

BaseProductPageSidebarLayout.propTypes = {
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
  hasCrossSellProducts: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  stocksAndDeliveryViews: PropTypes.element,
};

export const ProductPageSidebarLayoutWrapper = withDependencySupport(BaseProductPageSidebarLayoutWrapper, 'ProductPageSidebarLayoutWrapper');
export const ProductPageSidebarLayout = withDependencySupport(BaseProductPageSidebarLayout, 'ProductPageSidebarLayout');
