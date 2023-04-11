import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Config from '@/config';
import { ReactComponent as DownArrowIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { TextBold16, LabelMedium12 } from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
import { SelectedFiltersView } from '@/roanuz/view/category/selectedFiltersView';
import { SVGIcon } from '@/roanuz/view/icon';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { formatLabel, formatPriceLabel } from '@/roanuz/lib/cart';
import { translateV2 } from '@/roanuz/lib/utils';
import { FilterOptionsView } from './filterOptionsView';
import { PriceFilterPickerView } from './priceFilterPickerView';
import { SortOptionGroupView } from './sortOptionGroupView';

export const BaseFilterControlViewWrapper = styled.div`
  >.filter-items {
    display: flex;
    flex-direction: column;
    .group-item:not(:empty) {
      padding-top: ${asRem(30)};
      border-bottom: ${asRem(1)} solid transparent;

      &:first-child {
        padding-top: 0;
      }
      &.categories-group {
        padding-top: 0;
        margin-bottom: ${asRem(14)};
        order: -1;
      }
      .group-title {
        cursor: pointer;
        display: flex;
        justify-content: space-between;

        .rz-svg-icon {
          color: var(--color-text-primary);
        }

        .selected-filter-thumbnail {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;  
          width: 100%;
          max-width: ${asRem(260)};
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .items {
        margin: 0 ${asRem(15)};
        transition: padding 0.3s ease;
        height: 0;

        &:not(:empty) {
          height: auto;
          padding: ${asRem(20)} 0 0;
        }
      }
    }
  }

  .sort-item {
    label {
      display: flex;
      align-items: center;
      margin-bottom: ${asRem(14)};
      cursor: pointer;

      .rz-custom-radio {
        input {
          margin-left: 0;
        }
      }
    }
  }
`;

export function managedOptions(
  filterItem, categoryImmediateChildren,
) {
  const { filterSettings } = Config.CategoryPageSettings;
  const excludeAttributesDisplay = Config.CategoryPageSettings.ExcludeAttributesToDisplay;
  if (filterSettings.showOnlyChildLevel && filterItem.attribute_code === 'category_id') {
    return filterItem.options.filter((item) => {
      return categoryImmediateChildren.findIndex(
        (child) => child.id === parseInt(item.value, 10),
      ) > -1;
    });
  }
  if (excludeAttributesDisplay.includes(filterItem.attribute_code)) {
    return [];
  }
  return filterItem.options;
}

export const FilterControlView = ({
  categoryImmediateChildren,
  onFilterUpdate,
  onClearAllFilters,
  onClearIndividualFilter,
  initialAggregations,
  aggregationsInfo,
  selectedFilters,
  toggleGroupExpand,
  filterInput,
  priceSliderReset,
  setPriceSliderReset,
  sortOptions,
}) => {
  const [
    initialAggregationsState,
    setInitialAggregationsState,
  ] = useState(initialAggregations.aggregations);
  const [openSortGroup, setOpenSortGroup] = useState(false);

  useEffect(() => {
    setInitialAggregationsState(initialAggregations.aggregations);
  }, [initialAggregations]);

  // useEffect(() => {
  //   [...] Not required I guess, Take From HT if needed back.
  // }, [initialAggregations, filterResult]);

  const defaultGroupCode = '_grouped_defaults';
  const isCategoriesCode = 'category_id';

  const { filterSettings } = Config.CategoryPageSettings;
  const initClosedGroups = [];
  if (filterSettings.closeDefaults) {
    initClosedGroups.push(defaultGroupCode);
  }

  if (filterSettings.closePrice) {
    initClosedGroups.push('price');
  }

  const onChange = (field, value, checked) => {
    const removeItem = !checked;
    onFilterUpdate({
      field, value, removeItem, op: 'in',
    });
  };

  const getCount = (code, value) => {
    const matched = initialAggregationsState.find((x) => x.attribute_code === code);
    if (matched) {
      const matchedOption = matched.options.find((x) => x.value === value);
      if (matchedOption) {
        return matchedOption.count;
      }
    }
    return 0;
  };

  const buildDefaultOption = (label, code, value) => {
    return {
      count: getCount(code, value),
      label,
      value,
      attribute_code: code,
    };
  };

  const defaultOptions = [
    {
      label: 'Staða',
      attribute_code: '_grouped_defaults',
      kind: 'grouped_defaults',
      options: [
        buildDefaultOption('Nýtt', 'new', '1'),
        buildDefaultOption('B-Vörur', 'rz_b_product', '1'),
        buildDefaultOption('Vörur á tilboði', 'sale', '1'),
      ],
    },
  ];

  const skipCodes = [
    ...defaultOptions.map((op) => op.options.map((x) => x.attribute_code)).flat(),
  ];

  const filterOptions = [];

  initialAggregationsState.forEach((filterItem) => {
    const options = managedOptions(
      filterItem,
      categoryImmediateChildren,
    );
    if (options.length > 0) {
      const newItem = {
        ...filterItem,
        options,
      };

      filterOptions.push(newItem);

      if (
        skipCodes.indexOf(filterItem.attribute_code) === -1
        && filterSettings.closeFilters
        && filterItem.attribute_code !== 'price'
        // && filterItem.attribute_code !== isCategoriesCode
      ) {
        initClosedGroups.push(filterItem.attribute_code);
      }
    }
  });

  const specialCases = ['price'];

  const allOptions = [
    ...defaultOptions,
    ...filterOptions,
  ].filter((x) => skipCodes.indexOf(x.attribute_code) === -1);

  const [closedGroups, setClosedGroups] = useState([...initClosedGroups]);

  const toggleGroup = (group) => {
    const index = closedGroups.indexOf(group);
    if (index === -1) {
      setClosedGroups([
        ...closedGroups,
        group,
      ]);
    } else {
      const newItems = closedGroups.filter((x) => x !== group);
      setClosedGroups(newItems);
    }
  };

  useEffect(() => {
    toggleGroup(toggleGroupExpand);
  }, [toggleGroupExpand]);

  const checkEligibleStatus = (fItem, item) => {
    let attrCode = fItem.attribute_code;
    if (attrCode === defaultGroupCode) {
      attrCode = item.attribute_code;
    }
    if (aggregationsInfo
      && aggregationsInfo[attrCode]
      && !aggregationsInfo[attrCode].attributeMissing
      && aggregationsInfo[attrCode][item.value]
      && aggregationsInfo[attrCode][item.value].count > 0) {
      return true;
    }
    return false;
  };

  const getItemCount = (fItem, item) => {
    let attrCode = fItem.attribute_code;
    if (attrCode === defaultGroupCode) {
      attrCode = item.attribute_code;
    }
    if (aggregationsInfo
      && aggregationsInfo[attrCode]
      && !aggregationsInfo[attrCode].attributeMissing
      && aggregationsInfo[attrCode][item.value]) {
      return aggregationsInfo[attrCode][item.value].count;
    }
    return 0;
  };

  const getSelectedFilterLabel = (filterItem) => {
    return filterItem.options.map((opt) => {
      const selectedLabel = selectedFilters[filterItem.attribute_code]?.split(',').includes(opt.value);
      if (filterItem.attribute_code === 'price') {
        return (selectedLabel && formatPriceLabel(opt.label)) || null;
      }
      return (selectedLabel && formatLabel(opt.label)) || null;
    })?.filter(Boolean).join(', ');
  };

  return (
    <FilterControlViewWrapper>
      {filterSettings.showSelectedFilterOnSideBar && (
        <SelectedFiltersView
          activeFiltersList={selectedFilters}
          aggregationsInfo={aggregationsInfo}
          onClearAllFilters={onClearAllFilters}
          onClearIndividualFilter={onClearIndividualFilter}
        />
      )}
      <div className="filter-items">
        <SortOptionGroupView
          sortGroupVariables={{
            setOpenSortGroup,
            openSortGroup,
          }}
          sortOptionVariables={{
            ...sortOptions,
            showSelectedFilterOnFilterGroup: filterSettings.showSelectedFilterOnFilterGroup,
          }}
          toggleGroupExpand={toggleGroupExpand}
        />
        {allOptions.map((filterItem, fIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={fIndex} className={`group-item ${filterItem.attribute_code === isCategoriesCode ? 'categories-group' : ''}`}>
            {filterItem.options.findIndex((item) => item.count > 0) > -1 && (
              <div
                key={filterItem.attribute_code}
              >
                <div
                  className="group-title"
                  onClick={() => toggleGroup(filterItem.attribute_code)}
                  onKeyDown={() => toggleGroup(filterItem.attribute_code)}
                  role="presentation"
                >
                  <div>
                    <TextBold16>{translateV2(`filter.${filterItem.label}`, filterItem.label)}</TextBold16>
                    {filterSettings.showSelectedFilterOnFilterGroup
                      && closedGroups.indexOf(filterItem.attribute_code) !== -1 && (
                      <LabelMedium12 className="selected-filter-thumbnail">
                        {getSelectedFilterLabel(filterItem)}
                      </LabelMedium12>
                    )}
                  </div>
                  <div>
                    <SVGIcon
                      heightPx={22}
                      upsideDown={closedGroups.indexOf(filterItem.attribute_code) > -1}
                    >
                      <DownArrowIcon />
                    </SVGIcon>
                  </div>
                </div>
                <div className="items">
                  {closedGroups.indexOf(filterItem.attribute_code) === -1 && (
                  <>
                    {(filterItem.attribute_code === 'price') ? (
                      <PriceFilterPickerView
                        filterInput={filterInput}
                        filterItem={filterItem}
                        onFilterUpdate={onFilterUpdate}
                        checkEligibleStatus={checkEligibleStatus}
                        getItemCount={getItemCount}
                        selectedFilters={selectedFilters}
                        priceSliderReset={priceSliderReset}
                        onResetPriceFilter={setPriceSliderReset}
                      />
                    )
                      : (
                        <FilterOptionsView
                          filterItem={filterItem}
                          specialCases={specialCases}
                          checkEligibleStatus={checkEligibleStatus}
                          selectedFilters={selectedFilters}
                          onChange={onChange}
                          getItemCount={getItemCount}
                          filterSettingsConfig={Config.CategoryPageSettings}
                        />
                      )}
                  </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </FilterControlViewWrapper>
  );
};

FilterControlView.propTypes = {
  onFilterUpdate: PropTypes.func,
  categoryImmediateChildren: PropTypes.array,
  onClearAllFilters: PropTypes.func,
  onClearIndividualFilter: PropTypes.func,
  initialAggregations: PropTypes.object,
  aggregationsInfo: PropTypes.object,
  selectedFilters: PropTypes.object,
  toggleGroupExpand: PropTypes.string,
  filterInput: PropTypes.object,
  priceSliderReset: PropTypes.bool,
  setPriceSliderReset: PropTypes.func,
  sortOptions: PropTypes.object,
};

export const FilterControlViewWrapper = withDependencySupport(BaseFilterControlViewWrapper, 'FilterControlViewWrapper');
