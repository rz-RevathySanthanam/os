import React from 'react';
import PropTypes from 'prop-types';
import { CategoryPageView } from '@/roanuz/view/category/page';
import { CategoryNavQuery } from '@/roanuz/store/category/query';
import { useQuery } from '@apollo/client';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { ProductCardDisplayMode } from '@/roanuz/layout/product/product';
import { ProductsFeaturedByCategoryController } from '../product/featuredByCatgory';

export const CategoryAutoContentController = ({
  category,
  widgets,
}) => {
  const { loading, data, error } = useQuery(CategoryNavQuery, {
    variables: { parentCategory: category.uid },
  });

  const maxCategoriesToShow = 3;

  // TODO: Enable rzFeaturedCategories
  // Commit Link for featuredCategories
  // https://github.com/roanuz/tl-web/commit/cd76355405f2f2b82fe1d0220af73089367f4fec

  if ((!data) && loading) return (<LoadingView />);
  if ((!data) && error) return (<ErrorView error={error} />);

  const featuredCategories = data.categories.items.slice(0, maxCategoriesToShow);

  return (
    <CategoryPageView
      category={category}
      widgets={widgets}
      categoryTree={data.categories.items}
      featuredCategories={(
        featuredCategories.map((fcategory, i) => (
          <ProductsFeaturedByCategoryController
            key={fcategory.uid}
            category={fcategory}
            displayMode={
              (i === 0) ? ProductCardDisplayMode.OneByThree : ProductCardDisplayMode.OneBySix
            }
            showMoreLinks
            carousel
          />
        ))
      )}
    />
  );
};

CategoryAutoContentController.propTypes = {
  category: PropTypes.object.isRequired,
  widgets: PropTypes.arrayOf(PropTypes.object),
};
