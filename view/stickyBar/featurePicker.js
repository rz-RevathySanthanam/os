import React from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import Link from 'next/link';
import { ReactComponent as StoreIcon } from '@/roanuz/view/imgs/StoreIcon.svg';
import { ReactComponent as BaseAccountIcon } from '@/roanuz/view/imgs/AccountIcon.svg';
import { SVGIcon } from '@/roanuz/view/icon';
import { QuickLinks } from '@/roanuz/view/stickyBar/menu/quickLinks';
import { StickBarFeatureTypes, StickBarMenuModeTypes } from './featureTypes';
import { CatalogMenuLinks } from './catalogMenuLinks';
import { LogoView } from '../brand';
import { CartActionView } from './cartActionView';
import { WishListActionView } from './wishListActionView';
import { MenuIconActionView } from './menuIconActionView';
import { UserSessionView } from './userSessionView';
import { SearchActionView } from './searchActionView';

export const BaseStickBarFeaturesPicker = ({
  feature,
  searchView,
  cart,
  CartMiniType,
  wishList,
  WishListMiniType,
  menuMode = StickBarMenuModeTypes.MobileBurgerMenuMode,
  categoryTree,
  menuContext,
}) => {
  if (
    feature.view === StickBarFeatureTypes.SuperMenuIcon
    || feature.view === StickBarFeatureTypes.MobileBurgerMenu
  ) {
    return (<MenuIconActionView mode={menuMode} />);
  }
  if (feature.view === StickBarFeatureTypes.LogoView) {
    return <LogoView />;
  }
  if (feature.view === StickBarFeatureTypes.CatalogOrSiteLinks) {
    return <CatalogMenuLinks featureItems={feature.items} categoryTree={categoryTree} />;
  }
  if (feature.view === StickBarFeatureTypes.SearchView) {
    return searchView || null;
  }
  if (feature.view === StickBarFeatureTypes.CartIcon) {
    return (
      <CartActionView
        featureConfig={feature}
        cart={cart}
        CartMiniType={CartMiniType}
      />
    );
  }
  if (feature.view === StickBarFeatureTypes.WishListIcon) {
    return (
      <WishListActionView
        featureConfig={feature}
        wishList={wishList}
        WishListMiniType={WishListMiniType}
      />
    );
  }
  if (feature.view === StickBarFeatureTypes.AccountIcon) {
    return (
      <Link href={feature.href}>
        <a>
          <SVGIcon
            heightPx={24}
            className="account-svg"
          >
            <AccountIcon />
          </SVGIcon>
        </a>
      </Link>
    );
  }
  if (feature.view === StickBarFeatureTypes.StoreIcon) {
    return (
      <Link href={feature.href}>
        <a className="store-svg">
          <SVGIcon
            heightPx={24}
          >
            <StoreIcon />
          </SVGIcon>
        </a>
      </Link>
    );
  }
  if (feature.view === StickBarFeatureTypes.ExternalQuickLinks) {
    return (
      <QuickLinks quickLinks={feature.items} />
    );
  }
  if (feature.view === StickBarFeatureTypes.UserSessionView) {
    return <UserSessionView />;
  }
  if (feature.view === StickBarFeatureTypes.SearchIcon) {
    return (
      <SearchActionView
        featureConfig={feature}
        searchView={searchView}
        menuContext={menuContext}
        showPlaceholder={feature.showPlaceholder || false}
        showExternalCloseButton={feature.showExternalCloseButton || false}
      />
    );
  }
  return null;
};

BaseStickBarFeaturesPicker.propTypes = {
  feature: PropTypes.object,
  searchView: PropTypes.element,
  cart: PropTypes.element,
  CartMiniType: PropTypes.elementType,
  WishListMiniType: PropTypes.elementType,
  wishList: PropTypes.object,
  menuMode: PropTypes.string,
  categoryTree: PropTypes.object,
  menuContext: PropTypes.object,
};

export const StickBarFeaturesPicker = withDependencySupport(BaseStickBarFeaturesPicker, 'StickBarFeaturesPicker');
export const AccountIcon = withDependencySupport(BaseAccountIcon, 'AccountIcon');
