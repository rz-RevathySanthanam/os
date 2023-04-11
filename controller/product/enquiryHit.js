import {
  SendCustomInformation,
} from '@/roanuz/store/customer/query';
import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

export const useSendCustomInformation = ({
  onCompleted = null,
}) => {
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  const [
    sendCustomInformation, sendCustomInformationResponse,
  ] = useMutation(SendCustomInformation, {
    onCompleted: async (sentData) => {
      setResponse({
        ...response,
        loading: false,
        error: null,
        data: sentData,
      });
      if (onCompleted) {
        await onCompleted(sentData);
      }
    },
  });

  useEffect(() => {
    setResponse((state) => ({
      ...state,
      loading: sendCustomInformationResponse.loading,
      error: sendCustomInformationResponse.error,
    }));
  }, [
    sendCustomInformationResponse.loading,
    sendCustomInformationResponse.error,
  ]);

  const callSendCustomInformation = async (variables) => {
    console.log('⏳ Sending Enquiry', variables);
    const sentResp = await sendCustomInformation({
      ...variables,
    });
    return sentResp;
  };

  const onSendCustomInformation = async (variables) => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    const data = await callSendCustomInformation(variables);
    return data;
  };

  return [onSendCustomInformation, response];
};
