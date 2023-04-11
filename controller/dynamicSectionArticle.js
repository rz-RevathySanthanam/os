import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StoreConfigContext } from '@/roanuz/store/core/context';
import { CategoryListWithImage } from '@/roanuz/view/stickyBar/categoryMenuTree';
import { DisplayBold40 } from '@/roanuz/typopgraphy';
import { CategoriesAndProductsController } from '@/roanuz/controller/categoriesAndProducts';

export const SlugId = {
  CategoryList: 'CategoryList',
  CategoriesAndProductsView: 'CategoriesAndProductsView',
};

export const MagentoCategoriesListWrapper = styled.div`
`;

export const MagentoCategoriesList = ({ title }) => {
  const storeConfig = useContext(StoreConfigContext);
  const { categoryTree, categoryTreeLoading } = storeConfig.categoryTreeData;
  if (categoryTreeLoading || !categoryTree) { return null; }
  return (
    <MagentoCategoriesListWrapper>
      <DisplayBold40 className="magento-category-title"><span>{title}</span></DisplayBold40>
      <CategoryListWithImage
        tree={categoryTree}
        className="homepage-category"
        showButtonItemCount={8}
      />
    </MagentoCategoriesListWrapper>
  );
};

MagentoCategoriesList.propTypes = {
  title: PropTypes.string,
};

export const DynamicSectionArticleController = ({ article }) => {
  if (article.slug === SlugId.CategoryList) {
    return (
      <MagentoCategoriesList title={article.title} />
    );
  }
  if (article.slug === SlugId.CategoriesAndProductsView) {
    return (
      <CategoriesAndProductsController title={article.title} />
    );
  }
  return null;
};

DynamicSectionArticleController.propTypes = {
  article: PropTypes.object,
};
