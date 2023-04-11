import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SearchBarLayout } from '@/roanuz/layout/searchBar';
import { SearchBarView } from '@/roanuz/view/search/searchBar';
import Config from '@/config';
import { useRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { SimpleLocalStorage } from '@/roanuz/lib/cart';

export const LocalRecentSearchStorage = new SimpleLocalStorage('rzRecentSearch');

export const SearchBarController = ({
  menuContext,
  settings,
  menu,
  logo,
  rightContent,
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        menuContext?.toggleSearchModel(false);
      }, 1000);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  const {
    AlgoliaAppKey,
    AlgoliaSearchKey,
    AlgoliaPrefetchSearch,
    AlgoliaIndexNamePrefix,
  } = Config.AlgoliaConfiguration;

  const searchClient = algoliasearch(AlgoliaAppKey, AlgoliaSearchKey);

  const [showResult, setShowResult] = useState(false);
  const [prefetchResults, setPrefetchResults] = useState(AlgoliaPrefetchSearch);
  const [recent, setRecent] = useState(LocalRecentSearchStorage.fetch() || []);

  let indexPrefix = `${AlgoliaIndexNamePrefix}`;
  if (Config.StoreViewCode) {
    indexPrefix = `${indexPrefix}${Config.StoreViewCode}_`;
  }

  const productIndexName = `${indexPrefix}products`;
  const categoryIndexName = `${indexPrefix}categories`;

  const { q: searchQuery } = router.query;

  const hideResult = (e) => {
    if (Config.SearchBarSettings && Config.SearchBarSettings.disableOnBlur) {
      return;
    }
    setTimeout(() => {
      // Short break to ensure click happend before hide
      setShowResult(false);
      if (!e.target.value) {
        setPrefetchResults(0);
      }
    }, 300);
  };

  const prepareSearchClient = {
    search(requests) {
      if (prefetchResults === 0) {
        return null;
      }
      // Based on config value decide if we should prefetch and show result for empty input or not
      if (requests.every(({ params }) => !params.query)) {
        setShowResult(false);
        return null;
      }
      // Removing the filters param for categories alone.
      const index = requests.findIndex((item) => {
        return item.indexName === categoryIndexName;
      });
      if (index && requests[index].params.filters) {
        // eslint-disable-next-line no-param-reassign
        delete requests[index].params.filters;
      }
      return searchClient.search(requests);
    },
  };

  const handleOnFocus = () => {
    if (Config.SearchBarSettings && Config.SearchBarSettings.disableOnFocus) {
      return;
    }
    if (prefetchResults === 0) {
      setPrefetchResults(1);
    } else {
      setShowResult(true);
    }
    if (AlgoliaPrefetchSearch === 1) {
      setShowResult(true);
    }
  };

  const updateRecentSearch = (name, prodLink) => {
    if (!Config.SearchBarSettings.showRecentSearch) {
      return;
    }
    let recentSearch = recent;
    if (recentSearch.length === 0) {
      recentSearch = [{ label: name, link: prodLink }];
    } else if (!recentSearch.some((el) => el.label === name)) {
      recentSearch.unshift({ label: name, link: prodLink });
    }
    setRecent(recentSearch);
    LocalRecentSearchStorage.store(recentSearch);
  };

  const onSubmitEvent = (val) => {
    updateRecentSearch(val, `/catalogsearch/result?q=${val}`);
    setShowResult(false);
    if (val.trim() !== '') {
      menuContext?.toggleSearchModel(false);
      const etext = encodeURIComponent(val);
      router.push(`/catalogsearch/result?q=${etext}`);
    }
    return true;
  };

  const showResultContainer = (e) => {
    if (e.target.value) {
      setShowResult(true);
    } else if (!AlgoliaPrefetchSearch) {
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  const onFocus = (e) => {
    return e.target.value !== '' && handleOnFocus();
  };

  const onChangeEvent = (e) => [setPrefetchResults(1), setShowResult(!!e.target.value)];

  const removeRecentSearch = (val) => {
    const updateRecent = recent.filter((item) => item.label !== val);
    setRecent(updateRecent);
    LocalRecentSearchStorage.store(updateRecent);
  };

  // Todo: Suggested Products should be dynamic
  const suggestedProd = Config.SearchBarSettings.suggestedProducts;

  const eventHandlers = {
    hideResult,
    onSubmitEvent,
    showResultContainer,
    onFocus,
    onChangeEvent,
    removeRecentSearch,
    updateRecentSearch,
  };

  return (
    <div>
      <SearchBarLayout
        menu={menu}
        logo={logo}
        rightContent={rightContent}
        settings={settings}
        searchBar={(
          <SearchBarView
            productIndexName={productIndexName}
            categoryIndexName={categoryIndexName}
            searchText={searchQuery}
            menuContext={menuContext}
            searchClient={prepareSearchClient}
            showResult={showResult}
            suggestedProd={suggestedProd}
            eventHandlers={eventHandlers}
            recent={recent}
          />
        )}
      />
    </div>
  );
};

SearchBarController.propTypes = {
  menuContext: PropTypes.object,
  settings: PropTypes.object,
  menu: PropTypes.element,
  logo: PropTypes.element,
  rightContent: PropTypes.element,
};
