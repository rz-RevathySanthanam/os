import Config from '@/config';
import { buildMethodValue } from '@/roanuz/view/checkout/model';
import { ShippmentMethodTypes } from '@/roanuz/view/checkout/v3/model';
import { translateV2 } from '@/roanuz/lib/utils';
import { frameConfigProductUrlPath } from '@/roanuz/view/product/models/variantProduct';
import { formatCurrency, formatNumber, saveUserLocalData } from '../../lib/cart';
import { prepareGalleryData } from '../product/models/productGallery';
import { parseShippingMethodTax } from '../order/model';

function parseCustomData(customData, attribute) {
  if (!customData) { return null; }
  const data = JSON.parse(customData);
  if (!data) {
    return null;
  }
  return data[attribute] || null;
}

export function parseCart(cart, isB2B) {
  // In some cases - an invalid product is in cart
  // which causes prices to be null
  const prices = (cart.prices) ? cart.prices : {
    grand_total: { value: 0, currency: Config.Currency },
  };
  const hasError = cart.prices != null;
  const grandTotal = prices.grand_total;
  const grandTotalPriceText = formatCurrency(grandTotal.value, grandTotal.currency);
  const productItems = [];

  let shippingAddress = null;
  let billingAddress = null;
  let defaultAddressId = null;
  let shippingMethod = null;
  let shippingCharge = null;
  let shippingChargeText = null;
  let shipingMethodTaxCharge = null;
  let availableShippingMethods = [];
  let customerNotes = null;
  let paymentMethod = null;
  let availablePaymentMethods = [];
  let discounts = [];
  let appliedCoupons = [];
  let appliedTaxes = [];

  const segregatedShippingMethods = {
    [ShippmentMethodTypes.Shipping]: [],
    [ShippmentMethodTypes.Collection]: [],
  };

  if (cart.shipping_addresses && cart.shipping_addresses.length > 0) {
    [shippingAddress] = cart.shipping_addresses;
    defaultAddressId = shippingAddress.rz_address_id;
    if (shippingAddress.selected_shipping_method) {
      shippingMethod = {
        code: shippingAddress.selected_shipping_method.method_code,
        title: shippingAddress.selected_shipping_method.method_title,
        value: buildMethodValue(shippingAddress.selected_shipping_method),
      };

      shippingCharge = shippingAddress.selected_shipping_method.amount;
      shipingMethodTaxCharge = parseShippingMethodTax(cart.prices.applied_taxes)
        .shipingMethodTaxCharge;
      const totalShippingTaxCharge = shippingCharge.value + shipingMethodTaxCharge;
      shippingChargeText = formatCurrency(totalShippingTaxCharge, shippingCharge.currency);
    }

    if (shippingAddress.available_shipping_methods
      && shippingAddress.available_shipping_methods.length > 0) {
      shippingAddress.available_shipping_methods.forEach((method) => {
        const getShippingType = parseCustomData(method.rz_shipping_attributes, 'shippingType');

        if (!getShippingType) {
          segregatedShippingMethods[ShippmentMethodTypes.Shipping].push(buildMethodValue(method));
          segregatedShippingMethods[ShippmentMethodTypes.Collection].push(buildMethodValue(method));
        } else {
          segregatedShippingMethods[getShippingType].push(buildMethodValue(method));
        }

        const methodObj = {
          amount: method.amount,
          priceText: formatCurrency(method.amount.value, method.amount.currency),
          method: {
            uid: buildMethodValue(method),
            value: buildMethodValue(method),
            code: method.method_code,
            carrierCode: method.carrier_code,
            title: method.method_title,
            // Here rz_shipping_attributes is the data which comes from Ferrari <- Datocms
            deliveryTimeFrom: parseCustomData(method.rz_shipping_attributes, 'deliveryTimeFrom'),
            deliveryTimeTo: parseCustomData(method.rz_shipping_attributes, 'deliveryTimeTo'),
            description: parseCustomData(method.rz_shipping_attributes, 'description'),
            rzShippingCustomData:
              method.rz_shipping_attributes && JSON.parse(method.rz_shipping_attributes),
            shippingType: getShippingType,
          },
        };
        availableShippingMethods.push(methodObj);
      });

      const matchingPrefix = 'B2B_';

      if (isB2B) {
        const b2bMethods = availableShippingMethods
          .filter((x) => x.method.code.startsWith(matchingPrefix))
          .map((x) => x.method.code.substring(matchingPrefix.length));

        availableShippingMethods = availableShippingMethods
          .filter((x) => b2bMethods.indexOf(x.method.code) < 0);
      } else {
        availableShippingMethods = availableShippingMethods
          .filter((x) => !x.method.code.startsWith(matchingPrefix));
      }

      availableShippingMethods.sort((x, y) => x.amount.value - y.amount.value);

      // Remove duplicate
      const filteredShippingMethods = [];
      const matchedCodes = {};
      availableShippingMethods.forEach((method) => {
        if (matchedCodes[method.method.code]) {
          return;
        }
        matchedCodes[method.method.code] = true;
        filteredShippingMethods.push(method);
      });

      availableShippingMethods = filteredShippingMethods;
      if (shippingAddress.customer_notes) {
        customerNotes = shippingAddress.customer_notes;
      }
    }

    if (shippingAddress.rz_shipping_attributes) {
      const rzShippingAttributes = JSON.parse(shippingAddress.rz_shipping_attributes) || {};
      const updates = {
        rzShippingAttributes,
      };
      saveUserLocalData(updates);
    }
  }
  if (cart.billing_address) {
    billingAddress = cart.billing_address;
  }

  if (cart.available_payment_methods && cart.available_payment_methods.length > 0) {
    availablePaymentMethods = cart.available_payment_methods;

    // if (!allowInvoice) {
    //   availablePaymentMethods = availablePaymentMethods
    //     .filter((x) => !Config.RestrictedPaymentMethods.includes(x.code));
    // }

    if (Config.RestrictedPaymentMethods) {
      availablePaymentMethods = availablePaymentMethods
        .filter((x) => !Config.RestrictedPaymentMethods.includes(x.code));
    }
  }

  if (cart.selected_payment_method && cart.selected_payment_method.code) {
    paymentMethod = cart.selected_payment_method;
  }

  if (prices.discounts && prices.discounts.length > 0) {
    const filtered = prices.discounts.filter((x) => x.amount.value > 0);
    discounts = filtered.map((item, i) => ({
      ...item,
      uid: i,
      priceText: formatCurrency(item.amount.value, item.amount.currency),
    }));
  }

  if (cart.applied_coupons) {
    appliedCoupons = cart.applied_coupons.map((x, i) => ({ code: x.code, uid: i }));
  }

  if (prices.applied_taxes && prices.applied_taxes.length > 0) {
    appliedTaxes = prices.applied_taxes;
  }

  cart.items.forEach((item) => {
    if (!item) {
      // In some cases - an invalid product is in cart
      // which causes item to be null
      return;
    }

    const { product, uid, quantity } = item;
    const {
      name,
      sku,
      thumbnail,
      __typename,
    } = product;

    let image = thumbnail;
    let productLink = `/${product.url_key}${product.url_suffix}`;

    let choosenVariant = {
      selectedCartVariantOptions: {},
      selectedDetails: {},
      productInfo: {
        ...product,
      },
    };
    if (item.configured_variant) { // It means its a config product.
      image = item.configured_variant.thumbnail;
      item.configurable_options?.forEach((variant) => {
        choosenVariant.selectedDetails[translateV2(`filter.${variant.option_label}`, variant.option_label)] = variant.value_label;
        choosenVariant.selectedCartVariantOptions[variant.configurable_product_option_uid] = variant.configurable_product_option_value_uid;
        // INFO: Not getting attribute code to compare, so conevrting label to lower case.
        if (variant.option_label && variant.option_label.toLowerCase() === Config.ProductDisplaySettings.VariantAttributeToLink) {
          productLink = frameConfigProductUrlPath(variant.configurable_product_option_value_uid, productLink);
        }
      });
    }
    const hasImage = (thumbnail && (thumbnail.disabled !== true));
    const price = item.prices.row_total_including_tax;
    const priceText = formatCurrency(price.value, price.currency);
    const quantityText = `${translateV2('orders.QUANTITY')}: ${formatNumber(quantity)}`;
    const minPrice = product.price_range.minimum_price;

    const hasDiscountAmount = minPrice.discount.amount_off !== 0;
    const hasDiscountPerc = minPrice.discount.percent_off !== 0;

    const onDiscount = hasDiscountAmount || hasDiscountPerc;

    let regPriceText = null;
    if (onDiscount) {
      regPriceText = formatCurrency(
        minPrice.regular_price.value, minPrice.regular_price.currency,
      );
    }
    // if (quantity > 1) {
    //   priceText = `${formatNumber(quantity)} x ${priceText}`;
    // }
    const productItem = {
      name,
      sku,
      image,
      hasImage,
      productLink,
      priceText,
      quantityText,
      productType: __typename,
      rz_gallery_meta: item.configured_variant
        ? item.configured_variant.rz_gallery_meta : product.rz_gallery_meta,
      regPriceText,
      choosenVariant,
    };
    productItem.gallery = prepareGalleryData(productItem);

    productItems.push({
      uid,
      quantity,
      product: productItem,
    });
  });

  return {
    ...cart,
    hasError,
    grandTotalPriceText,
    shippingAddress,
    shippingCharge,
    shippingChargeText,
    defaultAddressId,
    shippingMethod,
    availableShippingMethods,
    items: productItems,
    raw: cart,
    billingAddress,
    customerNotes,
    profileData: (cart.profileData && cart.profileData.customer) || {},
    availablePaymentMethods,
    paymentMethod,
    shipingMethodTaxCharge,
    discounts,
    appliedCoupons,
    appliedTaxes,
    segregatedShippingMethods,
  };
}
