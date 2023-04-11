/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import { Pagination } from './pagination';

export default {
  title: 'Omni Shop / View / Category',
  component: Pagination,
};

const Wrapper = styled.div`
  >div {
    padding: 20px;
  }
`;

const Template = () => (
  <Wrapper>
    <Pagination
      currentPage={2}
      totalPages={10}
      onPageChanged={() => ({})}
      className="pagination-line"
    />
  </Wrapper>
);

export const PaginationView = Template.bind({});
PaginationView.args = {
};
