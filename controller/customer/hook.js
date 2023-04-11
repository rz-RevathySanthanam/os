import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/roanuz/store/core/context';
import {
  CustomerAllListsQuery, CreateCustomerListMutation,
  CustomerListQuery, AddOrUpdateItemsToCustomerListMutation,
  RemoveItemFromCustomerListMutation, RemoveAllItemsFromCustomerListMutation,
} from '@/roanuz/store/customer/query';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

export const useAddOrUpdateItemsToCustomerList = ({
  onCompleted = null,
}) => {
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  const [
    addOrUpdateItemsToList, addOrUpdateItemsToListResponse,
  ] = useMutation(AddOrUpdateItemsToCustomerListMutation, {
    onCompleted: (addedData) => {
      setResponse({
        ...response,
        loading: false,
        error: null,
        data: addedData,
      });
      if (onCompleted) {
        onCompleted(addedData);
      }
      setTimeout(() => {
        setResponse((state) => ({
          ...state,
          data: null,
        }));
      }, 3000);
    },
  });

  useEffect(() => {
    setResponse((state) => ({
      ...state,
      loading: addOrUpdateItemsToListResponse.loading,
      error: addOrUpdateItemsToListResponse.error,
    }));
  }, [addOrUpdateItemsToListResponse.loading, addOrUpdateItemsToListResponse.error]);

  const callAddOrUpdateItemsToList = (item) => {
    const customerVariables = { ...item };
    console.log('⏳ Adding / Updating Items to List', customerVariables);
    addOrUpdateItemsToList({
      variables: { ...customerVariables },
    });
  };

  const onAddOrUpdateItemsToList = (item) => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    callAddOrUpdateItemsToList(item);
  };

  return [onAddOrUpdateItemsToList, response];
};

export const useCustomerAllLists = (listTypeKey, skipRules) => {
  const userContext = useContext(UserContext);

  const [customerListInfo, setCustomerListInfo] = useState();
  const {
    loading,
    error,
    data,
  } = useQuery(CustomerAllListsQuery, {
    variables: {
      rzCustomerKey: userContext.rzUuid,
    },
    skip: !userContext.rzUuid || skipRules,
  });

  const [createCustomerList, createCustomerListResponse] = useMutation(CreateCustomerListMutation, {
    onCompleted: (createData) => {
      console.log('createData', createData);
      setCustomerListInfo(createData.createCustomerList);
      if (createData && createData.createCustomerList && createData.createCustomerList.list_id) {
        userContext.setRoanuzCustomCookie('b2b_user_quickorder_list_id', createData.createCustomerList.list_id);
      }
    },
  });

  const [fetchCustomerList, {
    loading: customerListLoading,
    error: customerListError,
    data: customerListData,
    called: fetchCustomerListCalled,
  }] = useLazyQuery(CustomerListQuery);

  useEffect(() => {
    if (createCustomerListResponse && createCustomerListResponse.error) {
      console.error('createCustomerListError', createCustomerListResponse.error);
    }
  }, [createCustomerListResponse.error]);

  useEffect(() => {
    if (data && data.getAllLists) {
      if (data.getAllLists.length === 0) {
        const variables = {
          rzCustomerKey: userContext.rzUuid,
          listType: listTypeKey,
        };
        createCustomerList({ variables });
      } else {
        const listInfo = data.getAllLists.find((a) => a.list_type === listTypeKey);
        if (!fetchCustomerListCalled && listInfo.list_id) {
          userContext.setRoanuzCustomCookie('b2b_user_quickorder_list_id', listInfo.list_id);
          fetchCustomerList({ variables: { listId: listInfo.list_id } });
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (customerListData && customerListData.getCustomerList) {
      setCustomerListInfo(customerListData.getCustomerList);
    }
  }, [customerListData]);

  if (!userContext.rzUuid) {
    return {
      loading: false,
      error: { message: 'OOPS! UUID is Missing' },
      data: null,
    };
  }

  return {
    loading: loading || createCustomerListResponse.loading || customerListLoading,
    error: error || createCustomerListResponse.error || customerListError,
    data: data || createCustomerListResponse.data,
    customerListInfo,
  };
};

export const useRemoveItemFromList = ({
  onCompleted = null,
}) => {
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  const [skuToRemoved, setSkuToRemoved] = useState();

  const [
    removeItemFromList, removeItemFromListResponse,
  ] = useMutation(RemoveItemFromCustomerListMutation, {
    onCompleted: (removeData) => {
      setResponse({
        ...response,
        loading: false,
        error: null,
        data: removeData,
      });
      if (onCompleted) {
        onCompleted(removeData, skuToRemoved);
      }
    },
  });

  useEffect(() => {
    setResponse((state) => ({
      ...state,
      loading: removeItemFromListResponse.loading,
      error: removeItemFromListResponse.error,
    }));
  }, [removeItemFromListResponse.loading, removeItemFromListResponse.error]);

  const callRemoveItemFromList = (item) => {
    const variables = { ...item };
    setSkuToRemoved(item.sku);
    console.log('⏳ Removing Item from List', variables);
    removeItemFromList({
      variables: { ...variables },
    });
  };

  const onRemoveItemFromList = (item) => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    callRemoveItemFromList(item);
  };

  return [onRemoveItemFromList, response];
};

export const useRemoveAllItemsFromList = ({
  onCompleted = null,
}) => {
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  const [
    removeAllItemsFromList, removeAllItemsFromListResponse,
  ] = useMutation(RemoveAllItemsFromCustomerListMutation, {
    onCompleted: (removeAllData) => {
      setResponse({
        ...response,
        loading: false,
        error: null,
        data: removeAllData,
      });
      if (onCompleted) {
        onCompleted(removeAllData);
      }
    },
  });

  useEffect(() => {
    setResponse((state) => ({
      ...state,
      loading: removeAllItemsFromListResponse.loading,
      error: removeAllItemsFromListResponse.error,
    }));
  }, [removeAllItemsFromListResponse.loading, removeAllItemsFromListResponse.error]);

  const callRemoveAllItemsFromList = (item) => {
    const variables = { ...item };
    console.log('⏳ Removing All Items from List', variables);
    removeAllItemsFromList({
      variables: { ...variables },
    });
  };

  const onRemoveAllItemsFromList = (item) => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    callRemoveAllItemsFromList(item);
  };

  return [onRemoveAllItemsFromList, response];
};
