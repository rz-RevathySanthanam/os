import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseFooterLayoutWrapper = styled.div`
  @media screen and (min-width: ${Breakpoint.md}) {
    padding-top: ${asRem(40)};
  }
  >.rz-footer-primary-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;
    .rz-footer-left {
      flex: 0 0 100%;
      @media screen and (min-width: ${Breakpoint.md}) {
        flex: initial;
      }
    }
    .rz-footer-left,
    .rz-footer-right,
    .rz-footer-center {
      &:not(:empty) {
        padding: ${asRem(16)} 0;
        border-bottom: ${asRem(1)} solid var(--color-text-rev);
      }
    }
    .rz-footer-center:not(:empty) {
      padding: ${asRem(32)} 0;
      >.rz-row {
        gap: ${asRem(20)};
        flex-direction: column;
        @media screen and (min-width: ${Breakpoint.md}) {
          flex-direction: row;
        }
      }
    }
  }
  >.rz-stickybar-secondary-row {
    padding: 0 ${asRem(20)} ${asRem(20)};
  }
`;

export const FooterLayout = ({
  className,
  leftItems,
  centerItems,
  rightItems,
  secondaryRowItems,
}) => {
  return (
    <FooterLayoutWrapper className={className}>
      <div className="rz-footer-primary-row rz-section-content">
        {leftItems && (
          <div className="rz-footer-left">{leftItems}</div>
        )}
        {centerItems && (
          <div className="rz-footer-center">{centerItems}</div>
        )}
        {rightItems && (
          <div className="rz-footer-right">{rightItems}</div>
        )}
      </div>
      {secondaryRowItems && (
        <div className="rz-footer-secondary-row">{secondaryRowItems}</div>
      )}
    </FooterLayoutWrapper>
  );
};

FooterLayout.propTypes = {
  className: PropTypes.string,
  leftItems: PropTypes.element,
  centerItems: PropTypes.element,
  rightItems: PropTypes.element,
  secondaryRowItems: PropTypes.element,
};

export const FooterLayoutWrapper = withDependencySupport(BaseFooterLayoutWrapper, 'FooterLayoutWrapper');
