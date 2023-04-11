import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseBrandListPageLayoutWrapper = styled.div`
  .page-title {
    margin-top: ${asRem(30)};
    margin-bottom: ${asRem(20)};
  }
  .page-breadcrumb {
    margin-top: ${asRem(24)};
  }
  .page-widgets-section {
    margin-bottom: ${asRem(30)};
  }
  >.page-content-section {
  }
`;

export const BaseBrandListPageLayout = ({
  className,
  breadcrumb,
  title,
  content,
}) => {
  return (
    <BrandListPageLayoutWrapper className={className}>
      <div className="rz-section-content">
        {breadcrumb && (
          <div className="page-breadcrumb">{breadcrumb}</div>
        )}
        <div className="page-title">
          {title}
        </div>
      </div>
      {content && (
        <div className="page-section page-widgets-section">
          <div className="rz-section-content">{content}</div>
        </div>
      )}
    </BrandListPageLayoutWrapper>
  );
};

BaseBrandListPageLayout.propTypes = {
  className: PropTypes.string,
  breadcrumb: PropTypes.element,
  title: PropTypes.element.isRequired,
  content: PropTypes.element,
};

export const BrandListPageLayoutWrapper = withDependencySupport(BaseBrandListPageLayoutWrapper, 'BrandListPageLayoutWrapper');
export const BrandListPageLayout = withDependencySupport(BaseBrandListPageLayout, 'BrandListPageLayout');
