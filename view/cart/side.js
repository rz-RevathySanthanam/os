import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { translateV2 } from '@/roanuz/lib/utils';
import {
  TextMedium16, DisplayBold24, Bold16,
} from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { CouponViewController } from '@/roanuz/controller/cart/coupon';
import Config from '@/config';
import { ReactComponent as DownArrow } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { Row } from '@/roanuz/layout';
import { Button, ButtonList } from '../button';
import { SVGIcon } from '../icon';
import { CartSummaryCard } from '../checkout/v3/summaryCard';

export const BaseCartSummarySideViewWrapper = styled.div`
  h4 {
    margin-bottom: ${asRem(20)};
  }

  .cart-summary {
    > div {
      margin-bottom: 0;
    }
  }

  .name-value-line {
    display: flex;
    justify-content: space-between;
    >div {
      display: block;
    }

    >.value {
      text-align: right;
      >button {
        font-size: ${asRem(16)};
        font-weight: 500;
      }
    }
  }

  .shipping-line {
    padding-bottom: ${asRem(20)};
    &.shipping-line-discount{
      padding-top: ${asRem(0)};
    }
  }

  .coupons-line {
    padding: ${asRem(16)};
    border: ${asRem(1)} solid var(--color-disabled-3);
    .coupons-line-title {
      cursor: pointer;
      .rz-svg-icon {
        transition: 0.5s linear;
      }
    }
    .coupons-field {
      max-height: 0;
      height: auto;
      transition: 0.5s linear;
      overflow: hidden;
    }
    &.active {
      .coupons-line-title .rz-svg-icon {
        transform: rotate(180deg);
      }
      .coupons-field {
        max-height: ${asRem(300)};
      }
    }
  }

  .checkout-btn {
    margin-top: ${asRem(20)};
    position: fixed;
    bottom: -${asRem(1)};
    left: 0;
    width: 100%;
    background-color: var(--color-text-rev);
    padding: ${asRem(20)};
    box-shadow: 0 -${asRem(1)} ${asRem(2)} rgba(0, 0, 0, 0.06), 0 -${asRem(1)} ${asRem(3)} rgba(0, 0, 0, 0.1);
    z-index: 10;
    @media screen and (min-width: ${Breakpoint.sm}) {
      position: relative;
      box-shadow: none;
      padding: 0;
      background-color: transparent;

      .rz-row {
        display: none;
      }
    }
  }

  .rz-address-card {
    .container-actions {
      padding-top: ${asRem(10)};
    }
  }
`;

export const CartSideView = ({
  cart,
}) => {
  const [discountModalOpen, SetDiscountModalOpen] = useState(false);
  return (
    <CartSummarySideViewWrapper className="cart-side-view">
      <div className="cart-summary">
        <CartSummaryCard summary={cart} />
      </div>
      {Config.EnableCoupon && (
        <div className={`coupons-line ${discountModalOpen ? 'active' : ''}`}>
          <Row alignCenter className="coupons-line-title name-value-line" onClick={() => SetDiscountModalOpen(!discountModalOpen)}>
            <TextMedium16 className="label">{translateV2('cart.USE_DISCOUNT_CODE')}</TextMedium16>
            <SVGIcon heightPx={19}>
              <DownArrow />
            </SVGIcon>
          </Row>
          <div className="coupons-field">
            <CouponViewController cart={cart} />
          </div>
        </div>
      )}
      <div className="checkout-btn">
        <Row spaceBetween alignCenter className="hide-desktop">
          <Bold16 as="h4">{translateV2('cart.TOTAL')}</Bold16>
          <DisplayBold24 as="h4">{cart.grandTotalPriceText}</DisplayBold24>
        </Row>
        <ButtonList asList block>
          <Link href={`/checkout/${Config.CheckoutPageLink}`}>
            <Button
              mode="primary"
              filled
              as="a"
              alt={translateV2('button.COMPLETE_THE_PURCHASE')}
              href={{}}
              ariaLabel={translateV2('button.COMPLETE_THE_PURCHASE')}
            >
              {translateV2('button.COMPLETE_THE_PURCHASE')}
            </Button>
          </Link>
        </ButtonList>
      </div>
    </CartSummarySideViewWrapper>
  );
};

CartSideView.propTypes = {
  cart: PropTypes.object,
};

export const CartSummarySideViewWrapper = withDependencySupport(BaseCartSummarySideViewWrapper, 'CartSummarySideViewWrapper');
