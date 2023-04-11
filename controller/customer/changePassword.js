import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { EditPasswordView } from '@/roanuz/view/customer/changePassword';
import { UpdateCustomerPasswordMuation } from '@/roanuz/store/customer/query';
import { MyPasswordDetails } from '@/roanuz/view/customer/myAccountDetails';
import { SideBarView } from '@/roanuz/view/sideBar';
import { translateV2 } from '@/roanuz/lib/utils';
import { asRem } from '@/roanuz/lib/css';

const EditPasswordControllerWrapper = styled.div`
`;

export const EditPasswordController = () => {
  const [processing, setProcessing] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const [updateCustomerPassword, { error }] = useMutation(UpdateCustomerPasswordMuation, {
    onCompleted: (updatedData) => {
      if (updatedData && updatedData.changeCustomerPassword) {
        console.log('✅ Customer Password updated', updatedData, error);
        setProcessing(false);
        setTimeout(() => {
          setShowSideBar(false);
        }, 300);
      } else {
        setProcessing(false);
      }
    },
  });

  const onSave = (variables) => {
    setProcessing(true);
    updateCustomerPassword({ variables });
  };

  return (
    <EditPasswordControllerWrapper>
      <MyPasswordDetails
        onEdit={() => {
          setShowSideBar(true);
        }}
      />
      <SideBarView
        show={showSideBar}
        onClose={() => setShowSideBar(false)}
        animationMode="SlideInRight"
        showClose
        className="customerpage-sidebar"
        containerWidth={asRem(375)}
        titleText={translateV2('myPages.PASSWORD')}
      >
        <EditPasswordView
          onSave={onSave}
          saving={processing}
          saveError={error}
        />
      </SideBarView>
    </EditPasswordControllerWrapper>
  );
};

EditPasswordController.propTypes = {
};
