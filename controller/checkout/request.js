import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { CartDetailQuery, CustomerCartDetailQuery } from '@/roanuz/store/cart/query';
import { CustomerProfileAndAddressQuery } from '@/roanuz/store/customer/query';
import { UserContext } from '@/roanuz/store/core/context';
import { parseCart } from '@/roanuz/view/cart/model';

export function useFetchCartDetail(userCartId, userToken) {
  const userContext = useContext(UserContext);

  const uToken = userContext.token || userToken;
  const cId = userContext.cartId || userCartId;
  const {
    loading: cartLoading,
    error: cartError,
    data: cartData,
  } = useQuery(uToken ? CustomerCartDetailQuery : CartDetailQuery, {
    variables: { cartId: cId },
    skip: userContext.loaded && !cId,
    fetchPolicy: 'network-only',
  });

  const {
    loading: profileLoading,
    data: profileData,
  } = useQuery(CustomerProfileAndAddressQuery, {
    skip: (userContext.loaded && !cId) || !uToken,
    fetchPolicy: 'network-only',
  });

  const cartKey = uToken ? 'customerCart' : 'cart';

  let cartParse = null;

  if (cartData && cartData[cartKey] && cartData[cartKey].items && cartData[cartKey].items.length) {
    cartParse = cartData[cartKey];
  }

  if (profileData && uToken && cartParse) {
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
    profileLoading: uToken && profileLoading,
    isCartDataEmpty: !cartData || !cartData[cartKey] || !cartData[cartKey].items.length,
  };
}
