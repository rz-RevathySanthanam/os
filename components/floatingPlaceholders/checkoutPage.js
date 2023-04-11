import React from 'react';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Block } from './elements';

export const BaseCheckoutLoadingViewWrapper = styled.div`
  @media screen and (min-width: ${Breakpoint.md}) {
    display: flex;
    flex-wrap: wrap;
    .left-side, .right-side {
      min-height: 100vh;
    }
  }
  .left-side {
    padding: ${asRem(80)} ${asRem(20)} 0;
    @media screen and (min-width: ${Breakpoint.md}) {
      width: 65.35%;
      ${(p) => p.hasBg && css`
        background-color: var(--color-checkout-left-bg);
      `}
      padding: ${asRem(100)} ${asRem(40)} 0;
      >div {
        max-width: var(--size-checkout-left-width);
        margin-left: auto;
      }
    }
  }
  .right-side {
    display: none;
    @media screen and (min-width: ${Breakpoint.md}) {
      width: 34.65%;
      display: block;
      background-color: var(--color-checkout-right-bg);
      padding: ${asRem(100)} ${asRem(40)} 0;

      >div {
        max-width: var(--size-checkout-right-width);
      }
    }
  }
`;

export const CheckoutLoadingView = ({ hasSideBar = true, hasBg = false }) => {
  return (
    <CheckoutLoadingViewWrapper hasSideBar={hasSideBar} hasBg={hasBg}>
      {hasSideBar && (
        <div className="left-side">
          <Block h="40" mB="50" animate />
          {Array(5).fill().map((i, j) => (
            <Block h="20" mB="30" w={j === 4 && '40'} animate />
          ))}
        </div>
      )}
      <div className="right-side">
        <Block h="40" mB="50" animate />
        {Array(3).fill().map((i, j) => (
          <Block h="20" mB="30" w={j === 2 && '80'} animate />
        ))}
      </div>
    </CheckoutLoadingViewWrapper>
  );
};

CheckoutLoadingView.propTypes = {
  hasSideBar: PropTypes.bool,
  hasBg: PropTypes.bool,
};

export const CheckoutLoadingViewWrapper = withDependencySupport(BaseCheckoutLoadingViewWrapper, 'CheckoutLoadingViewWrapper');
