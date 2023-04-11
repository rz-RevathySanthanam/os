import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { CartDetailQuery, CustomerCartDetailQuery } from '@/roanuz/store/cart/query';
import { CustomerProfileAndAddressQuery } from '@/roanuz/store/customer/query';
import { UserContext } from '@/roanuz/store/core/context';
import { parseCart } from '@/roanuz/view/cart/model';
import { CheckoutStepTypes as types } from '@/roanuz/view/checkout/v3/model';

export const CheckoutStepTypes = types;
export function isWrongRoute(step) {
  if (!step || !(Object.keys(CheckoutStepTypes).includes(step))) {
    return true;
  }
  return false;
}

export function useProcessCheckout(step, userCartIdFromCookie, userTokenFromCookie) {
  const isNotValidRoute = isWrongRoute(step);

  const userContext = useContext(UserContext);

  const userToken = userContext.token || userTokenFromCookie;
  const cartId = userContext.cartId || userCartIdFromCookie;

  const {
    loading: cartLoading,
    error: cartError,
    data: cartData,
  } = useQuery(userToken ? CustomerCartDetailQuery : CartDetailQuery, {
    variables: { cartId },
    skip: (userContext.loaded && !cartId) || isNotValidRoute,
    fetchPolicy: 'network-only',
  });

  const {
    loading: profileLoading,
    data: profileData,
  } = useQuery(CustomerProfileAndAddressQuery, {
    skip: (userContext.loaded && !cartId) || !userToken || isNotValidRoute,
    fetchPolicy: 'network-only',
  });

  const cartKey = userToken ? 'customerCart' : 'cart';

  let cartParse = null;

  if (cartData && cartData[cartKey] && cartData[cartKey].items && cartData[cartKey].items.length) {
    cartParse = cartData[cartKey];
  }

  if (profileData && userToken && cartParse) {
    cartParse = {
      ...cartParse,
      profileData,
    };
  }

  const { rzAllowInvoice, isB2B } = userContext;
  const cart = cartParse && parseCart(cartParse, isB2B, rzAllowInvoice);

  return {
    cartLoading,
    cartError,
    cart,
    profileLoading: userToken && profileLoading,
    isCartDataEmpty: !cartData || !cartData[cartKey] || !cartData[cartKey].items.length,
  };
}

export function getStep(router) {
  let path = router.asPath;
  if (path.includes('?step=')) {
    path = path.split('?step=');
  }
  return router.query.step || path[1] || CheckoutStepTypes.shipping.id;
}

export function switchToStep(router, step) {
  if (router) {
    router.push({
      pathname: `/checkout/${step}`,
    }, undefined, { shallow: true });
  }
}
