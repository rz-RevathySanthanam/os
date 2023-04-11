import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseProductsWithPageLayoutWrapper = styled.div`
  .load-status {
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
  }
  .sort-line-section {
    margin-bottom: ${asRem(10)};
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column-reverse;
    position: relative;
    padding-top: ${asRem(50)};
    gap: ${asRem(20)};

    @media screen and (min-width: ${Breakpoint.md}) {
      overflow: unset;
      padding-top: 0;
      flex-direction: row;
    }
    .quick-filter-section {
      flex: 1;
      > div {
        margin-bottom: 0;
      }
    }
    .quick-filter-section, .right-side-container {
      width: 100%;

      @media screen and (min-width: ${Breakpoint.md}) {
        width: auto;
      }
    }

    .right-side-container {
      justify-content: space-between;
    }

    .right-side-container {
      display: flex;
      align-items: center;
    }
  }
  .grid-section {
    margin-top: ${asRem(32)};
  }
  &.search-result-page {
    .quick-filter-section {
      display: none;
    }

    .right-side-container {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

export const BaseProductsWithPageLayout = ({
  sortFilter,
  loaderDisplay,
  productsGrid,
  quickFiltersList,
  totalItemsBlock,
  activeFiltersList,
  isSearchResultPage,
  expandFiltersBtnBlock,
}) => {
  return (
    <ProductsWithPageLayoutWrapper className={`${isSearchResultPage && 'search-result-page'}`}>
      {loaderDisplay && (
        <div className="load-status">{loaderDisplay}</div>
      )}
      <div className="sort-line-section">
        {quickFiltersList && (
          <div className="quick-filter-section">{quickFiltersList}</div>
        )}
        <div className="right-side-container">
          {totalItemsBlock}
          {!isSearchResultPage && sortFilter && (
            <div className="sort-filter-section">{sortFilter}</div>
          )}
          {isSearchResultPage && expandFiltersBtnBlock && (
            <>{expandFiltersBtnBlock}</>
          )}
        </div>
      </div>
      {activeFiltersList && (
        <div className="active-filter-container">
          {activeFiltersList}
        </div>
      )}
      {productsGrid && (
        <div className="grid-section">{productsGrid}</div>
      )}
    </ProductsWithPageLayoutWrapper>
  );
};

BaseProductsWithPageLayout.propTypes = {
  sortFilter: PropTypes.element,
  quickFiltersList: PropTypes.element,
  loaderDisplay: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  productsGrid: PropTypes.element,
  totalItemsBlock: PropTypes.element,
  activeFiltersList: PropTypes.element,
  isSearchResultPage: PropTypes.bool,
  expandFiltersBtnBlock: PropTypes.element,
};

export const ProductsWithPageLayoutWrapper = withDependencySupport(BaseProductsWithPageLayoutWrapper, 'ProductsWithPageLayoutWrapper');
export const ProductsWithPageLayout = withDependencySupport(BaseProductsWithPageLayout, 'ProductsWithPageLayout');
