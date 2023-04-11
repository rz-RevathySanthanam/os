import React from 'react';
import { ContactUsView } from '@/roanuz/view/contactUsView';
import { useSendCustomInformation } from '@/roanuz/controller/product/enquiryHit';

export const ContactUsPageController = () => {
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
      sender: {
        ...formData,
      },
    };
    console.log('variables', variables);
    sendForm({ variables });
  };

  return (
    <ContactUsView
      onSave={handleForm}
      saving={loading}
      saveError={error}
      saveSuccess={sendCustomInformationData}
    />
  );
};

ContactUsPageController.propTypes = {
};
