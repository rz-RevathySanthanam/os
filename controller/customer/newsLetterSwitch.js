import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { UpdateCustomerNewLetterMuation, CustomerProfileMiniQuery } from '@/roanuz/store/customer/query';
import { NewsLetterSwitchView } from '@/roanuz/view/customer/newsLetterSwitch';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { NewsLetterStatusIndicator } from '@/roanuz/view/customer/myAccountDetails';
import { translateV2 } from '@/roanuz/lib/utils';

const NewsLetterSwitchControllerWrapper = styled.div`
`;

export const NewsLetterSwitchController = () => {
  const { data, loading, error: queryError } = useQuery(CustomerProfileMiniQuery);

  const customerdata = data && data.customer;

  const [updateCustomer,
    { error, loading: updateLoading },
  ] = useMutation(UpdateCustomerNewLetterMuation, {
    onCompleted: (updatedData) => {
      // Ensure customer newletter is updated
      if (updatedData.updateCustomer) {
        console.log('✅ Customer newsletter updated', updatedData, error);
      }
    },
    refetchQueries: [{ query: CustomerProfileMiniQuery }],
  });

  const onSave = (variables) => {
    updateCustomer({ variables });
  };

  return (
    <NewsLetterSwitchControllerWrapper>
      {loading && (<PageLoadingView message={translateV2('loadingMsg.PLEASE_WAIT_MSG')} />) }
      {queryError && (<PageErrorView error={queryError} />) }
      {data && (
        <NewsLetterStatusIndicator
          customerData={customerdata}
        />
      )}
      <NewsLetterSwitchView
        onSave={onSave}
        saveError={error}
        data={data}
        saving={updateLoading}
      />
    </NewsLetterSwitchControllerWrapper>
  );
};

NewsLetterSwitchController.propTypes = {
};
