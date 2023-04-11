import BorgunImage from '@/roanuz/view/imgs/PaymentMethodBorgun.png';
import NetgiroImage from '@/roanuz/view/imgs/PaymentMethodNetgiro.png';
import InvoiceImage from '@/roanuz/view/imgs/PaymentMethodInvoice.png';
import SiminnImage from '@/roanuz/view/imgs/PaymentMethodSimminLett.png';
import BorgunLoanImage from '@/roanuz/view/imgs/PaymentMethodBorgunLoan.png';
import PaymentMethodMillifaerslaImage from '@/roanuz/view/imgs/PaymentMethodMillifaersla.png';
// import { applySSNMask } from '@/roanuz/lib/utils';

export const PaymentMethod = {
  saltpaycard: {
    isBorgunPay: true,
    image: BorgunImage,
    uid: 'borgun',
    payment_title: 'Greiða með korti',
  },
  netgiro: {
    isNetgiro: true,
    image: NetgiroImage,
    uid: 'netgiro',
    payment_title: 'Netgíró',
  },
  checkmo: {
    isInvoice: true,
    image: PaymentMethodMillifaerslaImage,
    uid: 'invoice',
    payment_title: 'Millifærsla',
  },
  siminn_api: {
    isSiminn: true,
    image: SiminnImage,
    uid: 'siminn',
    payment_title: 'Siminn',
  },
  borgunloanpayment: {
    isBorgunLoan: true,
    image: BorgunLoanImage,
    uid: 'borgunLoan',
    payment_title: 'Raðgreiðslur Borgunar',
  },
  // banktransfer: {
  //   isBankTransfer: true,
  //   image: InvoiceImage,
  //   uid: 'banktransfer',
  //   payment_title: 'Setja í reikning',
  // },
  purchaseorder: {
    isPurchaseOrder: true,
    image: InvoiceImage,
    uid: 'purchaseorder',
    payment_title: 'Setja í reikning',
  },
};

function guidGenerator() {
  const S4 = () => {
    // eslint-disable-next-line no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
}

export function buildCreateOrderInput(cart, values) {
  return {
    payment: {
      cart_id: cart.id,
      payment_method: { code: values.paymentMethod, purchase_order_number: guidGenerator() },
    },
    order: {
      cart_id: cart.id,
    },
  };
}

export function buildSuccessUrl(baseUrl, method) {
  let resolvedUrl = baseUrl;
  if (!resolvedUrl) {
    const parts = window.location.href.split('://');
    const host = parts[1].split('/')[0];
    resolvedUrl = `${parts[0]}://${host}`;
  }
  return `${resolvedUrl}/customer/payment-response/${method}/`;
}
