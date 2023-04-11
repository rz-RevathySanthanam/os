import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { onClient } from '@/roanuz/clientSide';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { CartMiniQuery, CustomerCartMiniQuery } from '@/roanuz/store/cart/query';
import { UserContext } from '@/roanuz/store/core/context';
import { CartMiniView } from '@/roanuz/view/cart/cartMini';
import { CartModalView } from '@/roanuz/view/cart/cartModalView';
import { MenuModelContext } from '@/roanuz/store/core/menuContext';
import { parseCart } from '@/roanuz/view/cart/model';

export const BaseCartMiniController = ({ show, cartConfig }) => {
  const userContext = useContext(UserContext);
  const menuContext = useContext(MenuModelContext);
  const {
    loading,
    error,
    data: cartData,
  } = useQuery(userContext.token ? CustomerCartMiniQuery : CartMiniQuery, {
    variables: { cartId: userContext.cartId },
    ssr: false,
    skip: !userContext.cartId,
    fetchPolicy: 'network-only',
  });
  const cartKey = userContext.token ? 'customerCart' : 'cart';
  const cart = (cartData && cartData[cartKey]) ? parseCart(cartData[cartKey]) : null;
  const okay = (!loading) && (!error) && (cart) && cart.items.length > 0;
  if (cartConfig.modalView) {
    return (
      <CartModalView
        loading={loading && !userContext.cartVerified}
        error={error}
        cart={cart}
        okay={okay}
        isGuestUser={!userContext.token}
        outOfStockError={userContext.outOfStockError}
        menuContext={menuContext}
        userContext={userContext}
      />
    );
  }
  return (
    <CartMiniView
      loading={loading && !userContext.cartVerified}
      error={error}
      cart={cart}
      okay={okay}
      show={show}
      isGuestUser={!userContext.token}
      outOfStockError={userContext.outOfStockError}
    />
  );
};

BaseCartMiniController.propTypes = {
  show: PropTypes.bool,
  cartConfig: PropTypes.object,
};

export const CartMiniController = withDependencySupport(BaseCartMiniController, 'CartMiniController');
export const ClientCartMiniController = onClient(CartMiniController);
