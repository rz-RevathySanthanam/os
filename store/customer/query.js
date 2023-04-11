import { gql } from '@apollo/client';
import { checkEligibilityOfQuerySet } from '@/roanuz/lib/utils';

const rzIsSSNEnabled = checkEligibilityOfQuerySet('rzIsSSNEnabled');
const rzIsUtilsEnabled = checkEligibilityOfQuerySet('rzIsUtilsEnabled');

let rzSSNField = '';

if (rzIsSSNEnabled) {
  rzSSNField = {
    type: '$rz_is_ssn: String',
    input: 'rz_is_ssn: $rz_is_ssn',
  };
}

export const ProductEnquiryMutation = gql`
  mutation ProductEnquiryMutation(
    $productId: Int!,
    $email: String!,
    $name: String!,
    $msg: String!,
    $recipientsEmail: String!, 
  ) {
    sendEmailToFriend(input: {
      product_id: $productId,
      recipients: {
        name: "Admin",
        email: $recipientsEmail,
      }
      sender: {
        name: $name,
        email: $email,
        message: $msg
      }
    }) {
      sender {
        email
        name
      }
    }
  }
`;

export const CustomerTokenMutation = gql`
  mutation customerToken(
    $email: String!,
    $password: String!,
  ) {
    generateCustomerToken(
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const CreateCustomerMuation = gql`
  mutation createCustomerV2(
    $firstname: String!,
    $lastname: String!,
    $email: String!,
    $password: String!,
    $is_subscribed: Boolean,
    ${rzSSNField && rzSSNField.type}
  ) {
    createCustomerV2(input: {
      firstname: $firstname,
      lastname: $lastname,
      email: $email,
      password: $password,
      is_subscribed: $is_subscribed,
      ${rzSSNField && rzSSNField.input}
    }) {
      customer {
        firstname, middlename, lastname
        email,
        is_subscribed,
        rz_is_ssn @include(if: ${rzIsSSNEnabled})
      }
    }

    generateCustomerToken(
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const CustomerProfileMiniQuery = gql`
  query customerProfileMini {
    customer {
      firstname, lastname, email, is_subscribed,
      rz_uuid @include(if: ${rzIsUtilsEnabled}),
      rz_is_ssn @include(if: ${rzIsSSNEnabled}),
      rz_is_b2b @include(if: ${rzIsUtilsEnabled}),
      rz_allow_invoice @include(if: ${rzIsUtilsEnabled}),
    }
  }
`;

export const CustomerOrderFields = gql`
  fragment CustomerOrderFields on CustomerOrder {
    id
    number
    status
    order_date
    total {
      grand_total { value, currency }
    }
    shipping_method
    shipping_address {
      firstname, lastname,
    }
    payment_methods {
      name
      type
      additional_data { name, value }
    }
    items { id }
  }
`;

export const CustomerSummaryQuery = gql`
  query customerSummary (
    $currentPage: Int,
    $pageSize: Int
  ) {
    customer {
      firstname, lastname, email
      orders(currentPage:$currentPage, pageSize: $pageSize) {
        total_count
        items {
          ...CustomerOrderFields
        }
        page_info {
          current_page
          page_size
          total_pages
        }
      }
    }
  }
  ${CustomerOrderFields}
`;

export const CustomerAddressesQuery = gql`
  query CustomerAddresses {
    customer {
      addresses {
        id
        firstname
        lastname
        street
        city
        region {
          region_code
          region
        }
        postcode
        country_code
        telephone
        company
        default_shipping
        default_billing
        rz_is_ssn @include(if: ${rzIsSSNEnabled})
      }
    }
  }
`;

export const DeleteCustomerAddress = gql`
  mutation deleteCustomerAddress (
    $id: Int!,
  ) {
    deleteCustomerAddress(
        id: $id,
      )
    }
`;

export const CreateCustomerAddressMutation = gql`
  mutation createCustomerAddress(
    $city: String!,
    $postcode: String!,
    $firstname: String!,
    $lastname: String!,
    $company: String!,
    $telephone: String!,
    $street: [String!],
    $country_code: CountryCodeEnum!
    $default_shipping: Boolean,
    $default_billing: Boolean,
    ${rzSSNField && rzSSNField.type}
  ){
    createCustomerAddress(input: {
      street: $street,
      telephone: $telephone,
      postcode: $postcode,
      city: $city,
      company: $company,
      firstname: $firstname,
      lastname: $lastname,
      country_code: $country_code,
      default_billing: $default_billing,
      default_shipping: $default_shipping,
      ${rzSSNField && rzSSNField.input}
    }) {
      id
      country_code
      street
      telephone
      postcode
      city
      firstname
      lastname
      default_shipping
      default_billing
      rz_is_ssn @include(if: ${rzIsSSNEnabled})
    }
  }
`;

export const UpdateCustomerAddressMutation = gql`
  mutation updateCustomerAddress(
    $id: Int!,
    $city: String!,
    $postcode: String!,
    $firstname: String!,
    $lastname: String!,
    $company: String!,
    $telephone: String!,
    $street: [String!],
    $default_shipping: Boolean,
    $default_billing: Boolean,
    ${rzSSNField && rzSSNField.type}
  ){
    updateCustomerAddress(id: $id, input: {
      city: $city,
      postcode: $postcode,
      firstname: $firstname,
      lastname: $lastname,
      company: $company,
      telephone: $telephone,
      street: $street,
      default_billing: $default_billing,
      default_shipping: $default_shipping,
      ${rzSSNField && rzSSNField.input}
    }) {
      id
      firstname
      lastname
      city
      company
      telephone
      postcode
      default_billing
      default_shipping
      rz_is_ssn @include(if: ${rzIsSSNEnabled})
      street
    }
  }
`;

export const UpdateCustomerMuation = gql`
  mutation updateCustomer (
    $firstname: String!,
    $lastname: String!,
    $email: String!,
    $password: String,
  ) {
    updateCustomer(
      input: {
        firstname: $firstname,
        lastname: $lastname,
        email: $email,
        password: $password,
      }
    ) {
      customer {
        firstname,
        lastname,
        email,
      }
    }
  }
`;

export const UpdateCustomerPasswordMuation = gql`
  mutation changePassword (
    $currentPassword: String!,
    $newPassword: String!,
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword,
      newPassword: $newPassword,
    ) {
      email
    }
  }
`;

export const UpdateCustomerNewLetterMuation = gql`
  mutation updateCustomer (
    $is_subscribed: Boolean,
  ) {
    updateCustomer(
      input: {
        is_subscribed: $is_subscribed,
      }
    ) {
      customer {
        is_subscribed
        email
      }
    }
  }
`;

export const RequestPasswordResetEmailMutation = gql`
  mutation requestPasswordResetEmail(
    $email: String!,
  ) {
    requestPasswordResetEmail(
      email: $email
    )
  }
`;

export const ResetPasswordMutation = gql`
  mutation resetPassword(
    $email: String!,
    $resetPasswordToken: String!,
    $newPassword: String!,
  ) {
    resetPassword(
      email: $email
      resetPasswordToken: $resetPasswordToken,
      newPassword: $newPassword,
    )
  }
`;

export const CustomerProfileAndAddressQuery = gql`
  query customerProfileAndAddressQuery {
    customer {
      firstname, lastname, email, is_subscribed,
      rz_is_ssn @include(if: ${rzIsSSNEnabled})
      addresses {
        id
        firstname
        lastname
        street
        city
        region {
          region_code
          region
        }
        postcode
        country_code
        telephone
        company
        default_billing
        default_shipping
        rz_is_ssn @include(if: ${rzIsSSNEnabled})
      }
    }
  }
`;

export const SubscribeEmailToNewsletterMutation = gql`
  mutation subscribeEmailToNewsletter(
    $email: String!
  ) {
    subscribeEmailToNewsletter(
      email: $email
    ) {
      status
    }
  }
`;

export const ApplyForBussinessMuation = gql`
  mutation createCustomerV2(
    $firstname: String!,
    $lastname: String!,
    $email: String!,
    $password: String!,
    $is_subscribed: Boolean,
    ${rzSSNField && rzSSNField.type}
    $companyInfo: String
  ) {
    createCustomerV2(input: {
      firstname: $firstname,
      lastname: $lastname,
      email: $email,
      password: $password,
      is_subscribed: $is_subscribed,
      ${rzSSNField && rzSSNField.input}
      rz_additional_data: $companyInfo
    }) {
      customer {
        firstname, middlename, lastname
        email,
        is_subscribed,
        rz_is_ssn @include(if: ${rzIsSSNEnabled})
        rz_uuid @include(if: ${rzIsUtilsEnabled})
        rz_additional_data
      }
    }
  }
`;

export const CustomerAllListsQuery = gql`
  query getAllLists (
    $rzCustomerKey: String!,
  ) {
    getAllLists(rz_customer_key: $rzCustomerKey) {
      list_id
      list_type
      privacy
    }
  }
`;

export const CustomerListQuery = gql`
  query getCustomerList (
    $listId: String!,
  ) {
    getCustomerList(list_id: $listId) {
      list_id
      list_type
      privacy
      created_at
      updated_at
      items {
        sku
        qty
        config
      }
    }
  }
`;

export const CreateCustomerListMutation = gql`
  mutation createCustomerList(
    $rzCustomerKey: String!,
    $listType: String!,
  ) {
    createCustomerList(
      input: {
        rz_customer_key: $rzCustomerKey,
        list_type: $listType,
        privacy: true,
      }
    ){
      list_id
      list_type
      privacy
      created_at
      updated_at
      items {
        sku
        qty
        config
      }
    }
  }
`;

export const AddOrUpdateItemsToCustomerListMutation = gql`
  mutation addOrUpdateItemsToList(
    $listId: String!,
    $items: [itemsInput],
  ) {
    addOrUpdateItemsToList(
      input: {
        list_id: $listId,
        items: $items,
      }
    ){
      sku
      qty
      config
    }
  }
`;

export const RemoveItemFromCustomerListMutation = gql`
  mutation removeItemsFromList(
    $listId: String!,
    $sku: String!,
  ) {
    removeItemsFromList(
      input: {
        list_id: $listId,
        sku: $sku,
      }
    )
  }
`;

export const RemoveAllItemsFromCustomerListMutation = gql`
  mutation removeAllItemsFromList(
    $listId: String!,
  ) {
    removeAllItemsFromList(
      list_id: $listId,
    )
  }
`;

export const GetDocumentPreSignedUrlQuery = gql`
  query rzGetDocumentPreSignedUrl (
    $fileNameWithExtension: [String!]!,
    $rzCustomerUuid: String!,
  ) {
    rzGetDocumentPreSignedUrl(
      fileNameWithExtension: $fileNameWithExtension,
      rz_customer_uuid: $rzCustomerUuid
    ) {
      url
    }
  }
`;

export const SendCustomInformation = gql`
  mutation rzSendCustomInformation(
    $cartId: String,
    $productSkus: [String],
    $recipients: [rzSendCustomInformationRecipientInput],
    $sender: rzSendCustomInformationSenderInput,
  ) {
    rzSendCustomInformation(input: {
      cart_id: $cartId,
      product_skus: $productSkus,
      recipients: $recipients
      sender: $sender
    }) {
      message
      status
    }
  }
`;
