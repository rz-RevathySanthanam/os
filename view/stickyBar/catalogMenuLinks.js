import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '@/roanuz/layout';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { useToggleMenuHandler } from '@/roanuz/store/core/menuContext';

import { ServicesTree } from '@/roanuz/lib/servicesTree';
import { CategoryMenuTreeView } from './categoryMenuTree';
import { MenuItem } from './menuItemView';

const CatalogMenuLinksWrapper = styled(Row)`
  justify-content: space-between;

  .menu-col {
    cursor: pointer;
    .menu-item, a {
      :hover {
        text-decoration: none;
      }
    }
  }
`;

export const BaseCatalogMenuLinks = ({
  featureItems,
  categoryTree,
}) => {
  const [treeVisible, setTreeVisible] = useState(-1);

  const showTree = (i) => {
    setTreeVisible(i);
  };
  const hideTree = (i) => {
    setTreeVisible(i);
  };

  const [superMenu] = useToggleMenuHandler();

  return (
    <CatalogMenuLinksWrapper>
      {featureItems && featureItems.map((link, index) => (
        <div
          className="menu-col hide-mobile"
          onMouseOver={() => link.showMiniView && showTree(index)}
          onMouseOut={() => link.showMiniView && hideTree(-1)}
          onFocus={() => link.showMiniView && showTree(index)}
          onBlur={() => link.showMiniView && hideTree(-1)}
          role="presentation"
          onClick={() => link.menuActionFrame && superMenu(true, false, link.menuActionFrame)}
          onKeyPress={() => link.menuActionFrame && superMenu(true, false, link.menuActionFrame)}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <MenuItem
            showDropDown={link.showMiniView}
            href={link.href}
            target={link.target}
            className={link.menuActionFrame ? 'item-link' : ''}
          >
            {link.label}
            {link.showMiniView && (
              <div className="category-tree">
                <CategoryMenuTreeView
                  tree={link.isServiceTree ? ServicesTree : categoryTree.tree}
                  loading={link.isServiceTree ? false : categoryTree.treeLoading}
                  show={treeVisible === index}
                  isServiceLinks={link.isServiceTree}
                />
              </div>
            )}
          </MenuItem>
        </div>
      ))}
    </CatalogMenuLinksWrapper>
  );
};

BaseCatalogMenuLinks.propTypes = {
  featureItems: PropTypes.arrayOf(PropTypes.object),
  categoryTree: PropTypes.object,
};

export const CatalogMenuLinks = withDependencySupport(BaseCatalogMenuLinks, 'CatalogMenuLinks');
