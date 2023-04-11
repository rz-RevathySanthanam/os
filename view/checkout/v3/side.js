import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { CartItemsDisplayView } from '@/roanuz/view/cart/cartItems';
import { ReactComponent as DownArrowLineIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { SVGIcon } from '@/roanuz/view/icon';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { DisplayBold20, Text16 } from '@/roanuz/typopgraphy';
import { CartSummaryCard } from './summaryCard';

export const BaseCartSideViewWrapper = styled.div`
  width: 100%;
  margin-top: ${asRem(20)};
  padding: ${asRem(20)} var(--space-page-side-padding);
  @media screen and (min-width: ${Breakpoint.md}) {
    padding: ${asRem(110)} ${asRem(24)} 0;
  }
`;

export const CartSideView = ({ cart, menuContext }) => {
  if (!cart) { return null; }

  return (
    <CartSideViewWrapper>
      <CartSummaryCard summary={cart} />
      <div className="products-line">
        <CartItemsDisplayView cartItems={cart.items} menuContext={menuContext} />
      </div>
    </CartSideViewWrapper>
  );
};

CartSideView.propTypes = {
  cart: PropTypes.object.isRequired,
  menuContext: PropTypes.object,
};

export const CartSideBarSliderViewWrapper = styled.div`
  position: relative;
  .slider-btn-wrapper, .slider-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .slider-btn-wrapper {
    padding: ${asRem(20)} 0;
  }

  .slider-btn {
    cursor: pointer;

    .arrow-svg {
      margin-left: ${asRem(10)};
    }
  }

  .cart-slider-view {
    position: absolute;
    z-index: 1;
    height: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #fff;
    transition: all .3s ease-in-out;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 ${asRem(10)} ${asRem(10)} -${asRem(10)} #000000;

    &.open {
      height: 80vh;
    }
  }
`;

export const BaseCartSideBarSliderView = ({ cart, menuContext }) => {
  const [openSlider, setOpenSlider] = useState(false);

  if (!cart) { return null; }

  return (
    <CartSideBarSliderViewWrapper className="hide-desktop">
      <div className="slider-btn-wrapper">
        <Text16
          className="slider-btn"
          onClick={() => setOpenSlider(!openSlider)}
          onKeyDown={() => setOpenSlider(!openSlider)}
          role="presentation"
        >
          {translateV2('orders.ORDER_SUMMARY')}
          <SVGIcon heightPx={17}>
            <DownArrowLineIcon className="arrow-svg" />
          </SVGIcon>
        </Text16>
        <DisplayBold20 className="cart-price">{cart.grandTotalPriceText}</DisplayBold20>
      </div>
      <div className={`cart-slider-view ${openSlider ? 'open' : ''}`}>
        <CartSideView cart={cart} menuContext={menuContext} />
      </div>
    </CartSideBarSliderViewWrapper>
  );
};

BaseCartSideBarSliderView.propTypes = {
  cart: PropTypes.object.isRequired,
  menuContext: PropTypes.object,
};

export const CartSideBarSliderView = withDependencySupport(BaseCartSideBarSliderView, 'CartSideBarSliderView');
export const CartSideViewWrapper = withDependencySupport(BaseCartSideViewWrapper, 'CartSideViewWrapper');
