import React from 'react';
import { BrandsBarView } from './brandsBar';

export default {
  title: 'Omni Shop / View / Header',
  component: BrandsBarView,
};

const Template = () => (
  <BrandsBarView />
);

export const BrandsBar = Template.bind({});
BrandsBar.args = {
  user: {},
};
