import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DisplayBold30 } from '@/roanuz/typopgraphy';
import { CategoryListWithImage } from '@/roanuz/view/stickyBar/categoryMenuTree';
import { BreadcrumbView } from '@/roanuz/view/breadcrumb';
import { CategoryCmsBlock } from '@/roanuz/view/category/page';
import { asRem } from '@/roanuz/lib/css';

export const CategoriesListPageViewWrapper = styled.div`
  .category-list {
    margin: ${asRem(120)} auto;
    .all-categories-btn {
      display: none;
    }
  }
`;

export const CategoryListPageView = ({
  category,
  breadcrumbLinks,
  categoryTreeLoading,
  categoryTree,
}) => {
  return (
    <CategoriesListPageViewWrapper>
      <div>
        <CategoryCmsBlock
          category={category}
          title={<DisplayBold30 as="h1">Vínin okkar</DisplayBold30>}
          breadcrumb={<BreadcrumbView links={breadcrumbLinks} />}
          className="bg-title"
        />
      </div>
      <div className="category-list rz-section-content">
        {!categoryTreeLoading && (
          <CategoryListWithImage
            tree={categoryTree}
          />
        )}
      </div>
    </CategoriesListPageViewWrapper>
  );
};

CategoryListPageView.propTypes = {
  category: PropTypes.object.isRequired,
  breadcrumbLinks: PropTypes.array,
  categoryTreeLoading: PropTypes.bool,
  categoryTree: PropTypes.object,
};
