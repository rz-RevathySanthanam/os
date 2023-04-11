import { useCustomerNewSessoinExtend } from '@/roanuz/hooks/customer';
import { addressFormFields, addressFormInitValModify } from '@/roanuz/view/customer/formModel';
import { getVariantPointer } from '@/roanuz/view/product/models/variantPointer';
import { translateV2, updateValueToPath, valueFromPath } from '../lib/utils';

export function baseCrumb() {
  return [{
    text: `${translateV2('breadcrumb.HOME')}`,
    href: '/',
  }];
}

export const cartIndicatorView = (data) => {
  return `${data ? data.total_quantity : 0}`;
};

export const getPageType = (urlMetaType, reqPath) => {
  let pageType = urlMetaType;
  if (!pageType) {
    if (reqPath.startsWith('/cart')) {
      pageType = 'CART';
    }
    if (reqPath.startsWith('/contact-us')) {
      pageType = 'CONTACT';
    }
  }
  return pageType;
};

export const getPageView = (pageType, defaultPageView) => {
  return defaultPageView;
};

export const getCustomisedView = (article) => {
  console.log('Unhandled Model', article.specifiedModelType);
  return null;
};

export const MODEL = {
  product: {
    basic: null,
    detail: null,
    getVariantPointer,
  },
  any: {
    brandBreadCrumbSet: baseCrumb,
    categoryBreadCrumbSet: baseCrumb,
    brandListBreadCrumbSet: baseCrumb,
    cartIndicatorViewStyle: cartIndicatorView,
    getPageType,
    getPageView,
    getCustomisedView,
  },
  customer: {
    useCustomerNewSessoinExtend,
    addressFormInitValModify,
    addressFormFields,
  },
};

export function modifyModel(name, apiEndpoint) {
  updateValueToPath(MODEL, name, apiEndpoint);
}

export function updateModelParser(name) {
  return valueFromPath(name, MODEL);
}

export function parser(name, parsed, raw) {
  const localParser = updateModelParser(name);
  if (localParser) {
    return localParser(parsed, raw);
  }
  return parsed;
}
