import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { DisplayBold30, TextMedium16, DisplaySemiBold30 } from '@/roanuz/typopgraphy';
import { SideBarView } from '@/roanuz/view/sideBar';
import { CartPageLayout } from '@/roanuz/layout/cartPage';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { CartSideViewPicker } from '@/roanuz/view/cart/sidePicker';
import { translateV2 } from '@/roanuz/lib/utils';
import { SVGIcon } from '@/roanuz/view/icon';
import { ReactComponent as EmptyCartIcon } from '@/roanuz/view/imgs/EmptyCartIcon.svg';
import Link from 'next/link';
import { CartItemsListView } from './cartItemsList';

export const CartEmptyViewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: ${asRem(30)};
  .empty-cart-icon {
    .rz-svg-icon {
      width: ${asRem(281)};
    }
  }
`;

export const BaseCartEmptyView = () => {
  return (
    <CartEmptyViewWrapper>
      <div className="empty-cart-icon">
        <SVGIcon>
          <EmptyCartIcon />
        </SVGIcon>
      </div>
      <DisplaySemiBold30>{translateV2('cart.EMPTY_MSG')}</DisplaySemiBold30>
      <p>
        Add products into your cart.&nbsp;
        <Link href="/" prefetch={false}>
          <a alt="Links to Home">
            {translateV2('breadcrumb.HOME')}
          </a>
        </Link>
      </p>
    </CartEmptyViewWrapper>
  );
};

BaseCartEmptyView.propTypes = {
};

export const BaseCartModalView = ({
  loading, error, cart, okay,
  outOfStockError,
  menuContext, userContext,
  removeAllProducts,
}) => {
  console.debug(`Left for future use ${removeAllProducts}`);
  return (
    <SideBarView
      show={menuContext.showCartModal}
      onClose={() => menuContext.toggleCartModal(false)}
      animationMode="SlideInRight"
      showClose
      className="sidebar-cart-view"
      containerWidth={asRem(450)}
    >
      <CartPageLayout
        mode="modalView"
        loading={(
          loading && (
            <div>{translateV2('cart.LOADING_MSG')}</div>
          )
        )}
        error={(
          (outOfStockError || error)
            && <TextMedium16>{outOfStockError || error.message}</TextMedium16>
        )}
        emptyView={!okay && (
          <CartEmptyView />
        )}
        title={(
          <DisplayBold30>{translateV2('cart.TITLE')}</DisplayBold30>
        )}
        content={(
          <CartItemsListView
            cart={cart}
          />
        )}
        side={(
          <CartSideViewPicker
            cart={cart}
            userContext={userContext}
          />
        )}
      />
    </SideBarView>
  );
};

BaseCartModalView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  cart: PropTypes.object,
  okay: PropTypes.bool,
  outOfStockError: PropTypes.string,
  menuContext: PropTypes.object,
  userContext: PropTypes.object,
  removeAllProducts: PropTypes.element,
};

export const CartEmptyView = withDependencySupport(BaseCartEmptyView, 'CartEmptyView');
export const CartModalView = withDependencySupport(BaseCartModalView, 'CartModalView');
