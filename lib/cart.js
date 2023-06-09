import Config from '@/config';
import { CookieManager } from '@/roanuz/lib/cookie';

export function getLocal() {
  if (typeof window === 'undefined') {
    return Config.Locale;
  }

  if (Config.PreferUserLocal === 1 && navigator && navigator.language) {
    return navigator.language;
  }

  return Config.Locale;
}

export function formatCurrency(amount, currency) {
  const lCurrency = currency || Config.Currency;

  // INFO
  // currencyDisplay: 'narrowSymbol' - is not supported in Safari 14.0
  // Best approach is to use polyfills https://formatjs.io/docs/polyfills/intl-numberformat
  // But that will add ~15KB to build size. So its better to go for text replace in this case.
  const formater = new Intl.NumberFormat(
    getLocal(), { style: 'currency', currency: lCurrency },
  );

  let formatted = formater.format(Math.round(amount));

  if (getLocal() === 'is-IS' && formatted.startsWith(lCurrency)) {
    // Temporary Bad logic on chrome 🤧 - Since we know only doing for IS and no decimal.
    // In other browsers its working fine. So only for chrome manually swapping and
    // replacing , to . in price.
    // eslint-disable-next-line no-unused-vars
    const [cur, price] = formatted.split(lCurrency);
    formatted = [price.trimStart(), lCurrency].join(' ').replace(/,/g, '.');
  }

  if (Config.CurrencySymbol) {
    return formatted.replace(lCurrency, Config.CurrencySymbol);
  }

  return formatted;
}

export function formatMoney({ value, currency }) {
  return formatCurrency(value, currency);
}

export function formatDate(date) {
  const formatedDate = new Intl.DateTimeFormat(
    getLocal(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      // hour12: true,
      minute: 'numeric',
    },
  ).format(new Date(date));
  return formatedDate;
}

export function formatNumber(value, roundOf = false) {
  const formater = new Intl.NumberFormat(
    getLocal(),
  );

  if (roundOf) {
    return formater.format(Math.round(value));
  }

  return formater.format(value);
}

export const formatPriceLabel = (label) => {
  const parts = label.split('-').map((x) => parseInt(x, 10));
  return `${formatCurrency(parts[0])} - ${formatCurrency(parts[1])}`;
};

export const formatLabel = (label) => {
  switch (label) {
    case '0':
      return 'Nei';
    case '1':
      return 'Já';
    default:
      return label;
  }
};

export function formatPercentage(value) {
  return `${formatNumber(value * 100)}%`;
}

export class SimpleLocalStorage {
  constructor(key) {
    this.key = key;
  }

  store(cart) {
    const raw = JSON.stringify(cart);
    window.localStorage[this.key] = raw;
  }

  remove() {
    window.localStorage[this.key] = null;
  }

  fetch() {
    const raw = window.localStorage[this.key];
    if (raw) {
      return JSON.parse(raw);
    }
    return null;
  }
}

export const PendingWishListStorage = new SimpleLocalStorage('rzLatestWishList');
export const LocalOrderStorage = new SimpleLocalStorage('rzLatestOrder');
export const LocalCartStorage = new SimpleLocalStorage('rzLatestCart');

const userStorageDataKey = 'rzUserData';

export const fetchUserLocalData = (key, defaultValue) => {
  const data = (window && window.localStorage.getItem(userStorageDataKey));
  let newData = {};
  if (data) {
    newData = JSON.parse(data);
  }
  if (Object.keys(newData).includes(key)) {
    return newData[key];
  }
  return defaultValue;
};

export const beforeOrderCreate = (cart, method, billingInfo) => {
  const cartRef = { ...cart.raw };
  cartRef.paymentMethod = method;
  if (!cartRef.billing_address && billingInfo) {
    cartRef.billing_address = billingInfo;
  }

  const rzShippingAttributes = fetchUserLocalData('rzShippingAttributes', null);
  cartRef.rzShippingAttributes = rzShippingAttributes;

  LocalCartStorage.store(cartRef);
};

export const afterOrderCreate = () => {
  // UserProvider.remoeUserCookie('roanuz_cart_id');
  // CookieManager.set('roanuz_cart_id', '', { path: '/', expires: new Date(0), sameSite: 'Lax' });
};

export const removeUserLocalData = () => {
  if (window) {
    localStorage.removeItem(userStorageDataKey);
  }
};

export const saveUserLocalData = (updates, removeExistingData = false) => {
  if (removeExistingData) {
    removeUserLocalData();
  }
  const data = (window && window.localStorage.getItem(userStorageDataKey));
  let oldData = {};
  if (data) {
    oldData = JSON.parse(data);
  }
  const updatedData = {
    ...oldData,
    ...updates,
  };

  if (window) {
    window.localStorage.setItem(userStorageDataKey, JSON.stringify(updatedData));
  }
};

export const afterSuccessPayment = () => {
  CookieManager.set('roanuz_cart_id', '', { path: '/', expires: new Date(0), sameSite: 'Lax' });
  removeUserLocalData();
};
