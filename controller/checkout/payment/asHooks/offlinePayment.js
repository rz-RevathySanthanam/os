import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { SetPaymentMethodAndOrderMutation } from '@/roanuz/store/payment/query';
import { buildCreateOrderInput } from '@/roanuz/view/checkout/payment/model';
import { beforeOrderCreate, afterOrderCreate, LocalCartStorage } from '@/roanuz/lib/cart';

export const useOfflinePayment = ({
  cart, onOrderStatus,
  method,
  setLoaderTillNextRoute,
}) => {
  const onCreateOrder = (data) => {
    if (!data.placeOrder) {
      LocalCartStorage.remove();
      console.log('Error Creating Order');
      setLoaderTillNextRoute(false);
      return;
    }

    afterOrderCreate(data.placeOrder);
    const newOrderNumber = data.placeOrder.order.order_number;
    const newOrderId = data.placeOrder.order.order_id;
    if (onOrderStatus) {
      onOrderStatus({
        orderId: newOrderId,
        orderNumber: newOrderNumber,
        completed: true,
      });
    }
  };

  const [
    createOrderMethod,
    { called: createOrderCalled, error: createOrderError, loading: createOrderLoading },
  ] = useMutation(SetPaymentMethodAndOrderMutation, {
    onCompleted: (data) => onCreateOrder(data),
  });

  useEffect(() => {
    if (onOrderStatus) {
      onOrderStatus({
        error: createOrderError,
        loading: createOrderLoading,
        completed: createOrderCalled && (!createOrderLoading) && (!createOrderError),
      });
    }
    setLoaderTillNextRoute(false);
  }, [createOrderError]);

  const onSubmit = (billingInfo) => {
    setLoaderTillNextRoute(true);
    console.log('Select Payment Method', method);

    const methodRef = { paymentMethod: method };
    beforeOrderCreate(cart, methodRef, billingInfo);
    createOrderMethod({
      variables: { ...buildCreateOrderInput(cart, methodRef) },
    });
  };

  return [onSubmit, { loading: createOrderLoading, error: createOrderError }];
};
