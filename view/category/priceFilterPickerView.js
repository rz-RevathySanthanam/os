import React from 'react';
import PropTypes from 'prop-types';
import Config from '@/config';
import { PriceFilterListView } from './priceFilterListView';
import { PriceSliderController } from './priceSliderView';

export const PriceFilterPickerView = ({
  filterInput,
  filterItem,
  ispriceActive,
  checkEligibleStatus,
  getItemCount,
  onFilterUpdate,
  selectedFilters,
  priceSliderReset,
  onResetPriceFilter,
}) => {
  const { filterSettings } = Config.CategoryPageSettings;
  if (filterSettings.enablePriceSlider) {
    return (
      <PriceSliderController
        filterItem={filterItem}
        onFilterUpdate={onFilterUpdate}
        priceSliderReset={priceSliderReset}
        onResetPriceFilter={onResetPriceFilter}
        ispriceActive={ispriceActive}
        selectedFilters={selectedFilters}
      />
    );
  }
  return (
    <PriceFilterListView
      filterInput={filterInput}
      filterItem={filterItem}
      checkEligibleStatus={checkEligibleStatus}
      getItemCount={getItemCount}
      onFilterUpdate={onFilterUpdate}
      selectedFilters={selectedFilters}
    />
  );
};

PriceFilterPickerView.propTypes = {
  filterInput: PropTypes.object,
  filterItem: PropTypes.object,
  checkEligibleStatus: PropTypes.func,
  getItemCount: PropTypes.func,
  onFilterUpdate: PropTypes.func,
  ispriceActive: PropTypes.bool,
  selectedFilters: PropTypes.object,
  priceSliderReset: PropTypes.bool,
  onResetPriceFilter: PropTypes.func,
};
