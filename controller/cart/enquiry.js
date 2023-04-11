import React from 'react';
import PropTypes from 'prop-types';
import { CartProductsEnquiryFormView } from '@/roanuz/view/cart/enquiryForm';

import { useSendCustomInformation } from '@/roanuz/controller/product/enquiryHit';

export const CartProductsEnquiryFormController = ({ cartId }) => {
  const [
    sendForm,
    { loading, error, data: sendCustomInformationData },
  ] = useSendCustomInformation({
    onCompleted: (data) => {
      if (data && data.rzSendCustomInformation && data.rzSendCustomInformation.status) {
        console.log('Sent ✅.', data);
      }
    },
  });

  const handleForm = (formData) => {
    const variables = {
      cartId,
      sender: {
        ...formData,
      },
    };
    console.log('variables', variables);
    sendForm({ variables });
  };

  return (
    <CartProductsEnquiryFormView
      onSave={handleForm}
      saving={loading}
      saveError={error}
      saveSuccess={sendCustomInformationData}
      title="Stór pöntun eða veisla í vændum?"
    />
  );
};

CartProductsEnquiryFormController.propTypes = {
  cartId: PropTypes.string.isRequired,
};
