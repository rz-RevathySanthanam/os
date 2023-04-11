/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import { LogoView } from './brand';

export default {
  title: 'Omni Shop / View / Brand',
  component: LogoView,
};

const Wrapper = styled.div`
  .logo {
    height: 50px;
    width: 73px;
  }
`;

const Template = () => (
  <Wrapper>
    <LogoView className="logo" />
  </Wrapper>
);

export const Brand = Template.bind({});
Brand.args = {
};
