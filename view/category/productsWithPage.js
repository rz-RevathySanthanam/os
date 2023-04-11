import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { TextMedium14 } from '@/roanuz/typopgraphy';
import { ProductsWithPageLayout } from '@/roanuz/layout/category/productsWithPage';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { BouncingBallKF } from '@/roanuz/components/keyframes';
import { SVGIcon, CircleIcon } from '@/roanuz/view/icon';
import { ReactComponent as FilterSVG } from '@/roanuz/view/imgs/FilterSVG.svg';
import { translateV2 } from '@/roanuz/lib/utils';
import { ProductsCountDisplay } from './productsCountView';
import { ProductsGridPicker } from './productsGridPicker';
import { Button } from '../button';

export const BaseProductsWithPageWrapper = styled.div`
  .status {
    margin: auto;

    .rz-svg-icon {
      height: ${asRem(10)};
      line-height: 0;
      padding: 0;
      animation: ${BouncingBallKF} 1s cubic-bezier(0.36, 0, 0.66, -0.56) infinite alternate;
      animation-delay: 350ms;
    }
  }

  .more-filters-btn {
    padding: ${asRem(16)} ${asRem(24)};
    border: ${asRem(1)} solid transparent;
    color: var(--color-text-secondary);

    &:hover {
      background: var(--color-filter-page-search);
    }

    span {
      display: flex;
      align-items: center;

      .rz-svg-icon {
        margin-left: ${asRem(10)};
      }
    }
  }

  .total-items {
    text-align: center;
    color: var(--color-accent-warm-gold);
    white-space: nowrap;
  }

  .search-result-page {
    .total-items {
      display: flex;
      flex-direction: row-reverse;

      .item-count {
        margin-left: ${asRem(8)};

        &:before {
          content: "(";
        }
        &:after {
          content: ")";
        }
      }
    }
  }
`;

export const BaseProductsWithPage = ({
  filterResult,
  filterLoading,
  onPageChange,
  menuContext,
  onLoadMoreUpdates,
  quickFiltersList,
  activeFiltersListBlock,
  sortFilterBlock,
  isSearchResultPage,
}) => {
  const totalItems = filterResult.total_count;
  const currentPage = filterResult.page_info.current_page;
  const pageSize = filterResult.page_info.page_size;
  const totalPages = filterResult.page_info.total_pages;
  const itemsFrom = ((currentPage - 1) * pageSize) + 1;
  const itemsTo = itemsFrom + filterResult.items.length - 1;

  const selectPage = (value) => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
    onPageChange(value);
  };

  // TODO: For B2B Begin
  // Write B2B LOGIC, refer HT
  // For B2B End
  // TO NOTE: WHEN ITS IN LOAD MORE MODE, call B2B prices for new set of url keys only

  const productsCount = (
    <ProductsCountDisplay
      totalItems={totalItems}
      itemsTo={itemsTo}
      itemsFrom={itemsFrom}
      menuContext={menuContext}
    />
  );

  const loaderDisplay = (
    filterLoading && (
      <div className="status">
        <CircleIcon />
      </div>
    )
  );

  const productsGrid = (
    <ProductsGridPicker
      products={filterResult.items}
      totalPages={totalPages}
      currentPage={currentPage}
      selectPage={selectPage}
      totalItems={totalItems}
      itemsTo={itemsTo}
      onLoadMoreUpdates={onLoadMoreUpdates}
      filterLoading={loaderDisplay}
      showLazyLoadingOnCard={filterLoading}
    />
  );

  const totalItemsBlock = (
    <TextMedium14 className="total-items">
      <span className="item-count">{totalItems}</span>
      {' '}
      <span>{translateV2(totalItems > 1 ? 'category.PRODUCTS' : 'category.PRODUCT')}</span>
    </TextMedium14>
  );

  const expandFiltersBtnBlock = (
    <Button
      noborder
      onClick={() => menuContext.toggleCategoryFilterModal(true)}
      onKeyPress={() => menuContext.toggleCategoryFilterModal(true)}
      className="more-filters-btn"
    >
      {translateV2('button.ALL_FILTERS')}
      <SVGIcon heightPx={15}>
        <FilterSVG />
      </SVGIcon>
    </Button>
  );

  return (
    <ProductsWithPageWrapper>
      <ProductsWithPageLayout
        sortFilter={sortFilterBlock}
        productsCount={productsCount}
        loaderDisplay={loaderDisplay}
        productsGrid={productsGrid}
        quickFiltersList={quickFiltersList}
        totalItemsBlock={totalItemsBlock}
        activeFiltersList={activeFiltersListBlock}
        expandFiltersBtnBlock={expandFiltersBtnBlock}
        isSearchResultPage={isSearchResultPage}
      />
    </ProductsWithPageWrapper>

  );
};

BaseProductsWithPage.propTypes = {
  filterResult: PropTypes.object,
  filterLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  menuContext: PropTypes.object,
  onLoadMoreUpdates: PropTypes.func,
  quickFiltersList: PropTypes.element,
  activeFiltersListBlock: PropTypes.element,
  sortFilterBlock: PropTypes.element,
  isSearchResultPage: PropTypes.bool,
};

export const ProductsWithPageWrapper = withDependencySupport(BaseProductsWithPageWrapper, 'ProductsWithPageWrapper');
export const ProductsWithPage = withDependencySupport(BaseProductsWithPage, 'ProductsWithPage');
