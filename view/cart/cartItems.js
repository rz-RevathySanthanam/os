import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { TextMedium16, DisplayBold20 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ReactComponent as RightArrow } from '@/roanuz/view/imgs/RightArrow.svg';
import { SVGIcon } from '@/roanuz/view/icon';
import { translateV2 } from '@/roanuz/lib/utils';
import { UpdateCartItemVariantView } from '@/roanuz/view/cart/cartItemUpdate';
import { ProductPreviewView } from '../product/preview';

export const BaseCartSummarySideViewWrapper = styled.div`
  .cart-list {
    padding-top: ${asRem(40)};
    padding-bottom: ${asRem(10)};
    >.label {
      padding-bottom: ${asRem(15)};
    }

    >.cart-items {
      >div {
        padding-top: ${asRem(20)};
        padding-bottom: ${asRem(20)};
      }
      .right {
        flex-direction: column;
        @media screen and (min-width: ${Breakpoint.lg}) {
          flex-direction: initial;
        }
      }
      .title {
        font-weight: 700;
      }
      .sku {
        font-family: var(--tg-family);
        font-size: ${asRem(16)};
        line-height: ${asRem(22)};
        font-weight: 400;
        display: none;
      }
      .container-price {
        display: flex;
        flex-direction: column-reverse;
      }
      .container-quantity {
        margin-top: ${asRem(6)};
        color: var(--color-text-secondary);
        >span {
          font-family: var(--tg-family);
          font-size: ${asRem(16)};
          line-height: ${asRem(22)};
          font-weight: 400;
        }
      }
    }
  }
`;

export const BaseCartItemsDisplayView = ({ cartItems }) => {
  return (
    <CartItemsDisplayViewWrapper>
      <div className="cart-list">
        <DisplayBold20 className="label">{translateV2('category.PRODUCTS')}</DisplayBold20>
        <div className="value cart-items">
          {cartItems.map((line) => (
            <ProductPreviewView
              key={line.uid}
              product={line.product}
              cartItemVariantUpdate={(
                <UpdateCartItemVariantView
                  product={line.product}
                />
              )}
            />
          ))}
        </div>
      </div>
    </CartItemsDisplayViewWrapper>
  );
};

BaseCartItemsDisplayView.propTypes = {
  cartItems: PropTypes.array.isRequired,
};

export const CartItemsDisplayView = withDependencySupport(BaseCartItemsDisplayView, 'CartItemsDisplayView');
export const CartItemsDisplayViewWrapper = withDependencySupport(BaseCartSummarySideViewWrapper, 'CartItemsDisplayViewWrapper');

export const BaseCartItemsDisplaySwitchWrapper = styled.div`
  .items-line {
    padding-top: ${asRem(40)};
    padding-bottom: ${asRem(10)};
    >.label {
      border-bottom: 1px solid var(--color-disabled-3);
      padding-bottom: ${asRem(15)};
    }

    >.count-label {
      border-bottom: 1px solid var(--color-disabled-3);
      padding-bottom: ${asRem(15)};
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
  }
`;

export const BaseCartItemsDisplaySwitch = ({ cartItems, menuContext }) => {
  return (
    <CartItemsDisplaySwitchWrapper>
      <div
        className="items-line"
        onClick={() => menuContext.toggleCartModal(true)}
        onKeyDown={() => menuContext.toggleCartModal(true)}
        role="presentation"
      >
        <TextMedium16 className="count-label">
          <span>
            {translateV2('orders.CART_ITEMS')}
            {' '}
            {cartItems && `(${cartItems.length})`}
          </span>
          <SVGIcon
            heightPx={10}
          >
            <RightArrow />
          </SVGIcon>
        </TextMedium16>
      </div>
    </CartItemsDisplaySwitchWrapper>
  );
};

BaseCartItemsDisplaySwitch.propTypes = {
  cartItems: PropTypes.array,
  menuContext: PropTypes.object,
};

export const CartItemsDisplaySwitch = withDependencySupport(BaseCartItemsDisplaySwitch, 'CartItemsDisplaySwitch');
export const CartItemsDisplaySwitchWrapper = withDependencySupport(BaseCartItemsDisplaySwitchWrapper, 'CartItemsDisplaySwitchWrapper');
