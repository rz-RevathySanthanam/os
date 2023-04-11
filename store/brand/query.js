import { gql } from '@apollo/client';

export const BrandCategoriesList = gql`
  query brandCategoriesList($brandId: String!) {
    products(filter: {
      rz_manufacturer: { eq: $brandId }
    }) {
      aggregations {
        attribute_code
        count
        label
        options {
          count
          label
          value
        }
      } 
    }
  }
`;
