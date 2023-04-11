import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Pagination } from '@/roanuz/view/pagination';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Col, Row } from '@/roanuz/layout';
import {
  Text14,
  Text16,
  Bold16,
  TextMedium14,
} from '@/roanuz/typopgraphy';
import { ReactComponent as DownloadIcon } from '@/roanuz/view/imgs/DownloadIcon.svg';
import { ReactComponent as PrinterIcon } from '@/roanuz/view/imgs/PrinterIcon.svg';
import { StatusIndicator } from '@/roanuz/components/statusIndicator';
import { translateV2 } from '@/roanuz/lib/utils';
import { OverallItemsCountView } from '../overallItemsCount';
import { Button } from '../button';

export const BaseMyOrderListViewWrapper = styled.div`
  margin-top: ${asRem(32)};
  .orders-cta {
    margin-bottom: ${asRem(30)};
    .cta-item {
      color: var(--color-text-secondary);
      &.count {
        margin-left: auto;
      }
    }
  }
  >.page-section-orders {
    /* list view style  */
    .order-details {
      justify-content: space-between;
      flex-wrap: wrap;
      padding: ${asRem(15)} ${asRem(8)};
      gap: ${asRem(30)};
      border-bottom: ${asRem(1)} solid var(--color-border);
      @media screen and (min-width: ${Breakpoint.md}) {
        border-bottom: none;
      }

      .order-content {
        min-width: ${asRem(100)};
        flex: 1;
        &:nth-child(3) {
          order: 5;
          flex-basis: 100%;
          @media screen and (min-width: ${Breakpoint.md}) {
            order: unset;
            flex: 1;
          }
        }
        >p:not(:first-child) {
          margin-top: ${asRem(3)};
          color: var(--color-text-secondary);
        }
      }
      .action-buttons {
        gap: ${asRem(15)};
        justify-content: space-between;
        .rz-button {
          color: var(--color-button-2);
          &:hover {
            color: var(--color-active);
          }
        }
      }
    }
    .pagination-line {
      text-align: center;
      margin: ${asRem(20)} 0;
      @media screen and (min-width: ${Breakpoint.sm}) {
        text-align: right;
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  } 
`;

export const indicatorColor = (cData) => {
  let color = '--color-order-processing';

  if (cData === 'Processed') {
    color = '--color-order-success';
  }
  if (cData === 'Canceled') {
    color = '--color-order-canceled';
  }
  return color;
};

export const BaseMyOrderListView = ({
  ordersList,
  selectPage,
  orderToOpen,
}) => {
  const {
    itemsTo,
    totalItems,
    totalPages,
    currentPage,
  } = ordersList;
  return (
    <MyOrderListViewWrapper>
      <Row className="orders-cta">
        <TextMedium14 className="cta-item count">
          {ordersList.totalItems}
          {' '}
          {translateV2('orders.ORDERS')}
        </TextMedium14>
      </Row>
      <div className="page-section-orders">
        <div>
          {ordersList.items.map((order) => (
            <Row key={order.number} className="order-details">
              <Col className="order-content">
                <Bold16 className="amount">{order.totalPrice}</Bold16>
                <Text16 className="indicator">
                  <StatusIndicator color={indicatorColor(order.status)} />
                  {translateV2(`orders.${order.status}`, order.status)}
                </Text16>
              </Col>
              <Col className="order-content">
                <Link href={`/customer/account/order/${order.number}/`}>
                  <a className="plain" alt={`Goto Order ${order.number}`}>
                    <Text16 className="order-num">
                      #
                      {order.number}
                    </Text16>
                  </a>
                </Link>
                <Text14 className="date">{order.orderDate}</Text14>
              </Col>
              <Col className="order-content">
                <Text16 className="payment-method">{translateV2(`orders.${order.paymentMethod}`, order.paymentMethod)}</Text16>
                <Text14 className="quantity">
                  {order.productsCount}
                  {' '}
                  items
                </Text14>
              </Col>
              <div className="hide-mobile">
                <Row className="action-buttons">
                  <Button
                    noborder
                    nomargin
                    onClick={() => orderToOpen(order.number)}
                    onKeyDown={() => orderToOpen(order.number)}
                    icon={<DownloadIcon />}
                    iconHeightPx={17}
                  />
                  <Button
                    noborder
                    nomargin
                    onClick={() => orderToOpen(order.number)}
                    onKeyDown={() => orderToOpen(order.number)}
                    icon={<PrinterIcon />}
                    iconHeightPx={17}
                  />
                </Row>
              </div>
            </Row>
          ))}
        </div>
        <div className="pagination-line">
          <OverallItemsCountView
            itemsTo={itemsTo}
            totalItems={totalItems}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChanged={(value) => selectPage(value)}
            />
          )}
        </div>
      </div>
    </MyOrderListViewWrapper>
  );
};

BaseMyOrderListView.propTypes = {
  ordersList: PropTypes.object,
  selectPage: PropTypes.func,
  orderToOpen: PropTypes.func,
};

export const MyOrderListViewWrapper = withDependencySupport(BaseMyOrderListViewWrapper, 'MyOrderListViewWrapper');
export const MyOrderListView = withDependencySupport(BaseMyOrderListView, 'MyOrderListView');

const BaseMyOrderTableViewWrapper = styled.div`
  margin-top: ${asRem(32)};
  .orders-cta {
    margin-bottom: ${asRem(30)};
    .cta-item {
      color: var(--color-text-secondary);
      &.count {
        margin-left: auto;
      }
    }
  }
  >.page-section-orders {
    /* table view style  */
    table {
      margin: ${asRem(15)} 0;
      width: 100%;

      th, td {
        padding: ${asRem(6)} ${asRem(6)};
        @media screen and (min-width: ${Breakpoint.md}) {
          padding: ${asRem(10)} ${asRem(10)};
        }
      }

      thead {
        th {
          text-align: left;
          font-weight: bold;
        }

        tr {
          display: none;

          @media screen and (min-width: ${Breakpoint.md}) {
            display: table-row;
            border-bottom: 2px solid var(--color-disabled);
          }
        }
      }
      tbody {
        tr {
          padding: ${asRem(10)} 0;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid var(--color-disabled-3); 

          & :last-child {
            border-bottom: none;    
          }
          
          @media screen and (min-width: ${Breakpoint.md}) {
            display: table-row;            
          }    
          
          .status-data {
            display: flex;
            align-items: center;
          }
        }

        td {
          width: auto;

          & ::before {
            content: attr(data-th);
            display: inline-block;
            font-weight: 700;
            padding-right: ${asRem(10)};
            @media screen and (min-width: ${Breakpoint.md}) {
              display: none;
            }
          }
        }
      }
    }

    .pagination-line {
      text-align: center;
      margin: ${asRem(20)} 0;
      @media screen and (min-width: ${Breakpoint.sm}) {
        text-align: right;
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  } 
`;

export const BaseMyOrderTableView = ({
  ordersList,
  selectPage,
}) => {
  const {
    itemsTo,
    totalItems,
    totalPages,
    currentPage,
  } = ordersList;
  return (
    <MyOrderTableViewWrapper>
      <Row className="orders-cta">
        <TextMedium14 className="cta-item count">
          {ordersList.totalItems}
          {' '}
          {translateV2('orders.ORDERS')}
        </TextMedium14>
      </Row>
      <div className="page-section-orders">
        <table>
          <thead>
            <tr>
              <th>{translateV2('orders.ORDERS')}</th>
              <th>{translateV2('orders.DATE')}</th>
              <th>{translateV2('button.SEND_TO')}</th>
              <th>{translateV2('cart.TOTAL')}</th>
              <th>{translateV2('button.ACTIONS')}</th>
              {/* <th>Button</th> */}
            </tr>
          </thead>
          <tbody>
            {ordersList.items.map((order) => (
              <tr key={order.number}>
                <td data-th="Pöntun #: ">{order.number}</td>
                <td data-th="Dagsetning: ">{order.orderDate}</td>
                <td data-th="Senda til: ">{order.name}</td>
                <td data-th="Samtals: " className="amount">{order.totalPrice}</td>
                <td data-th="Aðgerðir: ">
                  <Link href={`/customer/account/order/${order.number}/`}>
                    <a className="plain" alt={`Goto Order ${order.number}`}>
                      {translateV2('orders.VIEW_ORDER')}
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-line">
          <OverallItemsCountView
            itemsTo={itemsTo}
            totalItems={totalItems}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChanged={(value) => selectPage(value)}
            />
          )}
        </div>
      </div>
    </MyOrderTableViewWrapper>
  );
};

BaseMyOrderTableView.propTypes = {
  ordersList: PropTypes.object,
  selectPage: PropTypes.func,
};

export const MyOrderTableViewWrapper = withDependencySupport(BaseMyOrderTableViewWrapper, 'MyOrderTableViewWrapper');
export const MyOrderTableView = withDependencySupport(BaseMyOrderTableView, 'MyOrderTableView');
