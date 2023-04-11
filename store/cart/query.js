import { gql } from '@apollo/client';

import { checkEligibilityOfQuerySet } from '@/roanuz/lib/utils';

import {
  rzIsGalleryMetaEnabledTest,
  rzIsShippingModuleEnabledTest,
} from '@/roanuz/store/attributeValidation';

const rzIsSSNEnabled = checkEligibilityOfQuerySet('rzIsSSNEnabled');
const rzIsUtilsEnabled = checkEligibilityOfQuerySet('rzIsUtilsEnabled');
const rzIsCustomerNotesEnabled = checkEligibilityOfQuerySet('rzIsCustomerNotesEnabled');

export const CartItemFields = gql`
  fragment CartItemFields on Cart {
    id
    total_quantity
    prices {
      grand_total {
        currency
        value
      }
    }
    items {
      uid
      quantity
      prices {
        row_total_including_tax {
          currency
          value
        }
      }
      product {
        url_key
        name
        ${rzIsGalleryMetaEnabledTest()}
        thumbnail {
          disabled
          url
        }
        media_gallery {
          disabled
          label
          position
          url
        }
      }
      ... on BundleCartItem {
        bundle_options {
          uid
          label
          type
          values {
            id
            label
            price
            quantity
          }
        }
      }
    }
  }
`;

export const CartMiniFields = gql`
  fragment CartMiniFields on Cart {
    id
    total_quantity
    email
    applied_coupons {
      code
    }
    prices {
      discounts {
        amount {
          value, currency
        }
        label
      }
      applied_taxes {
        amount { value, currency }, label
      }
      grand_total {
        value, currency
      }
    }
    items {
      uid
      quantity
      prices {
        discounts {
          amount {
            currency, value
          }
          label
        }
        total_item_discount {
          currency
          value
        }
        row_total_including_tax {
          currency
          value
        }
      }
      ... on ConfigurableCartItem {
        configurable_options  {
          configurable_product_option_uid 
          configurable_product_option_value_uid 
          option_label 
          value_label 
        }
        configured_variant {
          url_key,
          url_suffix
          sku
          name
          thumbnail {
            disabled
            label
            position
            url
          }
        }
      }
      product {
        url_key, url_suffix
        sku
        name
        ${rzIsGalleryMetaEnabledTest()}
        thumbnail {
          disabled
          url
        }
        stock_status
        media_gallery {
          disabled
          label
          position
          url
        }
        __typename
        name
        new
        price_range {
          maximum_price {
            discount {
              amount_off
              percent_off
            }
            final_price {
              currency
              value
            }
            fixed_product_taxes {
              amount {
                currency
                value
              }
              label
            }
            regular_price {
              currency
              value
            }
          } 
          minimum_price {
            discount {
              amount_off
              percent_off
            }
            final_price {
              currency
              value
            }
            fixed_product_taxes {
              amount {
                currency
                value
              }
              label
            }
            regular_price {
              currency
              value
            }
          } 
        }
        price_tiers {
          discount {
            amount_off
            percent_off
          }
          final_price {
            value
            currency
          }
          quantity
        }
        stock_status
        sale
        uid
        sku
        id
        url_key
        url_suffix
        ... on ConfigurableProduct {
          configurable_options {
            attribute_code
            attribute_uid
            id
            label
            position
            uid
            use_default
            values {
              default_label
              label
              store_label
              swatch_data {
                value
              }
              uid
              use_default_value
            }
          }
          variants {
            product {
              attribute_set_id
              ... on PhysicalProductInterface {
                weight
              }
              image {
                disabled
                label
                position
                url
              }
              name
              new

              price_range {
                maximum_price {
                  discount {
                    amount_off
                    percent_off
                  }
                  final_price {
                    currency
                    value
                  }
                  fixed_product_taxes {
                    amount {
                      currency
                      value
                    }
                    label
                  }
                  regular_price {
                    currency
                    value
                  }
                } 
                minimum_price {
                  discount {
                    amount_off
                    percent_off
                  }
                  final_price {
                    currency
                    value
                  }
                  fixed_product_taxes {
                    amount {
                      currency
                      value
                    }
                    label
                  }
                  regular_price {
                    currency
                    value
                  }
                } 
              }
              price_tiers {
                discount {
                  amount_off
                  percent_off
                }
                final_price {
                  value
                  currency
                }
                quantity
              }

              stock_status
              sale
              uid
              sku
              id
              url_key
              url_suffix

              url_key
              url_suffix
            }
            attributes {
              label
              code
              value_index
              uid
            }
          }
        }
      }
    }
  }
`;

export const CartDetailFields = gql`
  fragment CartDetailFields on Cart {
    id
    total_quantity
    email
    applied_coupons {
      code
    }
    prices {
      discounts {
        amount {
          value, currency
        }
        label
      }
      applied_taxes {
        amount { value, currency }, label
      }
      grand_total {
        value, currency
      }
      subtotal_excluding_tax {
        value, currency
      }
      subtotal_including_tax {
        value, currency
      }
    }
    available_payment_methods {
      code, title
    }
    selected_payment_method {
      code, title, purchase_order_number
    }
    shipping_addresses {
      firstname, lastname
      street, city, postcode
      company
      pickup_location_code
      customer_notes @include(if: ${rzIsCustomerNotesEnabled})
      telephone
      available_shipping_methods {
        amount { value, currency }, available,
        method_code, method_title,
        carrier_code, carrier_title,
        ${rzIsShippingModuleEnabledTest('rz_shipping_attributes')}
      }
      selected_shipping_method {
        amount {
          value, currency
        }
        carrier_code, carrier_title
        method_code, method_title
      }
      ${rzIsShippingModuleEnabledTest('rz_shipping_attributes')}
      rz_is_ssn @include(if: ${rzIsSSNEnabled})
      rz_address_id @include(if: ${rzIsUtilsEnabled})
    }
    billing_address {
      firstname, lastname
      street, city, postcode
      company
      telephone
      rz_is_ssn @include(if: ${rzIsSSNEnabled})
      rz_address_id @include(if: ${rzIsUtilsEnabled})
    }
    items {
      uid
      quantity
      prices {
        discounts {
          amount {
            currency, value
          }
          label
        }
        total_item_discount {
          currency
          value
        }
        row_total_including_tax {
          currency
          value
        }
      }
      ... on ConfigurableCartItem {
        configurable_options  {
          configurable_product_option_uid 
          configurable_product_option_value_uid 
          option_label 
          value_label 
        }
        configured_variant {
          url_key,
          url_suffix
          sku
          name
          thumbnail {
            disabled
            label
            position
            url
          }
        }
      }
      product {
        url_key,
        url_suffix
        sku
        name
        thumbnail {
          disabled
          url
        }
        stock_status
        ${rzIsGalleryMetaEnabledTest()}

        __typename
        name
        new
        price_range {
          maximum_price {
            discount {
              amount_off
              percent_off
            }
            final_price {
              currency
              value
            }
            fixed_product_taxes {
              amount {
                currency
                value
              }
              label
            }
            regular_price {
              currency
              value
            }
          } 
          minimum_price {
            discount {
              amount_off
              percent_off
            }
            final_price {
              currency
              value
            }
            fixed_product_taxes {
              amount {
                currency
                value
              }
              label
            }
            regular_price {
              currency
              value
            }
          } 
        }
        price_tiers {
          discount {
            amount_off
            percent_off
          }
          final_price {
            value
            currency
          }
          quantity
        }
        stock_status
        sale
        uid
        sku
        id
        url_key
        url_suffix
        ... on ConfigurableProduct {
          configurable_options {
            attribute_code
            attribute_uid
            id
            label
            position
            uid
            use_default
            values {
              default_label
              label
              store_label
              swatch_data {
                value
              }
              uid
              use_default_value
            }
          }
          variants {
            product {
              attribute_set_id
              ... on PhysicalProductInterface {
                weight
              }
              image {
                disabled
                label
                position
                url
              }
              name
              new

              price_range {
                maximum_price {
                  discount {
                    amount_off
                    percent_off
                  }
                  final_price {
                    currency
                    value
                  }
                  fixed_product_taxes {
                    amount {
                      currency
                      value
                    }
                    label
                  }
                  regular_price {
                    currency
                    value
                  }
                } 
                minimum_price {
                  discount {
                    amount_off
                    percent_off
                  }
                  final_price {
                    currency
                    value
                  }
                  fixed_product_taxes {
                    amount {
                      currency
                      value
                    }
                    label
                  }
                  regular_price {
                    currency
                    value
                  }
                } 
              }
              price_tiers {
                discount {
                  amount_off
                  percent_off
                }
                final_price {
                  value
                  currency
                }
                quantity
              }

              stock_status
              sale
              uid
              sku
              id
              url_key
              url_suffix

              url_key
              url_suffix
            }
            attributes {
              label
              code
              value_index
              uid
            }
          }
        }
      }
    }
  }
`;

export const CartQuery = gql`
  query cart($cartId: String!) {
    cart(cart_id: $cartId) {
      id, total_quantity,
      items {
        uid
        quantity
        product {
          url_key
          stock_status
          sku
        }
      }
    }
  }
`;

export const CustomerCartQuery = gql`
  query customerCart {
    customerCart {
      id, total_quantity,
      items {
        uid
        quantity
        product {
          url_key
          stock_status
          sku
        }
      }
    }
  }
`;

export const CreateEmptyCartMutation = gql`
  mutation createEmptyCart {
    createEmptyCart
  }
`;

export const AddToCartMutation = gql`
  mutation addToCartMutation($cartId: String!, $cartItems: [CartItemInput!]!){
    addProductsToCart(
      cartId: $cartId
      cartItems: $cartItems
    ) {
      cart {
        ...CartItemFields
      }
      user_errors {
        code
        message
      }
    }
  }
  ${CartItemFields}
`;

export const RemoveFromCartMutation = gql`
  mutation removeFromCartMutation($cartId: String!, $cart_item_uid: ID!){
    removeItemFromCart(
      input: {
        cart_id: $cartId,
        cart_item_uid: $cart_item_uid
      }
    ) {
      cart {
        ...CartItemFields
      }
    }
  }
  ${CartItemFields}
`;

export const UpdateCartItemsMutation = gql`
  mutation updateCartItems($cartId: String!, $cartItems: [CartItemUpdateInput!]!){
    updateCartItems(
      input: {
        cart_id: $cartId,
        cart_items: $cartItems
      }
    ) {
      cart {
        ...CartItemFields
      }
    }
  }
  ${CartItemFields}
`;

export const MergeCartMutation = gql`
  mutation mergeCartMutation($srcCartId: String!, $cartId: String!){
    mergeCarts(
      source_cart_id: $srcCartId,
      destination_cart_id: $cartId
    ) {
      ...CartItemFields
    }
  }
  ${CartItemFields}
`;

export const CartMiniQuery = gql`
  query cartMini($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CartMiniFields
    }
  }
  ${CartMiniFields}
`;

export const CustomerCartMiniQuery = gql`
  query customerCartMini {
    customerCart {
      ...CartMiniFields
    }
  }
  ${CartMiniFields}
`;

export const CartCountMiniFields = gql`
  fragment CartCountMiniFields on Cart {
    id
    total_quantity
    email
    items {
      uid
      quantity
      product {
        url_key, url_suffix
        sku
        name
        stock_status
      }
    }
  }
`;

export const CartCountQuery = gql`
  query cartMini($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CartCountMiniFields
    }
  }
  ${CartCountMiniFields}
`;

export const CustomerCartCountQuery = gql`
  query customerCartMini {
    customerCart {
      ...CartCountMiniFields
    }
  }
  ${CartCountMiniFields}
`;

export const CartDetailQuery = gql`
  query cartDetail($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CartDetailFields
    }
  }
  ${CartDetailFields}
`;

export const CustomerCartDetailQuery = gql`
  query customerCartDetail {
    customerCart {
      ...CartDetailFields
    }
  }
  ${CartDetailFields}
`;

export const SetShippingAddressOnCart = gql`
  mutation setShippingAddressesOnCart
  ($cart_id: String!, $shipping_addresses: [ShippingAddressInput!]!) {
    setShippingAddressesOnCart(
      input: {
        cart_id: $cart_id,
        shipping_addresses: $shipping_addresses,
      }
    ) {
      cart {
        ...CartDetailFields
      }
    }
  }
  ${CartDetailFields}
`;

export const SetBillingAddressOnCart = gql`
  mutation setBillingAddressOnCart
  ($cart_id: String!, $billing_address: BillingAddressInput!) {
    setBillingAddressOnCart(
      input: {
          cart_id: $cart_id,
          billing_address: $billing_address,
        }
    ) {
      cart {
        billing_address {
          firstname, lastname
          street, city, postcode
          company
          telephone
          rz_is_ssn @include(if: ${rzIsSSNEnabled})
          rz_address_id @include(if: ${rzIsUtilsEnabled})
        }
      }
    }
  }
`;

export const ApplyCouponToCartMutation = gql`
  mutation applyCouponToCartMutation($cart_id: String!, $coupon_code: String!){
    applyCouponToCart(
      input: {
        cart_id: $cart_id,
        coupon_code: $coupon_code
      }
    ) {
      cart {
        ...CartItemFields
      }
    }
  }
  ${CartItemFields}
`;

export const RemoveCouponToCartMutation = gql`
  mutation removeCouponToCartMutation($cart_id: String!){
    removeCouponFromCart(
      input: {
        cart_id: $cart_id
      }
    ) {
      cart {
        ...CartItemFields
      }
    }
  }
  ${CartItemFields}
`;

// Only for to support customer notes, I have added entire shippingAddres in below mutation.
export const SetShippingMethodAloneMutation = gql`
  mutation SetShippingMethodAloneMutation(
    $shippingMethod: SetShippingMethodsOnCartInput,
    $shippingAddres: SetShippingAddressesOnCartInput,
  ) {
    setShippingMethodsOnCart(input: $shippingMethod) { cart {
      id, 
      shipping_addresses {
        selected_shipping_method {
          amount {
            value, currency
          }
          carrier_code, carrier_title
          method_code, method_title
        }
        firstname, lastname
        street, city, postcode
        company
        pickup_location_code
        customer_notes @include(if: ${rzIsCustomerNotesEnabled})
        telephone
        rz_is_ssn @include(if: ${rzIsSSNEnabled})
        rz_address_id @include(if: ${rzIsUtilsEnabled})
        ${rzIsShippingModuleEnabledTest('rz_shipping_attributes')}
      }
    } }
    setShippingAddressesOnCart(input: $shippingAddres) { cart {
      id
      shipping_addresses {
        customer_notes @include(if: ${rzIsCustomerNotesEnabled})
      }
    } }
  }
`;

export const SetShippingAddressAloneGuestMutation = gql`
  mutation SetShippingAddressAloneGuestMutation(
    $shippingAddres: SetShippingAddressesOnCartInput,
    $email: SetGuestEmailOnCartInput!
    $billingAddres: SetBillingAddressOnCartInput,
  ) {
    setBillingAddressOnCart(input: $billingAddres) { cart { id } }
    setShippingAddressesOnCart(input: $shippingAddres) { cart {
      id
      shipping_addresses {
        firstname, lastname
        street, city, postcode
        company
        pickup_location_code
        customer_notes @include(if: ${rzIsCustomerNotesEnabled})
        telephone
        rz_is_ssn @include(if: ${rzIsSSNEnabled})
        rz_address_id @include(if: ${rzIsUtilsEnabled})
      }
    } }
    setGuestEmailOnCart(input: $email) {
      cart {
        ...CartDetailFields
      }
    }
  }
  ${CartDetailFields}
`;

export const SetShippingAddressAloneMutation = gql`
  mutation SetShippingAddressAloneMutation(
    $shippingAddres: SetShippingAddressesOnCartInput,
    $billingAddres: SetBillingAddressOnCartInput,
  ) {
    setBillingAddressOnCart(input: $billingAddres) { cart { id } }
    setShippingAddressesOnCart(input: $shippingAddres) { cart {
      id
      shipping_addresses {
        firstname, lastname
        street, city, postcode
        company
        pickup_location_code
        customer_notes @include(if: ${rzIsCustomerNotesEnabled})
        telephone
        rz_is_ssn @include(if: ${rzIsSSNEnabled})
        rz_address_id @include(if: ${rzIsUtilsEnabled})
      }
    } }
  }
`;

export const SetShippingAddressAndMethodGuestMutation = gql`
  mutation SetShippingAddressAndMethodGuestMutation(
    $shippingAddres: SetShippingAddressesOnCartInput,
    $billingAddres: SetBillingAddressOnCartInput,
    $shippingMethod: SetShippingMethodsOnCartInput,
    $email: SetGuestEmailOnCartInput!
  ) {
    setBillingAddressOnCart(input: $billingAddres) { cart { id } }
    setShippingAddressesOnCart(input: $shippingAddres) { cart { id } }
    setShippingMethodsOnCart(input: $shippingMethod) { cart {
      id, 
      shipping_addresses {
        selected_shipping_method {
          amount {
            value, currency
          }
          carrier_code, carrier_title
          method_code, method_title
        }
        firstname, lastname
        street, city, postcode
        company
        pickup_location_code
        customer_notes @include(if: ${rzIsCustomerNotesEnabled})
        telephone
        rz_is_ssn @include(if: ${rzIsSSNEnabled})
        rz_address_id @include(if: ${rzIsUtilsEnabled})
        ${rzIsShippingModuleEnabledTest('rz_shipping_attributes')}
      }
    } }
    setGuestEmailOnCart(input: $email) {
      cart {
        ...CartDetailFields
      }
    }
  }
  ${CartDetailFields}
`;

export const SetShippingAddressAndMethodMutation = gql`
  mutation SetShippingAddressAndMethodMutation(
    $shippingAddres: SetShippingAddressesOnCartInput,
    $billingAddres: SetBillingAddressOnCartInput,
    $shippingMethod: SetShippingMethodsOnCartInput
  ) {
    setBillingAddressOnCart(input: $billingAddres) { cart { id } }
    setShippingAddressesOnCart(input: $shippingAddres) { cart { id } }
    setShippingMethodsOnCart(input: $shippingMethod) { cart {
      id, 
      shipping_addresses {
        selected_shipping_method {
          amount {
            value, currency
          }
          carrier_code, carrier_title
          method_code, method_title
        }
        firstname, lastname
        street, city, postcode
        company
        pickup_location_code
        customer_notes @include(if: ${rzIsCustomerNotesEnabled})
        telephone
        rz_is_ssn @include(if: ${rzIsSSNEnabled})
        rz_address_id @include(if: ${rzIsUtilsEnabled})
        ${rzIsShippingModuleEnabledTest('rz_shipping_attributes')}
      }
    } }
  }
`;

export const SetCustomerDetailsGuestMutation = gql`
  mutation SetCustomerDetailsGuestMutation(
    $shippingAddress: SetShippingAddressesOnCartInput,
    $email: SetGuestEmailOnCartInput!
  ) {
    setShippingAddressesOnCart(input: $shippingAddress) {
      cart {
        ...CartDetailFields
      }
    }
    setGuestEmailOnCart(input: $email) {
      cart {
        ...CartDetailFields
      }
    }
  }
  ${CartDetailFields}
`;

export const SetCustomerDetailsMutation = gql`
  mutation SetCustomerDetailsMutation(
    $shippingAddress: SetShippingAddressesOnCartInput,
  ) {
    setShippingAddressesOnCart(input: $shippingAddress) {
      cart {
        ...CartDetailFields
      }
    }
  }
  ${CartDetailFields}
`;

export const SetShippingMethodMutation = gql`
  mutation SetShippingMethodMutation(
    $shippingMethod: SetShippingMethodsOnCartInput,
    $shippingAddress: SetShippingAddressesOnCartInput,
  ) {
    setShippingMethodsOnCart(input: $shippingMethod) {
      cart {
        id, 
        shipping_addresses {
          selected_shipping_method {
            amount {
              value, currency
            }
            carrier_code, carrier_title
            method_code, method_title
          }
          firstname, lastname
          street, city, postcode
          company
          pickup_location_code
          customer_notes @include(if: ${rzIsCustomerNotesEnabled})
          telephone
          rz_is_ssn @include(if: ${rzIsSSNEnabled})
          rz_address_id @include(if: ${rzIsUtilsEnabled})
          ${rzIsShippingModuleEnabledTest('rz_shipping_attributes')}
        }
      }
    }
    setShippingAddressesOnCart(input: $shippingAddress) {
      cart {
        id
        shipping_addresses {
          customer_notes @include(if: ${rzIsCustomerNotesEnabled})
        }
      }
    }
  }
`;
