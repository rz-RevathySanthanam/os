import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '@/roanuz/store/core/context';
import { DeliveryPickupView } from '@/roanuz/view/product/deliveryPickupView';
import { useQuery } from '@apollo/client';
import { productDeliveryPickupAssemblyTimesV2 } from '@/roanuz/store/product/product.graphql';
import { CustomerAddressesQuery } from '@/roanuz/store/customer/query';

export const DeliveryPickupController = ({ product }) => {
  const userContext = useContext(UserContext);
  const { loading: customerDefaultAddressLoading, data: customerDefaultAddress } = useQuery(
    CustomerAddressesQuery, {
      skip: !userContext.token,
    },
  );

  const defaultAddressPinCode = customerDefaultAddress
  && customerDefaultAddress.customer
  && customerDefaultAddress.customer.addresses.find((i) => i.default_shipping);

  const postCode = (defaultAddressPinCode && defaultAddressPinCode.postcode) || null;

  const { loading: pickupLoading, data, error } = useQuery(
    productDeliveryPickupAssemblyTimesV2,
    {
      variables: { productSKU: product.sku, postCode, productVariantSKU: product.childProductSku },
      skip: (userContext.token && !userContext.loaded),
    },
  );

  const loading = customerDefaultAddressLoading || pickupLoading;
  if (error) {
    console.log('Error loading pickup Options', error);
    return null;
  }

  let deliveryPickupTimes = {};
  if (data) {
    deliveryPickupTimes = data.productDeliveryPickupAssemblyTimes;
  }
  // console.log(deliveryPickupTimes, 'deliveryPickupTimes');

  return (
    <DeliveryPickupView
      loading={loading}
      deliveryPickupTimes={deliveryPickupTimes}
    />
  );
};

DeliveryPickupController.propTypes = {
  product: PropTypes.object.isRequired,
};
