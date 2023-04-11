import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formatPriceLabel } from '@/roanuz/lib/cart';
import { asRem } from '@/roanuz/lib/css';
import { StyledRadio } from '@/roanuz/layout';

const PriceFilterListViewWrapper = styled.div`
  label {
    cursor: pointer;

    &, .item-input {
      display: flex;
      align-items: center;
    }
    justify-content: space-between;
    padding-bottom: ${asRem(14)};

    .item-count {
      color: var(--color-grey-2);

      &::before {
        content: "(";
      }

      &::after {
        content: ")";
      }
    }

    .rz-custom-radio {
      input {
        margin-left: 0;
      }
    }
  }

  .disable-item {
    opacity: 0.5;
    cursor: not-allowed;
    label, input {
      cursor: not-allowed;
    }
  }
`;

export const PriceFilterListView = ({
  filterInput,
  filterItem,
  onFilterUpdate,
  checkEligibleStatus,
  getItemCount,
  selectedFilters,
}) => {
  const onPriceSelection = (field, value) => {
    onFilterUpdate({
      field, value,
    });
  };
  const priceSelectionHandler = (item) => {
    if (checkEligibleStatus(filterItem, item)) {
      onPriceSelection(
        filterItem.attribute_code, item.value,
      );
    }
  };
  return (
    <PriceFilterListViewWrapper>
      {filterItem.options
        .slice()
        .sort((x, y) => x.label.localeCompare(y.label, undefined, { numeric: true }))
        .map((item) => (
          <label
            key={`${filterItem.attribute_code}_${item.value}`}
            className={
              ['price-item',
                `${(filterInput.range[filterItem.attribute_code] === item.value) ? 'selected-item' : ''}`,
                `${checkEligibleStatus(filterItem, item) ? '' : 'disable-item'}`,
              ].join(' ')
            }
          >
            <div className="item-input">
              <StyledRadio>
                <input
                  type="radio"
                  onChange={() => priceSelectionHandler(item)}
                  value={formatPriceLabel(item.label)}
                  checked={selectedFilters.price === item.value}
                  disabled={!checkEligibleStatus(filterItem, item)}
                />
              </StyledRadio>
              <span className="item-label">
                {formatPriceLabel(item.label)}
              </span>
            </div>
            <div className="item-count">
              {getItemCount(filterItem, item)}
            </div>
          </label>
        ))}
    </PriceFilterListViewWrapper>
  );
};

PriceFilterListView.propTypes = {
  filterInput: PropTypes.object,
  filterItem: PropTypes.object,
  onFilterUpdate: PropTypes.func,
  checkEligibleStatus: PropTypes.func,
  getItemCount: PropTypes.func,
  selectedFilters: PropTypes.object,
};
