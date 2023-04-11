import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ProductPreviewView } from '@/roanuz/view/product/preview';
import { VariantSelectionController } from '@/roanuz/controller/product/variantSelection';
import Link from 'next/link';
import { translateV2 } from '@/roanuz/lib/utils';
import { Button } from '@/roanuz/view/button';
import { asRem } from '@/roanuz/lib/css';
import { StockStatus } from '@/roanuz/view/product/models/stock';

export const ProductQuickViewWrapper = styled.div`
  .action-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${asRem(15)};
    .as-link {
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .rz-product-preview {
    .container {
      .right {
        flex-direction: column;
      }
    }
  }
`;

export const ProductQuickView = ({
  product,
  onUpdateCart,
  configProdVariationsInfo,
}) => {
  return (
    <ProductQuickViewWrapper>
      <ProductPreviewView
        product={product}
        shouldLinkTitle={false}
      />
      &nbsp;
      <VariantSelectionController
        product={product}
        configProdVariationsInfo={configProdVariationsInfo}
        disableOutOfStockOptions
        disableSelectionOnHover
      />
      <div className="action-wrap">
        <Link href={product.productLink}>
          <a alt={`Link to ${product.name}`} className="as-link">
            {translateV2('cart.VIEW_FULL_DETAILS')}
          </a>
        </Link>
        <Button
          mode="primary"
          onClick={onUpdateCart}
          ariaLabel={translateV2('cart.UPDATE_CART')}
          className="update-cart"
          disabled={
            !product.available
            || (product.stockStatus && (product.stockStatus.status === StockStatus.AVAILABLE_SOON))
          }
        >
          {translateV2('cart.UPDATE_CART')}
        </Button>
      </div>
    </ProductQuickViewWrapper>
  );
};

ProductQuickView.propTypes = {
  product: PropTypes.object,
  onUpdateCart: PropTypes.func,
  configProdVariationsInfo: PropTypes.object,
};
