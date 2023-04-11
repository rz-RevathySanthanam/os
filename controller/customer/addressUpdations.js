import {
  CustomerAddressesQuery,
  DeleteCustomerAddress,
  CreateCustomerAddressMutation,
  UpdateCustomerAddressMutation,
} from '@/roanuz/store/customer/query';
import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

export const useCreateOrUpdateCustomerAddress = ({
  onCompleted = null,
}) => {
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  const [
    createCustomerAddress, createCustomerAddressResponse,
  ] = useMutation(CreateCustomerAddressMutation, {
    onCompleted: async (createdData) => {
      if (onCompleted) {
        await onCompleted(createdData);
      }
    },
  });

  const [
    updateCustomerAddress, updateCustomerAddressResponse,
  ] = useMutation(UpdateCustomerAddressMutation, {
    onCompleted: async (updatedData) => {
      if (onCompleted) {
        await onCompleted(updatedData);
      }
      return updatedData;
    },
  });

  useEffect(() => {
    setResponse((state) => ({
      ...state,
      loading: createCustomerAddressResponse.loading || updateCustomerAddressResponse.loading,
      error: createCustomerAddressResponse.error || updateCustomerAddressResponse.error,
    }));
  }, [
    createCustomerAddressResponse.loading,
    createCustomerAddressResponse.error,
    updateCustomerAddressResponse.loading,
    updateCustomerAddressResponse.error,
  ]);

  const callCreateCustomerAddress = async (variables) => {
    const refetchQueries = [{ query: CustomerAddressesQuery }];
    if (variables.variables && variables.variables.id) {
      console.log('⏳ Updating Address', variables);
      const updatedResp = await updateCustomerAddress({
        ...variables,
        refetchQueries,
      });
      return updatedResp;
    }
    console.log('⏳ Creating Address', variables);
    const createdResp = await createCustomerAddress({
      ...variables,
      refetchQueries,
    });
    return createdResp;
  };

  const onCreateCustomerAddress = async (variables) => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    const data = await callCreateCustomerAddress(variables);
    return data;
  };

  return [onCreateCustomerAddress, response];
};

export const useDeleteCustomerAddress = ({
  onCompleted = null,
}) => {
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  const [
    deleteCustomerAddress, deleteCustomerAddressResponse,
  ] = useMutation(DeleteCustomerAddress, {
    onCompleted: (deletedData) => {
      if (onCompleted) {
        onCompleted(deletedData);
      }
    },
  });

  useEffect(() => {
    setResponse((state) => ({
      ...state,
      loading: deleteCustomerAddressResponse.loading,
      error: deleteCustomerAddressResponse.error,
    }));
  }, [
    deleteCustomerAddressResponse.loading,
    deleteCustomerAddressResponse.error,
  ]);

  const callDeleteCustomerAddress = (variables) => {
    console.log('⏳ Deleting Address', variables);
    const refetchQueries = [{ query: CustomerAddressesQuery }];
    deleteCustomerAddress({
      ...variables,
      refetchQueries,
    });
  };

  const onDeleteCustomerAddress = (variables) => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    callDeleteCustomerAddress(variables);
  };

  return [onDeleteCustomerAddress, response];
};
