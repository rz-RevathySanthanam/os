import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text14 } from '@/roanuz/typopgraphy';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { SVGIcon } from '@/roanuz/view/icon';
import { ReactComponent as FilterSVG } from '@/roanuz/view/imgs/FilterSVG.svg';
import { Row, Col } from '@/roanuz/layout';
import { withDependencySupport } from '@/roanuz/lib/dep';
import Config from '@/config';
import { translateV2 } from '@/roanuz/lib/utils';
import { QuickFilterButtonViewV1 } from './quickFilterButtonViewV1';

export const BaseQuickFiltersViewWrapper = styled.div`
  --color-active: var(--color-sticky-bg);
  margin-bottom: ${asRem(20)};
  .all-filters-list {
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: ${asRem(10)};

      >div {
        display: flex; 
      }

      >span {
        padding: ${asRem(10)} ${asRem(22)};
        border-radius: ${asRem(80)};
        cursor: pointer;
        border: ${asRem(1)} solid transparent;
      }

      .count {
        margin-left: ${asRem(8)};
        padding: ${asRem(2)} ${asRem(8)};
        border-radius: ${asRem(12)};
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }

      .more-filters-btn {
        display: flex;
        align-items: center;
        padding: ${asRem(16)} ${asRem(24)};
        border-radius: ${asRem(80)};
        cursor: pointer;
        border: ${asRem(1)} solid transparent;

        &:hover {
          background: var(--color-filter-page-search);
          color: var(--color-text-primary);
        }

        .rz-svg-icon {
          margin-left: ${asRem(10)};
        }
      }
    }
  }

  .filter-item {
    position: relative;
    margin-right: ${asRem(10)};
    &:last-child {
      margin-right: 0;
    }

    .active {
      background: var(--color-filter-page-search);
    }

    &:not(.price-group) {
      display: none;
    }
    @media screen and (min-width: ${Breakpoint.sm}) {
      &:not(.price-group) {
        display: block;
      }
    }
  }

  .quick-filter {
    display: flex;
    align-items: center;
    padding: ${asRem(16)} ${asRem(24)};
    border-radius: ${asRem(80)};
    cursor: pointer;
    transition: all .3s ease-in-out;
    border: ${asRem(1)} solid transparent;
    &.active {
      border-color: var(--color-active);
    }
    &:hover {
      background: var(--color-filter-page-search);
      color: var(--color-text-primary);
    }
    .rz-svg-icon {
      margin-left: ${asRem(10)};
    }
  }
`;

export const BaseQuickFiltersView = ({
  initialAggregations,
  expandFilterGroup,
  aggregationsItemCounts,
  selectedFilters,
  onFilterUpdate,
  filterInput,
  priceSliderReset,
  setPriceSliderReset,
}) => {
  const { filterSettings } = Config.CategoryPageSettings;
  const quickFilterItemsLimit = filterSettings.quickFilterItemsDisplayLimit.length;
  const quickFilterLimitedItems = filterSettings.quickFilterItemsDisplayLimit;

  return (
    <QuickFiltersViewWrapper>
      <Row alignCenter className="all-filters-list">
        <Col className="list">
          <div>
            {initialAggregations.map((aggregation) => (
              quickFilterLimitedItems.includes(aggregation.attribute_code) && (
              <div className={`filter-item ${aggregation.attribute_code === 'price' ? 'price-group' : ''}`}>
                <QuickFilterButtonViewV1
                  expandFilterGroup={expandFilterGroup}
                  filterItem={aggregation}
                  aggregationsInfo={aggregationsItemCounts}
                  selectedFilters={selectedFilters}
                  onFilterUpdate={onFilterUpdate}
                  filterInput={filterInput}
                  priceSliderReset={priceSliderReset}
                  setPriceSliderReset={setPriceSliderReset}
                />
              </div>
              )
            ))}
          </div>
          {initialAggregations.length > quickFilterItemsLimit && (
            <Text14
              as="span"
              className="more-filters-btn"
              role="presentation"
              onClick={() => expandFilterGroup()}
              onKeyPress={() => expandFilterGroup()}
            >
              {translateV2('button.ALL_FILTERS')}
              <SVGIcon heightPx={15}>
                <FilterSVG />
              </SVGIcon>
            </Text14>
          )}
        </Col>
      </Row>
    </QuickFiltersViewWrapper>
  );
};

BaseQuickFiltersView.propTypes = {
  selectedFilters: PropTypes.object,
  initialAggregations: PropTypes.array,
  expandFilterGroup: PropTypes.func,
  onFilterUpdate: PropTypes.func,
  aggregationsItemCounts: PropTypes.object,
  filterInput: PropTypes.object,
  priceSliderReset: PropTypes.bool,
  setPriceSliderReset: PropTypes.func,
};

export const QuickFiltersView = withDependencySupport(BaseQuickFiltersView, 'QuickFiltersView');
export const QuickFiltersViewWrapper = withDependencySupport(BaseQuickFiltersViewWrapper, 'QuickFiltersViewWrapper');
