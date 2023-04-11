/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { lookUpQuery } from '@/roanuz/store/api';
import { useRouter } from 'next/router';
import { CategoryPageView } from '@/roanuz/view/category/page';
import { useQuery, useLazyQuery } from '@apollo/client';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { CategoryImmediateChildQuery } from '@/roanuz/store/category/query';
import { StoreConfigContext } from '@/roanuz/store/core/context';
import { useWaitForClientSide } from '@/roanuz/hooks/core';
import Config from '@/config';
import { checkEligibilityOfQuerySet } from '@/roanuz/lib/utils';
import {
  parseRouterFilterItems,
  parseInitialAggregationItemCount,
  mergeAggregation,
} from './model';

export const CategoryProductsWithFilterController = ({
  category,
  widgets,
  searchText = null,
  titleText = null,
  isSearchResultPage = false,
  forceFilterView,
  brandMeta,
}) => {
  const rzIsManufacturerEnabled = checkEligibilityOfQuerySet('rzIsManufacturerEnabled');
  const router = useRouter();
  const storeConfig = useContext(StoreConfigContext);
  const {
    filterSettings,
    productSortSettings,
    productsFetchSettings,
  } = Config.CategoryPageSettings;

  const selectedCategory = category && category.id;

  let categoryImmediateChildren = [];
  const {
    loading: categoryListLoading,
    data: categoryList,
  } = useQuery(CategoryImmediateChildQuery, {
    skip: (!filterSettings.showOnlyChildLevel || (!selectedCategory)),
    variables: {
      parentCategory: category && category.uid,
    },
  });

  if (categoryList) {
    categoryImmediateChildren = categoryList.categories.items;
  }

  const initSortBy = {
    field: storeConfig.storeConfig.catalog_default_sort_by,
    isAsc: true,
  };

  if (category && category.default_sort_by) {
    initSortBy.field = category.default_sort_by;
  } else {
    // In magento if we didn't gave any default sort option, categories should be sort by price.
    initSortBy.field = 'price';
  }

  if (productSortSettings.defaultSortBy) {
    initSortBy.field = productSortSettings.defaultSortBy;
  }

  const initSortDirection = productSortSettings.defaultSortDirection[initSortBy.field];
  if (initSortDirection !== undefined) {
    initSortBy.isAsc = initSortDirection;
  }

  const isRelevanceEnabled = productSortSettings.enableRelevanceSortItem;
  if (isSearchResultPage && isRelevanceEnabled) {
    initSortBy.field = productSortSettings.sortOptions.relevance.id;
    // By default the query sorts by relevance, in descending order.
    // But assigned 1 below to satisfy other internal logics.
    initSortBy.isAsc = true;
  }

  const [lastSearchText, setLastSearchText] = useState(searchText);
  const [filterResult, setFilterResult] = useState();
  const [sortInput, setSortInput] = useState({
    field: initSortBy.field,
    isAsc: initSortBy.isAsc,
    updated: false,
  });

  const initFilterQuery = {
    in: {},
    eq: {},
    range: {},
  };

  if (selectedCategory) {
    initFilterQuery.in.category_id = [selectedCategory];
  }

  if (brandMeta && rzIsManufacturerEnabled) {
    initFilterQuery.eq.rz_manufacturer = brandMeta.id;
  }

  // if (Config.RestrictProductByWebsiteEnable
  //   && storeConfig.attributeMeta.rzVisibleProdcutOnWebsiteCode) {
  //   initFilterQuery.eq
  //     .rz_visible_websites = storeConfig.attributeMeta.rzVisibleProdcutOnWebsiteCode;
  // }

  const [
    defaultSortRelevance,
    setDefaultSortRelevance,
  ] = useState(isSearchResultPage && isRelevanceEnabled);

  const buildQueryVariables = (query, skipSort = false) => {
    const filterQuery = {};
    let sortQuery = {};
    if (sortInput.field) {
      sortQuery[sortInput.field] = sortInput.isAsc ? 'ASC' : 'DESC';
    }
    if (skipSort
    || (defaultSortRelevance && isRelevanceEnabled)
    ) {
      sortQuery = {};
    }

    Object.keys(query.range).forEach((field) => {
      const parts = query.range[field].split('_').map((x) => parseInt(x, 10));
      filterQuery[field] = { from: `${parts[0]}`, to: `${parts[1] - 0.01}` };
    });

    Object.keys(query.eq).forEach((field) => {
      filterQuery[field] = { eq: `${query.eq[field]}` };
    });

    Object.keys(query.in).forEach((field) => {
      let values = [...query.in[field]];

      // Magento treat it as AND operation, so
      // remove the default category
      if (field === 'category_id' && values.length > 1) {
        values = values.filter((x) => x !== selectedCategory);
      }

      values = values.map((x) => `${x}`);

      if (values.length === 1) {
        filterQuery[field] = { eq: values[0] };
      } else if (values.length > 1) {
        filterQuery[field] = { in: values };
      }
    });

    return {
      filterQuery,
      sortQuery,
    };
  };

  const [filterInput, setFilterInput] = useState({
    in: {},
    eq: {},
    range: {},
    page: 1,
    updated: false,
    ...initFilterQuery,
  });

  const [aggregationsItemCounts, setAggregationsItemCounts] = useState({});
  const [activeFilter, setActiveFilter] = useState('');

  const pageSizeInit = productsFetchSettings.productsPerPage || 20;

  const {
    data: aggregationsList,
  } = useQuery(lookUpQuery('product.queries.productsFilter'), {
    variables: {
      ...buildQueryVariables(initFilterQuery, true),
      searchText,
      pageSize: pageSizeInit,
    },
  });

  const prepareAggrgationItemCounts = (params) => {
    if (aggregationsList.products
      && aggregationsList.products.aggregations
      && aggregationsList.products.aggregations.length > 0
    ) {
      const initialCounts = parseInitialAggregationItemCount(
        aggregationsList.products.aggregations,
        params,
      );
      setAggregationsItemCounts((state) => ({
        ...state,
        ...initialCounts,
      }));
    }
  };

  if (aggregationsList && !Object.keys(aggregationsItemCounts).length) {
    prepareAggrgationItemCounts();
  }

  useEffect(() => {
    if (aggregationsList && !Object.keys(aggregationsItemCounts).length) {
      prepareAggrgationItemCounts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aggregationsList]);

  const initPageFilters = parseRouterFilterItems(router, isSearchResultPage);
  const isPrice = initPageFilters.price;
  const isPage = initPageFilters.page;
  delete initPageFilters.undefined;

  const excludeParams = ['page', 'q'];
  let initPageFilterKeys = Object.keys(initPageFilters);
  const aggregationKeys = [];
  if (
    aggregationsList
    && aggregationsList.products
    && aggregationsList.products.aggregations
    && aggregationsList.products.aggregations.length > 0
  ) {
    const data = JSON.stringify(aggregationsList.products.aggregations);
    JSON.parse(data, (key, value) => {
      if (typeof (value) !== 'object' && key === 'attribute_code') {
        aggregationKeys.push(value);
      }
    });
  }
  if (initPageFilterKeys.includes('q')) {
    delete initPageFilters.q;
  }
  if (initPageFilterKeys.includes('page')) {
    delete initPageFilters.page;
  }
  if (initPageFilterKeys.includes('q') || initPageFilterKeys.includes('page')) {
    initPageFilterKeys = initPageFilterKeys.filter((e) => !excludeParams.includes(e));
  }
  if (isPrice) {
    initFilterQuery.range.price = isPrice;
  }

  // TODO: Didnt handle price type of attributes here - find bettr way

  initPageFilterKeys.forEach((param) => {
    if (!aggregationKeys.includes(param)) {
      delete initPageFilters[param];
    }
    if (param !== 'price' && param !== 'page' && param !== 'q') {
      const paramsList = initPageFilters[param];
      if (paramsList) {
        initFilterQuery.in[param] = paramsList.split(',');
      }
    }
  });

  const [pageLoaded, setPageLoaded] = useState(false);
  // First time if URL lands with query params
  useEffect(() => {
    if (activeFilter === '' && initPageFilterKeys.length > 0 && aggregationsList) {
      setActiveFilter(initPageFilterKeys[0]);
    }
  }, []);

  useEffect(() => {
    setPageLoaded(true);
  });

  if (!pageLoaded && activeFilter === '' && initPageFilterKeys.length > 0 && aggregationsList) {
    setActiveFilter(initPageFilterKeys[0]);
  }

  const [capturePageInfo, setCapturePageInfo] = useState();
  const pagePointerSetter = () => {
    let pageSizeRef = pageSizeInit;
    let currentPageRef = isPage ? parseInt(isPage, 10) : 1;
    if (!capturePageInfo && productsFetchSettings.enableLoadMoreMode && parseInt(isPage, 10) > 1) {
      pageSizeRef = parseInt(isPage, 10) * (pageSizeInit);
      currentPageRef = 1;
    }
    return {
      currentPage: currentPageRef,
      pageSize: pageSizeRef,
    };
  };
  const {
    loading, data, error,
  } = useQuery(lookUpQuery('product.queries.productsFilter'), {
    variables: {
      ...buildQueryVariables(initFilterQuery),
      searchText,
      ...pagePointerSetter(),
    },
  });

  if (data && data.products && (!filterResult)) {
    setFilterResult({ ...data.products });
    setCapturePageInfo({ ...data.products.page_info });
  }

  const clientReady = useWaitForClientSide();

  useEffect(() => {
    if (clientReady) {
      if (data && data.products) {
        if (productsFetchSettings.enableLoadMoreMode) {
          if (
            !(capturePageInfo.current_page < data.products.page_info.current_page)
            || (capturePageInfo.current_page === data.products.page_info.current_page)
          ) {
            setFilterResult({ ...data.products });
            setCapturePageInfo({ ...data.products.page_info });
            return;
          }
          setFilterResult((state) => {
            const updates = { ...state };
            const merger = updates.items.concat(data.products.items);
            updates.items = merger;
            return updates;
          });
          setCapturePageInfo({ ...data.products.page_info });
        } else {
          setFilterResult({ ...data.products });
        }
      }
    }
  }, [data]);

  const [forceReWritingCount, setForceReWritingCount] = useState(false);

  const onLiveUpdate = (liveUpdate) => {
    const { aggregations } = liveUpdate;
    const updatedCounts = mergeAggregation(
      aggregationsItemCounts,
      aggregations,
      activeFilter,
      initPageFilters,
      forceReWritingCount,
    );
    setAggregationsItemCounts((state) => ({
      ...state,
      ...updatedCounts,
    }));
  };

  useEffect(() => {
    const params = Object.keys(initPageFilters);
    if (params.length === 1 && activeFilter === '' && !forceReWritingCount) {
      prepareAggrgationItemCounts(params[0]);
      setForceReWritingCount(true);
    }
  }, [initPageFilters, activeFilter]);

  useEffect(() => {
    if (filterResult
      && filterResult.aggregations
      && Object.keys(aggregationsItemCounts).length > 0) {
      onLiveUpdate({ ...filterResult });
    }
  }, [filterResult]);

  const [
    productFilterFetch,
    { loading: filterLoading, error: filterError, data: filterData },
  ] = useLazyQuery(lookUpQuery('product.queries.productsFilter'));

  useEffect(() => {
    if (filterData && filterData.products) {
      setFilterResult({ ...filterData.products });
    }
  }, [filterData]);

  useEffect(() => {
    let updateRequired = false;
    const updates = { ...filterInput, updated: true };

    const resolvedBrand = filterInput.eq.rz_manufacturer;
    const newBrand = brandMeta && brandMeta.id;

    const resolvedCategory = filterInput.in.category_id || [];
    const newCategory = (category && category.id) ? [category.id] : [];

    if (resolvedBrand !== newBrand) {
      updateRequired = true;
      if (rzIsManufacturerEnabled) {
        updates.eq.rz_manufacturer = newBrand;
      }
    }

    if (JSON.stringify(resolvedCategory) !== JSON.stringify(newCategory)) {
      updateRequired = true;
      updates.in.category_id = newCategory;
    }

    if (updateRequired) {
      setFilterInput(updates);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    category,
    brandMeta,
  ]);

  useEffect(() => {
    if (lastSearchText === searchText) {
      return;
    }
    setLastSearchText(searchText);
    console.log('Search Update', searchText);
    const pageNum = (filterInput.page) ? parseInt(filterInput.page, 10) : 1;
    const variables = {
      ...buildQueryVariables(filterInput),
      currentPage: pageNum,
      searchText,
      pageSize: pageSizeInit,
    };
    productFilterFetch({ variables });
  }, [
    searchText,
  ]);

  const convertObjectToString = (obj) => {
    return Object.entries(obj).reduce((str, [p, val]) => {
      return `${str}${p}-${val.replace(',', '-')}/`;
    }, '');
  };

  const frameUrlPath = (queries) => {
    if (router.asPath.includes('?')) {
      [router.asPath] = router.asPath.split('?');
    }
    let basePath = router.asPath;
    let path = '';
    [basePath] = router.asPath.split(Config.CategoryPageSettings.FiltersQueryPrefix);
    path += convertObjectToString(queries);
    return `${basePath}${path && Config.CategoryPageSettings.FiltersQueryPrefix}${path}`;
  };

  const updateRouterQueryParams = (clear, op, field, value, shouldRemove) => {
    let querySet = { ...initPageFilters };
    if (isSearchResultPage) {
      querySet = router.query;
    }

    if (shouldRemove) {
      let queryParamsList = querySet[field] && querySet[field].split(',');
      if (queryParamsList && queryParamsList.length) {
        const index = queryParamsList.indexOf(value);
        queryParamsList.splice(index, 1);
        if (queryParamsList.length) {
          queryParamsList = queryParamsList.join(',');
        } else {
          delete querySet[field];
        }
        if (queryParamsList.length) {
          querySet[field] = queryParamsList;
        }
      }
    } else if (op === 'in') {
      if (querySet[field]) {
        querySet[field] = `${querySet[field]},${value}`;
      } else {
        querySet[field] = value;
      }
    } else if (op === 'eq' || (field === 'price')) {
      querySet[field] = value;
    } else if (field === 'page') {
      querySet.page = value.toString();
    }

    if (clear) {
      const paramsToClear = [...initPageFilterKeys, 'undefined'];
      Object.keys(querySet)
        .forEach((key) => paramsToClear.includes(key) && delete querySet[key]);
    }

    if (isSearchResultPage) {
      router.replace(router, null, { shallow: true });
    } else {
      const nextPath = frameUrlPath(querySet);
      router.push({
        pathname: nextPath,
      }, null, { shallow: true });
    }
  };

  const onFilterUpdate = ({
    field, value, removeItem, op = 'eq', clear = false,
  }) => {
    if (!removeItem) {
      setActiveFilter(field);
    } else {
      setActiveFilter('');
    }
    if (forceReWritingCount) {
      setForceReWritingCount(false);
    }
    let updates = { ...filterInput, updated: true, page: 1 };
    if (field === 'price') {
      // TODO: this should based on actual attribute.
      if (updates.range[field] === value) {
        delete updates.range[field];
        updateRouterQueryParams(clear, null, field, value, true);
        setActiveFilter('');
      } else {
        updates.range[field] = value;
        updateRouterQueryParams(clear, null, field, value, false);
        setActiveFilter(field);
      }
    } else if (op === 'in') {
      if (removeItem) {
        updates.in[field] = updates.in[field].filter((v) => v !== value);
      } else {
        if (!updates.in[field]) {
          updates.in[field] = [];
        }

        updates.in[field].push(value);
      }
      updateRouterQueryParams(clear, op, field, value, removeItem);
    } else if (op === 'eq') {
      if (removeItem) {
        delete updates[op][field];
      } else {
        updates[op][field] = value;
      }
      updateRouterQueryParams(clear, op, field, value, removeItem);
    }
    if (clear) {
      updates = { ...initFilterQuery, updated: true };
      updateRouterQueryParams(clear);
    }
    setFilterInput(updates);
  };

  const onClearIndividualFilter = (field, value, isThisPrice) => {
    let filterRef = {
      field, value,
    };
    if (!isThisPrice) {
      const removeItem = true;
      filterRef = {
        field, value, removeItem, op: 'in',
      };
    }
    onFilterUpdate({ ...filterRef });
  };

  const onClearAllFilters = () => {
    onFilterUpdate({ clear: true });
  };

  const onSortUpdate = (field, isAsc) => {
    const isRelevance = field === productSortSettings.sortOptions.relevance.id;
    if (isRelevanceEnabled && isSearchResultPage) {
      setDefaultSortRelevance(isRelevance);
    }
    if (isPage && productsFetchSettings.enableLoadMoreMode) {
      updateRouterQueryParams(null, null, 'page', isPage, true);
    }
    setTimeout(() => {
      setSortInput({
        ...sortInput,
        field,
        isAsc,
        updated: true,
      });
    }, 100);
  };

  const onPageChange = (page) => {
    // console.log('Page Change', page);
    setFilterInput({
      ...filterInput,
      updated: true,
      page,
    });
    updateRouterQueryParams(null, null, 'page', page);
  };

  const onLoadMoreUpdates = () => {
    const pageRef = !isPage ? 2 : parseInt(isPage, 10) + 1;
    onPageChange(pageRef);
  };

  // Lame approach but 🤷‍♀️ - for now
  useEffect(() => {
    const errorMessage = error && error.message;
    if (
      errorMessage === `currentPage value ${isPage} specified is greater than the 1 page(s) available.`
      || (errorMessage && errorMessage.includes(`currentPage value ${isPage} specified is greater than the`))
    ) {
      updateRouterQueryParams(null, null, 'page', isPage, true);
    }
  }, [error]);

  if (!filterResult && loading) return (<LoadingView />);
  if (error) return (<ErrorView error={error} />);
  if (!filterResult) return (<LoadingView />);
  // if (!aggregationsList) return (<LoadingView />); // Added new
  if (!categoryList && categoryListLoading) return (<LoadingView />);

  return (
    <CategoryPageView
      category={category}
      widgets={widgets}
      forceFilterView={forceFilterView}
      filterResult={filterResult}
      filterLoading={filterLoading || loading}
      filterError={filterError}
      filterInput={filterInput}
      sortInput={sortInput}
      onFilterUpdate={onFilterUpdate}
      onSortUpdate={onSortUpdate}
      onPageChange={onPageChange}
      categoryImmediateChildren={categoryImmediateChildren}
      initialAggregations={aggregationsList.products}
      aggregationsItemCounts={aggregationsItemCounts}
      initPageFilters={initPageFilters}
      activeFilter={activeFilter}
      isSearchResultPage={isSearchResultPage}
      onClearIndividualFilter={onClearIndividualFilter}
      onClearAllFilters={onClearAllFilters}
      onLoadMoreUpdates={onLoadMoreUpdates}
      titleText={titleText}
    />
  );
};

CategoryProductsWithFilterController.propTypes = {
  category: PropTypes.object.isRequired,
  widgets: PropTypes.arrayOf(PropTypes.object),
  isSearchResultPage: PropTypes.bool,
  forceFilterView: PropTypes.bool,
  brandMeta: PropTypes.object,
  searchText: PropTypes.string,
  titleText: PropTypes.string,
};
