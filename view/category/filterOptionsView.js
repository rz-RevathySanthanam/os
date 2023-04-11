import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledCheckbox } from '@/roanuz/layout';
import { formatLabel } from '@/roanuz/lib/cart';
import { asRem } from '@/roanuz/lib/css';
import styled from 'styled-components';
import SearchIcon from '@/roanuz/view/imgs/SearchIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';

export const SearchBarViewWrapper = styled.div`
  margin-bottom: ${asRem(20)};
  position: relative;

  input {
    border-right: none !important;
    border: 0;
    padding: ${asRem(14)} ${asRem(20)};
    border-top-left-radius: ${asRem(5)};
    border-bottom-left-radius: ${asRem(5)};
    background-color: var(--color-filter-page-search);
    font-size: ${asRem(14)};
    border-radius: ${asRem(80)};
    height: ${asRem(46)};
    width: 100%;

    &:focus {
      box-shadow: none;
      outline: none;
    }

    &::placeholder {
      color: #404040;
    }
  }

  &::before {
    content: "";
    display: block;
    width: ${asRem(18)};
    height: ${asRem(18)};
    position: absolute;
    top: 50%;
    left: ${asRem(20)};
    transform: translateY(-50%);
    background-image: url(${SearchIcon});
  }
`;

export const BaseFilterOptionsViewWrapper = styled.div`
  .see-more-btn {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .item {
    padding-bottom: ${asRem(14)};
    display: flex;
    justify-content: space-between;
    font-size: ${asRem(14)};
    line-height: ${asRem(20)};
    .count {
      color: var(--color-grey-2);
      min-width: ${asRem(20)};
      text-align: center;

      &::before {
        content: "(";
      }

      &::after {
        content: ")";
      }
    }
    label {
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        display: block;
        &:not(.price-label) {
          padding-left: ${asRem(10)};
        }
      }

      input[type="checkbox"] {
        min-width: ${asRem(16)};
      }
    }
    &.link {
      &.selected {
        font-weight: bold;
      }

      label {
        span {
          text-decoration: underline;
          display: block;
        }
      }
    }
    &.disable-item {
      opacity: 0.5;
      cursor: not-allowed;
      label, input {
        cursor: not-allowed;
      }
    }
  }
  .rz-custom-checkbox input {
    margin: 0;
    border-radius: ${asRem(4)};
    border-color: var(--color-grey-2);
  }
`;

export const FilterOptionsView = ({
  filterItem,
  specialCases,
  checkEligibleStatus,
  selectedFilters,
  onChange,
  getItemCount,
  isAlgoliaBasedFilters,
  filterSettingsConfig,
}) => {
  const [query, setQuery] = useState('');
  const { filterSettings } = filterSettingsConfig;

  const [optionsToDisplay, setOptionsToDisplay] = useState(
    filterSettings.maximumOptionsToShowInitially || filterItem.options.length,
  );

  const showMore = () => {
    setOptionsToDisplay(optionsToDisplay + filterSettings.maximumOptionsToShowInitially);
  };

  return (
    <FilterOptionsViewWrapper>
      {filterSettings.enableFilterOptionsSearch && (
        <SearchBarViewWrapper>
          <input
            placeholder={`${translateV2('category.FILTER_SEARCH_PLACEHOLDER')}`}
            onChange={(event) => setQuery(event.target.value)}
          />
        </SearchBarViewWrapper>
      )}
      {filterItem.options
        .slice()
        .sort((x, y) => x.label.localeCompare(y.label, undefined, { numeric: true }))
        .filter((item) => {
          return (
            item.label.toLowerCase().includes(query.trimLeft().toLowerCase())
          );
        })
        .map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            {specialCases.indexOf(filterItem.attribute_code) === -1
              && (!isAlgoliaBasedFilters ? item.count > 0 : item.count >= 0)
              && (index + 1 <= optionsToDisplay) && (
              <StyledCheckbox
                key={`${item.attribute_code || filterItem.attribute_code} ${item.value}`}
              >
                <div className={`item ${checkEligibleStatus(filterItem, item) ? '' : 'disable-item'}`}>
                  <label>
                    <input
                      type="checkbox"
                      value={item.value}
                      checked={
                        !!((selectedFilters
                        && selectedFilters[item.attribute_code
                          || filterItem.attribute_code]
                        && selectedFilters[item.attribute_code || filterItem.attribute_code].split(',').includes(!isAlgoliaBasedFilters ? item.value : item.label)))
                      }
                      disabled={!checkEligibleStatus(filterItem, item)}
                      onChange={
                        (event) => (checkEligibleStatus(filterItem, item)
                          && onChange(
                            item.attribute_code || filterItem.attribute_code,
                            item.value,
                            event.target.checked,
                            item.label,
                          ))
                      }
                    />
                    <span>{formatLabel(item.label)}</span>
                  </label>
                  <div className="count">
                    {getItemCount(filterItem, item)}
                  </div>
                </div>
              </StyledCheckbox>
            )}
          </div>
        ))}
      {/* Todo: may need show less also ? */}
      {filterItem.options
        && filterSettings.maximumOptionsToShowInitially
        && filterItem.options.length >= optionsToDisplay && (
          <p
            onClick={() => showMore()}
            onKeyPress={() => showMore()}
            role="presentation"
            className="see-more-btn"
          >
            {translateV2('button.SEE_MORE')}
          </p>
      )}
    </FilterOptionsViewWrapper>
  );
};

FilterOptionsView.propTypes = {
  filterItem: PropTypes.object,
  specialCases: PropTypes.array,
  checkEligibleStatus: PropTypes.func,
  selectedFilters: PropTypes.object,
  onChange: PropTypes.func,
  getItemCount: PropTypes.func,
  isAlgoliaBasedFilters: PropTypes.bool,
  filterSettingsConfig: PropTypes.object,
};

export const FilterOptionsViewWrapper = withDependencySupport(BaseFilterOptionsViewWrapper, 'FilterOptionsViewWrapper');
