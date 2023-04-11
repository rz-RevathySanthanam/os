import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { MyQuickOrderView } from '@/roanuz/view/customer/quickOrder/myQuickOrder';
import { useLazyQuery } from '@apollo/client';
import { lookUpQuery } from '@/roanuz/store/api';
import { StoreConfigContext, UserContext } from '@/roanuz/store/core/context';
import { parseProduct } from '@/roanuz/view/product/modelV2';
import { useReAddBulkProductsToCart } from '@/roanuz/store/cart/cart';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { CustomerListTypes } from '@/roanuz/controller/customer/types';
import { translateV2 } from '@/roanuz/lib/utils';
import {
  useCustomerAllLists, useAddOrUpdateItemsToCustomerList,
  useRemoveItemFromList, useRemoveAllItemsFromList,
} from './hook';
import { parseCustomerList } from './model';

const MyQuickOrderControllerWrapper = styled.div`
`;

// INFO: To make this feature work, i.e, to store products in list,
// we are using the dynamodb from AWS and functionality from ferrari (ie. mutation and query).
// So you need to setup the above to use this page for smoother flow.

export const MyQuickOrderController = () => {
  const [captureCustomerListInfo, setCaptureCustomerListInfo] = useState();
  const [choosenProducts, setChoosenProducts] = useState({});
  const [loadWhilePreparing, setLoadWhilePreparing] = useState(true);
  const [validationState, setValidationState] = useState(null);
  const [cartFailureCodes, setCartFailureCodes] = useState(null);
  const [loadingState, setLoadingState] = useState([]);
  const [addToCartCompleted, setAddToCartCompleted] = useState(false);

  const storeConfig = useContext(StoreConfigContext);
  const userContext = useContext(UserContext);
  const { isB2B } = userContext;

  const {
    loading: customerListsLoading,
    error: customerListsError,
    data: customerLists,
    customerListInfo,
  } = useCustomerAllLists(CustomerListTypes.QuickOrder);

  useEffect(() => {
    if (customerListInfo) {
      setCaptureCustomerListInfo(parseCustomerList(customerListInfo));
    }
  }, [customerListInfo]);

  const [fetchProductInfoFromMagento, {
    data,
    loading,
    error,
  }] = useLazyQuery(lookUpQuery('product.queries.productVariantQuick'));

  useEffect(() => {
    if (
      data && !loading && !error
      && data.products && data.products.items && data.products.items.length > 0
    ) {
      const updatedState = {};
      data.products.items.forEach((item) => {
        const parsedProduct = parseProduct(item, { storeConfig, isB2B });
        if (parsedProduct) {
          const skus = Object.keys(choosenProducts);
          if (!skus.includes(parsedProduct.sku)) {
            updatedState[parsedProduct.sku] = parsedProduct;
            setChoosenProducts({
              ...choosenProducts,
              ...updatedState,
            });
            setLoadWhilePreparing(false);
          }
        }
      });
    }
    if (
      data && !loading && !error
      && data.products && data.products.items && data.products.items.length === 0
    ) {
      setLoadWhilePreparing(false);
    }
  }, [data]);

  useEffect(() => {
    if (captureCustomerListInfo && captureCustomerListInfo.listId && loadWhilePreparing) {
      const { productItems } = captureCustomerListInfo;
      if (!productItems || Object.keys(productItems).length > 0) {
        const skus = Object.keys(productItems);
        fetchProductInfoFromMagento({ variables: { sku: skus } });
      } else {
        setLoadWhilePreparing(false);
      }
    }
  }, [captureCustomerListInfo]);

  const onCartItemsReAddedSuccess = (added) => {
    setAddToCartCompleted(true);
    setTimeout(() => {
      setAddToCartCompleted(false);
    }, 5000);
    const userErrors = added && added.addProductsToCart && added.addProductsToCart.user_errors;
    if (userErrors && userErrors.length > 0) {
      setCartFailureCodes(userErrors);
      setTimeout(() => {
        setCartFailureCodes(null);
      }, 5000);
    }
  };

  const [reAddItemsToCart] = useReAddBulkProductsToCart({
    onCompleted: onCartItemsReAddedSuccess,
  });

  const updateCompleted = (up) => {
    if (up && up.addOrUpdateItemsToList) {
      const revisedObj = {
        ...customerListInfo,
        items: up.addOrUpdateItemsToList,
      };
      setCaptureCustomerListInfo(parseCustomerList(revisedObj));
    }
  };

  const [updateItemToList] = useAddOrUpdateItemsToCustomerList({
    onCompleted: updateCompleted,
  });

  const removeCompleted = (del, sku) => {
    if (del && del.removeItemsFromList) {
      setChoosenProducts((state) => {
        const updates = { ...state };
        delete updates[sku];
        return updates;
      });
      setCaptureCustomerListInfo((state) => {
        const updates = { ...state };
        delete updates.productItems[sku];
        return updates;
      });
      setValidationState((state) => {
        const updates = { ...state };
        if (Object.keys(updates).includes((sku))) {
          delete updates[sku];
        }
        return updates;
      });
      setLoadingState((state) => {
        const updates = [...state];
        updates.pop(sku);
        return updates;
      });
    }
  };

  const [removeItemFromList] = useRemoveItemFromList({
    onCompleted: removeCompleted,
  });

  const removeAllCompleted = (delAll) => {
    if (delAll && delAll.removeAllItemsFromList) {
      setChoosenProducts({});
      setValidationState(null);
      setCaptureCustomerListInfo({
        ...captureCustomerListInfo,
        productItems: {},
      });
    }
  };

  const [removeAllItemsFromList] = useRemoveAllItemsFromList({
    onCompleted: removeAllCompleted,
  });

  const noLists = (!customerLists || !customerLists.getAllLists);

  if (!isB2B) {
    return (<ErrorView error={{ message: 'Not Authorised to access the Page' }} />);
  }
  if (noLists && customerListsLoading) return (<LoadingView message={translateV2('loadingMsg.PLEASE_WAIT_MSG')} />);
  if (noLists && customerListsError) return (<ErrorView error={customerListsError} />);
  if (loadWhilePreparing) return (<LoadingView message={translateV2('loadingMsg.PLEASE_WAIT_MSG')} />);

  const pushItemToList = (sku) => {
    if (captureCustomerListInfo) {
      const items = data && data.products && data.products.items.map((x) => x.sku);
      if (items && items.length > 0 && items.includes(sku)) {
        const itemdata = data.products.items.find((x) => x.sku === sku);
        const parsedProduct = parseProduct(itemdata, { storeConfig, isB2B });
        if (parsedProduct) {
          const skus = Object.keys(choosenProducts);
          if (!skus.includes(parsedProduct.sku)) {
            setChoosenProducts({
              ...choosenProducts,
              [parsedProduct.sku]: parsedProduct,
            });
          }
        }
      } else {
        fetchProductInfoFromMagento({ variables: { sku: [sku] } });
      }
    }
  };

  const removeItemFromListHandler = (sku) => {
    setLoadingState((state) => {
      const updates = [...state];
      updates.push(sku);
      return updates;
    });
    const obj = {
      listId: captureCustomerListInfo.listId,
      sku,
    };
    removeItemFromList(obj);
  };

  const onSelectedProductOptions = (options, sku, qty) => {
    setChoosenProducts((state) => {
      const updates = { ...state };
      if (options) {
        updates[sku].selectedOptions = Object.values(options);
      }
      updates[sku].quantityToAdd = qty;
      return updates;
    });
  };

  const onAddAllProductsToCart = () => {
    const productLines = [];
    const skus = Object.keys(choosenProducts);
    skus.forEach((sku) => {
      const obj = {
        sku,
        quantity: choosenProducts[sku].quantityToAdd || 1,
        selected_options: choosenProducts[sku].selectedOptions || [],
      };
      productLines.push(obj);
    });
    reAddItemsToCart(userContext.cartId, productLines);
  };

  const removeAllAndClear = () => {
    const obj = {
      listId: captureCustomerListInfo.listId,
    };
    removeAllItemsFromList(obj);
  };

  return (
    <MyQuickOrderControllerWrapper>
      <MyQuickOrderView
        container={{
          choosenProducts,
          pushItemToList,
          removeItemFromList: removeItemFromListHandler,
          onSelectedProductOptions,
        }}
        customerListModel={{
          captureCustomerListInfo,
          updateItemToList,
          loadWhilePreparing,
          setValidationState,
          removeAllAndClear,
        }}
        addToCartModel={{
          validationState,
          onAddAllProductsToCart,
          cartFailureCodes,
          loadingState,
          addToCartCompleted,
        }}
      />
    </MyQuickOrderControllerWrapper>
  );
};

MyQuickOrderController.propTypes = {
};
