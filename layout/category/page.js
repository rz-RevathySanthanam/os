import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseCategoryPageLayoutWrapper = styled.div`
  .page-title {
    margin-top: ${asRem(30)};
    margin-bottom: ${asRem(20)};
  }
  .page-breadcrumb {
    margin-top: ${asRem(12)};
  }
  >.page-widgets-section {
    margin-bottom: ${asRem(30)};
  }
  >.page-category-list-section {
    margin: ${asRem(40)} 0;
  }
`;

export const BaseCategoryPageLayout = ({
  className,
  breadcrumb,
  title,
  topContent,
  bottomContent,
  content,
  subCategoriesList,
  isSearchResultPage,
}) => {
  return (
    <CategoryPageLayoutWrapper className={className}>
      <div className="rz-section-content">
        {!isSearchResultPage && (
          <>
            {breadcrumb && (
              <div className="page-breadcrumb">{breadcrumb}</div>
            )}
            <div className="page-title">
              {title}
            </div>
            {subCategoriesList && (
              <div className="page-sub-category-list-section">{subCategoriesList}</div>
            )}
          </>
        )}
      </div>
      {topContent && (
        <div className="page-section page-widgets-section">
          <div className="rz-section-content">{topContent}</div>
        </div>
      )}
      {content && (
        <div className="page-section page-content-section">{content}</div>
      )}
      {bottomContent && (
        <div className="page-section page-widgets-section">
          <div className="rz-section-content">{bottomContent}</div>
        </div>
      )}
    </CategoryPageLayoutWrapper>
  );
};

BaseCategoryPageLayout.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  breadcrumb: PropTypes.element,
  title: PropTypes.element.isRequired,
  topContent: PropTypes.element,
  bottomContent: PropTypes.element,
  content: PropTypes.element,
  subCategoriesList: PropTypes.element,
  isSearchResultPage: PropTypes.bool,
};

export const CategoryPageLayoutWrapper = withDependencySupport(BaseCategoryPageLayoutWrapper, 'CategoryPageLayoutWrapper');
export const CategoryPageLayout = withDependencySupport(BaseCategoryPageLayout, 'CategoryPageLayout');
