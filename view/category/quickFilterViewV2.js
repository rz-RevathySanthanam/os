import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text12, Text14, TextMedium16 } from '@/roanuz/typopgraphy';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Button } from '@/roanuz/view/button';
import { Row, Col } from '@/roanuz/layout';
import Config from '@/config';
import { translateV2 } from '@/roanuz/lib/utils';
import { ExposedSpecificAggregationView } from './exposedAggregationView';

export const QuickFiltersViewV2Wrapper = styled.div`
  --color-active: var(--color-sticky-bg);
  margin-bottom: ${asRem(20)};
  .all-filters-list {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    color: var(--color-text);
    @media screen and (min-width: ${Breakpoint.sm}) {
      align-items: flex-end;
      flex-direction: row;
      gap: ${asRem(10)};
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      gap: ${asRem(10)};
      >span {
        padding: ${asRem(10)} ${asRem(22)};
        background: var(--color-filter-page-search);
        border-radius: ${asRem(80)};
        cursor: pointer;
        transition: all .3s ease-in-out;
        border: ${asRem(1)} solid transparent;
        display: none;

        &:hover {
          transform: scale(1.05);
        }
        &.active {
          border-color: var(--color-primary-plum-red);
          span.count {
            background-color: var(--color-primary-plum-red);
          }
        }
        &.more-filters-btn {
          display: flex;
          background-color: var(--color-cream);
          .count {
            background: var(--color-filter-page-search);
            color: #333;
          }
        }

        @media screen and (min-width: ${Breakpoint.lg}) {
          display: inline-block;
          &.more-filters-btn {
            background-color: var(--color-primary-plum-red);
            color: var(--color-simple-white);
          }
        }
      }
      .count {
        margin-left: ${asRem(8)};
        padding: ${asRem(2)} ${asRem(8)};
        border-radius: ${asRem(12)};
        background: var(--color-active);
        color: #fff;
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    }

    .button-wrap {
      margin-left: ${asRem(8)};
      button {
        font-weight: 600;
        color: var(--color-primary-plum-red);
        padding: ${asRem(10)} 0;
        p {
          border-bottom: ${asRem(1)} solid var(--color-primary-plum-red);
        }
      }
    }

    @-moz-document url-prefix() { // To fix span in firefox - lame fix
      .text-label {
        position: relative;
        top: 1px;
      }
    }
  }
`;

export const QuickFiltersViewV2 = ({
  selectedFilters,
  onClearAllFilters,
  onClearIndividualFilter,
  initialAggregations,
  expandFilterGroup,
  onFilterUpdate,
  categoryImmediateChildren,
  aggregationsItemCounts,
}) => {
  const { filterSettings } = Config.CategoryPageSettings;
  const exposedQuickFilterItem = filterSettings.exposedQuickFilter;
  const { enableIconOfExposedQuickFilter } = filterSettings;
  const quickFilterItemsLimit = filterSettings.quickFilterItemsDisplayLimit.length;
  const quickFilterLimitedItems = filterSettings.quickFilterItemsDisplayLimit;
  const isSelectedFilters = Object.keys(selectedFilters).length > 0;
  const isExposedAggregationExisit = () => {
    const matched = initialAggregations.find((x) => x.attribute_code === exposedQuickFilterItem);
    if (!matched) {
      return false;
    }
    return true;
  };

  const getSelectedFilterOptionsCount = (code) => {
    const optionRef = selectedFilters[code];
    if (optionRef) {
      return optionRef.split(',').length;
    }
    return null;
  };

  const getOtherSelectedFilterOptionsCount = () => {
    const filterKeys = Object.keys(selectedFilters);
    let count = null;
    initialAggregations.forEach((attribute, index) => {
      if (filterKeys.includes(attribute.attribute_code) && (index >= quickFilterItemsLimit)) {
        count += getSelectedFilterOptionsCount(attribute.attribute_code);
      }
    });
    return count;
  };

  return (
    <QuickFiltersViewV2Wrapper>
      {exposedQuickFilterItem && isExposedAggregationExisit() && (
        <ExposedSpecificAggregationView
          onClearIndividualFilter={onClearIndividualFilter}
          exposedQuickFilterItem={exposedQuickFilterItem}
          enableIconOfExposedQuickFilter={enableIconOfExposedQuickFilter}
          onFilterUpdate={onFilterUpdate}
          initialAggregations={initialAggregations}
          selectedFilters={selectedFilters}
          categoryImmediateChildren={categoryImmediateChildren}
          aggregationsItemCounts={aggregationsItemCounts}
        />
      )}
      <Row alignCenter className="all-filters-list">
        <Col className="list">
          {initialAggregations.map((aggregation, index) => (
            quickFilterLimitedItems.includes(aggregation.attribute_code) && (
              <Text14
                as="span"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={`${getSelectedFilterOptionsCount(aggregation.attribute_code) ? 'active' : ''}`}
                role="presentation"
                onClick={() => expandFilterGroup(aggregation.attribute_code)}
                onKeyPress={() => expandFilterGroup(aggregation.attribute_code)}
              >
                <span className="text-label">{translateV2(`filter.${aggregation.label}`, aggregation.label)}</span>
                {isSelectedFilters && getSelectedFilterOptionsCount(aggregation.attribute_code) && (
                  <Text12 as="span" className="count">
                    {getSelectedFilterOptionsCount(aggregation.attribute_code)}
                  </Text12>
                )}
              </Text14>
            )
          ))}
          {initialAggregations.length > quickFilterItemsLimit && (
            <Text14
              as="span"
              className="more-filters-btn"
              role="presentation"
              onClick={() => expandFilterGroup()}
              onKeyPress={() => expandFilterGroup()}
            >
              <span className="text-label">{translateV2('button.MORE')}</span>
              {isSelectedFilters && getOtherSelectedFilterOptionsCount() && (
                <Text12 as="span" className="count">
                  {getOtherSelectedFilterOptionsCount()}
                </Text12>
              )}
            </Text14>
          )}
        </Col>
        {isSelectedFilters && (
          <Col className="button-wrap">
            <Button
              onClick={() => onClearAllFilters()}
              noborder
            >
              <TextMedium16>
                {translateV2('button.CLEAR_FILTER')}
              </TextMedium16>
            </Button>
          </Col>
        )}
      </Row>
    </QuickFiltersViewV2Wrapper>
  );
};

QuickFiltersViewV2.propTypes = {
  selectedFilters: PropTypes.object,
  onClearAllFilters: PropTypes.func,
  onClearIndividualFilter: PropTypes.func,
  initialAggregations: PropTypes.array,
  expandFilterGroup: PropTypes.func,
  onFilterUpdate: PropTypes.func,
  categoryImmediateChildren: PropTypes.array,
  aggregationsItemCounts: PropTypes.object,
};
