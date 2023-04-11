import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { QuickOrderListContext } from '@/roanuz/store/core/quickOrderContext';
import { AddToWishListView } from '@/roanuz/view/product/addToWishList';
import { CookieManager } from '@/roanuz/lib/cookie';
import {
  useCustomerAllLists,
  useAddOrUpdateItemsToCustomerList,
  useRemoveItemFromList,
} from '@/roanuz/controller/customer/hook';
import { CustomerListTypes } from '@/roanuz/controller/customer/types';

export const AddToQuickOrderList = ({
  product, buttonText,
  ...buttonParams
}) => {
  const quickOrderListId = CookieManager.get('roanuz_custom_b2b_user_quickorder_list_id');
  const initState = () => ({
    sku: product.sku,
    qty: 1,
  });

  const [quickOrderListOption] = useState({ ...initState() });

  const [createNewList, setCreateNewList] = useState(false);

  const quickOrderListContext = useContext(QuickOrderListContext);
  const { selectedProducts, setSelectedProducts } = quickOrderListContext;

  const {
    loading: customerListsLoading,
    error: customerListsError,
    customerListInfo,
  } = useCustomerAllLists(CustomerListTypes.QuickOrder, !createNewList);

  const onDone = (e, isRemove = false) => {
    // Append the sku to the context to reduce cost. Else i need to refetch the query which costs.
    if (setSelectedProducts) {
      setSelectedProducts((state) => {
        const updates = [...state];
        if (isRemove) {
          const index = state.indexOf(product.sku);
          updates.splice(index, 1);
        } else {
          updates.push(product.sku);
        }
        return updates;
      });
    }
  };

  const [
    addToQuickOrderList, { loading, error, data: addToQuickOrderListData },
  ] = useAddOrUpdateItemsToCustomerList({
    onCompleted: onDone,
  });

  const updateItemToListHandler = (id) => {
    const obj = {
      listId: id,
      items: [{
        ...quickOrderListOption,
        config: JSON.stringify(product.configProdVariationsInfo.selectedCartVariantOptions),
      }],
    };
    addToQuickOrderList(obj);
  };

  const onCreateListCompleted = (id) => {
    if (id) {
      updateItemToListHandler(id);
    }
  };

  useEffect(() => {
    if (customerListInfo) {
      onCreateListCompleted(customerListInfo.list_id);
    }
  }, [customerListInfo]);

  const onAdd2QuickOrderList = () => {
    if (quickOrderListId) {
      updateItemToListHandler(quickOrderListId);
    } else {
      setCreateNewList(true);
    }
  };

  const [removeFromQuickOrderList,
    { removeLoading, removeError, done: removeFromWishData }] = useRemoveItemFromList({
    onCompleted: (e) => {
      onDone(e, true);
    },
  });

  const onRemoveFromQuickOrderList = (item) => {
    const obj = {
      listId: quickOrderListId,
      sku: item,
    };
    removeFromQuickOrderList(obj);
  };

  const toggleQuickOrderListAction = () => {
    if (selectedProducts.includes(product.sku)) {
      onRemoveFromQuickOrderList(product.sku);
    } else {
      onAdd2QuickOrderList();
    }
  };

  return (
    <AddToWishListView
      className="rz-button-atw"
      loading={loading || removeLoading || customerListsLoading}
      error={error || removeError || customerListsError}
      data={addToQuickOrderListData || removeFromWishData}
      onClick={toggleQuickOrderListAction}
      inWishList={selectedProducts.includes(product.sku)}
      buttonText={buttonText}
      {...buttonParams}
    />
  );
};

AddToQuickOrderList.propTypes = {
  product: PropTypes.object.isRequired,
  buttonText: PropTypes.string,
};
