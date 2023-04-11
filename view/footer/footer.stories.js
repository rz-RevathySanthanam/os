/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import { FooterView } from './footer';
import { NewsLetterSubscription } from './newsLetterSubscription';

export default {
  title: 'Omni Shop / View / Footer',
  component: FooterView,
};

const Wrapper = styled.div`
  .footer-view {
    .logo {
      height: 50px;
      width: 73px;
    }
  }
`;

const Template = () => (
  <Wrapper>
    <FooterView
      newsLetter={(
        <NewsLetterSubscription
          roundedCorners
          pointerIcon
        />
      )}
    />
  </Wrapper>
);

export const Footer = Template.bind({});
Footer.args = {
};
