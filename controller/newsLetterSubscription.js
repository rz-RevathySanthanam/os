import React, { useEffect, useState } from 'react';
import { NewsLetterSubscription } from '@/roanuz/view/footer/newsLetterSubscription';
import { SubscribeEmailToNewsletterMutation } from '@/roanuz/store/customer/query';
import { useMutation } from '@apollo/client';

export const NewsLetterSubscriptionController = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formInitValue, setFormInitValue] = useState('');

  const [response, setResponse] = useState({
    error: null,
  });

  const [updateCustomer, updateCustomerResponse] = useMutation(SubscribeEmailToNewsletterMutation, {
    onCompleted: (updatedData) => {
      // Ensure customer newletter is updated
      if (updatedData.subscribeEmailToNewsletter) {
        console.log('✅ newsletter subscribed', updatedData.subscribeEmailToNewsletter);
        setShowPopup(true);
        setFormInitValue('');
      }
      setTimeout(() => {
        setResponse((state) => ({
          ...state,
          error: null,
        }));
      }, 3000);
    },
  });

  useEffect(() => {
    setResponse((state) => ({
      ...state,
      error: updateCustomerResponse.error,
    }));
  }, [updateCustomerResponse.error]);

  const onSave = (variables) => {
    updateCustomer({ variables });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const buildSaveInput = {
      email: formInitValue,
    };

    if (onSave) {
      onSave(buildSaveInput);
    }
  };

  return (
    <NewsLetterSubscription
      showPopup={showPopup}
      submitHandler={submitHandler}
      error={response.error}
      onClosePopup={() => setShowPopup(false)}
      formInitValue={formInitValue}
      setFormInitValue={setFormInitValue}
      enableInputIcon
      roundedCorners
    />
  );
};
