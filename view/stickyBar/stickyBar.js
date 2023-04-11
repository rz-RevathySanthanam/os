import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { StickBarLayout } from '@/roanuz/layout/stickyBar';
import { WishListIndicatorView } from '@/roanuz/view/wishListIndicator';
import stickyBarSettings from '@/data/stickyBar/settings';
import { useRouter } from 'next/router';
import { StickBarLeftSideFeatures } from './leftFeatures';
import { StickBarCenterViewFeatures } from './centerFeatures';
import { StickBarRightSideFeatures } from './rightFeatures';
import { StickBarMenuView } from './menu/menuView';

export const BaseStickBarViewWrapper = styled.div`
  background-color: var(--color-sticky-bg);
  color: var(--color-sticky-text);
  a {
    color: var(--color-sticky-text);
  }
  .menu-icon {
    cursor: pointer;
  }

  .sticky-quick-links {
    padding: ${asRem(10)};
    border-radius: 50%;
    :hover {
      background-color: var(--color-sticky-icons-hover);
      @media screen and (min-width: ${Breakpoint.md}) {
        background-color: transparent;          
      }
    }
  }
`;

const settings = stickyBarSettings;

export const BaseStickBarView = ({
  categoryTree,
  searchView,
  cart,
  CartMiniType,
  wishList,
  WishListMiniType,
  menuContext,
  scrollPosition,
}) => {
  // Remove once CMS Page is Created
  const router = useRouter();
  const isHome = router.asPath === '/';
  // const scrollPosition = useScrollHandler();

  return (
    <StickBarViewWrapper className="hide-on-print" scrollPosition={scrollPosition} isHome={isHome} id="stick_bar_view">
      <StickBarLayout
        className={settings.class_name}
        leftItems={(
          <StickBarLeftSideFeatures
            features={settings.features.left}
            menuMode={settings.features.menu.menu_mode}
            scrollPosition={scrollPosition}
            categoryTree={categoryTree}
            menuContext={menuContext}
          />
        )}
        centerItems={(
          <StickBarCenterViewFeatures
            features={settings.features.center}
            scrollPosition={scrollPosition}
            menuContext={menuContext}
          />
        )}
        rightItems={(
          <StickBarRightSideFeatures
            features={settings.features.right}
            searchView={searchView}
            cart={cart}
            CartMiniType={CartMiniType}
            wishList={wishList}
            WishListMiniType={WishListMiniType}
            menuContext={menuContext}
            categoryTree={categoryTree}
            menuMode={settings.features.menu.menu_mode}
          />
        )}
        secondaryRowCenterItems={(
          <StickBarCenterViewFeatures
            features={settings.features.secondaryCenter}
            searchView={searchView}
          />
        )}
        menuView={(
          <StickBarMenuView
            menuSettings={settings.features.menu}
            categoryTree={categoryTree}
          />
        )}
      />
    </StickBarViewWrapper>
  );
};

BaseStickBarView.propTypes = {
  categoryTree: PropTypes.object,
  searchView: PropTypes.element,
  cart: PropTypes.element,
  CartMiniType: PropTypes.elementType,
  WishListMiniType: PropTypes.elementType,
  wishList: PropTypes.shape(WishListIndicatorView.propTypes),
  menuContext: PropTypes.object,
  scrollPosition: PropTypes.string,
};

export const StickBarView = withDependencySupport(BaseStickBarView, 'StickBarView');
export const StickBarViewWrapper = withDependencySupport(BaseStickBarViewWrapper, 'StickBarViewWrapper');
