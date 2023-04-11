import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text14 } from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
import { ImageView } from '@/roanuz/view/image';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { managedOptions } from './filterControl';

export const BaseExposedSpecificAggregationViewWrapper = styled.div`
  --color-active: var(--color-sticky-bg);
  display: flex;
  align-items: center;
  margin-bottom: ${asRem(20)};
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: ${asRem(10)};
    >span {
      padding: ${asRem(10)};
      border-radius: ${asRem(8)};
      cursor: pointer;
      transition: all .3s ease-in-out;
      border: ${asRem(1)} solid var(--color-filter-page-search);
      .rz-image-view {
        display: inline-block;
        margin-right: ${asRem(4)};
        position: relative;
        top: ${asRem(5)};
        width: ${asRem(18)};
        height: ${asRem(18)};
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        transform: scale(1.05);
      }
      &.active {
        border-color: var(--color-active);
      }
      &.disable-item {
        opacity: 0.5;
        cursor: not-allowed;
        label, input {
          cursor: not-allowed;
        }
      }
    }
  }
`;

export const BaseExposedSpecificAggregationIconView = ({ aggregation, src, alt }) => {
  console.debug(`Left for future use ${aggregation}`);
  return (
    <ImageView
      src={src || ''}
      alt={alt}
    />
  );
};

BaseExposedSpecificAggregationIconView.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  aggregation: PropTypes.object,
};

export const ExposedSpecificAggregationView = ({
  onClearIndividualFilter,
  exposedQuickFilterItem,
  enableIconOfExposedQuickFilter,
  onFilterUpdate,
  selectedFilters,
  initialAggregations,
  categoryImmediateChildren,
  aggregationsItemCounts,
}) => {
  const onChange = (field, value) => {
    const removeItem = false;
    onFilterUpdate({
      field, value, removeItem, op: 'in',
    });
  };

  const specificAggregationInfoRef = initialAggregations
    .filter((x) => x.attribute_code === exposedQuickFilterItem);
  const [specificAggregationItem] = specificAggregationInfoRef;
  const aggregationOptions = managedOptions(specificAggregationItem, categoryImmediateChildren);

  const selectFilter = (field, value) => {
    const selectedValues = selectedFilters[exposedQuickFilterItem];
    if (selectedValues) {
      if (!selectedValues.split(',').includes(value)) {
        onChange(field, value);
      } else {
        onClearIndividualFilter(
          exposedQuickFilterItem,
          value,
          (exposedQuickFilterItem === 'price'),
        );
      }
    } else {
      onChange(field, value);
    }
  };

  const getSelectedFilterOptionsCount = (value) => {
    const optionRef = selectedFilters[exposedQuickFilterItem];
    if (optionRef) {
      return optionRef.split(',').includes(value);
    }
    return null;
  };

  const checkEligibleStatus = (value) => {
    if (aggregationsItemCounts
      && aggregationsItemCounts[exposedQuickFilterItem]
      && !aggregationsItemCounts[exposedQuickFilterItem].attributeMissing
      && aggregationsItemCounts[exposedQuickFilterItem][value]
      && aggregationsItemCounts[exposedQuickFilterItem][value].count > 0) {
      return true;
    }
    return false;
  };

  return (
    <ExposedSpecificAggregationViewWrapper>
      <div className="list">
        {aggregationOptions.map((aggregation, index) => (
          <Text14
            as="span"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            role="presentation"
            className={
              [`${getSelectedFilterOptionsCount(aggregation.value) ? 'active' : ''}`,
                `${checkEligibleStatus(aggregation.value) ? '' : 'disable-item'}`,
              ].join('')
            }
            onClick={() => checkEligibleStatus(aggregation.value)
                && selectFilter(exposedQuickFilterItem, aggregation.value)}
            onKeyPress={() => checkEligibleStatus(aggregation.value)
              && selectFilter(exposedQuickFilterItem, aggregation.value)}
            disabled={!checkEligibleStatus(aggregation.value)}
          >
            {enableIconOfExposedQuickFilter && (
              <ExposedSpecificAggregationIconView aggregation={aggregation} />
            )}
            {aggregation.label}
          </Text14>
        ))}
      </div>
    </ExposedSpecificAggregationViewWrapper>
  );
};

ExposedSpecificAggregationView.propTypes = {
  onClearIndividualFilter: PropTypes.func,
  exposedQuickFilterItem: PropTypes.string,
  enableIconOfExposedQuickFilter: PropTypes.bool,
  onFilterUpdate: PropTypes.func,
  selectedFilters: PropTypes.object,
  initialAggregations: PropTypes.array,
  categoryImmediateChildren: PropTypes.array,
  aggregationsItemCounts: PropTypes.object,
};

export const ExposedSpecificAggregationViewWrapper = withDependencySupport(BaseExposedSpecificAggregationViewWrapper, 'ExposedSpecificAggregationViewWrapper');
export const ExposedSpecificAggregationIconView = withDependencySupport(BaseExposedSpecificAggregationIconView, 'ExposedSpecificAggregationIconView');
