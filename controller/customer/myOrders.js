import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { CustomerSummaryQuery } from '@/roanuz/store/customer/query';
import { MyOrdersListViewController } from '@/roanuz/controller/order/myOrdersList';
import { OrderPageController } from '@/roanuz/controller/order/order';
import { StoreConfigContext } from '@/roanuz/store/core/context';
import { parseMiniSummaryCard } from '@/roanuz/view/order/model';
import { OrderPageActionButtonController } from '@/roanuz/controller/order/actions';
import { translateV2 } from '@/roanuz/lib/utils';

const MyOrdersControllerWrapper = styled.div`
`;

export const MyOrdersController = ({ activeOrder, setOrderNumber }) => {
  const storeConfig = useContext(StoreConfigContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(CustomerSummaryQuery, {
    variables: {
      currentPage,
      pageSize: 10,
    },
    skip: activeOrder,
  });

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  if ((!data) && loading) return (<PageLoadingView message={translateV2('loadingMsg.PREPARE_ORDER')} />);
  if ((!data) && error) return (<PageErrorView error={error} />);

  if (activeOrder) {
    return (
      <>
        <OrderPageActionButtonController />
        <OrderPageController
          storeConfig={storeConfig}
          orderNumber={activeOrder}
          headLessDesign
        />
      </>
    );
  }

  if (!data || !data.customer || !data.customer.orders || !data.customer.orders.items.length) {
    return (
      <PageErrorView
        error={{ message: translateV2('loadingMsg.NO_ORDERS') }}
      />
    );
  }
  const parsedOrderSummary = parseMiniSummaryCard(data.customer.orders);

  return (
    <MyOrdersControllerWrapper>
      <MyOrdersListViewController
        ordersList={parsedOrderSummary}
        onPageChange={onPageChange}
        currentPage={currentPage}
        orderToOpen={setOrderNumber}
        activeOrder={activeOrder}
      />
    </MyOrdersControllerWrapper>
  );
};

MyOrdersController.propTypes = {
  setOrderNumber: PropTypes.func,
  activeOrder: PropTypes.string,
};
