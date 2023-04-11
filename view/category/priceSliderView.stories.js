/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import { PriceSliderView } from './priceSliderView';

export default {
  title: 'Omni Shop / View / Category',
  component: PriceSliderView,
};

const Wrapper = styled.div`
  >div {
    padding: 20px;
  }
`;

const Template = () => (
  <Wrapper>
    <PriceSliderView
      min="0"
      max="100"
      initialSlabs={{
        minVal: 0,
        maxVal: 100,
      }}
    />
  </Wrapper>
);

export const PriceSlider = Template.bind({});
PriceSlider.args = {
};
