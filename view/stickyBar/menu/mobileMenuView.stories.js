/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import categoryTreeData from '@/stories/sample-data/categoryTree.json';
import { ServicesTree } from '@/roanuz/lib/servicesTree';
import stickyBarSettings from '@/data/stickyBar/settings';
import { MobileMenuView } from './mobileMenuView';

export default {
  title: 'Omni Shop / View / Menu',
  component: MobileMenuView,
};

const Wrapper = styled.div`
  > div {
    padding: 10px;
    max-width: 320px;
  }
`;

const Template = (args) => (
  <Wrapper>
    {args.mobileMenuSettings ? (
      <MobileMenuView
        mobileMenuSettings={args.mobileMenuSettings}
        categoryTree={{
          treeLoading: false,
          tree: categoryTreeData.data,
        }}
        serviceTree={ServicesTree}
      />
    ) : <h1>Mobile menu items not available</h1>}
  </Wrapper>
);

export const MobileMenu = Template.bind({});
MobileMenu.args = {
  mobileMenuSettings: stickyBarSettings.features.menu.mobileMenuSettings,
};
