import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { translateV2 } from '@/roanuz/lib/utils';
import { asRem, Breakpoint, changeContentAnimation } from '@/roanuz/lib/css';
import { DisplayBold24 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { LabelKind, ProductLabelView, ProductPriceHeadView } from '../label';

export const BaseProductPagePriceViewLayout = styled.div`
  ${(p) => p.requirePriceUpdate && css`
    animation: ${changeContentAnimation} 1s ease-in;
  `}
  &.section-price {
    >.product-label {
      margin-bottom: ${asRem(6)};
      .rz-product-label {
        padding: ${asRem(2)} ${asRem(6)};
        display: inline-block;
        font-size: ${asRem(12)};
        line-height: ${asRem(16)};
        @media screen and (min-width: ${Breakpoint.md}) {
          padding: ${asRem(4)} ${asRem(10)};
        }
        span {
          font-weight: bold;
        }
      }
    }

    >.product-sale {
      margin-bottom: ${asRem(2)};
      display: flex;
      gap: ${asRem(10)};
      .discount {
        font-weight: bold;
        font-size: ${asRem(12)};
        line-height: ${asRem(16)};
        padding: ${asRem(4)} ${asRem(10)};
        color: var(--color-text-rev);
        background: var(--color-focus);
      }

      > .regular-price, > .variable-price-label {
        font-size: ${asRem(14)};
        line-height: ${asRem(20)};
        padding: ${asRem(2)} 0;
      }
    }
  }
`;

export const ProductPagePriceView = ({ product }) => {
  const hasPriceHead = product.onSale
    || product.onDiscount
    || product.hasVariablePrice;

  const { labelKind } = product;
  let { label } = product;

  if (labelKind === LabelKind.Refurbished) {
    label = null;
  }

  if (product.hasPrice) {
    return (
      <ProductPagePriceViewLayout className="section-price" requirePriceUpdate={product.hasB2BPrice}>
        {label && (
          <div className="product-label">
            <ProductLabelView
              text={label}
              kind={labelKind}
              product={product}
            />
          </div>
        )}
        {hasPriceHead && (
          <ProductPriceHeadView className="product-sale" product={product} />
        )}
        <DisplayBold24>
          {product.priceText}
        </DisplayBold24>
      </ProductPagePriceViewLayout>
    );
  }
  return (
    <ProductPagePriceViewLayout className="section-no-price">
      <DisplayBold24>
        {translateV2('labelAndTitle.GET_AN_OFFER')}
      </DisplayBold24>
    </ProductPagePriceViewLayout>
  );
};

ProductPagePriceView.propTypes = {
  product: PropTypes.object,
};

export const ProductPagePriceViewLayout = withDependencySupport(BaseProductPagePriceViewLayout, 'ProductPagePriceViewLayout');
