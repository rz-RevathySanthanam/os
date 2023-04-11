import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ProductSliderWithLoader } from '@/roanuz/controller/product/list';
import { ProductCardDisplayMode } from '@/roanuz/layout/product/product';
import { DisplayBold18 } from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseProductPageRelatedItemsViewWrapper = styled.div`
  .related-products-list {
    margin: ${asRem(40)} 0 0;

    >h4 {
      padding-bottom: ${asRem(10)};
    }

    >div {
      padding-top: ${asRem(40)};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ProductPageRelatedItemsView = ({ product }) => {
  return (
    <ProductPageRelatedItemsViewWrapper>
      <div>
        {product.upsellProducts && product.upsellProducts.length > 0 && (
          <div className="related-products-list">
            <DisplayBold18><span>Upsell Products</span></DisplayBold18>
            <ProductSliderWithLoader
              products={product.upsellProducts}
              displayMode={ProductCardDisplayMode.OneBySix}
            />
          </div>
        )}
        {/* Todo: Cross Sell Products */}
        {/* {(!product.crossSellAsOption)
          && product.crosssellProducts
          && product.crosssellProducts.length > 0 && (
          <div className="related-products-list">
            <DisplayBold18><span>Cross Sell Products</span></DisplayBold18>
            <ProductSliderWithLoader
              products={product.crosssellProducts}
              displayMode={ProductCardDisplayMode.OneBySix}
            />
          </div>
        )} */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="related-products-list">
            <DisplayBold18><span>Tengdar vörur</span></DisplayBold18>
            <ProductSliderWithLoader
              products={product.relatedProducts}
              displayMode={ProductCardDisplayMode.OneBySix}
            />
          </div>
        )}
      </div>
    </ProductPageRelatedItemsViewWrapper>
  );
};

ProductPageRelatedItemsView.propTypes = {
  product: PropTypes.object,
};

export const ProductPageRelatedItemsViewWrapper = withDependencySupport(BaseProductPageRelatedItemsViewWrapper, 'ProductPageRelatedItemsViewWrapper');
