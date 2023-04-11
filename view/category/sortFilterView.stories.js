/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import productsData from '@/stories/sample-data/products.json';
import { SortFilterView } from './sortFilterView';

export default {
  title: 'Omni Shop / View / Category',
  component: SortFilterView,
};

const Wrapper = styled.div`
  >div {
    padding: 20px;
  }
`;

const Template = () => (
  <Wrapper>
    <SortFilterView
      selectedKey="price"
      sortItems={productsData.products.sort_fields.options}
    />
  </Wrapper>
);

export const SortFilter = Template.bind({});
SortFilter.args = {
};
