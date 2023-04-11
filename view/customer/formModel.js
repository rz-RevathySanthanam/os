import Validate from '@/roanuz/lib/validate';
import {
  checkEligibilityOfQuerySet, translateV2,
  applyMask, applySSNMask, replaceMask,
} from '@/roanuz/lib/utils';

const rzIsSSNEnabled = checkEligibilityOfQuerySet('rzIsSSNEnabled');

export function getCommonFields(isGuestUser) {
  const commonFields = {
    firstname: {
      type: 'text',
      name: isGuestUser ? translateV2('fields.FULL_NAME') : translateV2('fields.FIRST_NAME'),
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
    street: {
      type: 'text',
      name: translateV2('myPages.ADDRESS'),
      id: 'street',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(null, 120),
      ]),
    },
    postcode: {
      isSelect: true,
      name: translateV2('fields.PHONE'),
      id: 'postcode',
      validateFn: Validate.all([
        Validate.required,
      ]),
    },
    city: {
      type: 'text',
      name: translateV2('fields.PLACE'),
      id: 'city',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(null, 120),
      ]),
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
  return commonFields;
}

export function getSSNField() {
  if (rzIsSSNEnabled) {
    const ssnField = {
      rz_is_ssn: {
        type: 'text',
        name: translateV2('fields.SSN'),
        id: 'rz_is_ssn',
        validateFn: Validate.all([
          Validate.required,
          Validate.ssn,
        ]),
      },
    };
    return ssnField;
  }
  return null;
}

export function getTermsAndConditionField() {
  const termsAndConditionsField = {
    termsAndConditions: {
      type: 'checkbox',
      name: '',
      id: 'termsAndConditions',
      validateFn: Validate.all([
        Validate.required,
      ]),
    },
  };
  return termsAndConditionsField;
}

export function buildCommonFields(values) {
  const address = {
    firstname: applyMask(values.firstname),
    lastname: applyMask(values.lastname),
    company: values.company,
    street: [applyMask(values.street)],
    postcode: values.postcode,
    city: applyMask(values.city),
    telephone: applyMask(values.telephone),
    country_code: 'IS',
  };
  return address;
}

export function buildSSNField(values) {
  return values.rz_is_ssn ? applySSNMask(values.rz_is_ssn) : null;
}

export function formatfName(values) {
  const isSame = values.firstname === values.lastname;
  const fullName = isSame ? values.firstname : `${values.firstname} ${values.lastname}`;
  return fullName ? applyMask(fullName) : '';
}

export function prepareCommonFormInitVals(cart, data, isGuestUser) {
  console.debug(`Left for future use ${isGuestUser}`);
  let street = '';
  if (data.street) {
    [street] = data.street;
  }
  const initValue = {
    rz_is_ssn: data.rz_is_ssn ? applySSNMask(data.rz_is_ssn) : '',
    firstname: replaceMask(data.firstname || ''),
    lastname: replaceMask(data.lastname || ''),
    company: data.company || '',
    street: replaceMask(street || ''),
    postcode: data.postcode || '',
    city: replaceMask(data.city || ''),
    telephone: replaceMask(data.telephone || ''),
  };
  return { ...initValue };
}

export function buildAddressFields(editAddressId, values) {
  const variablesRef = buildCommonFields(values);
  const variables = {
    ...variablesRef,
    country_code: 'IS',
    rz_is_ssn: buildSSNField(values),
  };
  if (editAddressId) {
    variables.id = editAddressId;
  }
  return variables;
}

export const fetchAddress = (dataId, address) => {
  let addressRef = address;
  if (address && address.customer) {
    addressRef = address.customer.addresses;
  }
  const filteredAddress = addressRef.find((i) => {
    if (i.id === dataId) {
      return i;
    }

    return null;
  });
  return filteredAddress;
};

export function getBasicRegistrationFields() {
  const basicRegistrationFields = {
    email: {
      type: 'email',
      name: translateV2('fields.EMAIL'),
      id: 'email',
      validateFn: Validate.all([
        Validate.required,
        Validate.email,
      ]),
    },
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
    password: {
      type: 'password',
      name: translateV2('fields.PASSWORD'),
      id: 'password',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(4, 50, { fieldTitle: 'Password' }),
      ]),
    },
    subscribed: {
      type: 'checkbox',
      name: translateV2('myPages.MAIL_SUBSCRIPTION'),
      id: 'subscribed',
    },
  };
  return basicRegistrationFields;
}

export function buildBasicRegistrationFields(values) {
  const details = {
    rz_is_ssn: buildSSNField(values),
    email: values.email,
    firstname: applyMask(values.firstname),
    lastname: applyMask(values.lastname),
    password: values.password,
    is_subscribed: values.subscribed,
  };
  return details;
}

export function prepareBasicRegistrationFormInitVals() {
  const initValue = {
    email: '',
    rz_is_ssn: '',
    firstname: '',
    lastname: '',
    password: '',
    subscribed: true,
  };
  return { ...initValue };
}

export function getCompanyFields() {
  const companyFields = {
    rzCompanyName: {
      type: 'text',
      name: translateV2('fields.COMPANY'),
      id: 'rzCompanyName',
      validateFn: Validate.all([
        Validate.required,
        Validate.lengthMinMax(1, 50),
      ]),
    },
    // rzCompanyTelephone: {
    //   type: 'text',
    //   name: 'Farsími',
    //   id: 'rzCompanyTelephone',
    //   validateFn: Validate.all([
    //     Validate.required,
    //     Validate.telephone,
    //   ]),
    // },
  };
  return companyFields;
}

export function prepareBasicApplyForBussinessFormInitVals() {
  const initValue = { ...prepareBasicRegistrationFormInitVals() };
  return {
    ...initValue,
    companyInfo: null,
  };
}

export function buildBasicApplyForBussinessFields(values) {
  const details = { ...buildBasicRegistrationFields(values) };
  const companyDetails = {
    street: replaceMask(values.street || ''),
    postcode: values.postcode || '',
    city: replaceMask(values.city || ''),
    rzCompanyName: replaceMask(values.rzCompanyName || ''),
    rzCompanyTelephone: replaceMask(values.telephone || ''),
  };
  return {
    ...details,
    companyInfo: JSON.stringify(companyDetails),
  };
}

export function addressFormFields(context, includeDefaultCheckOptions = false) {
  console.debug(`Left for future use ${context}`);
  if (includeDefaultCheckOptions) {
    return {
      ...getCommonFields(),
      ...getSSNField(),
      default_shipping: {
        type: 'checkbox',
        name: translateV2('fields.PRIMARY_ADDRESS_INVOICE_CHECKBOX'),
        id: 'default_shipping',
      },
      default_billing: {
        type: 'checkbox',
        name: translateV2('fields.PRIMARY_ADDRESS_CHECKBOX'),
        id: 'default_billing',
      },
    };
  }
  return {
    ...getCommonFields(),
    ...getSSNField(),
  };
}

export const addressFormInitValModify = (data) => {
  return data;
};
