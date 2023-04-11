// Quickfilters Dropdown view
import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ReactComponent as DownArrowIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { asRem } from '@/roanuz/lib/css';
import { Text14 } from '@/roanuz/typopgraphy';
import { SVGIcon } from '@/roanuz/view/icon';
import { translateV2 } from '@/roanuz/lib/utils';
import Config from '@/config';
import { FilterOptionsView } from '@/roanuz/view/category/filterOptionsView';
import { PriceFilterPickerView } from './priceFilterPickerView';

const QuickFilterButtonViewV2Wrapper = styled.div`
  display: none;
  z-index: 10;
  height: auto;
  width: ${asRem(290)};
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05);
  background-color: var(--color-text-rev);
  border-radius: ${asRem(8)};
  padding: ${asRem(24)};
  position: absolute;
  top: ${asRem(60)};
  ${(props) => props.show && css`
    display: block;
  `}
  >div {
    padding: 0;
    >div {
      &:last-child {
        .item {
          padding-bottom: 0;
        }
      }
    }
  }

  label {
    span {
      color: var(--color-text);
    }
  }
`;

export const QuickFilterButtonViewV2 = ({
  filterItem,
  aggregationsInfo,
  selectedFilters,
  onFilterUpdate,
  priceSliderReset,
  setPriceSliderReset,
  filterInput,
}) => {
  const onChange = (field, value, checked) => {
    const removeItem = !checked;
    onFilterUpdate({
      field, value, removeItem, op: 'in',
    });
  };

  const checkEligibleStatus = (fItem, item) => {
    const attrCode = fItem.attribute_code;
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
    const attrCode = fItem.attribute_code;
    if (aggregationsInfo
      && aggregationsInfo[attrCode]
      && !aggregationsInfo[attrCode].attributeMissing
      && aggregationsInfo[attrCode][item.value]) {
      return aggregationsInfo[attrCode][item.value].count;
    }
    return 0;
  };

  const ref = useRef(null);
  const [selectAttrCode, setSelectAttrCode] = useState('');

  const selectAttributeCode = (attributeCode) => {
    setSelectAttrCode(attributeCode);
  };

  const handleClickOutside = useCallback((e) => {
    if (!ref?.current?.contains(e.target)) {
      setSelectAttrCode('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div ref={ref}>
      <Text14
        as="span"
        className={`quick-filter ${selectAttrCode === filterItem.attribute_code ? 'active' : ''}`}
        role="presentation"
        onClick={() => selectAttributeCode(filterItem.attribute_code)}
      >
        {translateV2(`filter.${filterItem.label}`, filterItem.label)}
        <SVGIcon heightPx={18}>
          <DownArrowIcon />
        </SVGIcon>
      </Text14>
      <QuickFilterButtonViewV2Wrapper show={selectAttrCode === filterItem.attribute_code}>
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
              specialCases={['price']}
              checkEligibleStatus={checkEligibleStatus}
              selectedFilters={selectedFilters}
              onChange={onChange}
              getItemCount={getItemCount}
              filterSettingsConfig={Config.CategoryPageSettings}
            />
          )}
      </QuickFilterButtonViewV2Wrapper>
    </div>
  );
};

QuickFilterButtonViewV2.propTypes = {
  filterItem: PropTypes.array,
  aggregationsInfo: PropTypes.object,
  selectedFilters: PropTypes.object,
  onFilterUpdate: PropTypes.func,
  priceSliderReset: PropTypes.bool,
  setPriceSliderReset: PropTypes.func,
  filterInput: PropTypes.object,
};
