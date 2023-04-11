import { gql } from '@apollo/client';

export const WidgetsFilterMiniQuery = gql`
query WidgetsFilterMiniQuery($filterQuery: FilterInput) {
  widget(filter: $filterQuery) {
    id
  }
}
`;

// Strange html attribute is not coming when it used with fragement
export const WidgetsFilterQuery = gql`
query WidgetsFilterQuery($filterQuery: FilterInput) {
  widget(filter: $filterQuery) {
    html
    id
    theme_id
    title
    type
    store_ids
    sort_order
    page_groups {
      page_id
      page_group
      page_for
      layout_handle
      block_reference
      page_template
      entities 
    }
    parameters {
      name
      value
    }
  }
}
`;
