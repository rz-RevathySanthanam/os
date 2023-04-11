import Validate from '@/roanuz/lib/validate';
import {
  checkEligibilityOfQuerySet, translateV2,
  replaceMask, applyMask, applySSNMask,
} from '@/roanuz/lib/utils';

import {
  getCommonFields, getSSNField,
  buildCommonFields, buildSSNField,
} from '@/roanuz/view/customer/formModel';
import { fetchUserLocalData } from '@/roanuz/lib/cart';

const rzIsSSNEnabled = checkEligibilityOfQuerySet('rzIsSSNEnabled');
const rzIsShippingModuleEnabled = checkEligibilityOfQuerySet('rzIsShippingModuleEnabled');

export function buildMethodValue(method) {
  return `${method.method_code}:::${method.carrier_code}`;
}

export function extracMethodValue(value) {
  // eslint-disable-next-line camelcase
  const [method_code, carrier_code] = value.split(':::');
  return { method_code, carrier_code };
}

export function camelizeCase(str) {
  const strRef = str.replace(/_/g, ' ');
  return strRef.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export function getCustomerNotesField() {
  const customerNotesField = {
    customerNotes: {
      type: 'textarea',
      name: translateV2('orders.YOUR_MESSAGE'),
      id: 'customerNotes',
    },
  };
  return customerNotesField;
}

export function prepareShippingAddrFields(isGuestUser) {
  const fields = {
    email: {
      type: 'email',
      name: translateV2('fields.EMAIL'),
      id: 'email',
      validateFn: Validate.all([
        Validate.required,
        Validate.email,
      ]),
    },
    ...getSSNField(),
    ...getCommonFields(isGuestUser),
  };
  // We can write `parser` here as like roanuz/view/product/model.js - If you want
  // to edit fields in specific client wise.
  return fields;
}

export function prepareShippingMethodInitVals(cart) {
  const shippingMethod = cart.shippingMethod || {};
  // console.log('cart', cart.shippingMethod);
  // const shippingAttributes = cart.rzShippingAttributes || null;
  const initValue = {
    shippingMethod: shippingMethod.value || '',
    // shippingAttributes,
  };
  return { ...initValue };
}

export function prepareCustomerNotesInitVals(cart) {
  const initValue = {
    customerNotes: cart.customerNotes || '',
  };
  return { ...initValue };
}

export function prepareFormInitVals(cart, data, isGuestUser) {
  console.debug(`Left for future use ${isGuestUser}`);
  let street = '';
  if (data.street) {
    [street] = data.street;
  }
  const initValue = {
    email: cart.email || '',
    rz_is_ssn: data.rz_is_ssn ? applySSNMask(data.rz_is_ssn) : '',
    firstname: replaceMask(data.firstname || ''),
    lastname: replaceMask(data.lastname || ''),
    company: data.company || '',
    street: replaceMask(street || ''),
    postcode: data.postcode || '',
    city: replaceMask(data.city || ''),
    telephone: replaceMask(data.telephone || ''),
    pickupLocation: data.pickup_location_code || '',
    addressId: data.rz_address_id || cart.defaultAddressId || '',
    customerAddressId: (data.rz_address_id && data.rz_address_id.toString()) || '',
  };
  if (cart.profileData) {
    initValue.firstname = data.firstname || cart.profileData.firstname;
    initValue.lastname = data.lastname || cart.profileData.lastname;
    initValue.rz_is_ssn = data.rz_is_ssn || cart.profileData.rz_is_ssn;
  }
  return { ...initValue };
}

// function formatCustomerName(values) {
//   const [fname, lname] = values.firstname.split(/\s+(.*)/);
//   const firstname = applyMask(fname);
//   const lastname = lname ? applyMask(lname) : applyMask(fname);
//   return { firstname, lastname };
// }

function prepareSelectedShippingAttributes() {
  const rzShippingAttributes = fetchUserLocalData('rzShippingAttributes', null);
  return JSON.stringify(rzShippingAttributes);
}

export function buildShippingAddressSaveInput(values, isGuestUser, cartId) {
  const address = buildCommonFields(values);

  if (isGuestUser) {
    // const { firstname, lastname } = formatCustomerName(values);
    address.firstname = applyMask(values.firstname);
    address.lastname = '-';
  }

  let shippingAddresses = [{
    customer_address_id: values.customerAddressId ? parseInt(values.customerAddressId, 10) : null,
    pickup_location_code: values.pickupLocation || null,
    customer_notes: values.customerNotes,
  }];
  if (!values.customerAddressId) {
    if (rzIsSSNEnabled) {
      address.rz_is_ssn = buildSSNField(values);
    }
    shippingAddresses = [{
      address,
      pickup_location_code: values.pickupLocation || null,
      customer_notes: values.customerNotes,
    }];
  }
  if (rzIsShippingModuleEnabled) {
    shippingAddresses[0].rz_shipping_attributes = prepareSelectedShippingAttributes();
  }
  return {
    cart_id: cartId,
    shipping_addresses: shippingAddresses,
  };
}

export function buildMethodSaveInput(values, cartId) {
  const selectedMethod = values.shippingMethod;
  return {
    cart_id: cartId,
    shipping_methods: selectedMethod ? [extracMethodValue(selectedMethod)] : null,
  };
}

export function buildEmailSaveInput(values, cartId) {
  return {
    cart_id: cartId,
    email: values.email,
  };
}

// We can write `parser` here as like roanuz/view/product/model.js - If you want
// to edit fields in specific client wise.
export function buildSpecificAddonShippingAddressField(cartId, specificFields, values) {
  const specificFieldsObj = {};
  specificFields.forEach((field) => {
    const parsedField = camelizeCase(field);
    specificFieldsObj[field] = values[parsedField];
  });
  return {
    cart_id: cartId,
    shipping_addresses: [specificFieldsObj],
  };
}

export const buildBillingSaveInput = (
  values, isGuestUser, cartId,
  shouldSaveInBook, isBillingIsSameAsShipping,
) => {
  const address = buildCommonFields(values);
  if (isGuestUser) {
    // const { firstname, lastname } = formatCustomerName(values);
    address.firstname = applyMask(values.firstname);
    address.lastname = '-';
  }

  let billingAddresses = {
    customer_address_id: values.customerAddressId ? parseInt(values.customerAddressId, 10) : null,
    same_as_shipping: isBillingIsSameAsShipping,
  };
  if (!values.customerAddressId) {
    if (rzIsSSNEnabled) {
      address.rz_is_ssn = buildSSNField(values);
    }
    address.street = values.street;
    address.save_in_address_book = shouldSaveInBook;
    billingAddresses = {
      address,
      same_as_shipping: isBillingIsSameAsShipping,
    };
  }
  return {
    cart_id: cartId,
    billing_address: billingAddresses,
  };
};

export function buildShippingSaveInput(values, isGuestUser, cartId, settings = {}) {
  const {
    onlyAddress, onlyMethod,
    billingIsSameAsShipping, userBillingAddress,
    shouldSaveInBook,
  } = settings;
  let returnOptions = {};
  if (onlyMethod) {
    returnOptions.shippingMethod = buildMethodSaveInput(values, cartId);
    returnOptions.shippingAddres = buildShippingAddressSaveInput(values, isGuestUser, cartId);
  }
  if (onlyAddress) {
    returnOptions.email = buildEmailSaveInput(values, cartId);
    returnOptions.shippingAddres = buildShippingAddressSaveInput(values, isGuestUser, cartId);
    if (billingIsSameAsShipping) {
      returnOptions = {
        ...returnOptions,
        billingAddres: {
          ...buildBillingSaveInput(values, isGuestUser, cartId, false, true),
        },
      };
    } else {
      returnOptions = {
        ...returnOptions,
        billingAddres: buildBillingSaveInput(
          userBillingAddress, isGuestUser, cartId, shouldSaveInBook, false,
        ),
      };
    }
  }
  if (!onlyAddress && !onlyMethod) {
    returnOptions = {
      email: buildEmailSaveInput(values, cartId),
      shippingAddres: buildShippingAddressSaveInput(values, isGuestUser, cartId),
      shippingMethod: buildMethodSaveInput(values, cartId),
    };
    if (billingIsSameAsShipping) {
      returnOptions = {
        ...returnOptions,
        billingAddres: {
          ...buildBillingSaveInput(values, isGuestUser, cartId, false, true),
        },
      };
    } else {
      returnOptions = {
        ...returnOptions,
        billingAddres: buildBillingSaveInput(
          userBillingAddress, isGuestUser, cartId, shouldSaveInBook, false,
        ),
      };
    }
  }
  return { ...returnOptions };
}

export function prepareBillingAddressFields(isGuestUser) {
  const fields = {
    ...getSSNField(),
    ...getCommonFields(isGuestUser),
  };
  // We can write `parser` here as like roanuz/view/product/model.js - If you want
  // to edit fields in specific client wise.
  return fields;
}

export function checkIfBillingAddress(billingAddressAction) {
  let good = true;
  const { billingIsSameAsShipping, userBillingAddress } = billingAddressAction;
  if (!billingIsSameAsShipping) {
    good = false;
    if (userBillingAddress && Object.keys(userBillingAddress).length > 0) {
      good = true;
    }
  }
  return good;
}
