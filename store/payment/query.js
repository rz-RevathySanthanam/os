import { gql } from '@apollo/client';

export const NetgiroTokenQuery = gql`
  query rzNetgiroToken($orderNumber: String!, $totalAmount: Int!) {
    rzNetgiroToken(order_number: $orderNumber, total_amount: $totalAmount) {
      action
      fields {
        ApplicationID
        Signature
        TotalAmount
        OrderId
        ClientInfo
      }
    }
  }
`;

export const PaymentCaptureNetgiroMutation = gql`
  mutation rzPaymentCaptureNetgiro($orderNumber: String!, $success: String!, $signature: String!) {
    rzPaymentCaptureNetgiro(
      orderid: $orderNumber,
      success: $success,
      signature: $signature
    ) {
      status
    }
  }
`;

export const PaymentSiminnOrderCreate = gql`
  mutation rzPaymentSiminnCreateOrder($orderNumber: String!) {
    rzPaymentSiminnCreateOrder(
      orderid: $orderNumber,
    ) {
      error
      orderKey
      message
      userMessage
    }
  }
`;

export const PaymentSiminnOrderStatus = gql`
  query rzSiminnOrderStatus($orderKey: String!) {
    rzSiminnOrderStatus(
      siminn_order_key: $orderKey,
    ) {
      error
      message
      userMessage
      statusAuthorized
      statusCanceled
      statusPending
    }
  }
`;

export const BorgunPaymentTokenQuery = gql`
  query rzSaltPayCardToken($orderIncrementId: String!, $successUrl: String!) {
    rzSaltPayCardToken(orderIncrementId: $orderIncrementId, successUrl: $successUrl) {
      action
      fields {
        merchantId
        paymentGatewayId
        checkHash
      }
    }
  }
`;

export const PaymentCaptureBorgunMutation = gql`
mutation rzPaymentSaltPayCardConfirmation($orderIncrementId: String!, $status: String!, $authorizationcode: String!, $orderhash: String!) {
  rzPaymentSaltPayCardConfirmation(
      orderIncrementId: $orderIncrementId,
      status: $status,
      authorizationCode: $authorizationcode,
      orderHash: $orderhash,
    ) {
      status
      saltPayCardStatus
    }
  }
`;

export const BorgunPaymentLoansQuery = gql`
  query rzBorgunLoans($totalAmount: Int!) {
    rzBorgunLoans(totalAmount: $totalAmount) {
      loanList {
        loanMonth
        loanTypeId
        loanName
        loanInfo
      }
      status
    }
  }
`;

export const BorgunLoanTokenQuery = gql`
  query rzBorgunLoanToken(
      $orderId: String!, $loanTypeId: Int!,
      $numberOfPayments: Int!, $name: String!,
      $street: String!, $postCode: Int!, $city: String!,
      $telephone: String!, $email: String!,
      $ssn: String!, $totalAmount: Int!,
      $successUrl: String!,
    ) {
    rzBorgunLoanToken(
      orderId: $orderId,
      loanTypeId: $loanTypeId,
      numberOfPayments: $numberOfPayments,
      name: $name,
      street: $street,
      postCode: $postCode,
      city: $city,
      telephone: $telephone,
      email: $email,
      ssn: $ssn,
      totalAmount: $totalAmount,
      successUrl: $successUrl
    ) {
      uiUrl
      token
      msg
      status
    }
  }
`;

export const PaymentCaptureBorgunLoanMutation = gql`
  mutation rzPaymentCaptureBorgunLoan($orderid: String!, $token: String!, $redirectUrl: String!) {
    rzPaymentCaptureBorgunLoan(
      orderId: $orderid,
      token: $token,
      redirectUrl: $redirectUrl,
    ) {
      loanStatus
      msg
      status
    }
  }
`;

export const GetBorgunLoanToken = gql`
  query rzGetBorgunLoanToken($orderId: String!) {
    rzGetBorgunLoanToken(
      orderId: $orderId,
    ) {
      borgunLoanToken
    }
  }
`;

export const SetPaymentMethodAndOrderMutation = gql`
  mutation setPaymentMethodAndOrderMutation(
    $payment: SetPaymentMethodOnCartInput!
    $order: PlaceOrderInput!
  ) {
    setPaymentMethodOnCart (input: $payment) { cart { id } }
    placeOrder (input: $order) { order { order_number, order_id } }
  }
`;
