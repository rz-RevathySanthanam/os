import React from 'react';
import PropTypes from 'prop-types';
import { MyOrderListView } from '@/roanuz/view/customer/myOrders';

export const MyOrdersListViewController = ({
  ordersList,
  onPageChange,
  orderToOpen,
}) => {
  const selectPage = (value) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    onPageChange(value);
  };

  return (
    <MyOrderListView
      ordersList={ordersList}
      onPageChange={onPageChange}
      orderToOpen={orderToOpen}
      selectPage={selectPage}
    />
  );
};

MyOrdersListViewController.propTypes = {
  ordersList: PropTypes.object,
  onPageChange: PropTypes.func,
  orderToOpen: PropTypes.func,
};
