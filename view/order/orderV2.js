import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  DisplayBold40,
  Display18,
  Display20,
  LabelMedium12,
  TextBold14,
  DisplayBold30,
  Text14,
  Text16,
} from '@/roanuz/typopgraphy';
import { Row, Col } from '@/roanuz/layout';
import { formatMoney } from '@/roanuz/lib/cart';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { ReactComponent as OrderHeaderIcon } from '@/roanuz/view/imgs/OrderHeaderIcon.svg';
import { ReactComponent as ChatIcon } from '@/roanuz/view/imgs/ChatIcon.svg';
import { AddressDisplayCard } from '@/roanuz/view/customer/addressDisplayCard';
import { RawHtmlView } from '@/roanuz/view/rawHtml';
import { SVGIcon } from '@/roanuz/view/icon';
import { Button } from '@/roanuz/view/button';
import { withDependencySupport } from '@/roanuz/lib/dep';
import Config from '@/config';
import PaymentMethodMillifaerslaImage from '@/roanuz/view/imgs/PaymentMethodMillifaersla.png';
import { ImageView } from '@/roanuz/view/image';
import { printOrderInvoice } from '@/roanuz/controller/order/actions';
import { translateV2 } from '@/roanuz/lib/utils';
import { displayRzShippingAttributes } from './shippingAttributesView';

export const BaseOrderViewV2Wrapper = styled.div`
  strong {
    font-weight: 700;
  }

  .order-decorative-header {
    padding-top: ${asRem(20)};
    padding-bottom: ${asRem(20)};
    background-color: var(--color-brand-bar-bg);
    @media screen and (min-width: ${Breakpoint.sm}) {
      padding-top: ${asRem(40)};
      padding-bottom: ${asRem(40)};
    }

    .order-header-icon {
      display: none;
      @media screen and (min-width: ${Breakpoint.sm}) {
        display: block;
      }
    }
  }

  ${(props) => props.headLessDesign && css`
    .order-decorative-header {
      display: none;
    }
  `}


  .order-section-details {
    margin: ${asRem(40)} auto;
    flex-direction: column;
    flex-wrap: wrap;
    @media screen and (min-width: ${Breakpoint.md}) {
      display: grid;
      grid-template-columns: 1fr ${asRem(400)};
      grid-template-rows: auto auto;
      column-gap: ${asRem(100)};
    }

    .order-detailed-section {
      .order-payment-section {
        margin-top: ${asRem(40)};
        .checkmo-logo {
          margin-bottom: ${asRem(20)};
          .rz-image-view {
            width: ${asRem(160)};
            img {
              max-width: 100%;
            }
          }
        }
        .checkmo-content >p {
          margin-bottom: ${asRem(5)};
          line-height: ${asRem(25)};
        }
      }

      .order-section-shipping {
        margin: ${asRem(40)} 0;
        .rz-address-card {
          padding: 0;
          border: none;
          &:not(:last-child) {
            margin-bottom: ${asRem(30)};
          }
        }
      }

      .order-section-products {
        margin: ${asRem(20)} 0;
        border-top: ${asRem(1)} solid var(--color-border);
        border-bottom: ${asRem(1)} solid var(--color-border);

        .product-line {
          padding: ${asRem(20)} 0;
          &:not(:last-child) {
            border-bottom: ${asRem(1)} solid var(--color-border);
          }

          .product-top {
            gap: ${asRem(20)};
            align-items: center;
            @media screen and (min-width: ${Breakpoint.md}) {
              align-items: flex-start;
            }
            .product-price {
              flex-shrink: 0;
            }
          }

          .product-title {
            flex-direction: column;
            @media screen and (min-width: ${Breakpoint.md}) {
              flex-direction: column-reverse;
            }
            .product-sku {
              margin-top: ${asRem(10)};
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;  
              overflow: hidden;
            }
          }
          

          .product-quantity {
            margin-top: ${asRem(20)};
          }
        }
      }

      .order-section-total {
        > div {
          padding-bottom: ${asRem(15)};
        }

        .product-total-amount {
          margin-bottom: ${asRem(15)};
          border-bottom: ${asRem(1)} solid var(--color-border);
        }
      }

      .action-button {
        margin-top: ${asRem(60)};
      }
    }

    .order-section-overview {
      grid-row: 1;
      >p {
        margin-bottom: ${asRem(10)};
      }

      .order-mail {
        margin-top: ${asRem(20)};
        .mail {
          text-decoration: underline;
        }
      }
    }

    .order-section-summary {
      grid-row: 1 / 3;
      padding: ${asRem(30)};
      background-color: var(--color-brand-bar-bg);
      align-self: flex-start;
      width: 100%;
      margin-top: ${asRem(50)};

      @media screen and (min-width: ${Breakpoint.md}) {
        min-width: ${asRem(385)};
        max-width: ${asRem(500)};
        width: auto;
        margin-top: 0;
      }

      >section {
        margin-bottom: ${asRem(20)};
      }

      .order-shipping-desc {
        .rz-magento-html {
          display: inline-block;
        }
      }

      .order-shipping-title {
        >p {
          margin-bottom: ${asRem(10)};
        }
      }

      .order-total-amount, .order-status, .order-payment-title {
        margin-bottom: ${asRem(15)};
      }

      .order-customer-notes {
        padding-top: ${asRem(15)};
        border-top: ${asRem(1)} solid var(--color-border);
        gap: ${asRem(15)};
        p {
          line-height: ${asRem(22)};
        }
      }
    }
  }
`;

export const OrderViewV2 = ({
  order,
  headLessDesign = false,
}) => {
  return (
    <OrderViewV2Wrapper headLessDesign={headLessDesign}>
      <div className="order-decorative-header">
        <Row alignCenter spaceBetween className="rz-section-content">
          <DisplayBold30 as="h1">
            {translateV2('orders.THANKS_FOR_TRANSACTION')}
          </DisplayBold30>
          <Col className="order-header-icon">
            <SVGIcon useOriginal heightPx={148}>
              <OrderHeaderIcon />
            </SVGIcon>
          </Col>
        </Row>
      </div>
      <Row spaceBetween className={`order-section-details ${!headLessDesign ? 'rz-section-content' : ''}`}>
        <Col className="order-section-overview">
          <DisplayBold40 as="p" className="order-number">
            <span className="num-sym">#</span>
            {order.orderNumber}
          </DisplayBold40>
          <Display18>
            {translateV2('orders.ORDER_DATE')}
            :
            {' '}
            <strong>{order.date}</strong>
          </Display18>
          <Display18 className="order-mail">
            {translateV2('orders.CONFIRMATION_MAIL_MSG')}
            {' '}
            <p><a alt="Order email address" className="plain mail" href={`mailto:${order.email}`}>{order.email}</a></p>
          </Display18>
        </Col>
        <Col className="order-section-summary">
          <section className="order-total-amount">
            <TextBold14>{translateV2('cart.TOTAL')}</TextBold14>
            <DisplayBold30 as="h4">{formatMoney(order.total.total)}</DisplayBold30>
          </section>
          <Display18 className="order-status">
            {translateV2('orders.ORDER_STATUS')}
            :
            {' '}
            <strong>{translateV2(`orders.ORDER_STATUS_VALUE.${order.status}`, order.status)}</strong>
          </Display18>
          <Display18 className="order-payment-title">
            {translateV2('orders.PAYMENT_METHOD')}
            :
            {' '}
            <strong>{order.paymentMethod.name}</strong>
          </Display18>
          <section className="order-shipping-title">
            <Display18>
              {translateV2('orders.SHIPPING_TYPE')}
              :
            </Display18>
            <Display18 className="shipping-method">
              <strong>
                {translateV2(`orders.SHIPPING_TYPE_VALUE.${order.shippingMethod}`, order.shippingMethod)}
              </strong>
            </Display18>
            <Text16 className="order-shipping-details">{displayRzShippingAttributes(order.rzShippingAttributes)}</Text16>
          </section>
          <section className="order-shipping-desc">
            {order.shippingDescription && (
            <Text14>
              <strong>
                {translateV2('footer.SERVICE_TIME')}
                &nbsp;
              </strong>
              <RawHtmlView
                html={order.shippingDescription || ''}
              />
            </Text14>
            )}
          </section>
          {order.customerNotes && (
            <Row className="order-customer-notes">
              <SVGIcon heightPx={30}>
                <ChatIcon />
              </SVGIcon>
              <Text14>
                {translateV2('fields.COMMENTS')}
                <p>{order.customerNotes}</p>
              </Text14>
            </Row>
          )}
        </Col>

        <Col className="order-detailed-section">
          <section className="order-payment-section">
            {order.paymentMethod.type === 'checkmo' && (
            <div className="checkmo-details">
              <Col className="checkmo-logo">
                <ImageView
                  src={PaymentMethodMillifaerslaImage}
                  alt="Checkmo Logo"
                />
              </Col>
              <Col className="checkmo-content">
                <Text16>
                  {translateV2('fields.SSN')}
                  :
                  {' '}
                  <strong>{Config.MerchantIdNumber}</strong>
                </Text16>
                <Text16>
                  {translateV2('fields.ACCOUNT_NUMBER')}
                  :
                  {' '}
                  <strong>{Config.MerchantAccountNumber}</strong>
                </Text16>
                <Text16>
                  {translateV2('fields.EMAIL_US')}
                  {' '}
                  <a href={`mailto:${Config.EnquiryFormRecipientsEmail}`}>{Config.EnquiryFormRecipientsEmail}</a>
                </Text16>
              </Col>
            </div>
            )}
          </section>
          <section className="order-section-shipping">
            <AddressDisplayCard
              title={translateV2('myPages.SHIPPING_ADDRESS')}
              address={order.address}
            />
            {order.billingAddress && (
              <AddressDisplayCard
                title={translateV2('myPages.BILLING_ADDRESS')}
                address={order.billingAddress}
              />
            )}
          </section>
          <section className="order-section-items">
            <Display18 as="p">
              <strong>
                Items
                {' '}
                (
                {order.products.length}
                )
              </strong>
            </Display18>
            <section className="order-section-products">
              {order.products.map((item) => (
                <div
                  key={item.uid}
                  className="product-line"
                >
                  <Row className="product-top" spaceBetween>
                    <Row className="product-title">
                      <LabelMedium12 className="product-sku">{item.product.sku}</LabelMedium12>
                      <Display20>{item.product.name}</Display20>
                    </Row>
                    <Col className="product-price">
                      <Display20>{item.product.priceText}</Display20>
                    </Col>
                  </Row>
                  <TextBold14 className="product-quantity">
                    {item.quantity}
                    {' '}
                    flaska
                  </TextBold14>
                </div>
              ))}
            </section>
            <section className="order-section-total">
              {order.total.discounts.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
                <div key={i}>
                  <Row alignCenter spaceBetween>
                    <Display18 className="summary-line">{item.label}</Display18>
                    <Display18 className="amount">{formatMoney(item.amount)}</Display18>
                  </Row>
                </div>
              ))}
              {order.total.shipping && (
                <Row alignCenter spaceBetween>
                  <Display18 className="summary-line">{translateV2('cart.SHIPPING_COST')}</Display18>
                  <Display18 className="amount">{formatMoney(order.total.shipping)}</Display18>
                </Row>
              )}
              <Row className="product-total-amount" alignCenter spaceBetween>
                <Display18 className="summary-line">
                  <strong>{translateV2('cart.TOTAL')}</strong>
                </Display18>
                <Display18 className="amount">
                  <strong>{formatMoney(order.total.total)}</strong>
                </Display18>
              </Row>
              {order.total.allTaxes.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
                <Row alignCenter spaceBetween key={i}>
                  aaa
                  <Display18 className="summary-line" colSpan="2">{item.label || item.title}</Display18>
                  <Display18 className="amount">{formatMoney(item.amount)}</Display18>
                </Row>
              ))}
            </section>
          </section>
          <section className="action-button hide-on-print">
            <Button
              mode="primary"
              ariaLabel={translateV2('orders.PRINT_ORDER_CONFIRMATION')}
              onClick={() => printOrderInvoice()}
            >
              <Text14>{translateV2('orders.PRINT_ORDER_CONFIRMATION')}</Text14>
            </Button>
          </section>
        </Col>
      </Row>
    </OrderViewV2Wrapper>
  );
};

OrderViewV2.propTypes = {
  order: PropTypes.object,
  headLessDesign: PropTypes.bool,
};

export const OrderViewV2Wrapper = withDependencySupport(BaseOrderViewV2Wrapper, 'OrderViewV2Wrapper');
