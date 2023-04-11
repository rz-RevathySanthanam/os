import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  DisplayBold24,
  Text14,
  TextMedium14,
  Bold14,
  Bold16,
  DisplaySemiBold30,
  Text16,
} from '@/roanuz/typopgraphy';
import { Row, Col } from '@/roanuz/layout';
import { formatMoney } from '@/roanuz/lib/cart';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { AddressDisplayCard } from '@/roanuz/view/customer/addressDisplayCard';
import { RawHtmlView } from '@/roanuz/view/rawHtml';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { ReactComponent as ShoppingBagIcon } from '@/roanuz/view/imgs/ShoppingBagIcon.svg';
import { StatusIndicator } from '@/roanuz/components/statusIndicator';
import { indicatorColor } from '@/roanuz/view/customer/myOrders';
import { ReactComponent as DeliveryIcon } from '@/roanuz/view/imgs/TruckIcon.svg';
import { printOrderInvoice } from '@/roanuz/controller/order/actions';
import { Button } from '@/roanuz/view/button';
import { displayRzShippingAttributes } from './shippingAttributesView';
import { SVGIcon } from '../icon';

export const BaseOrderViewWrapper = styled.div`
  margin-top: ${asRem(30)};
  max-width: var(--space-page-inner-max-width);

  .page-title {
    gap: ${asRem(16)};
    color: var(--color-order-success-dark);
    padding-bottom: ${asRem(24)};
    margin-bottom: ${asRem(24)};
    border-bottom: ${asRem(1)} solid var(--color-border-2);
  }

  .order-section-overview {
    gap: ${asRem(50)};
    margin-bottom: ${asRem(48)};
    flex-direction: column;
    @media screen and (min-width: ${Breakpoint.sm}) {
      flex-direction: row;
    }
    .col-left {
      flex: 1;
      section {
        margin-top: ${asRem(16)};
      }
      .address-section {
        .rz-address-card {
          margin-top: ${asRem(32)};
          .container-heading {
            margin-bottom: ${asRem(8)};
            padding: 0;
          }
          .address-container {
            p, b {
              padding: 0;
              font-weight: 400;
            }
          }
        }
      }
    }
    .col-right {
      border: ${asRem(1)} solid var(--color-border);
      border-radius: ${asRem(8)};
      width: 100%;
      max-width: ${asRem(400)};
      padding: ${asRem(16)};
      align-self: flex-start;

      > section {
        &:not(:last-child) {
          margin-bottom: ${asRem(16)};
        }
        &.comments {
          border-top: ${asRem(1)} solid var(--color-border);
          padding-top: ${asRem(16)};
        }
        >div, >p {
          margin-top: ${asRem(4)};
        }
        .order-arrival {
          p >strong {
            >span {
              display: block;
            }
          }
          span {
            font-size: ${asRem(14)};
            font-weight: 700;
          }
        }
      }
    }
  }

  .order-section-items {
    .product-list {
      margin-top: ${asRem(16)};
      border-top: ${asRem(1)} solid var(--color-border);
      .product-line {
        border-bottom: ${asRem(1)} solid var(--color-border);
        padding: ${asRem(24)} 0;
        justify-content: space-between;
        flex-wrap: wrap;
        @media screen and (min-width: ${Breakpoint.sm}) {
          flex-wrap: nowrap;
          justify-content: unset;
          padding: ${asRem(24)} ${asRem(32)};
          gap: ${asRem(25)};

          .product-name {
            flex: 6;
          }
          .amount {
            flex: 1;
          }
        }

        .product-qty {
          flex-basis: 100%;
          order: 3;
          @media screen and (min-width: ${Breakpoint.sm}) {
            flex: 2;
            order: unset;
          }
        }
        
        .options, .sku {
          margin-top: ${asRem(4)};
        }

        .sku {
          display: none;
        }
      }
    }
    .total-cost {
      margin-left: auto;
      margin-bottom: ${asRem(40)};
      max-width: ${asRem(380)};
      >.rz-row {
        justify-content: space-between;
        padding: ${asRem(8)} 0;
        &:not(:last-child) {
          border-bottom: ${asRem(1)} solid var(--color-border);
        }
      }
    }
  }

  .shipping-desc, .customer-msg, .options, .sku, .product-qty {
    color: var(--color-text-secondary);
  }

  .order-print {
    margin-bottom: ${asRem(40)};
  }
`;

export const OrderTitleStatus = () => {
  return (
    <Row alignCenter className="page-title">
      <SVGIcon heightPx={32}>
        <ShoppingBagIcon />
      </SVGIcon>
      <DisplayBold24 as="h1">
        {translateV2('orders.THANKS_FOR_TRANSACTION')}
      </DisplayBold24>
    </Row>
  );
};

export const BaseOrderView = ({
  order,
  headLessDesign = false,
}) => {
  return (
    <OrderViewWrapper
      status={order.status}
      className="rz-section-content"
      headLessDesign={headLessDesign}
    >
      <OrderTitleStatus />
      <Row spaceBetween className="order-section-overview">
        <Col className="col-left">
          <Text14>
            {translateV2('orders.CONFIRMATION_MAIL_MSG')}
            {' '}
            <a
              alt="Order email address"
              className="mail"
              href={`mailto:${order.email}`}
            >
              {order.email}
            </a>
          </Text14>
          <section>
            {order.orderNumber && (
              <TextMedium14>
                {translateV2('orders.ORDER_NUMBER')}
                :
                {' '}
                <Bold14 as="span">{order.orderNumber}</Bold14>
              </TextMedium14>
            )}
            {order.date && (
              <TextMedium14>
                {translateV2('orders.ORDER_DATE')}
                :
                {' '}
                <Bold14 as="span">{order.date}</Bold14>
              </TextMedium14>
            )}
            {order.paymentMethod.name && (
              <TextMedium14>
                {translateV2('orders.PAYMENT_METHOD')}
                :
                {' '}
                <Bold14 as="span">{order.paymentMethod.name}</Bold14>
              </TextMedium14>
            )}
          </section>
          <Col className="address-section">
            {order.address && (
              <AddressDisplayCard
                title={translateV2('myPages.SHIPPING_ADDRESS')}
                address={order.address}
                styleProps={{
                  padding: false, border: false,
                }}
              />
            )}
            {order.billingAddress && (
              <AddressDisplayCard
                title={translateV2('myPages.BILLING_ADDRESS')}
                address={order.billingAddress}
                styleProps={{
                  padding: false, border: false,
                }}
              />
            )}
          </Col>
        </Col>
        <Col className="col-right">
          <section>
            {order.total.total && (
              <>
                <Text16>{translateV2('cart.TOTAL')}</Text16>
                <DisplaySemiBold30>{formatMoney(order.total.total)}</DisplaySemiBold30>
              </>
            )}
            {order.status && (
              <Text14 className="order-status">
                <span>
                  {translateV2('orders.ORDER_STATUS')}
                  :
                  {' '}
                </span>
                <StatusIndicator color={indicatorColor(order.status)} />
                {order.status}
              </Text14>
            )}
          </section>
          {order.rzShippingAttributes && (
            <section>
              <SVGIcon heightPx={24}>
                <DeliveryIcon />
              </SVGIcon>
              <Text16 className="order-arrival">
                {displayRzShippingAttributes(order.rzShippingAttributes)}
              </Text16>
            </section>
          )}
          {order.shippingMethod && (
            <section>
              <Text16>
                {translateV2('orders.SHIPPING_TYPE')}
                :
                {' '}
              </Text16>
              <Bold14>{order.shippingMethod}</Bold14>
              {order.shippingDescription && (
                <Text14 className="shipping-desc">
                  <RawHtmlView
                    html={order.shippingDescription || ''}
                  />
                </Text14>
              )}
            </section>
          )}
          {order.customerNotes && (
            <section className="comments">
              <Bold14>
                {translateV2('fields.COMMENTS')}
                :
                {' '}
              </Bold14>
              <Text14 className="customer-msg">{order.customerNotes}</Text14>
            </section>
          )}
        </Col>
      </Row>
      <section className="order-section-items">
        <Text16>
          {translateV2('orders.PRODUCTS')}
          : (
          {order.products.length}
          )
        </Text16>
        <div className="product-list">
          {order.products.map((item, i) => (
            <Row
              key={item.uid}
              className={`product-line ${i === (order.products.length - 1) ? 'last-product-line' : ''}`}
            >
              <Col className="product-name">
                <Bold16>
                  {item.product.name}
                </Bold16>
                <Text16 className="sku">
                  {item.product.sku}
                </Text16>
                <Text16 className="options">
                  {item?.options?.map((option, index) => (
                    <span as="span" key={option.label}>
                      {option.value}
                      {(index !== item.options.length - 1)
                        && <span className="separator"> / </span>}
                    </span>
                  ))}
                </Text16>
              </Col>
              <Col className="product-qty">
                <Text16>
                  Qty:
                  {' '}
                  {item.quantity}
                </Text16>
              </Col>
              <Col className="amount">
                <DisplayBold24>
                  {item.product.priceText}
                </DisplayBold24>
              </Col>
            </Row>
          ))}
          <div className="total-cost">
            {order.total.discounts.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Row key={i}>
                <Text16 className="summary-line">{item.label}</Text16>
                <Text16 className="amount">{formatMoney(item.amount)}</Text16>
              </Row>
            ))}
            <Row>
              <Text16 className="summary-line">
                {translateV2('cart.SHIPPING_COST')}
              </Text16>
              <Text16 className="amount">
                {formatMoney(order.total.shipping)}
              </Text16>
            </Row>
            <Row>
              <DisplayBold24 className="summary-line">
                {translateV2('cart.TOTAL')}
              </DisplayBold24>
              <DisplayBold24 className="amount">
                {formatMoney(order.total.total)}
              </DisplayBold24>
            </Row>
            {order.total.allTaxes.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Row key={i}>
                <Text16 className="summary-line">
                  {item.label || item.title}
                </Text16>
                <Text16 className="amount">
                  {formatMoney(item.amount)}
                </Text16>
              </Row>
            ))}
          </div>
        </div>
        <section className="action-button hide-on-print">
          <Button
            mode="primary"
            filled
            className="order-print"
            ariaLabel={translateV2('orders.PRINT_ORDER_CONFIRMATION')}
            onClick={() => printOrderInvoice()}
          >
            <Text14>{translateV2('orders.PRINT_ORDER_CONFIRMATION')}</Text14>
          </Button>
        </section>
      </section>
    </OrderViewWrapper>
  );
};

BaseOrderView.propTypes = {
  order: PropTypes.object,
  headLessDesign: PropTypes.bool,
};

export const OrderView = withDependencySupport(BaseOrderView, 'OrderView');
export const OrderViewWrapper = withDependencySupport(BaseOrderViewWrapper, 'OrderViewWrapper');
