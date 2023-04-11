import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as RefurbishedIcon } from '@/roanuz/view/imgs/RefurbishedIcon.svg';
import {
  LabelMedium12, TextMedium14, DisplayBold24,
} from '@/roanuz/typopgraphy';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import {
  ProductCardLayout,
  ProductCardDisplayMode,
} from '@/roanuz/layout/product/product';
import { SVGIcon } from '../icon';

export const LabelKind = {
  Label: 'Label',
  New: 'New',
  Discount: 'Discount',
  Sale: 'Sale',
  Refurbished: 'Refurbished',
  B2BPrice: 'B2BPrice',
};

export const BaseProductLabelViewWrapper = styled.div`
  padding: ${asRem(2)} ${asRem(6)};
  font-size: ${asRem(12)};
  line-height: ${asRem(16)};
  @media screen and (min-width: ${Breakpoint.md}) {
    padding: ${asRem(4)} ${asRem(10)};
  }
  border-radius: ${asRem(2)};
  background-color: var(--color-indicator-sale-product);
  color: var(--color-text-rev);

  &.label-green {
    background-color: var(--color-indicator-new-product);
  }

  &.label-purple {
    background-color: var(--color-refurbished);
  }

  &.label-orange {
    background-color: var(--color-b2b);
    color: var(--color-text);
  }

  &.rz-product-label {
    >.rz-svg-icon, >span {
      vertical-align: middle;
    }
    >.rz-svg-icon {
      padding-right: ${asRem(5)};
    }
  }
`;

export const BaseProductLabelView = ({
  kind, text, label, isCardView,
}) => {
  let labelRef = label || text;
  if (kind === LabelKind.Refurbished) {
    labelRef = null;
  }
  if (!labelRef) {
    return null;
  }
  let labelColor = null;

  switch (kind) {
    case LabelKind.New:
      labelColor = 'green';
      break;
    case LabelKind.Refurbished:
      labelColor = 'purple';
      break;
    case LabelKind.B2BPrice:
      labelColor = 'orange';
      break;
    default:
      labelColor = 'yellow';
      break;
  }

  const classes = [
    'rz-product-label',
    `label-${labelColor}`,
  ].join(' ');

  if (kind === LabelKind.Refurbished && isCardView) {
    return (
      <ProductLabelViewWrapper className={classes}>
        <SVGIcon heightPx={14}>
          <RefurbishedIcon />
        </SVGIcon>
        <LabelMedium12>{text}</LabelMedium12>
      </ProductLabelViewWrapper>
    );
  }

  return (
    <ProductLabelViewWrapper className={classes}>
      <LabelMedium12>{text}</LabelMedium12>
    </ProductLabelViewWrapper>
  );
};

BaseProductLabelView.propTypes = {
  kind: PropTypes.oneOf(Object.keys(LabelKind)),
  text: PropTypes.string,
  label: PropTypes.string,
  isCardView: PropTypes.bool,
};

export const BaseProductPriceHeadViewWrapper = styled.div`
  > .discount {
    color: var(--color-focus);
  }

  > .regular-price, > .variable-price-label {
    color: var(--color-disabled);
  }
`;

export const BaseProductPriceHeadView = ({ className, product, onlyDiscountView = false }) => {
  const hasSale = product.onSale || product.onDiscount;
  if (onlyDiscountView) {
    return (
      <ProductPriceHeadViewWrapper className={`price-head-wrapper ${className}`}>
        {hasSale && (
          <>
            {product.discountText && (
              <TextMedium14 as="span" className="discount">
                {`- ${product.discountText}`}
              </TextMedium14>
            )}
          </>
        )}
      </ProductPriceHeadViewWrapper>
    );
  }
  return (
    <ProductPriceHeadViewWrapper className={`price-head-wrapper ${className}`}>
      {hasSale && (
        <>
          {product.discountText && (
            <TextMedium14 as="span" className="discount">
              {`- ${product.discountText}`}
            </TextMedium14>
          )}
          <TextMedium14 as="span" className="regular-price">
            {product.hasVariablePrice && (<span className="primary-variable-price-label">Frá&nbsp;</span>)}
            <strike>{product.regPriceText}</strike>
          </TextMedium14>
        </>
      )}
      {((!hasSale) && product.hasVariablePrice) && (
        <TextMedium14 as="div" className="variable-price-label primary-variable-price-label">
          Frá
        </TextMedium14>
      )}
    </ProductPriceHeadViewWrapper>
  );
};

BaseProductPriceHeadView.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object,
  onlyDiscountView: PropTypes.bool,
};

export const BaseProductPriceTextViewWrapper = styled.div`
  .secondary-variable-price-label {
    display: none; //Default none, Make it cisible in client level if needed.
  }
`;

export const BaseProductPriceTextView = ({ product, displayMode }) => {
  return (
    <ProductPriceTextViewWrapper>
      {(displayMode === ProductCardDisplayMode.OneByThree)
        ? (
          <DisplayBold24 as="strong" className={`price ${!product.hasPrice ? 'no-price' : ''}`}>
            {product.hasVariablePrice && (
              <TextMedium14 as="span" className="secondary-variable-price-label">Frá&nbsp;</TextMedium14>
            )}
            {product.hasPrice && product.priceText}
          </DisplayBold24>
        )
        : (
          <DisplayBold24 as="strong" className={`price ${!product.hasPrice ? 'no-price' : ''}`}>
            {product.hasVariablePrice && (
              <TextMedium14 as="span" className="secondary-variable-price-label">Frá&nbsp;</TextMedium14>
            )}
            {product.hasPrice && product.priceText}
          </DisplayBold24>
        )}
    </ProductPriceTextViewWrapper>
  );
};

BaseProductPriceTextView.propTypes = {
  product: PropTypes.object,
  displayMode: ProductCardLayout.propTypes.displayMode,
};

export const ProductPriceHeadViewWrapper = withDependencySupport(BaseProductPriceHeadViewWrapper, 'ProductPriceHeadViewWrapper');
export const ProductLabelViewWrapper = withDependencySupport(BaseProductLabelViewWrapper, 'ProductLabelViewWrapper');
export const ProductLabelView = withDependencySupport(BaseProductLabelView, 'ProductLabelView');
export const ProductPriceHeadView = withDependencySupport(BaseProductPriceHeadView, 'ProductPriceHeadView');
export const ProductPriceTextView = withDependencySupport(BaseProductPriceTextView, 'ProductPriceTextView');
export const ProductPriceTextViewWrapper = withDependencySupport(BaseProductPriceTextViewWrapper, 'ProductPriceTextViewWrapper');
