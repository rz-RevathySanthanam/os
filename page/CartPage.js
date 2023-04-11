import React, { useContext } from 'react';
import { SEOHead } from '@/roanuz/document';
import { UserContext, StoreConfigConsumer } from '@/roanuz/store/core/context';
import { translateV2 } from '@/roanuz/lib/utils';
import { useQuery } from '@apollo/client';
import { CartDetailQuery, CustomerCartDetailQuery } from '@/roanuz/store/cart/query';
import { parseCart } from '@/roanuz/view/cart/model';
import { CartPageController } from '@/roanuz/controller/cart/cartPage';
import {
  dependencyRegister,
  // eslint-disable-next-line import/no-unresolved
} from '_WEBSITE_KEY_/dep/cart';

dependencyRegister();

const CartPage = () => {
  const userContext = useContext(UserContext);
  const {
    loading: cartLoading,
    error: cartError,
    data: cartData,
  } = useQuery(userContext.token ? CustomerCartDetailQuery : CartDetailQuery, {
    variables: { cartId: userContext.cartId },
    skip: userContext.loaded && !userContext.cartId,
    fetchPolicy: 'network-only',
  });

  const cartKey = userContext.token ? 'customerCart' : 'cart';

  let cartParse = null;

  if (cartData && cartData[cartKey] && cartData[cartKey].items && cartData[cartKey].items.length) {
    cartParse = cartData[cartKey];
  }

  const { rzAllowInvoice, isB2B } = userContext;
  const cart = cartParse && parseCart(cartParse, isB2B, rzAllowInvoice);

  return (
    <StoreConfigConsumer>
      {() => (
        <div>
          <SEOHead
            title={translateV2('cart.TITLE')}
          />
          <CartPageController
            outOfStockError={userContext.outOfStockError}
            userContext={userContext}
            cartModel={{
              cartLoading,
              cartError,
              cart,
              isCartDataEmpty: !cartData || !cartData[cartKey] || !cartData[cartKey].items.length,
            }}
          />
        </div>
      )}
    </StoreConfigConsumer>
  );
};

CartPage.propTypes = {
};

export default CartPage;
