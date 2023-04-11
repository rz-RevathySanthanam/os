import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import LoadingView from '@/roanuz/components/LoadingView';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { DisplayBold24 } from '@/roanuz/typopgraphy';
import { Row } from '@/roanuz/layout';
import { translateV2 } from '@/roanuz/lib/utils';
import { Button } from '../../button';
import { DefaultAddressesBlock } from './defaultAddress';
import { AllAddressesListView } from '../addressBook/list';

export const BaseAddressViewWrapper = styled.div`
  margin-top: ${asRem(22)};
`;

const EmptyAddressView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    margin-top: ${asRem(-40)};
    justify-content: center;
  }
`;

export const MyAddressView = ({
  addressBookData, onDelete,
  onCreate, onEdit, loading,
}) => {
  const onDeleteHandler = (id) => {
    onDelete({ id });
  };

  // Default billing and shipping address filter
  const defaultBilling = addressBookData.customer.addresses.find((i) => {
    if (i.default_billing === true) {
      return i;
    }
    return null;
  });

  const defaultShipping = addressBookData.customer.addresses.find((i) => {
    if (i.default_shipping === true) {
      return i;
    }
    return null;
  });

  const filteredAddress = addressBookData.customer.addresses.filter((i) => {
    if (!i.default_shipping && !i.default_billing) {
      return true;
    }
    return false;
  });

  return (
    <AddressViewWrapper>
      {addressBookData.customer.addresses.length === 0 && (
        <EmptyAddressView>
          <LoadingView message="Engin heimilisföng skráð" />
          <Button
            mode="primary"
            filled
            alt="Add an address"
            href={{}}
            ariaLabel="Add an address"
            onClick={onCreate}
          >
            {translateV2('myPages.ADD_NEW')}
          </Button>
        </EmptyAddressView>
      )}
      {addressBookData.customer.addresses.length > 0
        && (
        <>
          <DefaultAddressesBlock
            defaultShipping={defaultShipping}
            defaultBilling={defaultBilling}
            onEdit={onEdit}
          />
          <Row alignCenter spaceBetween>
            <DisplayBold24 className="address-title">{translateV2('myPages.ADDRESSES')}</DisplayBold24>
            <Button
              mode="primary"
              filled
              alt="Add an address"
              href={{}}
              ariaLabel="Add an address"
              onClick={onCreate}
              className="add-address-btn"
            >
              {translateV2('myPages.ADD_NEW')}
            </Button>
          </Row>
          <AllAddressesListView
            addresses={filteredAddress}
            onDeleteHandler={onDeleteHandler}
            onEditHandler={onEdit}
            loading={loading}
          />
          {filteredAddress.length === 0
            && (<LoadingView message={translateV2('myPages.ADDRESS_UNAVAILABLE')} />)}
        </>
        )}
    </AddressViewWrapper>
  );
};

MyAddressView.propTypes = {
  addressBookData: PropTypes.object,
  onDelete: PropTypes.func,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  loading: PropTypes.bool,
};

export const AddressViewWrapper = withDependencySupport(BaseAddressViewWrapper, 'AddressViewWrapper');
