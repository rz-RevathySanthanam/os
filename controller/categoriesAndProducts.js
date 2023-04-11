import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { StoreConfigContext } from '@/roanuz/store/core/context';
import { filterCategoryItems } from '@/roanuz/view/stickyBar/categoryMenuTree';
import { lookUpQuery } from '@/roanuz/store/api';
import { useQuery } from '@apollo/client';
import { CategoriesAndProductsView } from '@/roanuz/view/categoriesAndProductsView';
import Config from '@/config';

export const CategoriesAndProductsController = ({ title }) => {
  const storeConfig = useContext(StoreConfigContext);
  const { categoryTree, categoryTreeLoading } = storeConfig.categoryTreeData;

  const [goodTest, setGoodTest] = useState(false);
  const [categoriesList, setCategoriesList] = useState(null);

  let { GetProductsForCategoryUrlKeys } = Config;

  GetProductsForCategoryUrlKeys = Object.keys(GetProductsForCategoryUrlKeys);

  const buildQueryVariables = (ids) => {
    return {
      filterQuery: {
        url_key: {
          in: ids,
        },
      },
    };
  };

  const fetchIds = () => {
    let good = true;
    if (categoryTreeLoading || !categoryTree) { good = false; }
    const items = filterCategoryItems(categoryTree, false);

    if (!items || !items.length) { good = false; }

    let categoriesSlug = items.map((cp) => cp.url_key);

    if (GetProductsForCategoryUrlKeys && GetProductsForCategoryUrlKeys.length) {
      categoriesSlug = categoriesSlug.filter((x) => GetProductsForCategoryUrlKeys.includes(x));
    }

    if (!categoriesSlug || !categoriesSlug.length) { good = false; }

    if (!goodTest) {
      setGoodTest(good);
    }

    if (good && !categoriesList) {
      setCategoriesList(categoriesSlug);
    }
    // return good ? setCategoriesList(categoriesSlug) : null;
  };

  fetchIds();

  const { loading, data, error } = useQuery(lookUpQuery('product.queries.categoryAndItsProducts'), {
    variables: {
      ...buildQueryVariables(categoriesList),
    },
    skip: !goodTest,
  });

  if (!goodTest) { return null; }
  if ((!data) && loading) return null;
  if ((!data) && error) {
    console.error(error);
    return null;
  }

  if (
    !data
    || !data.categoryList || !data.categoryList.length) {
    return null;
  }
  const { categoryList } = data;
  let categoriesWithProducts = categoryList.filter((x) => x.product_count > 0 && x.level <= 2);
  if (!categoriesWithProducts || !categoriesWithProducts.length) { return null; }

  categoriesWithProducts = categoriesWithProducts
    .sort(
      (a, b) => GetProductsForCategoryUrlKeys
        .indexOf(a.url_key) - GetProductsForCategoryUrlKeys.indexOf(b.url_key),
    );

  return (
    <CategoriesAndProductsView
      catsAndProds={categoriesWithProducts}
      title={title}
    />
  );
};

CategoriesAndProductsController.propTypes = {
  title: PropTypes.string,
};
