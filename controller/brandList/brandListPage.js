import React from 'react';
import PropTypes from 'prop-types';
import { BrandListView } from '@/roanuz/view/brandList/page';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { useBrandList } from '@/roanuz/view/brand/model';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseBrandListPageController = ({ attributeMeta, pageTitle }) => {
  console.debug(`Left for future use ${attributeMeta}`);
  const {
    loading: brandsLoading,
    error: brandsError,
    brands,
  } = useBrandList();

  if ((!brands) && brandsLoading) return (<PageLoadingView message={translateV2('loadingMsg.PAGE_LOADING')} />);
  if ((!brands) && brandsError) return (<PageErrorView error={brandsError} />);
  return (
    <BrandListView brands={brands} pageTitle={pageTitle} />
  );
};

BaseBrandListPageController.propTypes = {
  attributeMeta: PropTypes.object,
  pageTitle: PropTypes.string,
};

export const BrandListPageController = withDependencySupport(BaseBrandListPageController, 'BrandListPageController');
