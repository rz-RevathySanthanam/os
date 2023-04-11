import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@/roanuz/view/button';
import { ReactComponent as AddAddress } from '@/roanuz/view/imgs/AddAddress.svg';
import { AllAddressesListView } from '@/roanuz/view/customer/addressBook/list';
import {
  fetchAddress,
  buildAddressFields,
} from '@/roanuz/view/customer/formModel';
import { prepareFormInitVals } from '@/roanuz/view/checkout/model';
import { SliderModal } from '@/roanuz/components/SliderType';
import { NewAddressView } from '@/roanuz/view/customer/myAddress/newAddress';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem } from '@/roanuz/lib/css';
import { parser } from '@/roanuz/store/modelParser';
import { Text14 } from '@/roanuz/typopgraphy';
import { translateV2 } from '@/roanuz/lib/utils';
import { StepAddressForm } from './stepShippingAddressForm';

export const BaseStepAddressBookWrapper = styled.div`
  .item-title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${asRem(30)};
    .rz-button {
      padding: ${asRem(8)} ${asRem(24)} ${asRem(8)} ${asRem(10)} ;
      gap: ${asRem(10)};
      .rz-svg-icon {
        height: ${asRem(20)};
      }
    }
  }
  .form-address-items {
    .selection-box {
      width: 100%;
      background-color: var(--color-text-rev);
      .rz-address-card {
        .address-container {
          .name, p, .address {
            font-size: ${asRem(16)};
            line-height: ${asRem(24)};
            padding: 0;
          }
          .name {
            font-size: ${asRem(20)};
          }
        }
        .container-actions {
          .rz-button {
            font-size: ${asRem(16)};
            line-height: ${asRem(24)};
          }
        }
      }
    }
  }
`;

export const AddressBook = ({
  addressList, formInitVal,
  // fromAddressBookHandler,
  addressCreationModel, formikStateFields,
  userContext,
}) => {
  const {
    loading, error, createCustomerAddress,
  } = addressCreationModel;

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editAddressId, setEditAddressId] = useState();

  const addressFormFields = parser('customer.addressFormFields', userContext);

  const [addressFormInitVal, setAddressFormInitVal] = useState({
    ...prepareFormInitVals({}, addressList, false),
  });

  useEffect(() => {
    const editAddressData = (editAddressId && fetchAddress(editAddressId, addressList)) || {};
    setAddressFormInitVal({
      ...prepareFormInitVals({}, editAddressData, false),
    });
  }, [showAddressModal, editAddressId]);

  const addOrUpdateAddress = (addrId) => {
    setShowAddressModal(true);
    if (addrId) {
      setEditAddressId(addrId);
    }
  };

  const { setFieldValue } = formikStateFields;

  const onSave = async (valuesRef) => {
    const variables = buildAddressFields(editAddressId, valuesRef);
    const addressModification = await createCustomerAddress({ variables });
    const verifiyOnSuccess = addressModification.data;
    if (editAddressId) {
      if (verifiyOnSuccess && verifiyOnSuccess.updateCustomerAddress) {
        setEditAddressId();
        setTimeout(() => {
          setShowAddressModal(false);
        }, 300);
      } else {
        setShowAddressModal(false);
      }
    } else {
      const newData = verifiyOnSuccess && verifiyOnSuccess.createCustomerAddress;
      if (newData) {
        setTimeout(() => {
          // fromAddressBookHandler(newData.createCustomerAddress);
          setFieldValue('customerAddressId', newData.id.toString());
          setShowAddressModal(false);
        }, 300);
      } else {
        setShowAddressModal(false);
      }
    }
  };

  if (!(addressList && addressList.length > 0)) {
    return null;
  }

  return (
    <StepAddressBookWrapper>
      <div className="form-address-items first-section">
        <AllAddressesListView
          addresses={addressList}
          formInitVal={formInitVal}
          selectFormFieldModel={{
            selectFormFieldId: 'customerAddressId',
            selectFormFieldHandler: () => ({}),
          }}
          onEditHandler={addOrUpdateAddress}
        />
        <div className="item-title-bar">
          <Button
            onClick={() => addOrUpdateAddress()}
            mode="primary"
            ariaLabel="Bæta við heimilisfangi"
            icon={<AddAddress />}
          >
            <Text14 as="span">
              {translateV2('orders.ADD_NEW_ADDRESS')}
            </Text14>
          </Button>
        </div>
        <SliderModal
          showSliderModal={showAddressModal}
          closeModal={() => [setEditAddressId(), setShowAddressModal()]}
          titleText={translateV2('myPages.BILLING_ADDRESS')}
        >
          <NewAddressView
            fields={addressFormFields}
            formInitVal={parser('customer.addressFormInitValModify', addressFormInitVal, userContext)}
            onSave={onSave}
            saving={loading}
            saveError={error}
          />
        </SliderModal>
      </div>
    </StepAddressBookWrapper>
  );
};

AddressBook.propTypes = {
  addressList: PropTypes.array,
  formInitVal: PropTypes.object,
  // fromAddressBookHandler: PropTypes.func,
  addressCreationModel: PropTypes.object,
  formikStateFields: PropTypes.object,
  userContext: PropTypes.object,
};

export const StepShippingAddressSwitch = ({
  userBook,
  fields,
  isGuestUser,
  onPincodeChange,
  formikStateFields,
  formInitVal,
  title,
  fromAddressBookHandler,
  addOrUpdateAddressModel,
  userContext,
}) => {
  const { addressBook } = userBook;
  if (addressBook && addressBook.length > 0) {
    return (
      <AddressBook
        addressList={addressBook}
        formInitVal={formInitVal}
        fromAddressBookHandler={fromAddressBookHandler}
        addressCreationModel={addOrUpdateAddressModel}
        formikStateFields={formikStateFields}
        userContext={userContext}
      />
    );
  }
  return (
    <StepAddressForm
      fields={fields}
      isGuestUser={isGuestUser}
      onPincodeChange={onPincodeChange}
      formikStateFields={formikStateFields}
      formInitVal={formInitVal}
      title={title}
    />
  );
};

StepShippingAddressSwitch.propTypes = {
  userBook: PropTypes.object,
  fields: PropTypes.object,
  isGuestUser: PropTypes.bool,
  onPincodeChange: PropTypes.func,
  formikStateFields: PropTypes.object,
  formInitVal: PropTypes.object,
  title: PropTypes.string,
  fromAddressBookHandler: PropTypes.func,
  addOrUpdateAddressModel: PropTypes.object,
  userContext: PropTypes.object,
};

export const StepAddressBookWrapper = withDependencySupport(BaseStepAddressBookWrapper, 'StepAddressBookWrapper');
