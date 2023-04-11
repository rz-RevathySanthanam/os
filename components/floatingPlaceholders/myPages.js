import React from 'react';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseMyPagesLoadingViewWrapper = styled.div`
  max-width: var(--space-page-max-width);
  margin: auto;
  @media screen and (min-width: ${Breakpoint.sm}) {
    display: flex;
  }
  .left-side {
    background-color: var(--color-mypages-sidebar);
    padding: ${asRem(70)} ${asRem(20)} ${asRem(80)} var(--space-page-side-padding);
    display: none;
    padding-left: var(--space-page-side-padding);
    @media screen and (min-width: ${Breakpoint.md}) {
      display: block;
      min-width: var(--size-mypages-side-width);
    }
    .username {
      background-color: var(--color-mypages-loading-left);
      height: ${asRem(60)};
      margin-bottom: ${asRem(50)};
      &.greeting {
        display: none;
      }
    }
  }
  .breadcrumbs {
    max-width: ${asRem(200)};
    height: ${asRem(15)};
    background-color: var(--color-mypages-loading-right);
    margin-bottom: ${asRem(20)};
  }
  .title {
    height: ${asRem(60)};
    background-color: var(--color-mypages-loading-left);
    margin-bottom: ${asRem(50)};
    max-width: ${asRem(400)};
  }
  .text {
    height: ${asRem(20)};
    background-color: var(--color-mypages-loading-left);
    margin-bottom: ${asRem(30)};
    &:last-child {
      max-width: ${asRem(400)};
    }
  }
  .content {
    height: ${asRem(40)};
    margin: ${asRem(40)} 0;
    width: 90%;
    position: relative;
    display: flex;
    align-items: center;
    gap: ${asRem(20)};
    .icon {
      height: ${asRem(40)};
      width: ${asRem(40)};
      border-radius: 50%;
      background-color: var(--color-mypages-loading-left);
    }
    .text {
      flex: 1;
      margin: 0;
    }
  }
  .right-side {
    padding: ${asRem(10)} var(--space-page-side-padding) ${asRem(50)};
    width: 100%;
    @media screen and (min-width: ${Breakpoint.md}) {
      padding: ${asRem(10)} var(--space-page-side-padding) ${asRem(50)} ${asRem(40)};
      flex-grow: 1;
    }
    .title, .text, .breadcrumbs {
      background-color: var(--color-mypages-loading-right);
    }
  }
  ${(props) => props.isLandingPage && css`
    background-color: var(--color-mypages-sidebar);
    .left-side {
      display: block;
      width: 100%;
      max-width: ${asRem(1000)};
      .username {
        margin-bottom: ${asRem(10)};
        &.greeting {
          display: block;
        }
      }
      @media screen and (min-width: ${Breakpoint.md}) {
        padding: ${asRem(80)} ${asRem(220)};
      }
    }
    .right-side {
      display: none;
    }
  `}

  .loader {
    position: relative;
    overflow: hidden;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      transform: translateX(-100px);
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: loading 0.8s infinite;
    }
  }
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

export const MyPagesLoadingView = ({ isLandingPage = false, hasSideBar = true }) => {
  return (
    <MyPagesLoadingViewWrapper isLandingPage={isLandingPage} hasSideBar={hasSideBar}>
      {hasSideBar && (
        <div className="left-side">
          <div className="username loader" />
          <div className="username greeting loader" />
          {Array(5).fill().map(() => (
            <div className="content">
              <div className="icon loader" />
              <div className="text loader" />
            </div>
          ))}
        </div>
      )}
      <div className="right-side">
        <div className="breadcrumbs loader">
          {Array(3).fill().map(() => (
            <div />
          ))}
        </div>
        <div className="title loader" />
        {Array(3).fill().map(() => (
          <div className="text loader" />
        ))}
      </div>
    </MyPagesLoadingViewWrapper>
  );
};

MyPagesLoadingView.propTypes = {
  isLandingPage: PropTypes.bool,
  hasSideBar: PropTypes.bool,
};

export const MyPagesLoadingViewWrapper = withDependencySupport(BaseMyPagesLoadingViewWrapper, 'MyPagesLoadingViewWrapper');
