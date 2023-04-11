import React, { useContext } from 'react';
import {
  dependencyRegister,
  // eslint-disable-next-line import/no-unresolved
} from '_WEBSITE_KEY_/dep/category';
import { StoreConfigContext } from '@/roanuz/store/core/context';
import { CategoryListPageView } from '@/roanuz/view/categoryListPageView';

dependencyRegister();

const category = {
  __typename: 'CategoryTree',
  id: 4,
  available_sort_by: [],
  breadcrumbs: null,
  cms_block: {
    __typename: 'CmsBlock',
    content: '<div data-content-type="html" data-appearance="default" data-element="main"><div \n    data-rz-widget-id="image-slider"\n>\n        <code style="display:none" data-rz-widget-data>\n        {"class_name":null,"column_count":"1","tablet_column_count":"1","mobile_column_count":"1","slides":[{"image_url":"https:\\/\\/globus-dev-v2-backend.roanuz.com\\/media\\/wysiwyg\\/image_99_2_.png","image_tablet_url":null,"image_mobile_url":null,"title":"","link":""}]}    </code>\n</div></div>',
    title: 'Category Banner',
    identifier: 'category-banner',
  },
  canonical_url: null,
  children_count: '4',
  custom_layout_update_file: null,
  default_sort_by: null,
  description: '',
  display_mode: 'PRODUCTS_AND_PAGE',
  filter_price_range: null,
  image: 'https://globus-dev-v2-backend.roanuz.com/media/catalog/category/image_58_1_.png',
};

const breadcrumbLinks = [
  {
    text: 'Heim',
    href: '/',
  },
  {
    text: 'Freyðivín',
    href: '/frey-ivin.html',
    isActive: true,
  },
];

const CategoryListPagePage = () => {
  const storeConfigData = useContext(StoreConfigContext);
  const { categoryTree, categoryTreeLoading } = storeConfigData.categoryTreeData;

  return (
    <CategoryListPageView
      category={category}
      breadcrumbLinks={breadcrumbLinks}
      categoryTree={categoryTree}
      categoryTreeLoading={categoryTreeLoading}
    />
  );
};

CategoryListPagePage.propTypes = {
};

export default CategoryListPagePage;
