import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { EditAccountView } from '@/roanuz/view/customer/editAccount';
import {
  UpdateCustomerMuation,
  CustomerProfileMiniQuery,
} from '@/roanuz/store/customer/query';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { MyAccountDetails } from '@/roanuz/view/customer/myAccountDetails';
import { SideBarView } from '@/roanuz/view/sideBar';
import { translateV2 } from '@/roanuz/lib/utils';
import { asRem } from '@/roanuz/lib/css';

const EditAccountControllerWrapper = styled.div`
`;

export const EditAccountController = () => {
  const { data, loading, error: queryError } = useQuery(CustomerProfileMiniQuery);

  const customerdata = data && data.customer;
  const [processing, setProcessing] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const [updateCustomer, { error }] = useMutation(UpdateCustomerMuation, {
    onCompleted: (updatedData) => {
      if (updatedData && updatedData.updateCustomer) {
        console.log('✅ Customer data updated', updatedData, error);
        setProcessing(false);
        setTimeout(() => {
          setShowSideBar(false);
        }, 300);
      } else {
        setProcessing(false);
      }
    },
    refetchQueries: [{ query: CustomerProfileMiniQuery }],
  });

  const onSave = (variables) => {
    setProcessing(true);
    updateCustomer({ variables });
  };

  return (
    <EditAccountControllerWrapper>
      {loading && (<PageLoadingView message={translateV2('loadingMsg.PLEASE_WAIT_MSG')} />) }
      {queryError && (<PageErrorView error={queryError} />) }
      {customerdata && (
        <MyAccountDetails
          customerData={customerdata}
          onEdit={() => {
            setShowSideBar(true);
          }}
        />
      )}
      <SideBarView
        show={showSideBar}
        onClose={() => setShowSideBar(false)}
        animationMode="SlideInRight"
        showClose
        className="customerpage-sidebar"
        containerWidth={asRem(375)}
        titleText={translateV2('myPages.PERSONAL_INFORMATION')}
      >
        <EditAccountView
          onSave={onSave}
          saving={processing}
          saveError={error}
          data={customerdata}
        />
      </SideBarView>
    </EditAccountControllerWrapper>
  );
};

EditAccountController.propTypes = {
};
