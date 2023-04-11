import { gql } from '@apollo/client';

export const WishListItemFields = gql`
  fragment WishListItemFields on Wishlist {
    id
    items_count
    items_v2 {
      items {
        id
        quantity
        ... on BundleWishlistItem {
          bundle_options {
            values {
              id
              label
              quantity
            }
          }
        }
        product {
          uid
          name
          url_key
          sku
          special_from_date
          price_range {
            minimum_price {
              regular_price {
                currency
                value
              }
            }
            maximum_price {
              regular_price {
                currency
                value
              }
            }
          }
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
          }
        }
      }
    }
  }
`;

export const CustomerWishListQuery = gql`
  query customerWishList($wishListId: ID!, $pageSize: Int!) {
    customer {
      wishlist_v2(id: $wishListId) {
        id
        items_count
        items_v2(pageSize: $pageSize) {
          items {
            id
            product {
              uid
              name
              sku
              url_key
              url_suffix
              thumbnail {
                disabled
                url
              }
              stock_status
              special_from_date
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
              }
            }
          }
        }
      }
    }
  }
`;

export const AddToWishListMutation = gql`
  mutation AddToWishListMutation($wishListId: ID!, $wishListItems: [WishlistItemInput!]!){
    addProductsToWishlist(
      wishlistId: $wishListId
      wishlistItems: $wishListItems
    ) {
      wishlist {
        ...WishListItemFields
      }
    }
  }
  ${WishListItemFields}
`;

export const RemoveFromWishListMutation = gql`
  mutation RemoveFromWishListMutation($wishListId: ID!, $wishlistItemsIds: [ID!]!){
    removeProductsFromWishlist(
      wishlistId: $wishListId
      wishlistItemsIds: $wishlistItemsIds
    ) {
      wishlist {
        ...WishListItemFields
      }
    }
  }
  ${WishListItemFields}
`;
