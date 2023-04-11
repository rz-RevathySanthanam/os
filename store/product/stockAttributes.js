import { checkEligibilityOfQuerySet } from '@/roanuz/lib/utils';

const rzOsDefaultStockAttributes = checkEligibilityOfQuerySet('rzOsDefaultStockAttributes');

let rzStocksSet = '';
if (rzOsDefaultStockAttributes) {
  rzStocksSet = `
    rz_has_ordered_items
    rz_stock_available_web
    rz_stock_available_warehouse
    rz_stock_available_os_egi
    rz_stock_available_os_aku
  `;
}

export const RzStockAttributes = rzStocksSet;
