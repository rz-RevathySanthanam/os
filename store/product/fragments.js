import { gql } from '@apollo/client';
import { checkEligibilityOfQuerySet } from '@/roanuz/lib/utils';
import { RzStockAttributes } from './stockAttributes';

const rzAttributeList = checkEligibilityOfQuerySet('rzAttributeList');

export const MiniFragments = {
  PriceRangeFields: gql`
    fragment priceRangeFields on ProductInterface {
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
    }
  `,
  PriceTiersFields: gql`
    fragment priceTierFields on ProductInterface {
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
    }
  `,
  CustomizableProductFields: gql`
    fragment customizableProductFields on CustomizableProductInterface {
      options{
        required
        sort_order
        title
        uid
        type: __typename
        ... on CustomizableAreaOption {
          areaOption: value {
            uid
            price
            price_type,
            max_characters
          }
        }
    
        ... on CustomizableDateOption  {
          dateOption: value {
            uid
            price
            price_type
          }
        }
    
        ... on CustomizableDropDownOption {
          dropdownOption: value {
            uid
            price
            price_type,
            sort_order,
            title,
            option_type_id
          }
        }
    
        ... on  CustomizableMultipleOption {
          multipleOption: value {
            uid
            price
            price_type,
            sort_order,
            title,
            option_type_id
          }
        }
    
        ... on  CustomizableFieldOption {
          fieldOption: value {
            uid
            price
            price_type,
            max_characters,
          }
        }
        ... on  CustomizableRadioOption  {
          radionOption: value {
            uid
            price
            price_type,
            sort_order,
            title,
            option_type_id
          }
        }
        ... on  CustomizableCheckboxOption {
          checkboxOption: value {
            uid
            price
            price_type,
            sort_order,
            title,
            option_type_id
          }
        }
      }
    }
  `,
};

export const BaseProductCardFields = gql`
  fragment baseProductCardFields on ProductInterface {
    __typename
    canonical_url
    categories {
      name
      id
      uid
      url_key
      url_path
      url_suffix
    }
    image {
      disabled
      label
      position
      url
    }
    name
    new
    special_from_date
    ...priceRangeFields
    ...priceTierFields
    special_price
    special_to_date
    stock_status
    only_x_left_in_stock
    sale
    uid
    sku
    id
    url_key
    url_suffix
    short_description {
      html
    }
  
    crosssell_products {
      uid
      sku
      url_key
      name
      new
      url_suffix
      canonical_url
      url_suffix
      stock_status
      image {
        disabled
        url
      }
      special_from_date
      price_range {
        minimum_price {
          final_price {
            currency
            value
          }
        }
      }
    }
    rzAttributeList @include(if: ${rzAttributeList}) {
      group
      attributes {
        label
        code
        value
        rz_attribute_id
      }
    }
    ${RzStockAttributes}
  }
  ${MiniFragments.PriceRangeFields}
  ${MiniFragments.PriceTiersFields}
`;

export const ProductFragments = {
  VirtualProductFields: gql`
    fragment virtualProductFields on VirtualProduct {
      ...customizableProductFields
    }
    ${MiniFragments.CustomizableProductFields}
  `,

  SimpleProductFields: gql`
    fragment simpleProductFields on SimpleProduct {
      weight
      ...customizableProductFields
    }
    ${MiniFragments.CustomizableProductFields}
  `,

  DownloadableProductFields: gql`
    fragment downloadableProductFields on DownloadableProduct {
      ...customizableProductFields
      
      downloadable_product_links {
        price
        sample_url
        sort_order
        title
        uid
      } 
      
      downloadable_product_samples {
        sample_url
        sort_order
        title
      }
    }
    ${MiniFragments.CustomizableProductFields}
  `,

  BundleProductFields: gql`
    fragment bundleProductFields on BundleProduct {
      weight
      ...customizableProductFields
      ship_bundle_items
      dynamic_sku
      dynamic_price
      dynamic_weight
      price_view
      items {
        position
        required
        sku
        title
        type
        uid
        options {
          can_change_quantity
          is_default
          label
          position
          price
          price_type
          quantity
          uid
          product {
            uid
            name
            sku
            url_key,
            special_from_date
            ...priceRangeFields
            ...priceTierFields
          }
        }
      }
    }
    ${MiniFragments.CustomizableProductFields}
    ${MiniFragments.PriceRangeFields}
    ${MiniFragments.PriceTiersFields}
  `,

  GroupedProductFields: gql`
    fragment groupedProductFields on GroupedProduct {
      weight
      items {
        position
        qty
        product {
          uid
          name
          sku
          url_key,
          special_from_date
          ...priceRangeFields
          ...priceTierFields
        }
      }
    }
    ${MiniFragments.PriceRangeFields}
    ${MiniFragments.PriceTiersFields}
  `,

  ConfigurableProductFields: gql`
    fragment configurableProductFields on ConfigurableProduct {
      weight
      ...customizableProductFields
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
          ...baseProductCardFields
        }
        attributes {
          label
          code
          value_index
          uid
        }
      }
    }
    ${MiniFragments.CustomizableProductFields}
    ${BaseProductCardFields}
  `,

  FilterAggregationFields: gql`
    fragment filterAggregationFields on Aggregation {
      attribute_code
      count
      label
      options {
        count
        label
        value
      }
    }
  `,

  FilterPageFields: gql`
    fragment filterPageFields on SearchResultPageInfo {
      current_page
      page_size
      total_pages
    }
  `,

  FilterSortFields: gql`
    fragment filterSortFields on SortFields {
      default
      options {
        label
        value
      } 
    }
  `,
};

// export const BaseProductCardFields = gql`
//   fragment baseProductCardFields on ProductInterface {
//     __typename
//     canonical_url
//     categories {
//       name
//       id
//       uid
//       url_key
//       url_path
//       url_suffix
//     }
//     image {
//       disabled
//       label
//       position
//       url
//     }
//     name
//     new
//     special_from_date
//     ...priceRangeFields
//     ...priceTierFields
//     special_price
//     special_to_date
//     stock_status
//     only_x_left_in_stock
//     sale
//     uid
//     sku
//     id
//     url_key
//     url_suffix
//     short_description {
//       html
//     }
//     crosssell_products {
//       uid
//       sku
//       url_key
//       name
//       new
//       url_suffix
//       canonical_url
//       url_suffix
//       stock_status
//       image {
//         disabled
//         url
//       }
//       special_from_date
//       price_range {
//         minimum_price {
//           final_price {
//             currency
//             value
//           }
//         }
//       }
//     }
//     rzAttributeList @include(if: ${rzAttributeList}) {
//       group
//       attributes {
//         label
//         code
//         value
//         rz_attribute_id
//       }
//     }
//   }
//   ${MiniFragments.PriceRangeFields}
//   ${MiniFragments.PriceTiersFields}
// `;

export const BaseProductFields = gql`
  fragment baseProductFields on ProductInterface {
    ...baseProductCardFields
  
    categories {
      available_sort_by
      breadcrumbs {
        category_level
        category_name
        category_uid
        category_url_key
        category_url_path
      }
      canonical_url
      description
      id
      uid
      url_key
      url_path
      url_suffix
    }
    country_of_manufacture
  
    description {
      html
    }
    gift_message_available
    media_gallery {
      disabled
      label
      position
      url
      ... on ProductVideo {
        video_content {
          media_type
          video_provider
          video_url
          video_title
          video_description
          video_metadata
        }
      }
    }
    meta_description
    meta_keyword
    meta_title
    only_x_left_in_stock
    options_container
    product_links {
      link_type
      linked_product_sku
      linked_product_type
      position
      sku
    }
    rating_summary
    review_count
    reviews {
      items{
        created_at
        summary
        average_rating
        nickname
        ratings_breakdown {
          name
          value
        }
      }
    }
    sale
    short_description {
      html
    }
    small_image {
      disabled
      label
      position
      url
    }
    swatch_image
    thumbnail {
      disabled
      label
      position
      url
    }
  
    url_key
    url_suffix
  
    upsell_products {
      uid
      sku
      url_key
      name
      new
      url_suffix
      canonical_url
      url_suffix
      image {
        disabled
        url
      }
    }
    related_products {
      uid
      sku
      url_key
      name
      new
      url_suffix
      canonical_url
      url_suffix
      image {
        disabled
        url
      }
    }
  }
  ${BaseProductCardFields}
`;

export const FieldsThatVariesBasedOnVariants = gql`
  fragment fieldsThatVariesBasedOnVariants on ProductInterface {
    canonical_url
    image {
      disabled
      label
      position
      url
    }
    name
    new
    special_from_date

    ...priceRangeFields
    ...priceTierFields

    special_price
    special_to_date
    stock_status
    sale
    uid
    sku
    id
    url_key
    url_suffix
    short_description {
      html
    }
  
    crosssell_products {
      uid
      sku
      url_key
      name
      new
      url_suffix
      canonical_url
      url_suffix
      stock_status
      image {
        disabled
        url
      }
      special_from_date
      price_range {
        minimum_price {
          final_price {
            currency
            value
          }
        }
      }
    }

    rzAttributeList @include(if: ${rzAttributeList}) {
      group
      attributes {
        label
        code
        value
        rz_attribute_id
      }
    }

    description {
      html
    }

    media_gallery {
      disabled
      label
      position
      url
      ... on ProductVideo {
        video_content {
          media_type
          video_provider
          video_url
          video_title
          video_description
          video_metadata
        }
      }
    }
    
    only_x_left_in_stock
    
    rating_summary
    review_count
    reviews {
      items{
        created_at
        summary
        average_rating
        nickname
        ratings_breakdown {
          name
          value
        }
      }
    }

    sale
    short_description {
      html
    }

    swatch_image
  
    thumbnail {
      disabled
      label
      position
      url
    }

    url_key
    url_suffix

    upsell_products {
      uid
      sku
      url_key
      name
      new
      url_suffix
      canonical_url
      url_suffix
      image {
        disabled
        url
      }
    }
    related_products {
      uid
      sku
      url_key
      name
      new
      url_suffix
      canonical_url
      url_suffix
      image {
        disabled
        url
      }
    }
    ${RzStockAttributes}
  }
  ${MiniFragments.PriceRangeFields}
  ${MiniFragments.PriceTiersFields}
`;

export const ConfigurableProductFieldsDetail = gql`
  fragment configurableProductFieldsDetail on ConfigurableProduct {
    weight
    ...customizableProductFields
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
        ...fieldsThatVariesBasedOnVariants
      }
      attributes {
        label
        code
        value_index
        uid
      }
    }
  }
  ${MiniFragments.CustomizableProductFields}
  ${FieldsThatVariesBasedOnVariants}
`;

export const ConfigurableProductFieldsMiniDetail = gql`
  fragment configurableProductFieldsMiniDetail on ConfigurableProduct {
    weight
    ...customizableProductFields
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
        ...baseProductCardFields
      }
      attributes {
        label
        code
        value_index
        uid
      }
    }
  }
  ${MiniFragments.CustomizableProductFields}
  ${BaseProductCardFields}
`;

export const ConfigurableProductQuickViewFields = gql`
  fragment configurableProductQuickViewFields on ConfigurableProduct {
    weight
    ...customizableProductFields
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
        ...priceRangeFields
        ...priceTierFields
        uid
        sku
        id
        url_key
        url_suffix
        name
        stock_status
      }
      attributes {
        label
        code
        value_index
        uid
      }
    }
  }
  ${MiniFragments.CustomizableProductFields}
  ${MiniFragments.PriceRangeFields}
  ${MiniFragments.PriceTiersFields}
`;
