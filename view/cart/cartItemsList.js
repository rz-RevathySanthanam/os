import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RemoveFromCartMini, QuantitySelector } from '@/roanuz/controller/product/addToCart';
import { UpdateCartItemVariantController } from '@/roanuz/controller/cart/cartItemUpdate';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ProductPreviewView } from '@/roanuz/view/product/preview';
import { translateV2 } from '@/roanuz/lib/utils';
import { AddToWishList } from '../../controller/product/addToWishList';

export const BaseCartItemsSideViewWrapper = styled.div`
  @media screen and (min-width: ${Breakpoint.lg}) {
    --size-product-card-preview-image-width: ${asRem(110)};
  }
  .guest-login {
    .rz-row {
      flex-direction: column;
      gap: ${asRem(24)};
      @media screen and (min-width: ${Breakpoint.sm}) {
        flex-direction: row;
      }
      .rz-button {
        align-self: flex-start;
      }
    }
    form > div {
      margin-left: 0;
    }
  }
  .cart-list {
    margin-top: ${asRem(24)};
    .rz-product-preview {
      display: flex;
      gap: ${asRem(24)};
      flex-wrap: wrap;
      padding: ${asRem(40)} 0 ${asRem(20)};
      border-bottom: ${asRem(1)} solid var(--color-border);
      position: relative;

      .container {
        flex-basis: 100%;
        .right {
          gap: ${asRem(20)};
          flex-wrap: wrap;
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
      }
      .container-action {
        margin: 0;
        @media screen and (min-width: ${Breakpoint.sm}) {
        margin-left: auto;
          &.primary-cta {
            flex: 1;
          }
        }
        .rz-button {
          margin: 0 ${asRem(5)};
          padding: 0;

          @media screen and (min-width: ${Breakpoint.sm}) {
            margin: 0 ${asRem(20)};
          }
          span {
            display: none;
            @media screen and (min-width: ${Breakpoint.sm}) {
              display: inherit;
            }
          }
        }
      }
      .container-quantity {
        margin-left: auto;
        order: 20;
      }
    }
  }
  >.quick-login-signup-wrapper {
    margin-left: 0;
  }
`;

export const CartItemsListView = ({
  cart, quickLoginOrSignup,
}) => {
  return (
    <CartItemsSideViewWrapper>
      {quickLoginOrSignup}
      <div className="cart-list">
        {cart.items.map((line) => (
          <ProductPreviewView
            key={line.uid}
            product={line.product}
            secondaryActionView={<RemoveFromCartMini product={line} />}
            quantityUpdate={<QuantitySelector product={line} />}
            hideQuantity
            actionView={
              <AddToWishList product={line.product} buttonText={translateV2('wishlist.ADD_TO_WISHLIST')} />
            }
            cartItemVariantUpdate={<UpdateCartItemVariantController product={line} />}
          />
        ))}
      </div>
    </CartItemsSideViewWrapper>
  );
};

CartItemsListView.propTypes = {
  cart: PropTypes.object,
  quickLoginOrSignup: PropTypes.element,
};

export const CartItemsSideViewWrapper = withDependencySupport(BaseCartItemsSideViewWrapper, 'CartItemsSideViewWrapper');
