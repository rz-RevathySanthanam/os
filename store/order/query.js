import { gql } from '@apollo/client';
import { checkEligibilityOfQuerySet } from '@/roanuz/lib/utils';
import { rzIsShippingModuleEnabledTest } from '@/roanuz/store/attributeValidation';

const rzIsSSNEnabled = checkEligibilityOfQuerySet('rzIsSSNEnabled');
const rzIsCustomerNotesEnabled = checkEligibilityOfQuerySet('rzIsCustomerNotesEnabled');

export const CustomerOrderDetailFields = gql`
  fragment CustomerOrderDetailFields on CustomerOrder {
    id
    number
    status
    order_date
    total {
      discounts {
        amount { value, currency }
        label
      }
      total_shipping { value, currency }
      subtotal  { value, currency }
      total_tax  { value, currency }
      grand_total { value, currency }
      taxes {
        amount { value, currency },
        title
      }
    }
    shipping_method
    shipping_address {
      firstname, lastname,
      company, street
      city, postcode,
      telephone
      rz_is_ssn @include(if: ${rzIsSSNEnabled})
    }
    billing_address {
      firstname, lastname,
      company, street
      city, postcode,
      telephone
      rz_is_ssn @include(if: ${rzIsSSNEnabled})
    }
    customer_notes @include(if: ${rzIsCustomerNotesEnabled})
    ${rzIsShippingModuleEnabledTest('rz_shipping_attributes')}
    
    payment_methods {
      name
      type
      additional_data { name, value }
    }
    items {
      id,
      product_sku, product_url_key
      product_name
      product_sale_price { value, currency }
      quantity_ordered
      selected_options { label, value }
      entered_options { label, value }
    }
  }
`;

export const CustomerOrderQuery = gql`
  query customerOrder($orderNumber: String!) {
    customer {
      email
      orders(filter: { number: { eq: $orderNumber } }) {
        items {
          ...CustomerOrderDetailFields
        }
      }
    }
  }
  ${CustomerOrderDetailFields}
`;
