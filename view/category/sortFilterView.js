import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text14, TextBold14 } from '@/roanuz/typopgraphy';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { ReactComponent as RightArrowIcon } from '@/roanuz/view/imgs/RightArrow.svg';
import { translateV2 } from '@/roanuz/lib/utils';
import { SVGIcon } from '../icon';
import { getSortSelectedKeyLabel } from './model';

export const SortFilterViewWrapper = styled.div`
  width: 100%;
        
  @media screen and (min-width: ${Breakpoint.sm}) {
    display: flex;
    align-items: center;
    width: auto;
  }

  .sort-view-container {
    display: flex;
    align-items: center;
    padding: ${asRem(16)} ${asRem(24)};
    margin-left: ${asRem(10)};
    border-radius: ${asRem(40)};
    cursor: pointer;

    p {
      margin-right: ${asRem(10)};
    }

    .rz-svg-icon {
      margin-top: ${asRem(-5)};
      svg {
        transform: rotate(90deg);
      }
    }

    @media screen and (min-width: ${Breakpoint.md}) {
      background: transparent;
      &:hover {
        background: var(--color-filter-page-search);
      }
    }
  }
`;

export const SortFilterView = ({
  sortSelectedKey,
  sortItems,
  expandFilterGroup,
}) => {
  return (
    <SortFilterViewWrapper>
      <div
        className="sort-view-container"
        role="presentation"
        onClick={() => expandFilterGroup('_sort_groups')}
        onKeyPress={() => expandFilterGroup('_sort_groups')}
      >
        <Text14 as="span">
          {translateV2('category.SORT_BY')}
          :&nbsp;
        </Text14>
        <TextBold14>{getSortSelectedKeyLabel(sortItems, sortSelectedKey)}</TextBold14>
        <SVGIcon
          heightPx={11}
        >
          <RightArrowIcon />
        </SVGIcon>
      </div>
    </SortFilterViewWrapper>
  );
};

SortFilterView.propTypes = {
  sortSelectedKey: PropTypes.string,
  sortItems: PropTypes.array,
  expandFilterGroup: PropTypes.func,
};
