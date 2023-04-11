import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  TextMedium16, DisplayBold24, DisplayBold20,
} from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
// import { CouponViewController } from '@/roanuz/controller/cart/coupon';
import { translateV2 } from '@/roanuz/lib/utils';
import { formatMoney, formatCurrency } from '@/roanuz/lib/cart';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseCartSummaryCardWrapper = styled.div`
  margin-bottom: ${asRem(40)};
  .title {
    margin-bottom: ${asRem(24)};
  }

  .flex-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${asRem(30)};
    padding: ${asRem(8)} 0;
  }
  .border-line, .subtotal-group {
    border-bottom: 1px solid #E5E7EB;
  }

  .subtotal-group {
    .flex-line {
      padding-top: 0;
    }
  }

  .savings-line .value {
    color: #22C55E;
  }
`;

export const CartSummaryCard = ({ summary }) => {
  return (
    <CartSummaryCardWrapper>
      <DisplayBold20 className="title">
        {translateV2('orders.ORDER_SUMMARY')}
      </DisplayBold20>
      {/* <CouponViewController cart={summary} /> */}
      <div className="subtotal-group">
        <div className="flex-line">
          <TextMedium16 className="label">
            {translateV2('orders.SUB_TOTAL')}
            {' '}
            (
            {summary.items.length}
            {' '}
            {translateV2('orders.ITEMS')}
            )
          </TextMedium16>
          {summary.prices.subtotal_including_tax && (
            <TextMedium16 className="value">
              {formatCurrency(summary.prices.subtotal_including_tax.value,
                summary.prices.subtotal_including_tax.currency)}
            </TextMedium16>
          )}
        </div>
        {summary.discounts?.map((item) => (
          <div className="flex-line savings-line" key={item.uid}>
            <TextMedium16 className="label">
              {translateV2('orders.SAVINGS')}
            </TextMedium16>
            <TextMedium16 className="value">
              -
              {item.priceText}
            </TextMedium16>
          </div>
        ))}
      </div>
      {summary.appliedTaxes?.map((item) => (
        <div className="flex-line border-line" key={item.label}>
          <TextMedium16 className="label">
            {translateV2('orders.TAXES')}
            (
            {item.label}
            )
          </TextMedium16>
          <TextMedium16 className="value">{formatMoney(item.amount)}</TextMedium16>
        </div>
      ))}
      <div className="flex-line border-line">
        <TextMedium16 className="label">{translateV2('orders.SHIPPING')}</TextMedium16>
        <TextMedium16 className="value">
          {summary.shippingChargeText === null
            ? translateV2('orders.CALCULATED_IN_NEXT_STEP')
            : summary.shippingChargeText}
        </TextMedium16>
      </div>
      <div className="flex-line total-line">
        <DisplayBold24 className="label">{translateV2('orders.TOTAL')}</DisplayBold24>
        <DisplayBold24 className="value">{summary.grandTotalPriceText}</DisplayBold24>
      </div>
    </CartSummaryCardWrapper>
  );
};

CartSummaryCard.propTypes = {
  summary: PropTypes.object.isRequired,
};

export const CartSummaryCardWrapper = withDependencySupport(BaseCartSummaryCardWrapper, 'CartSummaryCardWrapper');
