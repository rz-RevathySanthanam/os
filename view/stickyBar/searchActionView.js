import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Row } from '@/roanuz/layout';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { SVGIcon } from '@/roanuz/view/icon';
import { ReactComponent as BaseSearchIcon } from '@/roanuz/view/imgs/SearchIcon.svg';
import { SideBarView } from '@/roanuz/view/sideBar';
import { translateV2 } from '@/roanuz/lib/utils';

export const SearchIcon = withDependencySupport(BaseSearchIcon, 'SearchIcon');

export const BaseSearchActionViewWrapper = styled(Row)`
  justify-content: space-between;
  background-color: transparent;
  width: 100%;

  .search-icon-wrapper {
    width: 100%;
    cursor: pointer;
    padding: ${asRem(10)};
    border-radius: 50%;

    :hover {
      background-color: var(--color-sticky-icons-hover);
    }

    .placehodler-text {
      display: none;
    }

    @media screen and (min-width: ${Breakpoint.md}) {
      display: flex;
      align-items: center;
      padding: ${asRem(15)} ${asRem(17)};

      :hover {
        background-color: transparent;
      }

      .placehodler-text {
        display: block;
        margin-left: ${asRem(9)};
        color: var(--color-text-secondary);
      }
    }
  }
`;

export const BaseSearchActionView = ({
  searchView,
  menuContext,
  showPlaceholder,
  showExternalCloseButton,
}) => {
  return (
    <SearchActionViewWrapper showPlaceholder={showPlaceholder}>
      <div
        className="search-icon-wrapper"
        role="presentation"
        onClick={() => menuContext?.toggleSearchModel(true)}
      >
        <SVGIcon
          heightPx={19}
        >
          <SearchIcon />
        </SVGIcon>
        {showPlaceholder && (
          <p className="placehodler-text">{translateV2('search.SEARCH_ACTION_BUTTON_PLACEHOLDER')}</p>
        )}
      </div>
      <SideBarView
        show={menuContext?.showSearchModal}
        showClose={showExternalCloseButton}
        onClose={() => showExternalCloseButton && menuContext?.toggleSearchModel(false)}
        className="search-bar-view"
        containerWidth="100%"
      >
        {searchView}
      </SideBarView>
    </SearchActionViewWrapper>
  );
};

BaseSearchActionView.propTypes = {
  searchView: PropTypes.element,
  menuContext: PropTypes.object,
  showPlaceholder: PropTypes.bool,
  showExternalCloseButton: PropTypes.bool,
};

export const SearchActionView = withDependencySupport(BaseSearchActionView, 'SearchActionView');
export const SearchActionViewWrapper = withDependencySupport(BaseSearchActionViewWrapper, 'SearchActionViewWrapper');
