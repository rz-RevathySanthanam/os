/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import categoryTreeData from '@/stories/sample-data/categoryTree.json';
import { CategoryTreeView } from './tree';

export default {
  title: 'Omni Shop / View / Category',
  component: CategoryTreeView,
};

const Wrapper = styled.div`

`;

const Template = () => (
  <Wrapper>
    <CategoryTreeView
      tree={categoryTreeData.data.categories.items}
      showImages
    />
  </Wrapper>
);

export const CategoryTree = Template.bind({});
CategoryTree.args = {
};
