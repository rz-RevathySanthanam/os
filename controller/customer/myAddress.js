import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { CustomerAddressesQuery } from '@/roanuz/store/customer/query';
import {
  useCreateOrUpdateCustomerAddress,
  useDeleteCustomerAddress,
} from '@/roanuz/controller/customer/addressUpdations';
import {
  prepareFormInitVals,
} from '@/roanuz/view/checkout/model';
import {
  buildAddressFields,
  fetchAddress,
} from '@/roanuz/view/customer/formModel';
import { MyAddressView } from '@/roanuz/view/customer/myAddress/page';
import { SideBarView } from '@/roanuz/view/sideBar';
import { NewAddressView } from '@/roanuz/view/customer/myAddress/newAddress';
import { parser } from '@/roanuz/store/modelParser';
import { UserContext } from '@/roanuz/store/core/context';
import { translateV2 } from '@/roanuz/lib/utils';
import { asRem } from '@/roanuz/lib/css';

const MyAddressControllerWrapper = styled.div` 
`;

export const MyAddressController = () => {
  const userContext = useContext(UserContext);
  const {
    loading: addressesLoading,
    error: addressesError,
    data: addressBookData,
  } = useQuery(CustomerAddressesQuery);

  const [showSideBar, setShowSideBar] = useState(false);

  const onDataModified = (data, word) => {
    if (data && data[word]) {
      console.log(`${word} Done ✅.`, data, data[word]);
      setTimeout(() => {
        setShowSideBar(false);
      }, 300);
    }
  };

  const [createCustomerAddress, { loading, error }] = useCreateOrUpdateCustomerAddress({
    onCompleted: (data) => {
      onDataModified(data, 'createCustomerAddress');
    },
  });

  const [
    updateCustomerAddress,
    { loading: updateLoading, error: updateError },
  ] = useCreateOrUpdateCustomerAddress({
    onCompleted: (data) => {
      onDataModified(data, 'updateCustomerAddress');
    },
  });

  const [
    deleteAddress,
    { loading: deleteLoading, error: deleteError },
  ] = useDeleteCustomerAddress({
    onCompleted: (data) => {
      onDataModified(data, 'deleteCustomerAddress');
    },
  });

  const onDelete = (variables) => {
    deleteAddress({ variables });
  };

  console.debug('Address Modify Error', error, updateError, deleteError);

  const [editAddressId, setEditAddressId] = useState();

  const onSave = (values) => {
    const variablesRef = buildAddressFields(editAddressId, values);
    const variables = {
      ...variablesRef,
      default_shipping: values.default_shipping,
      default_billing: values.default_billing,
    };
    if (editAddressId) {
      variables.id = editAddressId;
      updateCustomerAddress({ variables });
    } else {
      createCustomerAddress({ variables });
    }
  };

  const addressFormFields = parser('customer.addressFormFields', userContext, true);

  const addressData = addressBookData || {};

  const [formInitVal, setFormInitVal] = useState({
    ...prepareFormInitVals({}, addressData, false),
    default_shipping: addressData.default_shipping || false,
    default_billing: addressData.default_billing || false,
  });

  useEffect(() => {
    const editAddressData = (editAddressId && fetchAddress(editAddressId, addressBookData)) || {};
    setFormInitVal({
      ...prepareFormInitVals({}, editAddressData, false),
      default_shipping: editAddressData.default_shipping || false,
      default_billing: editAddressData.default_billing || false,
    });
  }, [showSideBar, editAddressId]);

  return (
    <MyAddressControllerWrapper>
      {addressesLoading && (<PageLoadingView message={translateV2('loadingMsg.RETRIVE_ADDRESS')} />) }
      {addressesError && (<PageErrorView error={error} />) }
      {addressBookData && (
        <MyAddressView
          addressBookData={addressBookData}
          onDelete={onDelete}
          onCreate={() => {
            setShowSideBar(true);
            setEditAddressId();
          }}
          onEdit={(e) => {
            setShowSideBar(true);
            setEditAddressId(e);
          }}
          loading={deleteLoading}
        />
      )}
      <SideBarView
        show={showSideBar}
        onClose={() => setShowSideBar(false)}
        animationMode="SlideInRight"
        showClose
        className="customerpage-sidebar"
        containerWidth={asRem(480)}
        titleText={translateV2('myPages.PERSONAL_INFORMATION')}
      >
        <NewAddressView
          fields={addressFormFields}
          formInitVal={parser('customer.addressFormInitValModify', formInitVal, userContext)}
          onSave={onSave}
          saving={loading || updateLoading}
          saveError={error || updateError}
        />
      </SideBarView>
    </MyAddressControllerWrapper>
  );
};

MyAddressController.propTypes = {
};
