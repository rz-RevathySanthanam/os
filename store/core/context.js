import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'cookies';
import { CookieManager } from '@/roanuz/lib/cookie';
import gql from 'graphql-tag';
import Config from '@/config';

export const StoreConfigContext = React.createContext({});
export const StoreConfigProvider = StoreConfigContext.Provider;
export const StoreConfigConsumer = StoreConfigContext.Consumer;

export const CookieConsentState = {
  ACCEPT_ALL: 'ACCEPT_ALL',
  DENY_ALL: 'DENY_ALL',
  UNKNOWN: 'UNKNOWN',
};
export function defaultUserState() {
  return {
    token: null,
    cartId: null,
    wishListId: 0,
    cartVerified: false,
    cartLoading: false,
    cartItemsCount: 0,
    loaded: false,
    customerName: null,
    customerFirstName: null,
    requireCartRefresh: false,
    outOfStockError: null,
    cartInternallyProcessing: false,
    cookieConsent: {
      loaded: false,
      state: CookieConsentState.UNKNOWN,
      version: Config.CookieConsentVersion,
      expires: null,
    },
    rzAllowInvoice: false,
    isB2B: false,
    rzUuid: null,
  };
}
const UserState = defaultUserState();

export const UserContext = React.createContext({
  ...UserState,
});
export const UserConsumer = UserContext.Consumer;

export function getDefaultCookieExpires() {
  const seconds = 365 * 24 * 60 * 60 * 1000;
  const expiresTime = new Date();
  expiresTime.setTime(expiresTime.getTime() + seconds);
  return expiresTime;
}

export const UserProvider = ({ value, children }) => {
  const customCookiePrefix = 'roanuz_custom_';
  const userCookie = (name, cookieValue, expires) => {
    let expiresTime = expires;
    if (!expiresTime) {
      expiresTime = getDefaultCookieExpires();
    }
    const sameSite = 'Lax';
    CookieManager.set(name, cookieValue, { path: '/', expires: expiresTime, sameSite });
  };

  const removeUserCookie = (name) => {
    userCookie(name, '', new Date(0));
  };

  const removeAllUserAdditionalCookies = () => {
    const cookies = CookieManager.getAll();
    const customCs = cookies.filter((cookie) => cookie.startsWith(customCookiePrefix));
    customCs.forEach((cookie) => {
      removeUserCookie(cookie.split('=')[0]);
    });
  };

  const updateCCStore = (state) => {
    const data = JSON.stringify(state);
    window.localStorage.setItem('rzCC', data);
  };

  const logoutUser = () => {
    removeUserCookie('roanuz_user_token');
    removeUserCookie('roanuz_cart_id');
    removeAllUserAdditionalCookies(); // To delete other custom cookies.
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  const [userContext, setUserContext] = useState({
    setLoaded: (loaded) => {
      setUserContext((state) => ({
        ...state,
        loaded,
      }));
    },
    setCartVerified: (cartVerified, cartItemsCount) => {
      setUserContext((state) => ({
        ...state,
        cartVerified,
        cartItemsCount,
      }));
    },
    setCartLoading: (cartLoading) => {
      setUserContext((state) => ({
        ...state,
        cartLoading,
      }));
    },
    setCustomerName: (customerName) => {
      setUserContext((state) => ({
        ...state,
        customerName,
      }));
    },
    setRequireCartRefresh: (requireCartRefresh, cartVerified, cartItemsCount) => {
      setUserContext((state) => ({
        ...state,
        requireCartRefresh,
        cartVerified,
        cartItemsCount,
      }));
    },
    setLoadedProfile: (profile) => {
      const names = [];

      if (profile.firstname) {
        names.push(profile.firstname);
      }

      if (profile.lastname) {
        names.push(profile.lastname);
      }

      const customerName = names.join(' ');
      const customerFirstName = profile.firstname;
      setUserContext((state) => ({
        ...state,
        loaded: true,
        customerName,
        customerFirstName,
        rzAllowInvoice: profile.rz_allow_invoice,
        isB2B: profile.rz_is_b2b,
        rzUuid: profile.rz_uuid,
        customerEntireInfo: JSON.stringify(profile),
      }));
    },
    setUserToken: (token) => {
      userCookie('roanuz_user_token', token);
      setUserContext((state) => ({
        ...state,
        token,
      }));
      userContext.token = token;
    },
    setCartId: (cartId, requireCartRefresh) => {
      userCookie('roanuz_cart_id', cartId);
      setUserContext((state) => ({
        ...state,
        cartId,
        requireCartRefresh: requireCartRefresh ?? false,
      }));
      console.log('Cart ID updated', cartId);
    },
    setOutOfStockError: (outOfStockError) => {
      setUserContext((state) => ({
        ...state,
        outOfStockError,
      }));
    },
    setCartInternallyProcessing: (cartInternallyProcessing) => {
      setUserContext((state) => ({
        ...state,
        cartInternallyProcessing,
      }));
    },
    unsetUserToken: () => {
      removeUserCookie('roanuz_user_token');
      removeAllUserAdditionalCookies();
      setUserContext((state) => ({
        ...state,
        token: null,
      }));
    },
    unsetCartId: () => {
      removeUserCookie('roanuz_cart_id');
      setUserContext((state) => ({
        ...state,
        cartId: null,
      }));
    },
    setContext: (context) => {
      setUserContext((state) => ({
        ...state,
        ...context,
      }));
    },
    cookieConsentInit: (cookieConsent) => {
      setUserContext((state) => ({
        ...state,
        cookieConsent,
      }));
    },
    cookieConsentSetLoaded: () => {
      setUserContext((state) => {
        const cookieConsent = {
          ...state.cookieConsent,
          loaded: true,
        };
        return {
          ...state,
          cookieConsent,
        };
      });
    },
    cookieConsentAcceptAll: () => {
      setUserContext((state) => {
        const cookieConsent = {
          ...state.cookieConsent,
          loaded: true,
          state: CookieConsentState.ACCEPT_ALL,
          version: Config.CookieConsentVersion,
        };

        updateCCStore(cookieConsent);
        return {
          ...state,
          cookieConsent,
        };
      });
    },
    cookieConsentDenyAll: () => {
      setUserContext((state) => {
        const seconds = Config.CookieConsentDenyExpireSeconds;
        const expiresTime = new Date();
        const expires = expiresTime.getTime() + (seconds * 1000);

        const cookieConsent = {
          ...state.cookieConsent,
          loaded: true,
          state: CookieConsentState.DENY_ALL,
          version: Config.CookieConsentVersion,
          expires,
        };

        updateCCStore(cookieConsent);
        return {
          ...state,
          cookieConsent,
        };
      });
    },
    setRoanuzCustomCookie: (name, val) => {
      const cookieName = `${customCookiePrefix}${name}`;
      userCookie(cookieName, val);
    },
    logoutUser,
    ...value,
  });

  return (
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export const useCartVerified = () => {
  const userContext = useContext(UserContext);
  const [cartVerified, setCartVerified] = useState(false);
  useEffect(() => {
    setCartVerified(userContext.loaded && userContext.cartVerified);
  }, [userContext.loaded, userContext.cartVerified]);

  return {
    verified: cartVerified,
    cartId: userContext.cartId,
    cartLoading: userContext.cartLoading,
    token: userContext.token,
    cartItemsCount: userContext.cartItemsCount,
  };
};

export const fetchUserCartData = async (apolloClient) => {
  const userCart = await apolloClient.query({
    query: gql`query CustomerCartId { customerCart { id } }`,
    fetchPolicy: 'network-only',
  });
  console.log('User Data', userCart);
  if (userCart.data) {
    return { cartId: userCart.data.customerCart.id };
  }
  console.log('Error while fetching User Cart', userCart);
  return {};
};

export const shouldRedirectForLogin = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const userToken = cookies.get('roanuz_user_token');
  if (!userToken) {
    return {
      redirect: {
        destination: '/customer/account/login/',
        permanent: false,
      },
    };
  }

  return false;
};

export const shouldRedirectForForgetPassword = async ({ query }) => {
  if (!query.token) {
    return {
      redirect: {
        destination: '/customer/account/reset-password/',
        permanent: false,
      },
    };
  }
  return false;
};

export const shouldRedirectToCheckOutPage = (router, method) => {
  if (router) {
    router.push({
      pathname: '/checkout/payment',
      query: { isRetry: true, method },
    });
  }
};
