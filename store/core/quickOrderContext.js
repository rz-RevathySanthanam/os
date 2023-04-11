/*
  FYI, To make use of this feature, QuickOrderListProvider should be added in _app.js.
*/
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { UserContext } from '@/roanuz/store/core/context';
import { CustomerListQuery } from '@/roanuz/store/customer/query';
import { parseCustomerList } from '@/roanuz/controller/customer/model';
import { CookieManager } from '@/roanuz/lib/cookie';

// B2B User Wishlist ~ Quick Order
export const QuickOrderListContext = React.createContext({
  selectedProducts: [],
  loading: null,
  error: null,
});
export const QuickOrderConsumer = QuickOrderListContext.Consumer;

export const QuickOrderListProvider = ({ children }) => {
  const userContext = useContext(UserContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const quickOrderListId = CookieManager.get('roanuz_custom_b2b_user_quickorder_list_id');

  const [fetchQuickOrderList, {
    error,
    loading,
    called,
    data,
  }] = useLazyQuery(CustomerListQuery);

  useEffect(() => {
    if ((!called) && userContext.loaded && userContext.token) {
      console.log('❤️ Fetching B2B Wishlist ~ Quick Order...', quickOrderListId);
      if (quickOrderListId) {
        fetchQuickOrderList({
          variables: { listId: quickOrderListId },
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userContext.loaded, userContext.token,
    quickOrderListId,
  ]);

  useEffect(() => {
    if (data && userContext.token) {
      if (data.getCustomerList) {
        const parsedData = parseCustomerList(data.getCustomerList);
        if (parsedData && parsedData.productItems) {
          setSelectedProducts(Object.keys(parsedData.productItems) || []);
        }
      }
    }
  }, [data]);

  let errorObject = error;
  if (data && !data.getCustomerList && error) {
    // List not created for this user yet.
    // So ignore the error
    errorObject = null;
  }

  return (
    <QuickOrderListContext.Provider value={{
      selectedProducts,
      setSelectedProducts,
      loading,
      error: errorObject,
    }}
    >
      {children}
    </QuickOrderListContext.Provider>
  );
};

QuickOrderListProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
