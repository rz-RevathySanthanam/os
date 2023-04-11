import { gql } from '@apollo/client';

export const CustomAttributeMetaData = gql`
  query customAttributeMetadata($attributeCodes: [AttributeInput!]!) {
    customAttributeMetadata(attributes: $attributeCodes) {
      items {
        attribute_code
        attribute_options {
          label
          value
        }
        attribute_type
        entity_type
        input_type
      }
    } 
  }
`;
