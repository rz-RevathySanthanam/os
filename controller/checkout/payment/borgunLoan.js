import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import {
  Bold16, TextMedium16,
} from '@/roanuz/typopgraphy';
import { PaymentMethodItemView } from '@/roanuz/view/checkout/payment/paymentMethodItem';
import { PaymentMethod, buildCreateOrderInput, buildSuccessUrl } from '@/roanuz/view/checkout/payment/model';
import {
  SetPaymentMethodAndOrderMutation,
  BorgunPaymentLoansQuery,
  BorgunLoanTokenQuery,
} from '@/roanuz/store/payment/query';
import { asRem } from '@/roanuz/lib/css';
import { beforeOrderCreate, afterOrderCreate } from '@/roanuz/lib/cart';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { applyMask } from '@/roanuz/lib/utils';
import Config from '@/config';
import { PaymentLoadingView } from '@/roanuz/components/PaymentLoadingView';
import { PaymentMethodController } from './methodController';
import { BorgunLoanMethodView } from './borgunLoanMethods';

const PaymentMethodBorgunLoanPaymentControllerWrapper = styled.div`
  .loan-block {
    margin-bottom: ${asRem(16)};
  }
  .debug-loading-view, .debug-error-view {
    padding-bottom: ${asRem(10)};
    font-size: ${asRem(14)};
    .row >div {
      transform: initial !important;
    }
  }
  .debug-error-view {
    color: var(--color-error);
  }
`;

export function processBorgunLoan(response) {
  window.location.href = response.uiUrl + response.token;
  console.log('Redirecting to payment UI', response);
}

export function applyTelephoneMask(value) {
  if (!value) {
    return '-';
  }
  const countryPhoneCode = value.slice(0, Config.DefaultCountryPhoneCode.length);
  if (value.includes('+') && (countryPhoneCode === Config.DefaultCountryPhoneCode)) {
    return value.replace(`${Config.DefaultCountryPhoneCode}`, '');
  }
  return value;
}

export const PaymentMethodBorgunLoanPaymentController = ({
  cart,
  field, saving,
  method,
  image,
  selected,
  children,
  buttonText,
  buttonType,
  saveError,
  // eslint-disable-next-line no-unused-vars
  onClick,
  onOrderStatus,
}) => {
  const {
    data: loansData, error: loansError, loading: loansLoading,
  } = useQuery(BorgunPaymentLoansQuery, {
    fetchPolicy: 'no-cache',
    variables: { totalAmount: Math.round(cart.prices.grand_total.value) },
    skip: (cart.prices.grand_total.value < Config.MinAmountForLoan),
  });

  const [loanType, setLoanType] = useState('');
  const [noLoansExists, setNoLoansExists] = useState(false);
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [loaderTillNextRoute, setLoaderTillNextRoute] = useState(false);
  const [errorBorgunLoanToken, setErrorBorgunLoanToken] = useState();

  useEffect(() => {
    if (loansData && loansData.rzBorgunLoans && loansData.rzBorgunLoans.loanList) {
      if (!loansData.rzBorgunLoans.loanList.length) {
        setNoLoansExists(true);
      }
      if (loansData.rzBorgunLoans.loanList.length === 1) {
        setLoanType(loansData.rzBorgunLoans.loanList[0]);
      }
    }
  }, [loansData]);

  const selectedLoan = (loan) => {
    setLoanType(loan);
  };

  const [
    getToken,
    { loading: getTokenLoading, error: getTokenError, data: tokenData },
  ] = useLazyQuery(BorgunLoanTokenQuery, { fetchPolicy: 'no-cache' });

  const onCreateOrder = (data) => {
    if (!data.placeOrder) {
      console.log('Error Creating Order', data);
      setLoaderTillNextRoute(false);
      return;
    }

    afterOrderCreate(data.placeOrder);
    const newOrderNumber = data.placeOrder.order.order_number;
    const newOrderId = data.placeOrder.order.order_id;
    setOrderId(newOrderId);
    if (onOrderStatus) {
      onOrderStatus({
        orderId: newOrderId,
        orderNumber: newOrderNumber,
      });
    }

    let street = '';
    if (cart.shippingAddress.street) {
      [street] = cart.shippingAddress.street;
    }

    getToken({
      variables: {
        orderId: newOrderNumber,
        loanTypeId: parseInt(loanType.loanTypeId, 10),
        numberOfPayments: parseInt(loanType.loanMonth, 10),
        name: cart.shippingAddress.firstname,
        street: applyMask(street),
        postCode: parseInt(applyMask(cart.shippingAddress.postcode), 10),
        city: applyMask(cart.shippingAddress.city),
        telephone: applyTelephoneMask(cart.shippingAddress.telephone),
        email: cart.email,
        ssn: cart.shippingAddress.rz_is_ssn,
        totalAmount: cart.prices.grand_total.value,
        successUrl: `${buildSuccessUrl(
          Config.PublicURL || router.basePath, PaymentMethod.borgunloanpayment.uid,
        )}?orderNumber=${newOrderNumber}`,
      },
    });
  };

  const [
    createOrderMethod,
    { error: createOrderError, loading: createOrderLoading },
  ] = useMutation(SetPaymentMethodAndOrderMutation, {
    onCompleted: (data) => onCreateOrder(data),
  });

  useEffect(() => {
    if (!createOrderError) return;
    setLoaderTillNextRoute(false);
  }, [createOrderError]);

  useEffect(() => {
    if (tokenData && tokenData.rzBorgunLoanToken.status) {
      processBorgunLoan(
        tokenData.rzBorgunLoanToken,
      );
      return;
    }

    if (tokenData && tokenData.rzBorgunLoanToken && !tokenData.rzBorgunLoanToken.uiUrl) {
      setLoaderTillNextRoute(false);
      setErrorBorgunLoanToken({ message: tokenData.rzBorgunLoanToken.msg });
    }

    if (onOrderStatus) {
      onOrderStatus({
        error: getTokenError || (tokenData
          && !tokenData.rzBorgunLoanToken.status && tokenData.rzBorgunLoanToken.msg
          ? { message: tokenData.rzBorgunLoanToken.msg }
          : null),
        loading: getTokenLoading,
        completed:
          tokenData !== undefined && tokenData !== null && tokenData.rzBorgunLoanToken.status,
      });
    }
  }, [
    getTokenLoading,
    getTokenError,
    tokenData,
  ]);

  useEffect(() => {
    setLoaderTillNextRoute(false);
  }, [getTokenError]);

  const process = () => {
    setLoaderTillNextRoute(true);
    console.log('Creating Borgun Loan Order', loanType);
    beforeOrderCreate(cart, { paymentMethod: method.code });
    createOrderMethod({
      variables: {
        ...buildCreateOrderInput(cart, { paymentMethod: method.code }),
      },
    });
  };

  // For fixing the loader issue in chrome incognito tab
  useEffect(() => {
    function changeLoaderstate() {
      setTimeout(() => setLoaderTillNextRoute(false), 8000);
    }

    window.addEventListener('beforeunload', changeLoaderstate);
    return () => window.removeEventListener('beforeunload', changeLoaderstate);
  }, []);

  if (cart.prices.grand_total.value < Config.MinAmountForLoan) {
    return null;
  }

  return (
    <PaymentMethodBorgunLoanPaymentControllerWrapper>
      {loaderTillNextRoute && (<PaymentLoadingView />)}
      <PaymentMethodItemView
        cart={cart}
        field={field}
        saving={
          saving || loansLoading || !loanType || createOrderLoading
          || loaderTillNextRoute || noLoansExists
        }
        method={method}
        image={image}
        selected={selected}
        buttonText={buttonText}
        buttonType={buttonType || 'button'}
        saveError={saveError || loansError || createOrderError || getTokenError
          || errorBorgunLoanToken}
        onClick={process}
        onOrderStatus={onOrderStatus}
      >
        {loansLoading && (
          <div>
            <LoadingView />
          </div>
        )}
        {loansError && <ErrorView error={loansError} />}
        {noLoansExists && <ErrorView error={{ message: 'Engin lán í boði' }} />}
        {loansData && loansData.rzBorgunLoans && loansData.rzBorgunLoans.loanList.map((loan) => (
          <div key={loan.loanTypeId} className="loan-block">
            {loansData.rzBorgunLoans.loanList.length === 1
              ? (
                <>
                  <Bold16>{loan.loanName}</Bold16>
                  <TextMedium16>{loan.loanInfo}</TextMedium16>
                </>
              )
              : (
                <BorgunLoanMethodView
                  loan={loan}
                  selectFormField={{
                    type: 'radio',
                    name: <Bold16>{loan.loanName}</Bold16>,
                    id: 'loanTypeId',
                    value: loan.loanTypeId,
                    onChange: () => {
                      selectedLoan(loan);
                    },
                  }}
                />
              )}
          </div>
        ))}
        {children}
      </PaymentMethodItemView>
    </PaymentMethodBorgunLoanPaymentControllerWrapper>
  );
};

PaymentMethodBorgunLoanPaymentController.propTypes = {
  ...PaymentMethodController.propTypes,
};
