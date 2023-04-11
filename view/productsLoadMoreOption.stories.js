/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import { ProductsLoadMoreOption } from './productsLoadMoreOption';

export default {
  title: 'Omni Shop / View / Category',
  component: ProductsLoadMoreOption,
};

const Wrapper = styled.div`
  >div {
    padding: 20px;
  }
`;

const Template = () => (
  <Wrapper>
    <ProductsLoadMoreOption
      totalPages={5}
      totalItems={50}
      itemsTo={25}
      className="pagination-line"
      filterLoading={false}
    />
  </Wrapper>
);

export const ProductsLoadMoreView = Template.bind({});
ProductsLoadMoreView.args = {
};
