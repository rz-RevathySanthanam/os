export const AvailableStatus = {
  YES: 'yes',
  NO: 'no',
  YELLOW: 'yellow',
};

export const StockStatus = {
  SOLD_OUT: 'SOLD_OUT',
  IN_STOCK: 'IN_STOCK',
  AVAILABLE_SOON: 'AVAILABLE_SOON',
  SPECIAL_ORDER: 'SPECIAL_ORDER',
};

export const StoreKind = {
  Web: 'Web',
  Store: 'Store',
  Warehouse: 'Warehouse',
};

export function makeStockStatusV2(product, hasPrice, attributeMeta, storeConifg, isCard) {

  let productRef = { ...product };
  
  // INFO:
  // We use only onWeb and onStore variables to show the stock details in Product Card.
  // So, for Variant Product, If more than one variant attribute,
  // we need to enable button or stock status based on overall variants.
  const { variants } = product;
  let overallResult = {};
  if (
    variants
    && variants.length > 0
    && isCard
    && product.hasMoreVariantAttributes
  ) {
    overallResult = {
      // Since in magento only two status, either OUT_OF_STOCK or IN_STOCK
      stock_status: 'OUT_OF_STOCK'
    }
    const PRODUCT_STOCK_ATTR_PREFIX = 'rz_stock_available_';
    variants.forEach((variant) => {
      const variantProduct = variant.product;
      if (variantProduct.stock_status === 'IN_STOCK') {
        overallResult.stock_status = variantProduct.stock_status;
      }
      Object.keys(variantProduct).forEach((key) => {
        if (key.startsWith(PRODUCT_STOCK_ATTR_PREFIX)) {
          if (variantProduct[key] === 1) {
            overallResult[key] = variantProduct[key];
          }
          if (!overallResult[key] && overallResult[key] !== 1) {
            overallResult[key] = variantProduct[key];
          }
        }
      });
    });
    productRef = {
      ...productRef,
      ...overallResult,
    }
  }

  let { rz_has_ordered_items: hasOrderedItem = 0 } = productRef;
  hasOrderedItem = hasOrderedItem === 1;

  let onStore = AvailableStatus.NO;
  let onWeb = AvailableStatus.NO;
  let status = productRef.stock_status === 'IN_STOCK' ? StockStatus.IN_STOCK : null;
  let storesStatus = [];
  // let showPieceStores = [];

  // Product Status
  if (!hasPrice) {
    status = StockStatus.SPECIAL_ORDER;
  } else if (productRef.stock_status === 'IN_STOCK') {
    status = StockStatus.IN_STOCK;
  } else if (hasOrderedItem) {
    status = StockStatus.AVAILABLE_SOON;
  } else {
    status = StockStatus.SPECIAL_ORDER;
  }

  // Don't show warehouse
  const allStores = storeConifg.websiteConfig?.stores?.filter((x) => x.kind !== StoreKind.Warehouse);
  const webStores = storeConifg.websiteConfig?.stores?.filter((x) => x.kind === StoreKind.Web);
  allStores?.sort((a, b) => ((a.name > b.name) ? 1 : -1));
  allStores?.sort((a, b) => a.sortOrder - b.sortOrder);

  // console.log('allStores', storeConifg.websiteConfig.stores);

  // Prepare Store Status
  const allStoresStatus = allStores?.map((x) => {
    const astore = { ...x, status: AvailableStatus.NO };
    const attr = `rz_stock_available_${astore.stockCode}`;
    let available = productRef[attr] === 1;

    // Its safe to use actual product status for Web Status indicator.
    if (astore.kind === StoreKind.Web) {
      available = productRef.stock_status === 'IN_STOCK';
    }

    if (available) {
      astore.status = AvailableStatus.YES;
    } else if (
      hasOrderedItem
      && (astore.kind === StoreKind.Warehouse
       || astore.kind === StoreKind.Web
      )
    ) {
      astore.status = AvailableStatus.YELLOW;
    }

    return astore;
  });
  const totalWebStores = webStores?.length;
  const totalStores = allStoresStatus?.length - totalWebStores;
  const totalAvailableStores = allStoresStatus?.filter(
    (x) => (x.status === AvailableStatus.YES && x.kind !== StoreKind.Web),
  ).length;

  if (totalStores === totalAvailableStores) {
    onStore = AvailableStatus.YES;
  } else if (totalAvailableStores > 0) {
    onStore = AvailableStatus.YELLOW;
  }

  if (status === StockStatus.IN_STOCK) {
    onWeb = AvailableStatus.YES;
  }
  // else if (totalAvailableStores > 0) {
  //   onWeb = AvailableStatus.YELLOW;
  // }

  storesStatus = allStoresStatus;
  switch (status) {
    case StockStatus.IN_STOCK:
      break;
    case StockStatus.AVAILABLE_SOON:
      if (onStore === AvailableStatus.NO) {
        storesStatus = [
          { status: AvailableStatus.NO, name: 'Væntanleg' },
        ];
      }
      break;
    default:
      if (onStore === AvailableStatus.NO) {
        storesStatus = [
          { status: AvailableStatus.NO, name: 'Sérpöntun' },
        ];
      }
      break;
  }

  // Show Pieces
  // let rzShowPieceStoresList = null;
  // if (attributeMeta && attributeMeta.rzShowPieceStores
  //   && attributeMeta.rzShowPieceStores.customAttributeMetadata) {
  //   rzShowPieceStoresList = attributeMeta
  //     .rzShowPieceStores.customAttributeMetadata.items[0].attribute_options;
  // }
  // if (rzShowPieceStoresList && rzShowPieceStoresList.length && product.rz_show_piece_stores) {
  //   const parts = product.rz_show_piece_stores.split(',').map((x) => parseInt(x, 10));
  //   showPieceStores = rzShowPieceStoresList
  //     .filter((str) => parts.includes(parseInt(str.value, 10)));
  // }

  // const physicalStores = storeConifg.websiteConfig.stores
  //   .filter((x) => x.kind !== StoreKind.Web)
  //   .map((store) => {
  //     const storeName = `rz_stock_available_${store.stockCode}`;
  //     const available = product[storeName] === 1;
  //     const astore = { ...store, storeName, available };
  //     return astore;
  //   });

  return {
    onStore,
    onWeb,
    status,
    allStoresStatus,
    storesStatus,
    // showPieceStores,
    // physicalStores,
  };
}
