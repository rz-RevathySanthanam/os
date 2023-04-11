import React from 'react';
import PropTypes from 'prop-types';
import { CategoryPageView } from '@/roanuz/view/category/page';
import { CategoryAutoContentController } from './autoContent';
import { CategoryProductsWithFilterController } from './productsWithFilter';

export const CategoryPageController = ({
  category,
  widgets,
}) => {
  if (category.showAutoContent) {
    return (
      <CategoryAutoContentController
        category={category}
        widgets={widgets}
      />
    );
  }

  if (category.showProducts) {
    return (
      <CategoryProductsWithFilterController
        category={category}
        widgets={widgets}
      />
    );
  }

  return (
    <CategoryPageView
      category={category}
    />
  );
};

CategoryPageController.propTypes = {
  category: PropTypes.object.isRequired,
  widgets: PropTypes.arrayOf(PropTypes.object),
};
