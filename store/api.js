import { CustomerProfileMiniQuery } from '@/roanuz/store/customer/query';
import { updateValueToPath, valueFromPath } from '../lib/utils';
import {
  ProductsFilterQuery,
  ProductCardListQuery,
  ProductDetailQuery,
  CategoryAndItsProductsQuery,
  ProductVariantQuickQuery,
} from './product/product.query';

// May add params later based on requirement
export function QueryAPI(gql) {
  return {
    gql,
  };
}

export const API = {
  product: {
    queries: {
      productsFilter: QueryAPI(ProductsFilterQuery),
      productCardList: QueryAPI(ProductCardListQuery),
      productDetail: QueryAPI(ProductDetailQuery),
      categoryAndItsProducts: QueryAPI(CategoryAndItsProductsQuery),
      productVariantQuick: QueryAPI(ProductVariantQuickQuery),
    },
  },
  customer: {
    queries: {
      profileMini: QueryAPI(CustomerProfileMiniQuery),
    },
  },
};

export function updateAPI(name, apiEndpoint) {
  updateValueToPath(API, name, apiEndpoint);
}

export function lookUpQuery(name) {
  return valueFromPath(name, API)?.gql;
}
