import { formatMoney, formatDate, formatCurrency } from '@/roanuz/lib/cart';
import { PaymentMethod } from '@/roanuz/view/checkout/payment/model';

import Config from '@/config';

export function parseShippingMethodTax(taxes) {
  const shippingTaxLabel = taxes.find((tax) => {
    if ((tax.label || tax.title) === Config.DefaultShippingTaxLabel) {
      return tax;
    }
    return null;
  });

  const shipingMethodTaxCharge = (shippingTaxLabel ? shippingTaxLabel.amount.value : 0);

  return {
    shipingMethodTaxCharge,
  };
}

export function parseRzShippingAttributes(data) {
  let shippingDescription = null;
  let shippingMethod = null;
  if (data) {
    shippingDescription = data.description;
    shippingMethod = data.title;
  }

  return {
    shippingDescription,
    shippingMethod,
  };
}

export function parseOrder(raw, productUrlSuffix) {
  console.log('Order Raw', raw);
  const [order] = raw.customer.orders.items;
  const { email } = raw.customer;
  const { id, status } = order;
  const orderNumber = order.number;
  const date = order.order_date;
  const [paymentMethod] = order.payment_methods;
  const address = order.shipping_address;
  const billingAddress = order.billing_address;

  let rzShippingAttributes = order.rz_shipping_attributes;

  if (rzShippingAttributes) {
    rzShippingAttributes = JSON.parse(rzShippingAttributes);
  }

  const {
    shippingDescription,
    shippingMethod,
  } = parseRzShippingAttributes(rzShippingAttributes || {});

  const { shipingMethodTaxCharge } = parseShippingMethodTax(order.total.taxes);
  const totalShippingTaxCharge = order.total.total_shipping.value + shipingMethodTaxCharge;
  const shippingRef = { ...order.total.total_shipping };
  shippingRef.value = totalShippingTaxCharge;
  const total = {
    shipping: shippingRef,
    tax: order.total.total_tax,
    total: order.total.grand_total,
    discounts: order.total.discounts,
    subtotal: order.total.subtotal,
    allTaxes: order.total.taxes,
  };
  const customerNotes = order.customer_notes;
  const products = order.items.map((item) => {
    const productLink = `/${item.product_url_key}${productUrlSuffix}`;
    const itemWrap = { value: item.product_sale_price.value * item.quantity_ordered, currency: 'ISK' };
    const priceText = formatMoney(itemWrap);
    const product = {
      name: item.product_name,
      sku: item.product_sku,
      image: null,
      hasImage: false,
      productLink,
      priceText,
    };

    return {
      uid: item.id,
      quantity: item.quantity_ordered,
      options: [...item.selected_options, ...item.entered_options],
      product,
    };
  });

  return {
    id,
    status,
    email,
    orderNumber,
    date,
    paymentMethod,
    address,
    shippingMethod,
    total,
    products,
    shippingDescription,
    billingAddress,
    customerNotes,
    rzShippingAttributes,
  };
}

export function parseOrderFromCart(raw, partialOrder) {
  ///
  // This function is used for showing order from
  // recently placed order as Guest. Since there is no
  // API for fetching Guest user order, using the cart data
  // to build the order object.
  // This should be replaced with parseOrder when Guest user
  // Order API is ready.
  ///

  const { email } = raw;
  const {
    id, status, date, orderNumber,
  } = partialOrder;
  let { paymentMethod } = raw.paymentMethod;
  const paymentMethodName = PaymentMethod[paymentMethod].payment_title;
  paymentMethod = {};
  paymentMethod.name = paymentMethodName;
  paymentMethod.type = raw.paymentMethod.paymentMethod;

  const address = raw.shipping_addresses[0];
  const billingAddress = raw.billing_address;
  const method = raw.shipping_addresses[0].selected_shipping_method;
  // const shippingMethod = method.method_title;
  const { rzShippingAttributes } = raw;

  const {
    shippingDescription,
    shippingMethod,
  } = parseRzShippingAttributes(rzShippingAttributes);

  const { shipingMethodTaxCharge } = parseShippingMethodTax(raw.prices.applied_taxes);
  const totalShippingTaxCharge = method.amount.value + shipingMethodTaxCharge;
  const shippingRef = { ...method.amount };
  shippingRef.value = totalShippingTaxCharge;
  const total = {
    shipping: shippingRef,
    tax: raw.prices.applied_taxes.length
      ? raw.prices.applied_taxes : { value: 0, currency: raw.prices.grand_total.currency },
    total: raw.prices.grand_total,
    discounts: raw.prices.discounts || [],
    subtotal: raw.prices.subtotal_excluding_tax,
    allTaxes: raw.prices.applied_taxes,
  };
  const customerNotes = address.customer_notes;

  const products = raw.items.map((item) => {
    const { product, uid, quantity } = item;
    const { name, sku, thumbnail } = product;
    const image = thumbnail;
    const hasImage = (thumbnail && (thumbnail.disabled !== true));
    const productLink = `/${product.url_key}${product.url_suffix}`;
    const priceText = formatMoney(item.prices.row_total_including_tax);
    const productItem = {
      name,
      sku,
      image,
      hasImage,
      productLink,
      priceText,
    };

    return {
      uid,
      quantity,
      // eslint-disable-next-line no-shadow
      options: item.configurable_options?.map((item) => {
        return (
          {
            label: item.option_label,
            value: item.value_label,
          }
        );
      }),
      product: productItem,
    };
  });

  return {
    id,
    status,
    email,
    orderNumber,
    date: formatDate(date),
    paymentMethod,
    address,
    shippingMethod,
    total,
    products,
    shippingDescription,
    rzShippingAttributes,
    billingAddress,
    customerNotes,
  };
}

export function parseMiniSummaryCard(data) {
  const totalItems = data.total_count;
  const currentPage = data.page_info.current_page;
  const pageSize = data.page_info.page_size;
  const totalPages = data.page_info.total_pages;
  const itemsFrom = ((currentPage - 1) * pageSize) + 1;
  const itemsTo = itemsFrom + data.items.length - 1;

  const orderItems = [];

  data.items.forEach((item) => {
    if (!item) {
      return;
    }

    const { number, status } = item;
    const [paymentMethod] = item.payment_methods;
    const orderItem = {
      number,
      status,
      orderDate: item.order_date ? formatDate(item.order_date).replace('at', ',') : '-',
      totalPrice: formatCurrency(
        item.total.grand_total.value,
        item.total.grand_total.currency,
      ),
      paymentMethod: paymentMethod.name,
      name: item.shipping_address.firstname,
      productsCount: item.items.length,
    };

    orderItems.push(orderItem);
  });

  return {
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    itemsFrom,
    itemsTo,
    items: orderItems,
  };
}
