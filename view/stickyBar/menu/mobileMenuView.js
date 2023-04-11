import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { DisplayBold20 } from '@/roanuz/typopgraphy';
import { LogoView } from '@/roanuz/view/brand';

import { MobileCategoryMenuTreeView } from '../categoryMenuTree';
import { QuickLinks } from './quickLinks';

const MobileMenuViewWrapper = styled.div`
  margin-bottom: ${asRem(50)}; 
  .category-tree-outer {
    .item-label {
      margin-bottom: ${asRem(18)}; 
    }
  }

  .mobile-logo {
    img {
      height: ${asRem(50)};
    }
  }
`;

export const BrandsView = () => {
  return (
    <div className="mobile-logo">
      <LogoView />
    </div>
  );
};

export const BaseMobileMenuView = ({
  mobileMenuSettings,
  categoryTree,
  serviceTree,
}) => {
  const { items } = mobileMenuSettings;
  const { quickLinks } = mobileMenuSettings;

  return (
    <MobileMenuViewWrapper>
      {items && items.map((item, index) => (
        <div
          className="category-tree-outer"
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          {item.showMenuTree && (
            <div>
              <DisplayBold20 as="p" className="item-label">{item.label}</DisplayBold20>
              <div className="category-tree">
                <MobileCategoryMenuTreeView
                  tree={item.isServiceTree ? serviceTree : categoryTree.tree}
                  loading={item.isServiceTree ? false : categoryTree.treeLoading}
                  show
                  isServiceLinks={item.isServiceTree}
                />
              </div>
            </div>
          )}
          {item.href && (
            <Link href={item.href} prefetch={false}>
              <a alt={item.label} className="plain">
                <DisplayBold20 as="span">{item.label}</DisplayBold20>
              </a>
            </Link>
          )}
        </div>
      ))}
      <QuickLinks quickLinks={quickLinks} sectionView />
      <BrandsView />
    </MobileMenuViewWrapper>
  );
};

BaseMobileMenuView.propTypes = {
  mobileMenuSettings: PropTypes.object,
  categoryTree: PropTypes.object,
  serviceTree: PropTypes.object,
};

export const MobileMenuView = withDependencySupport(BaseMobileMenuView, 'MobileMenuView');
