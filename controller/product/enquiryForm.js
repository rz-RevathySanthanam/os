import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EnquiryFormView } from '@/roanuz/view/product/enquiryForm';
// INFO: I used custom created one. didnt use this below default magento's.
// import { ProductEnquiryMutation } from '@/roanuz/store/customer/query';

import { useSendCustomInformation } from '@/roanuz/controller/product/enquiryHit';

const EnquiryFormControllerWrapper = styled.div`
`;

export const EnquiryFormController = ({ product }) => {
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
      productSkus: product.sku,
      sender: {
        ...formData,
      },
    };
    sendForm({ variables });
  };

  return (
    <EnquiryFormControllerWrapper>
      <EnquiryFormView
        product={product}
        onSave={handleForm}
        saving={loading}
        saveError={error}
        saveSuccess={sendCustomInformationData}
      />
    </EnquiryFormControllerWrapper>
  );
};

EnquiryFormController.propTypes = {
  product: PropTypes.object.isRequired,
};
