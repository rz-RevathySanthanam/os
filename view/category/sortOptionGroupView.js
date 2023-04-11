import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as DownArrowIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { LabelMedium12, TextBold16 } from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
import { translateV2, convertStringToTranslationKey } from '@/roanuz/lib/utils';
import { SVGIcon } from '@/roanuz/view/icon';
import { StyledRadio } from '@/roanuz/layout';
import { getSortSelectedKeyLabel } from './model';

export const BaseFilterControlViewWrapper = styled.div`
  >.filter-items {
    display: flex;
    flex-direction: column;
    .group-item:not(:empty) {
      padding-top: ${asRem(14)};
      border-bottom: ${asRem(1)} solid var(--color-disabled-3);

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
        padding-bottom: ${asRem(14)};

        .rz-svg-icon {
          color: var(--color-disabled);
        }
      }
    }
  }

  .sort-item {
    label {
      display: flex;
      align-items: center;
      padding-bottom: ${asRem(14)};

      .rz-custom-radio {
        input {
          margin-left: 0;
        }
      }
    }
  }
`;

export const SortOptionGroupView = ({
  sortGroupVariables,
  sortOptionVariables,
  toggleGroupExpand,
}) => {
  const { setOpenSortGroup, openSortGroup } = sortGroupVariables;
  const {
    sortItems,
    onSortChange,
    selectedKey,
    showSelectedFilterOnFilterGroup,
  } = sortOptionVariables;

  useEffect(() => {
    if (toggleGroupExpand === '_sort_groups') {
      setOpenSortGroup(true);
    }
  }, [toggleGroupExpand]);

  return (
    <div className="group-item">
      <div>
        <div
          className="group-title"
          onClick={() => setOpenSortGroup(!openSortGroup)}
          onKeyDown={() => setOpenSortGroup(!openSortGroup)}
          role="presentation"
        >
          <div>
            <TextBold16>{translateV2('category.SORT_GROUP_TITLE')}</TextBold16>
            {showSelectedFilterOnFilterGroup && !openSortGroup && (
              <LabelMedium12>{getSortSelectedKeyLabel(sortItems, selectedKey)}</LabelMedium12>
            )}
          </div>
          <div>
            <SVGIcon
              heightPx={22}
              upsideDown={!openSortGroup}
            >
              <DownArrowIcon />
            </SVGIcon>
          </div>
        </div>
        <div className="items">
          {openSortGroup && (
            <div className="sort-item">
              {sortItems.map((item) => (
                <label>
                  <StyledRadio>
                    <input
                      type="radio"
                      name="sort-option"
                      key={item.key}
                      value={item.key}
                      checked={selectedKey === item.key}
                      onChange={onSortChange}
                    />
                  </StyledRadio>
                  <span>
                    {translateV2(`category.${convertStringToTranslationKey(item.label)}`)}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SortOptionGroupView.propTypes = {
  sortOptionVariables: PropTypes.object,
  sortGroupVariables: PropTypes.object,
  toggleGroupExpand: PropTypes.string,
};
