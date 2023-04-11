import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseBrandPageLayoutWrapper = styled.div`
  .page-title {
    margin-top: ${asRem(30)};
    margin-bottom: ${asRem(20)};
  }
  .page-breadcrumb {
    margin-top: ${asRem(12)};
  }
  .page-widgets-section {
    margin-bottom: ${asRem(30)};
  }
  >.page-content-section {
  }
`;

export const BrandPageLayout = ({
  className,
  breadcrumb,
  title,
  topContent,
  bottomContent,
  children,
}) => {
  return (
    <BrandPageLayoutWrapper className={className}>
      <div className="rz-section-content">
        {breadcrumb && (
          <div className="page-breadcrumb">{breadcrumb}</div>
        )}
        <div className="page-title">
          {title}
        </div>
      </div>
      {topContent && (
        <div className="page-section page-widgets-section">
          <div className="rz-section-content">{topContent}</div>
        </div>
      )}
      <div className="page-section page-content-section">
        <div className="rz-section-content">{children}</div>
      </div>
      {bottomContent && (
        <div className="page-section page-widgets-section">
          <div className="rz-section-content">{bottomContent}</div>
        </div>
      )}
    </BrandPageLayoutWrapper>
  );
};

BrandPageLayout.propTypes = {
  className: PropTypes.string,
  breadcrumb: PropTypes.element,
  title: PropTypes.element.isRequired,
  topContent: PropTypes.element,
  bottomContent: PropTypes.element,
  children: PropTypes.element,
};

export const BrandPageLayoutWrapper = withDependencySupport(BaseBrandPageLayoutWrapper, 'BrandPageLayoutWrapper');
