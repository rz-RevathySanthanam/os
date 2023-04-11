import { gql } from '@apollo/client';
import {
  BaseProductCardFields,
  BaseProductFields,
  ProductFragments,
  ConfigurableProductFieldsDetail,
  ConfigurableProductQuickViewFields,
  MiniFragments,
} from './fragments';

export const ProductsFilterQuery = gql`
  query ProductsFilterQuery(
    $searchText: String,
    $filterQuery: ProductAttributeFilterInput,
    $sortQuery: ProductAttributeSortInput,
    $currentPage: Int,
    $pageSize: Int) {
    products(search: $searchText, filter: $filterQuery, sort: $sortQuery, currentPage:$currentPage, pageSize: $pageSize) {
      items {
        ...baseProductCardFields

        ... on VirtualProduct {
          ...virtualProductFields
        }
        
        ... on SimpleProduct {
          ...simpleProductFields
        }
        
        ... on DownloadableProduct {
          ...downloadableProductFields
        }
        
        ... on BundleProduct {
          ...bundleProductFields
        }
        
        ... on GroupedProduct {
          ...groupedProductFields
        }
        
        ... on ConfigurableProduct {
          ...configurableProductFields
        }
      }
      aggregations {
        ...filterAggregationFields
      }
      page_info {
        ...filterPageFields
      }
      sort_fields {
        ...filterSortFields
      }
      total_count
    }
  }
  ${BaseProductCardFields}
  ${ProductFragments.VirtualProductFields}
  ${ProductFragments.SimpleProductFields}
  ${ProductFragments.DownloadableProductFields}
  ${ProductFragments.BundleProductFields}
  ${ProductFragments.GroupedProductFields}
  ${ProductFragments.ConfigurableProductFields}
  ${ProductFragments.FilterAggregationFields}
  ${ProductFragments.FilterPageFields}
  ${ProductFragments.FilterSortFields}
`;
export const ProductCardListQuery = gql`
  query ProductCardListQuery($urlKeys: [String!]) {
    products(
      filter: {
        url_key: {
          in: $urlKeys
        }
      }
    ) {
      items {
        ...baseProductCardFields

        ... on VirtualProduct {
          ...virtualProductFields
        }
        
        ... on SimpleProduct {
          ...simpleProductFields
        }
        
        ... on DownloadableProduct {
          ...downloadableProductFields
        }
        
        ... on BundleProduct {
          ...bundleProductFields
        }
        
        ... on GroupedProduct {
          ...groupedProductFields
        }
        
        ... on ConfigurableProduct {
          ...configurableProductFields
        }
      }
    }
  }
  ${BaseProductCardFields}
  ${ProductFragments.VirtualProductFields}
  ${ProductFragments.SimpleProductFields}
  ${ProductFragments.DownloadableProductFields}
  ${ProductFragments.BundleProductFields}
  ${ProductFragments.GroupedProductFields}
  ${ProductFragments.ConfigurableProductFields}
`;
export const ProductDetailQuery = gql`
  query ProductDetailQuery($urlKey: String, $sku: String) {
    products(
      filter: {
        url_key: {
          eq: $urlKey
        }
        sku: {
          eq: $sku
        }
      }
    ) {
      items {
        ... on VirtualProduct {
          ...virtualProductFields
        }
        
        ... on SimpleProduct {
          ...simpleProductFields
        }
        
        ... on DownloadableProduct {
          ...downloadableProductFields
        }
        
        ... on BundleProduct {
          ...bundleProductFields
        }
        
        ... on GroupedProduct {
          ...groupedProductFields
        }
        
        ... on ConfigurableProduct {
          ...configurableProductFieldsDetail
        }
        
        ...baseProductFields
      }
    }
  }
  ${BaseProductFields}
  ${ProductFragments.VirtualProductFields}
  ${ProductFragments.SimpleProductFields}
  ${ProductFragments.DownloadableProductFields}
  ${ProductFragments.BundleProductFields}
  ${ProductFragments.GroupedProductFields}
  ${ConfigurableProductFieldsDetail}
`;

export const CategoryAndItsProductsQuery = gql`
  query CategoryListQuery($filterQuery: CategoryFilterInput) {
    categoryList(filters: $filterQuery) {
      product_count
      name
      url_key
      level
      products {
        items {
          url_key
          ...baseProductCardFields
        }
      }
    }
  }
  ${BaseProductCardFields}
`;

export const ProductVariantQuickQuery = gql`
  query ProductVariantQuickQuery($sku: [String]) {
    products(
      filter: {
        sku: {
          in: $sku
        }
      }
    ) {
      items {
        ... on VirtualProduct {
          ...virtualProductFields
        }
        
        ... on SimpleProduct {
          ...simpleProductFields
        }
        
        ... on DownloadableProduct {
          ...downloadableProductFields
        }
        
        ... on BundleProduct {
          ...bundleProductFields
        }
        
        ... on GroupedProduct {
          ...groupedProductFields
        }
        
        ... on ConfigurableProduct {
          ...configurableProductQuickViewFields
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
    }
  }
  ${ProductFragments.VirtualProductFields}
  ${ProductFragments.SimpleProductFields}
  ${ProductFragments.DownloadableProductFields}
  ${ProductFragments.BundleProductFields}
  ${ProductFragments.GroupedProductFields}
  ${ConfigurableProductQuickViewFields}
  ${MiniFragments.PriceRangeFields}
  ${MiniFragments.PriceTiersFields}
`;
