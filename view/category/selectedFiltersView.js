import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import { Text16, TextMedium14 } from '@/roanuz/typopgraphy';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { formatPriceLabel } from '@/roanuz/lib/cart';
import { Button } from '@/roanuz/view/button';
import { SVGIcon } from '@/roanuz/view/icon';
import { translateV2 } from '@/roanuz/lib/utils';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseSelectedFiltersViewWrapper = styled.div`
  margin-bottom: ${asRem(24)};
  display: flex;
  align-items: center;

  .active-filter-title {
    color: var(--color-black);
  }

  >p {
    margin-right: ${asRem(32)};
    white-space: nowrap;
    display: none;

    @media screen and (min-width: ${Breakpoint.md}) {
      display: block;
    }
  }
  >.active-filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow-x: auto;
    padding: 0;
    
    @media screen and (min-width: ${Breakpoint.md}) {
      flex-wrap: nowrap;
      max-width: ${asRem(720)};
    }

    @media screen and (min-width: ${Breakpoint.lg}) {
      max-width: ${asRem(940)};
    }

    div.item {
      border: ${asRem(1)} solid var(--color-button);
      padding: ${asRem(8)} ${asRem(20)} ${asRem(8)} ${asRem(10)};
      border-radius: ${asRem(6)};
      margin: ${asRem(5)} ${asRem(10)} ${asRem(5)} 0;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      border-radius: ${asRem(32)};
      cursor: pointer;
      color: var(--color-button);
    
      &:hover {
        color: var(--color-button-hover);
        border-color: var(--color-button-hover);
      }
      >p {
        padding: 0 0 0 ${asRem(10)};
        white-space: nowrap;
      }
    }
  }

  .button-wrap {
    >button {
      transition: none;
      &:hover p {
        color: var(--color-text-primary);
      }
      >span {
        opacity: initial;
        p {
          white-space: nowrap;
          color: var(--color-text-secondary);
        }
      }
    }
  }

  .hide-mobile {
    @media screen and (min-width: ${Breakpoint.sm}) {
      display: inline;
    }
  }
`;

export const SelectedFiltersView = ({
  activeFiltersList,
  onClearAllFilters,
  onClearIndividualFilter,
  aggregationsInfo,
}) => {
  if (!Object.keys(activeFiltersList).length) {
    return null;
  }
  const prepareLabel = (aFilter, i) => {
    // if (Config.PriceTypeOfAttributes.includes(aFilter)) {
    //   return activeFiltersList[i] || i.replace('_', ' - ');
    // }
    if (aggregationsInfo[aFilter]
      && aggregationsInfo[aFilter][i]) {
      return aggregationsInfo[aFilter][i].label;
    }
    return formatPriceLabel(activeFiltersList[i] || i.replace('_', '-'));
  };
  return (
    <SelectedFiltersViewWrapper className="active-filters-list">
      <Text16 className="active-filter-title">
        {translateV2('category.ACTIVE_FILTERS')}
        <span>:</span>
      </Text16>
      <div className="active-filters">
        {Object.keys(activeFiltersList).map((activeFilter, afKey) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={afKey}>
            {activeFilter !== 'page'
              && activeFiltersList[activeFilter]
              && activeFiltersList[activeFilter].split(',')
              && activeFiltersList[activeFilter].split(',').map((item) => (
                <>
                  {(aggregationsInfo[activeFilter][item] || item) && (
                    <div
                      className="item"
                      key={item}
                      onClick={() => onClearIndividualFilter(
                        activeFilter,
                        item,
                        (activeFilter === 'price'),
                      )}
                      role="presentation"
                    >
                      <TextMedium14>
                        {prepareLabel(activeFilter, item)}
                      </TextMedium14>
                      <SVGIcon heightPx={16}>
                        <CloseIcon />
                      </SVGIcon>
                    </div>
                  )}
                </>
              ))}
          </React.Fragment>
        ))}
        <div className="button-wrap hide-desktop">
          <Button
            onClick={() => onClearAllFilters()}
            noborder
          >
            <TextMedium14>{translateV2('button.CLEAR_FILTER')}</TextMedium14>
          </Button>
        </div>
      </div>
      <div className="button-wrap hide-mobile">
        <Button
          onClick={() => onClearAllFilters()}
          noborder
        >
          <TextMedium14>{translateV2('button.CLEAR_FILTER')}</TextMedium14>
        </Button>
      </div>
    </SelectedFiltersViewWrapper>
  );
};

SelectedFiltersView.propTypes = {
  activeFiltersList: PropTypes.object,
  onClearAllFilters: PropTypes.func,
  onClearIndividualFilter: PropTypes.func,
  aggregationsInfo: PropTypes.object,
};

export const SelectedFiltersViewWrapper = withDependencySupport(BaseSelectedFiltersViewWrapper, 'SelectedFiltersViewWrapper');
