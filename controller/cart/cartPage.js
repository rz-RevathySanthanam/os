import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CartPageLayout } from '@/roanuz/layout/cartPage';
import { Display48, TextMedium16, Display20 } from '@/roanuz/typopgraphy';
import { CartSideViewPicker } from '@/roanuz/view/cart/sidePicker';
import { CartItemsListView } from '@/roanuz/view/cart/cartItemsList';
import { translateV2 } from '@/roanuz/lib/utils';
import { SnippetsView } from '@/roanuz/view/cart/snippet';
import { SnippetData } from '@/roanuz/view/cart/cart.snippets.data';
import { QuickLoginOrSignupController } from '@/roanuz/controller/customer/quickLoginOrSignup';
import { CheckoutLoadingView } from '@/roanuz/components/floatingPlaceholders/checkoutPage';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { CartEmptyView } from '@/roanuz/view/cart/cartModalView';

export const CartPageController = ({
  cartModel, outOfStockError, userContext,
}) => {
  const [cloneCartModel, setCloneCartModel] = useState(cartModel);
  useEffect(() => {
    // if (!cloneCart && cart) {
    if (cartModel && cartModel.cart) {
      setCloneCartModel(cartModel);
      return;
    }
    if (!cartModel.cartLoading && !cartModel.cart) {
      setCloneCartModel();
    }
  }, [cartModel, cartModel.cart]);

  const buildPageLoadingView = () => {
    const {
      cartLoading,
      cartError,
      isCartDataEmpty,
    } = cartModel;
    if (cartLoading || !userContext.cartVerified) return (<CheckoutLoadingView />);
    if (cartError) return (<PageErrorView error={cartError} />);
    if (isCartDataEmpty) return (<CartEmptyView />);
    return (<CheckoutLoadingView />); // In Worst case;
  };

  if (!cloneCartModel || !cloneCartModel.cart) {
    return buildPageLoadingView();
  }
  return (
    <CartPageLayout
      error={(
        outOfStockError && <TextMedium16>{outOfStockError}</TextMedium16>
      )}
      title={(
        <>
          <Display48 className="cart-page-title">{translateV2('cart.TITLE')}</Display48>
          <Display20 className="cart-page-subtitle">
            {cloneCartModel.cart.total_quantity}
            {' '}
            {translateV2('cart.ITEMS_IN_CART')}
            {' '}
            <span className="separator">|</span>
            {' '}
            <span className="total-price">{cloneCartModel.cart.grandTotalPriceText}</span>
          </Display20>
        </>
      )}
      content={(
        <CartItemsListView
          cart={cloneCartModel.cart}
          quickLoginOrSignup={(
            <QuickLoginOrSignupController
              userContext={userContext}
              contentKey="orders.GUEST_SIGN_UP_STATIC_TEXT_CART"
            />
          )}
        />
      )}
      side={(
        <>
          <CartSideViewPicker
            cart={cloneCartModel.cart}
            userContext={userContext}
          />
          <SnippetsView snippets={SnippetData} />
        </>
      )}
    />
  );
};

CartPageController.propTypes = {
  cartModel: PropTypes.object.isRequired,
  outOfStockError: PropTypes.string,
  userContext: PropTypes.object,
};
