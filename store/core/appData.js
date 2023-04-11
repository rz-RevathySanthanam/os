import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StoreConfigQuery } from '@/roanuz/store/core/query';
import { CategoryNavQuery } from '@/roanuz/store/category/query';
import { WebsiteQuery, WebsiteStoresQuery } from '@/roanuz/store/core/ferrariQuery';
import { useQuery } from '@apollo/client';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { useStoreWidgets, filterPageWidgets } from '@/roanuz/store/layout/widget';
import { StoreConfigProvider } from './context';

const WebsiteConfigDefault = {
  websiteId: null,
  stores: [],
};

export const useWebsiteConfig = () => {
  const {
    loading: websiteLoading,
    data: websiteData,
    error: websiteError,
  } = useQuery(WebsiteQuery);

  const websiteId = websiteData?.rzfWebsiteDetails?.id;

  const {
    loading: storeLoading,
    data: storeData,
    error: storeError,
  } = useQuery(WebsiteStoresQuery, {
    skip: !websiteId,
    variables: {
      websiteId,
    },
  });

  if (storeError) {
    console.error(storeError);
    console.log(storeError.graphQLErrors);
  }

  return {
    loading: websiteLoading || storeLoading,
    data: {
      ...WebsiteConfigDefault,
      websiteId,
      stores: storeData?.rzfStoresInfo,
    },
    error: websiteError || storeError,
  };
};

export const AppData = ({ children }) => {
  const { loading, error, data: storeConfigData } = useQuery(StoreConfigQuery);

  const {
    loading: websiteConfigLoading,
    error: websiteConfigError,
    data: websiteConfig,
  } = useWebsiteConfig();

  if (websiteConfigError) {
    console.error(websiteConfigError);
    console.log(websiteConfigError.graphQLErrors);
  }

  const {
    loading: widgetsLoading,
    error: widgetsError,
    data: storeWidgets,
  } = useStoreWidgets();

  const {
    loading: categoryTreeLoading,
    data: categoryTree,
    error: categoryTreeError,
  } = useQuery(CategoryNavQuery,
    {
      skip: (!storeConfigData || (storeConfigData && !storeConfigData.storeConfig)),
      variables:
        { parentCategory: storeConfigData ? storeConfigData.storeConfig.root_category_uid : null },
    });

  useEffect(() => {
    if (widgetsError) {
      console.error('Wigets Graphql Error', widgetsError);
    }
  }, [widgetsError]);

  const isLoading = loading || categoryTreeLoading || widgetsLoading || websiteConfigLoading;
  const isError = error || categoryTreeError;
  const hasData = storeConfigData && categoryTree;
  if ((!hasData) && isLoading) return (<PageLoadingView message="Preparing Storeconfig" />);
  if ((!hasData) && isError) return (<PageErrorView error={error} />);

  const { storeConfig } = storeConfigData;
  const defaultWidgets = filterPageWidgets({ widgets: storeWidgets });

  const categoryTreeData = {
    categoryTreeLoading,
    categoryTreeError,
    categoryTree,
  };

  const config = {
    storeConfig,
    categoryTreeData,
    defaultWidgets,
    storeWidgets,
    websiteConfig,
  };
  return (
    <StoreConfigProvider value={config}>
      {children}
    </StoreConfigProvider>
  );
};

AppData.propTypes = {
  children: PropTypes.element,
};
