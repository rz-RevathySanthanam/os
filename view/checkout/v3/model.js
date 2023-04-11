import Validate from '@/roanuz/lib/validate';
import { getSSNField, buildSSNField, getTermsAndConditionField } from '@/roanuz/view/customer/formModel';
import {
  checkEligibilityOfQuerySet, applyMask,
  replaceMask, applySSNMask, translateV2,
} from '@/roanuz/lib/utils';
// import { countryCodes } from '@/roanuz/lib/countryCodes';
import { saveUserLocalData, fetchUserLocalData } from '@/roanuz/lib/cart';
import Config from '@/config';

const rzIsSSNEnabled = checkEligibilityOfQuerySet('rzIsSSNEnabled');
const rzIsShippingModuleEnabled = checkEligibilityOfQuerySet('rzIsShippingModuleEnabled');

export function prepareCustomerAddressFields(isGuestUser, isShippingType) {
  let fields = {};
  fields = {
    firstname: {
      type: 'text',
      name: translateV2('fields.FIRST_NAME'),
      id: 'firstname',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(3, 50, { fieldTitle: 'Name' }),
      ]),
    },
    lastname: {
      type: 'text',
      name: translateV2('fields.LAST_NAME'),
      id: 'lastname',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(1, 50, { fieldTitle: 'Name' }),
      ]),
    },
    ...getSSNField(),
    company: {
      type: 'text',
      name: translateV2('fields.COMPANY'),
      id: 'company',
      validateFn: Validate.all([
        Validate.lengthMinMax(1, 50, { fieldTitle: 'Name', isOptional: true }),
      ]),
      isOptional: true,
    },
    telephone: {
      type: 'text',
      name: translateV2('fields.PHONE'),
      id: 'telephone',
      validateFn: Validate.all([
        Validate.required,
        Validate.telephone,
      ]),
    },
  };

  if (isShippingType) {
    fields = {
      ...fields,
      street: {
        type: 'text',
        name: translateV2('fields.PLACE'),
        id: 'street',
        validateFn: Validate.all([
          Validate.required,
          Validate.lengthMinMax(null, 120),
        ]),
      },
      postcode: {
        isSelect: true,
        name: translateV2('fields.POSTNUMBER'),
        id: 'postcode',
        validateFn: Validate.all([
          Validate.required,
        ]),
      },
      city: {
        type: 'text',
        name: translateV2('fields.CITY'),
        id: 'city',
        validateFn: Validate.all([
          Validate.required,
          Validate.lengthMinMax(null, 120),
        ]),
      },
      // countryCode: {
      //   isSelect: true,
      //   name: translateV2('fields.COUNTRY'),
      //   id: 'countryCode',
      //   validateFn: Validate.all([
      //     Validate.required,
      //   ]),
      //   optionsList: countryCodes,
      // },
    };
  }

  if (!isGuestUser) {
    delete fields.email;
  }
  return fields;
}

export function buildCustomerDetailFields(values) {
  const address = {
    firstname: applyMask(values.firstname),
    lastname: applyMask(values.lastname),
    company: values.company,
    telephone: applyMask(values.telephone),
    country_code: values.countryCode ? applyMask(values.countryCode) : 'IS',
    street: !Array.isArray(values.street) ? [applyMask(values.street)] : applyMask(values.street),
    city: applyMask(values.city),
    postcode: applyMask(values.postcode),
  };
  return address;
}

export function prepareCustomerDetailFormInitVals(
  cart, data, isShippingType,
) {
  let street = '';
  if (data.street) {
    [street] = data.street;
  }
  let initValue = {};
  initValue = {
    email: cart.email || data.email || '',
    firstname: replaceMask(data.firstname || ''),
    lastname: replaceMask(data.lastname || ''),
    company: data.company || '',
    rz_is_ssn: data.rz_is_ssn ? applySSNMask(data.rz_is_ssn) : '',
    telephone: replaceMask(data.telephone || ''),
  };

  if (isShippingType) {
    initValue = {
      ...initValue,
      street: replaceMask(street || ''),
      postcode: data.postcode || '',
      city: replaceMask(data.city || ''),
      countryCode: replaceMask(data.countryCode || 'IS'),
      pickupLocation: data.pickup_location_code || '',
      addressId: data.rz_address_id || cart.defaultAddressId || '',
      customerAddressId: (data.rz_address_id && data.rz_address_id.toString()) || '',
    };
  }
  if (cart.profileData) {
    initValue.firstname = data.firstname || cart.profileData.firstname || '';
    initValue.lastname = data.lastname || cart.profileData.lastname || '';
    initValue.rz_is_ssn = data.rz_is_ssn || cart.profileData.rz_is_ssn || '';
  }
  return { ...initValue };
}

export function buildCustomerDetailFieldsSaveInput(
  values, cartId,
) {
  const address = buildCustomerDetailFields(values);

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
  // if (rzIsShippingModuleEnabled) {
  //   shippingAddresses[0].rz_shipping_attributes = prepareSelectedShippingAttributes();
  // }
  return {
    shippingAddress: {
      cart_id: cartId,
      shipping_addresses: shippingAddresses,
    },
    email: {
      cart_id: cartId,
      email: values.email,
    },
  };
}

export function prepareCustomerNotesField() {
  const customerNotesField = {
    customerNotes: {
      type: 'textarea',
      name: translateV2('orders.YOUR_MESSAGE'),
      id: 'customerNotes',
    },
  };
  return customerNotesField;
}

export function prepareShippingMethodInitVals(cart) {
  const shippingMethod = cart.shippingMethod || {};
  const initValue = {
    shippingMethod: shippingMethod.value || '',
    customerNotes: cart.customerNotes || '',
  };
  return { ...initValue };
}

export function extracMethodValue(value) {
  // eslint-disable-next-line camelcase
  const [method_code, carrier_code] = value.split(':::');
  return { method_code, carrier_code };
}

function prepareSelectedShippingAttributes() {
  const rzShippingAttributes = fetchUserLocalData('rzShippingAttributes', null);
  return JSON.stringify(rzShippingAttributes);
}

export function logRzShippingAttributes(e, method) {
  const updates = {
    rzShippingAttributes: {
      ...method.method.rzShippingCustomData,
      title: method.method.title,
    },
  };
  saveUserLocalData(updates);
}

export function buildShippingMethodSaveInput(values, cartId) {
  const selectedMethod = values.shippingMethod;
  const shippingAddresses = [{
    customer_notes: values.customerNotes,
  }];
  if (rzIsShippingModuleEnabled) {
    shippingAddresses[0].rz_shipping_attributes = prepareSelectedShippingAttributes();
  }
  return {
    shippingAddress: {
      cart_id: cartId,
      shipping_addresses: shippingAddresses,
    },
    shippingMethod: {
      cart_id: cartId,
      shipping_methods: selectedMethod ? [extracMethodValue(selectedMethod)] : null,
    },
  };
}

export function preparePaymentMethodInitVals(
  isBillingSameAsShipping, cart, data,
) {
  const paymentMethod = cart.paymentMethod || {};
  const billingAddress = cart.billingAddress || {};
  let initValue = {
    paymentMethod: paymentMethod.code || data.paymentMethod || '',
    termsAndConditions: data.termsAndConditions || false,
  };
  if (!isBillingSameAsShipping) {
    initValue = {
      ...initValue,
      ...prepareCustomerDetailFormInitVals(
        cart, billingAddress, true,
      ),
    };
  }
  return { ...initValue };
}

export function preparePaymentMethodFields(isBillingSameAsShipping, isGuestUser) {
  let fields = {};
  fields = {
    ...getTermsAndConditionField(),
  };
  if (!isBillingSameAsShipping) {
    fields = {
      ...fields,
      ...prepareCustomerAddressFields(isGuestUser, true, true),
    };
  }
  return fields;
}

export function buildBillingAddressFieldsSaveInput(
  values, cartId, isBillingSameAsShipping, shouldSaveInBook,
) {
  // shouldSaveInBook TODO: MAKE it configureable later
  const address = buildCustomerDetailFields(values);

  let billingAddresses = {
    customer_address_id: values.customerAddressId ? parseInt(values.customerAddressId, 10) : null,
    same_as_shipping: false,
  };
  if (!values.customerAddressId) {
    if (rzIsSSNEnabled) {
      address.rz_is_ssn = buildSSNField(values);
    }
    address.save_in_address_book = !!(!isBillingSameAsShipping && shouldSaveInBook);
    billingAddresses = {
      address,
      // INFO: same_as_shipping: Something wrong in true, so made necessary changes in data.
      // And I feel no use of it.
      same_as_shipping: false,
    };
  }
  return {
    cart_id: cartId,
    billing_address: billingAddresses,
  };
}

export function validateAddressField(isGuestUser, values, profileData, postcode) {
  const { addresses } = profileData;
  let bad = false;
  if (!isGuestUser) {
    if (!values.customerAddressId && addresses && addresses.length > 0) {
      bad = true;
    }
  }
  if (!(addresses && addresses.length > 0)) {
    if (postcode && postcode.validateFn(values.postcode)) {
      bad = true;
    }
  }
  return bad;
}

export function validateTerms(isGuestUser, values) {
  let bad = false;
  if (isGuestUser) {
    if (!values.termsAndConditions) {
      bad = true;
    }
  }
  return bad;
}

export function validateBillingAddressField(
  isGuestUser, values, profileData, isBillingSameAsShipping,
  postcode,
) {
  let result = false;
  if (!isBillingSameAsShipping) {
    result = validateAddressField(isGuestUser, values, profileData, postcode);
  }
  return result;
}

export const ShippmentMethodTypes = {
  Shipping: 'Shipping',
  Collection: 'Collection',
};

export function getSavedShippmentMethodType() {
  const savedShippmentMethodType = fetchUserLocalData('rzSelectedShippmentMethodType', ShippmentMethodTypes.Shipping);
  return savedShippmentMethodType;
}

export const CheckoutStepTypes = Config.ClientCheckoutStepTypes || {
  customer: {
    id: 'customer',
    title: 'Customer',
  },
  delivery: {
    id: 'delivery',
    title: 'Delivery',
  },
  payment: {
    id: 'payment',
    title: 'Payment',
  },
};

export const getCheckoutStepTypeNumber = (step) => {
  const checkoutStepsKeys = Object.keys(CheckoutStepTypes);
  const index = checkoutStepsKeys.indexOf(step);
  return index + 1;
};
