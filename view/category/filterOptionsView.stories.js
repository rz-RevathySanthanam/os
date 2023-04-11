/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import productsData from '@/stories/sample-data/products.json';
import { FilterOptionsView } from './filterOptionsView';

export default {
  title: 'Omni Shop / View / Category',
  component: FilterOptionsView,
};

const Wrapper = styled.div`
  >div {
    padding: 20px;
  }
`;

const Template = (args) => (
  <Wrapper>
    <FilterOptionsView
      filterItem={productsData.products.aggregations[2]}
      selectedFilters={args.selectedFilters}
      specialCases={args.specialCases}
      checkEligibleStatus={() => {
        return 3;
      }}
      getItemCount={() => {
        return 3;
      }}
    />
  </Wrapper>
);

export const FilterOptions = Template.bind({});
FilterOptions.args = {
  selectedFilters: {},
  specialCases: [],
};
