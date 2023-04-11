import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseCheckoutPageLayoutWrapper = styled.div`
  > .content {
    --right-content-width: ${asRem(500)};
    min-height: 100vh;
    @media screen and (min-width: ${Breakpoint.md}) {
      display: flex;
      justify-content: space-between;
    }

    > .left {
      @media screen and (min-width: ${Breakpoint.md}) {
        width: 65.35%;
        background-color: var(--color-checkout-left-bg);
      }
      .content-wrapper, .top-band-wrapper {
        max-width: ${asRem(940)};
        margin-left: auto;

        >div:not(.checkout-logo-view) {
          padding: 0 var(--space-page-side-padding);
          @media screen and (min-width: ${Breakpoint.lg}) {
            padding: 0 ${asRem(140)} 0 ${asRem(117)};
          }
        }
      }
    }

    > .right {
      width: 100%;
      @media screen and (min-width: ${Breakpoint.md}) {
        width: 34.65%;
        background-color: var(--color-checkout-right-bg);

        .right-wrapper {
          width: var(--right-content-width);
        }
      }
    }
  }
`;

export const BaseCheckoutPageLayout = ({
  className,
  topBand, sideBar,
  content,
}) => {
  return (
    <CheckoutPageLayoutWrapper className={`${className}`}>
      <section className="content">
        <div className="left">
          {topBand && (
            <div className="top-band-wrapper">
              {topBand}
            </div>
          )}
          {content && (
            <div className="content-wrapper">
              {content}
            </div>
          )}
        </div>
        {sideBar && (
          <div className="right hide-mobile">
            <div className="right-wrapper">
              {sideBar}
            </div>
          </div>
        )}
      </section>
    </CheckoutPageLayoutWrapper>
  );
};

BaseCheckoutPageLayout.propTypes = {
  className: PropTypes.string,
  content: PropTypes.element.isRequired,
  sideBar: PropTypes.element.isRequired,
  topBand: PropTypes.element,
};

export const CheckoutPageLayoutWrapper = withDependencySupport(BaseCheckoutPageLayoutWrapper, 'CheckoutPageLayoutWrapper');
export const CheckoutPageLayout = withDependencySupport(BaseCheckoutPageLayout, 'CheckoutPageLayout');
