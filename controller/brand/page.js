import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { BrandCategoriesList } from '@/roanuz/store/brand/query';
// import { FeaturedCategories } from '@/roanuz/store/category/query';
import { BrandPageView } from '@/roanuz/view/brand/page';
import { ProductCardDisplayMode } from '@/roanuz/layout/product/product';
// import { StoreConfigContext } from '@/roanuz/store/core/context';
import { checkEligibilityOfQuerySet, translateV2 } from '@/roanuz/lib/utils';

import { ProductsFeaturedByCategoryController } from '../product/featuredByCatgory';

const rzIsManufacturerEnabled = checkEligibilityOfQuerySet('rzIsManufacturerEnabled');
export const BrandPageController = ({
  brandMeta,
  widgets,
}) => {
  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(BrandCategoriesList, {
    variables: { brandId: brandMeta.id },
    skip: !rzIsManufacturerEnabled,
  });

  const maxCategoriesToShow = 3;
  // TODO
  // const storeConfigContext = useContext(StoreConfigContext);
  // const {
  //   loading: featuredCategoriesLoading,
  //   data: featuredCategoriesData,
  //   error: featuredCategoriesError,
  // } = useQuery(FeaturedCategories, {
  //   variables: {
  // storeCode: storeConfigContext.storeConfig.store_code, limit: maxCategoriesToShow },
  // });

  // if ((!featuredCategoriesData) && featuredCategoriesLoading) return (<LoadingView />);
  // if ((!featuredCategoriesData) && featuredCategoriesError) {
  //   return (<ErrorView error={featuredCategoriesError} />);
  // }

  // const featuredCategoriesIds = [
  //   ...featuredCategoriesData.rzFeaturedCategories.categoryList.map((op) => op.id).flat(),
  // ];
  if ((!categoriesData) && categoriesLoading) return (<LoadingView message={translateV2('loadingMsg.FETCH_BRAND_CATEGORY')} />);
  if ((!categoriesData) && categoriesError) return (<ErrorView error={categoriesError} />);

  let categories = [];
  const matched = categoriesData && categoriesData.products.aggregations.filter((x) => x.attribute_code === 'category_id');
  if (matched && matched.length) {
    categories = matched[0].options.map(
      (opt) => ({
        id: opt.value,
        name: opt.label,
        count: opt.count,
        // rank: featuredCategoriesIds.includes(parseInt(opt.value, 10)) ? 0 : 1,
      }),
    );
  }
  // categories = categories.filter((x) => categoryTreeData
  //   .listOfAllChildCategories.includes(parseInt(x.id, 10)));
  categories = categories.sort((x, y) => x.rank - y.rank);
  const featuredCategories = categories.slice(0, maxCategoriesToShow);

  return (
    <BrandPageView
      brandMeta={brandMeta}
      widgets={widgets}
      brandCategories={categories}
      featuredCategories={(
        featuredCategories.map((category, i) => (
          <ProductsFeaturedByCategoryController
            key={category.id}
            categoryId={category.id}
            categoryName={category.name}
            brandMeta={brandMeta}
            displayMode={
              (i === 0) ? ProductCardDisplayMode.OneByThree : ProductCardDisplayMode.OneBySix
            }
            showMoreLinks
            carousel={(i !== 0)}
          />
        ))
      )}
    />
  );
};

BrandPageController.propTypes = {
  brandMeta: PropTypes.object.isRequired,
  widgets: PropTypes.arrayOf(PropTypes.object),
  // categoryTreeData: PropTypes.object.isRequired,
};
