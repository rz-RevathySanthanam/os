import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseCartPageLayoutWrapper = styled.div`
  margin-bottom: ${asRem(60)};
  @media screen and (min-width: ${Breakpoint.sm}) {
    margin: ${asRem(45)} auto ${asRem(60)} auto;
  }
  @media screen and (min-width: ${Breakpoint.lg}) {
    margin: ${asRem(30)} auto ${asRem(100)} auto;
  }

  ${(p) => p.mode && css`
    margin-top: 0 !important;
    @media screen and (min-width: ${Breakpoint.sm}) {
      margin: ${asRem(45)} 0 ${asRem(60)} 0;
      width: calc(100vw - ${asRem(80)});
    }
  `}

  > .title-bar {
    padding-top: ${asRem(20)};
    padding-bottom: ${asRem(10)};
    @media screen and (min-width: ${Breakpoint.sm}) {
      padding-top: 0;
      padding-bottom: 0;
    }
    >.links {
      display: flex;
      justify-content: space-between;
      align-items: center;

      >.right {
        text-align: right;
        p {
          white-space: nowrap;
        }
      }
      >.left {
        width: 100%;
      }
    }
  }

  > .content {
    --right-content-width: ${asRem(450)};
    padding-top: ${asRem(20)};
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: ${asRem(20)};
    @media screen and (min-width: ${Breakpoint.md}) {
      flex-direction: row;
      --right-content-width: ${asRem(443)};
      padding-top: ${asRem(30)};
      gap: ${asRem(80)};
    }

    > .left {
      flex-grow: 1;
    }

    > .right {
      margin-top: ${asRem(30)};
      @media screen and (min-width: ${Breakpoint.sm}) {
        margin-top: 0;
        width: var(--right-content-width);
      }
      >div {
        width: 100%;
        padding: 0;
      }
    }
  }

  > .widgets {
    padding-top: ${asRem(30)};
  }

  >.cart-error {
    color: var(--color-focus);
  }
`;

export const BaseCartPageLayout = ({
  className,
  title,
  titleLinksRight,
  content,
  side,
  error,
  loading,
  emptyView,
  mode,
}) => {
  return (
    <CartPageLayoutWrapper className={`rz-section-content ${className}`} mode={mode}>
      <section className="cart-loading">
        <p>{loading}</p>
      </section>
      <section className="cart-error">
        <p>{error}</p>
      </section>
      <section className="title-bar hide-mobile">
        <div className="links">
          <div className="left">
            {title}
          </div>
          {titleLinksRight && (
            <div className="right">{titleLinksRight}</div>
          )}
        </div>
      </section>
      {emptyView || (
        <section className="content">
          <div className="left">
            {content}
          </div>
          {side && (
          <div className="right">
            {side}
          </div>
          )}
        </section>
      )}
    </CartPageLayoutWrapper>
  );
};

BaseCartPageLayout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.element.isRequired,
  titleLinksRight: PropTypes.element,
  content: PropTypes.element.isRequired,
  side: PropTypes.element,
  error: PropTypes.element,
  loading: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  emptyView: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  mode: PropTypes.string,
};

export const CartPageLayoutWrapper = withDependencySupport(BaseCartPageLayoutWrapper, 'CartPageLayoutWrapper');
export const CartPageLayout = withDependencySupport(BaseCartPageLayout, 'CartPageLayout');
