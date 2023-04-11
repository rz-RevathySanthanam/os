import { gql } from '@apollo/client';

export const WebsiteQuery = gql`
  query rzfWebsiteDetails {
    rzfWebsiteDetails {
      id
      name
    }
  }
`;

export const WebsiteStoresQuery = gql`
  query rzfStoresInfo {
    rzfStoresInfo {
      id
      name
      stockCode
      enablePickup
      sortOrder
      kind
    }
  }
`;
