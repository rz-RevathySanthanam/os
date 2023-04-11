import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import Config from '@/config';
import { MenuModelContext } from '@/roanuz/store/core/menuContext';
import { CategoryProductsWithFilterLayout } from '@/roanuz/layout/category/productsWithFilter';
import { SelectedFiltersView } from '@/roanuz/view/category/selectedFiltersView';
import { SortFilterView } from './sortFilterView';
import { FilterControlView } from './filterControl';
import { SideBarFilterView } from './sideBarFilterView';
import { QuickFiltersView } from './quickFiltersView';
import { ProductsWithPage } from './productsWithPage';
import { withDependencySupport } from '../../lib/dep';

export const BaseCategoryProductsWithFilterViewWrapper = styled.div`
  >.fitlerview-cms-content {
    margin-bottom: ${asRem(20)};
    .rz-magento-html {
      img {
        max-width: 100%;
      }
    }
    .rz-section-content {
      margin-top: ${asRem(40)};
      text-align: left;
      
      >div {
        width: 100%;
        max-width: ${asRem(793)};
      }
    }
  }
`;

export const CategoryProductsWithFilterViewV2 = ({
  category,
  filterResult,
  filterInput,
  onFilterUpdate,
  contentTopWidgets,
  contentBottomWidgets,
  imageView,
  cmsContentView,
  forceFilterView,
  categoryImmediateChildren,
  initialAggregations,
  aggregationsItemCounts,
  selectedFilters,
  activeFilter,
  onClearIndividualFilter,
  onClearAllFilters,
  sortInput,
  onSortUpdate,
  filterLoading,
  onPageChange,
  onLoadMoreUpdates,
  isSearchResultPage,
}) => {
  // To reset price slider on clearing filter.
  const [priceSliderReset, setPriceSliderReset] = useState(false);

  const onClearAllFiltersCtrl = () => {
    onClearAllFilters();
    setPriceSliderReset(true);
  };

  const onClearIndividualFilterCtrl = (aFilter, value, isPrice) => {
    onClearIndividualFilter(aFilter, value, isPrice);
    if (isPrice) {
      setPriceSliderReset(true);
    }
  };

  const menuContext = useContext(MenuModelContext);
  const [toggleGroupExpand, setToggleGroupExpand] = useState(null);
  const { filterSettings } = Config.CategoryPageSettings;
  const expandFilterGroupCtrl = (attrCode) => {
    if (filterSettings.showAsSlider) {
      menuContext.toggleCategoryFilterModal(true);
    }
    setToggleGroupExpand(attrCode);
  };

  const defaultField = sortInput.field || filterResult.sort_fields.default;
  const selectedKey = sortInput.isAsc ? defaultField : `${defaultField}Desc`;

  const sortFieldsOptionsRef = [...filterResult.sort_fields.options];

  const {
    sortOptions,
    enableRelevanceSortItem,
  } = Config.CategoryPageSettings.productSortSettings;

  const isRelevanceEnabled = enableRelevanceSortItem;
  if (isRelevanceEnabled && isSearchResultPage) {
    sortFieldsOptionsRef.push({
      label: sortOptions.relevance.label,
      value: sortOptions.relevance.id,
    });
  }

  const sortItems = [];
  sortFieldsOptionsRef.forEach((item) => {
    const items = [];

    [true, false].forEach((isAsc) => {
      const key = (isAsc) ? item.value : `${item.value}Desc`;
      const sortConfig = sortOptions[key] || {};
      if (sortConfig.disabled) return;

      const defaultSuffix = ((isAsc) ? '' : ' (DESC)');
      const value = (isAsc) ? item.label : `${item.label}-`;
      const suffix = (sortConfig.suffix === undefined) ? defaultSuffix : sortConfig.suffix;
      const label = sortConfig.label || `${item.label}${suffix}`;

      items.push({
        field: item.value,
        key,
        isAsc,
        label,
        value,
      });
    });

    sortItems.push(
      ...items,
    );
  });

  const onSortChange = (event) => {
    const { value } = event.target;
    const item = sortItems.find((x) => x.key === value);
    onSortUpdate(item.field, item.isAsc);
  };

  // Todo: Move inside filterContent > ProductsWithPage
  const quickFiltersList = (
    <QuickFiltersView
      selectedFilters={selectedFilters}
      onClearAllFilters={onClearAllFiltersCtrl}
      onClearIndividualFilter={onClearIndividualFilterCtrl}
      initialAggregations={initialAggregations.aggregations}
      expandFilterGroup={expandFilterGroupCtrl}
      onFilterUpdate={onFilterUpdate}
      categoryImmediateChildren={categoryImmediateChildren}
      aggregationsItemCounts={aggregationsItemCounts}
      filterInput={filterInput}
      priceSliderReset={priceSliderReset}
      setPriceSliderReset={() => setPriceSliderReset(false)}
    />
  );

  const activeFiltersListBlock = (
    <SelectedFiltersView
      activeFiltersList={selectedFilters}
      aggregationsInfo={aggregationsItemCounts}
      onClearAllFilters={onClearAllFilters}
      onClearIndividualFilter={onClearIndividualFilter}
    />
  );

  const sortFilterBlock = (
    <SortFilterView
      sortSelectedKey={selectedKey}
      onSortChange={onSortChange}
      sortItems={sortItems}
      expandFilterGroup={expandFilterGroupCtrl}
    />
  );

  const filterContent = (
    <ProductsWithPage
      filterResult={filterResult}
      sortInput={sortInput}
      onSortUpdate={onSortUpdate}
      filterLoading={filterLoading}
      onPageChange={onPageChange}
      menuContext={menuContext}
      onLoadMoreUpdates={onLoadMoreUpdates}
      quickFiltersList={quickFiltersList}
      isSearchResultPage={isSearchResultPage}
      activeFiltersListBlock={activeFiltersListBlock}
      sortFilterBlock={sortFilterBlock}
    />
  );

  let mainContent = null;
  if ((!forceFilterView) && category && category.showStaticContent) {
    mainContent = (
      <>
        {filterContent}
      </>
    );
  } else {
    mainContent = filterContent;
  }

  let filter = null;
  let sideBarFilterView = null;
  if (forceFilterView || category.showFilter) {
    filter = (
      <FilterControlView
        filterInput={filterInput}
        filterResult={filterResult}
        onFilterUpdate={onFilterUpdate}
        categoryImmediateChildren={categoryImmediateChildren}
        onClearAllFilters={onClearAllFiltersCtrl}
        onClearIndividualFilter={onClearIndividualFilterCtrl}
        priceSliderReset={priceSliderReset}
        setPriceSliderReset={() => setPriceSliderReset(false)}
        initialAggregations={initialAggregations}
        aggregationsInfo={aggregationsItemCounts}
        selectedFilters={selectedFilters}
        activeFilter={activeFilter}
        toggleGroupExpand={toggleGroupExpand}
        sortOptions={{
          selectedKey,
          onSortChange,
          sortItems,
        }}
      />
    );
    sideBarFilterView = (
      <SideBarFilterView
        filter={filter}
        onClearAllFiltersCtrl={onClearAllFiltersCtrl}
        filterSettingsConfig={Config.CategoryPageSettings}
        selectedFilters={selectedFilters}
        totalItems={filterResult.total_count}
        filterLoading={filterLoading}
      />
    );
  }

  return (
    <CategoryProductsWithFilterViewWrapper>
      {cmsContentView && (
        <div className="fitlerview-cms-content">
          {cmsContentView}
        </div>
      )}
      <CategoryProductsWithFilterLayout
        content={mainContent}
        imageView={imageView}
        contentTopWidgets={contentTopWidgets}
        contentBottomWidgets={contentBottomWidgets}
        filter={filter}
        sideBarFilterView={sideBarFilterView}
        quickFiltersList={quickFiltersList} // Also move to ProductsWithPage
      />
    </CategoryProductsWithFilterViewWrapper>
  );
};

CategoryProductsWithFilterViewV2.propTypes = {
  category: PropTypes.object.isRequired,
  filterResult: PropTypes.object,
  filterInput: PropTypes.object,
  onFilterUpdate: PropTypes.func,
  contentTopWidgets: PropTypes.element,
  contentBottomWidgets: PropTypes.element,
  imageView: PropTypes.element,
  cmsContentView: PropTypes.element,
  forceFilterView: PropTypes.bool,
  categoryImmediateChildren: PropTypes.array,
  initialAggregations: PropTypes.object,
  aggregationsItemCounts: PropTypes.object,
  selectedFilters: PropTypes.object,
  activeFilter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  onClearIndividualFilter: PropTypes.func,
  onClearAllFilters: PropTypes.func,
  sortInput: PropTypes.object,
  onSortUpdate: PropTypes.func,
  onPageChange: PropTypes.func,
  filterLoading: PropTypes.bool,
  onLoadMoreUpdates: PropTypes.func,
  isSearchResultPage: PropTypes.bool,
};

export const CategoryProductsWithFilterViewWrapper = withDependencySupport(BaseCategoryProductsWithFilterViewWrapper, 'CategoryProductsWithFilterViewWrapper');
