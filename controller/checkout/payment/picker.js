import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { PaymentMethodPickerView } from '@/roanuz/view/checkout/payment/paymentMethods';
import { PaymentMethod, buildCreateOrderInput } from '@/roanuz/view/checkout/payment/model';
import { SetPaymentMethodAndOrderMutation } from '@/roanuz/store/payment/query';
import { afterOrderCreate, beforeOrderCreate, LocalCartStorage } from '@/roanuz/lib/cart';
import { Text16 } from '@/roanuz/typopgraphy';
import Config from '@/config';
import { translateV2 } from '@/roanuz/lib/utils';
import { PaymentMethodNetgiroController } from './netgiro';
import { PaymentMethodSiminnController } from './siminn';
import { PaymentMethodBorgunPaymentController } from './borgun';
import { PaymentMethodController } from './methodController';
import { PaymentMethodBorgunLoanPaymentController } from './borgunLoan';

const PaymentMethodPickerControllerWrapper = styled.div`
`;

export const PaymentMethodPickerController = ({
  cart, onOrderStatus,
}) => {
  const paymentMethod = cart.paymentMethod || {};
  const [formInitVal] = useState({
    paymentMethod: paymentMethod.code || '',
  });
  const [loaderTillNextRoute, setLoaderTillNextRoute] = useState(false);

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

  const onSubmit = (values) => {
    setLoaderTillNextRoute(true);
    console.log('Select Payment Method', values);
    beforeOrderCreate(cart, values);
    createOrderMethod({
      variables: { ...buildCreateOrderInput(cart, values) },
    });
  };

  const buildController = ((method, values) => {
    let key = '';
    let image = null;
    let methodConfig = PaymentMethod[method.code];
    if (!PaymentMethod[method.code]) {
      console.log('Unknown Payment Method', method);
      key = method.code;
      methodConfig = {};
    } else {
      key = PaymentMethod[method.code].uid;
      image = {
        alt: `Image of ${method.title}`,
        src: PaymentMethod[method.code].image,
      };
    }

    const params = {
      key,
      field: {
        type: 'radio',
        id: 'paymentMethod',
        name: '',
        value: method.code,
      },
      saving: createOrderLoading || loaderTillNextRoute,
      saveError: createOrderError,
      selected: method.code === values.paymentMethod,
      image,
      cart,
      method,
      onOrderStatus,
    };

    if (methodConfig.isNetgiro) {
      return (
        <PaymentMethodNetgiroController
          {...params}
        />
      );
    }

    if (methodConfig.isSiminn) {
      return (
        <PaymentMethodSiminnController
          {...params}
        />
      );
    }

    if (methodConfig.isBorgunPay) {
      return (
        <PaymentMethodBorgunPaymentController
          {...params}
        />
      );
    }

    if (methodConfig.isBorgunLoan) {
      return (
        <PaymentMethodBorgunLoanPaymentController
          {...params}
        />
      );
    }

    if (methodConfig.isInvoice) {
      return (
        <PaymentMethodController
          {...params}
        >
          <div className="transfer-details">
            <Text16>
              {translateV2('fields.SSN')}
              :&nbsp;
              <strong>{Config.MerchantIdNumber}</strong>
            </Text16>
            <Text16>
              {translateV2('fields.ACCOUNT_NUMBER')}
              :&nbsp;
              <strong>{Config.MerchantAccountNumber}</strong>
            </Text16>
            <Text16>
              {translateV2('fields.MAIL_US')}
              &nbsp;
              <a href={`mailto:${Config.EnquiryFormRecipientsEmail}`}>{Config.EnquiryFormRecipientsEmail}</a>
            </Text16>
          </div>
        </PaymentMethodController>
      );
    }

    if (!Object.keys(methodConfig).length) {
      return null;
    }

    return (
      <PaymentMethodController
        {...params}
      />
    );
  });

  return (
    <PaymentMethodPickerControllerWrapper>
      <Formik
        initialValues={formInitVal}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ values }) => (
          <Form>
            <PaymentMethodPickerView
              cart={cart}
              onOrderStatus={onOrderStatus}
              onSubmit={onSubmit}
            >
              {cart.availablePaymentMethods.map((method) => (
                <div key={method.code}>
                  {buildController(method, values)}
                </div>
              ))}
            </PaymentMethodPickerView>
          </Form>
        )}
      </Formik>

    </PaymentMethodPickerControllerWrapper>
  );
};

PaymentMethodPickerController.propTypes = {
  cart: PropTypes.object.isRequired,
  onOrderStatus: PropTypes.func,
};
