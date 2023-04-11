import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PaymentMethodPickerView } from '@/roanuz/view/checkout/payment/paymentMethods';
import { PaymentMethod } from '@/roanuz/view/checkout/payment/model';
import { Text16 } from '@/roanuz/typopgraphy';
import { translateV2 } from '@/roanuz/lib/utils';
import Config from '@/config';
import { PaymentMethodController } from '@/roanuz/controller/checkout/payment/methodController';
// TODO: Above controler cannot be inside view

const PaymentMethodPickerControllerWrapper = styled.div`
`;

export const PaymentMethodsView = ({
  cart, formikStateFields,
  paymentModel,
}) => {
  const {
    values,
  } = formikStateFields;

  const {
    paymentLoading,
    paymentError,
  } = paymentModel;

  const buildController = ((method, valuesRef) => {
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
      // saving: paymentLoading || loaderTillNextRoute,
      saving: paymentLoading,
      saveError: paymentError,
      selected: method.code === valuesRef.paymentMethod,
      image,
      cart,
      method,
    };

    // if (methodConfig.isNetgiro) {
    //   return (
    //     <PaymentMethodNetgiroController
    //       {...params}
    //     />
    //   );
    // }

    // if (methodConfig.isSiminn) {
    //   return (
    //     <PaymentMethodSiminnController
    //       {...params}
    //     />
    //   );
    // }

    // if (methodConfig.isBorgunPay) {
    //   return (
    //     <PaymentMethodBorgunPaymentController
    //       {...params}
    //     />
    //   );
    // }

    // if (methodConfig.isBorgunLoan) {
    //   return (
    //     <PaymentMethodBorgunLoanPaymentController
    //       {...params}
    //     />
    //   );
    // }

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
              {translateV2('fields.EMAIL_US')}
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
      <PaymentMethodPickerView
        cart={cart}
      >
        {cart.availablePaymentMethods.map((method) => (
          <div key={method.code}>
            {buildController(method, values)}
          </div>
        ))}
      </PaymentMethodPickerView>
    </PaymentMethodPickerControllerWrapper>
  );
};

PaymentMethodsView.propTypes = {
  cart: PropTypes.object.isRequired,
  formikStateFields: PropTypes.object.isRequired,
  paymentModel: PropTypes.object.isRequired,
};
