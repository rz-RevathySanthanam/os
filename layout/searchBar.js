import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '@/roanuz/lib/css';

export const BaseSearchBarLayoutWrapper = styled.div`
  >.content-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: ${asRem(16)} ${asRem(20)};
    @media screen and (min-width: ${Breakpoint.md}) {
      padding: ${asRem(16)} ${asRem(40)};
      flex-wrap: nowrap;
    }

    .menu-icon {
      margin-right: ${asRem(20)};
    }

    .right-container {
      &, .search-view, .btn-border {
        display: none;
      }
      @media screen and (min-width: ${Breakpoint.md}) {
        display: block;
      }
    }
  }
`;

export const BaseSearchBarLayout = ({
  searchBar,
  menu,
  logo,
  rightContent,
}) => {
  return (
    <BaseSearchBarLayoutWrapper>
      <div className="content-container rz-section-content">
        <div className="hide-ipad-start">
          {menu}
        </div>
        <div className="logo-container hide-ipad-start">
          {logo}
        </div>
        {searchBar}
        <div className="right-container">
          {rightContent}
        </div>
      </div>
    </BaseSearchBarLayoutWrapper>
  );
};

BaseSearchBarLayout.propTypes = {
  searchBar: PropTypes.element,
  menu: PropTypes.element,
  logo: PropTypes.element,
  rightContent: PropTypes.element,
};

export const SearchBarLayout = withDependencySupport(BaseSearchBarLayout, 'SearchBarLayout');
