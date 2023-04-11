import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { useRouter } from 'next/router';
import { StoreConfigContext } from '@/roanuz/store/core/context';
import { WishListContext } from '@/roanuz/store/core/wishlistContext';
import { StickBarView } from '@/roanuz/view/stickyBar/stickyBar';
import { SearchBarController } from '@/roanuz/controller/searchbar';
import stickyBarSettings from '@/data/stickyBar/settings';
import { LogoView } from '@/roanuz/view/brand';
import { StickBarMenuModeTypes } from '@/roanuz/view/stickyBar/featureTypes';
import { StickBarRightSideFeatures } from '@/roanuz/view/stickyBar/rightFeatures';
import { MenuIconActionView } from '@/roanuz/view/stickyBar/menuIconActionView';
import { useScrollHandler } from '@/roanuz/components/scrollHandler';
import { ClientCartIndicatorController } from './cart/cart';
import { ClientCartMiniController } from './cart/cartMini';
import { ClientWishListMiniController } from './wishlistMini';
import { hideComponentView } from '../lib/utils';
import { MenuModelContext } from '../store/core/menuContext';

export const BaseStickyBarController = ({ dontRenderComponentOn }) => {
  const storeConfig = useContext(StoreConfigContext);
  const menuContext = useContext(MenuModelContext);
  const router = useRouter();
  const scrollPosition = useScrollHandler();

  const wishListContext = useContext(WishListContext);
  const wishListData = (wishListContext.wishListData
    && wishListContext.wishListData.customer && wishListContext.wishListData.customer.wishlist_v2)
    ? wishListContext.wishListData.customer.wishlist_v2 : null;

  const wishList = {
    loading: wishListContext.loading,
    error: wishListContext.error,
    item: wishListData
      ? { total_quantity: wishListData.items_count ? wishListData.items_count : 0 } : null,
  };

  const { categoryTree, categoryTreeLoading } = storeConfig.categoryTreeData;

  const shouldHideStickyBarView = hideComponentView(router, dontRenderComponentOn);
  if (shouldHideStickyBarView) {
    return null;
  }

  const settings = stickyBarSettings;

  return (
    <StickBarView
      categoryTree={{
        tree: categoryTree,
        treeLoading: categoryTreeLoading,
      }}
      cart={(<ClientCartIndicatorController />)}
      CartMiniType={ClientCartMiniController}
      wishList={wishList}
      WishListMiniType={ClientWishListMiniController}
      menuContext={menuContext}
      scrollPosition={scrollPosition}
      searchView={(
        <SearchBarController
          menuContext={menuContext}
          settings={settings}
          menu={(
            <MenuIconActionView mode={StickBarMenuModeTypes.MobileBurgerMenuMode} />
          )}
          logo={(
            <LogoView />
          )}
          rightContent={(
            <StickBarRightSideFeatures
              features={settings.features.right}
              cart={(<ClientCartIndicatorController />)}
              CartMiniType={ClientCartMiniController}
              wishList={wishList}
              WishListMiniType={ClientWishListMiniController}
            />
          )}
        />
      )}
    />
  );
};

BaseStickyBarController.propTypes = {
  dontRenderComponentOn: PropTypes.array,
};

export const StickyBarController = withDependencySupport(BaseStickyBarController, 'StickyBarController');
