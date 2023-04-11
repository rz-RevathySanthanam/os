import React from 'react';
import PropTypes from 'prop-types';

import { StoreConfigConsumer } from '@/roanuz/store/core/context';
import { SEOHead } from '@/roanuz/document';
import {
  dependencyRegister,
  // eslint-disable-next-line import/no-unresolved
} from '_WEBSITE_KEY_/dep/category';
import { CategoryProductsWithFilterController } from '@/roanuz/controller/category/productsWithFilter';

dependencyRegister();

export const SearchResultPage = ({
  searchText,
  widgets,
}) => {
  const title = `Leit: ${searchText}`;
  const desc = title;

  let searchTextRef = searchText;

  if (!searchTextRef || searchTextRef === '') {
    searchTextRef = ' ';
  }

  return (
    <StoreConfigConsumer>
      {() => (
        <div>
          <SEOHead
            title={title}
            desc={desc}
          />
          <div>
            <CategoryProductsWithFilterController
              searchText={searchTextRef}
              widgets={widgets}
              forceFilterView
              titleText={searchText}
              isSearchResultPage
            />
          </div>
        </div>
      )}
    </StoreConfigConsumer>
  );
};

SearchResultPage.propTypes = {
  searchText: PropTypes.string,
  widgets: PropTypes.arrayOf(PropTypes.object).isRequired,
};
