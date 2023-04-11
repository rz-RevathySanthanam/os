import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { CustomerOrderQuery } from '@/roanuz/store/order/query';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { OrderView } from '@/roanuz/view/order/order';
import { parseOrder } from '@/roanuz/view/order/model';

const OrderPageWrapper = styled.div`
`;

export const OrderPageController = ({ storeConfig, orderNumber, headLessDesign }) => {
  const { loading, error, data: order } = useQuery(CustomerOrderQuery, {
    variables: { orderNumber },
  });

  if (loading) return (<PageLoadingView />);
  if (error) return (<PageErrorView error={error} />);
  if (!order) return (<PageLoadingView />);
  const parsedOrder = parseOrder(order, storeConfig.product_url_suffix);
  return (
    <OrderPageWrapper>
      <Head>
        <title>
          Pöntun
          {' '}
          {parsedOrder.orderNumber}
        </title>
        <meta name="description" content={`Order # ${parsedOrder.orderNumber}`} />
      </Head>
      <OrderView order={parsedOrder} headLessDesign={headLessDesign} />
    </OrderPageWrapper>
  );
};

OrderPageController.propTypes = {
  storeConfig: PropTypes.object,
  orderNumber: PropTypes.string,
  headLessDesign: PropTypes.bool,
};
