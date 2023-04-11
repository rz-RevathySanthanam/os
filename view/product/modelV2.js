import Config from '@/config';
import { checkEligibilityOfQuerySet, translateV2 } from '@/roanuz/lib/utils';
import { parser } from '@/roanuz/store/modelParser';
import { makeStockStatusV2, StockStatus } from './models/stock';
import { LabelKind } from './label';
import { formatCurrency, formatNumber } from '../../lib/cart';
import { prepareGalleryData } from './models/productGallery';
import { getVariantProduct } from './models/variantProduct';

const rzIsManufacturerEnabled = checkEligibilityOfQuerySet('rzIsManufacturerEnabled');

function fixBreadcrumbs(category) {
  const breadcrumbRef = [...category.breadcrumbs];
  const { preferredCategory } = category;
  const preferredCategoryInfo = {
    category_level: 4, // For safe side, no need but.
    category_name: preferredCategory.name,
    category_uid: preferredCategory.uid,
    category_url_key: preferredCategory.url_key,
    category_url_path: preferredCategory.url_path,
  };
  breadcrumbRef.push(preferredCategoryInfo);
  return breadcrumbRef;
}

export function getCategoriesCrumbs(categoriesRef) {
  let category = null;
  let categories = [...(categoriesRef || [])];
  categories = categories.reverse();
  let preferredCategory = null;

  // TODO: Refer HT: const { listOfAllChildCategories } = storeConfig.categoryTreeData;
  categories.forEach((possibleCat) => {
    if (!category) {
      category = { ...possibleCat };
      preferredCategory = category;
      category.breadcrumbs = possibleCat.breadcrumbs || [];
      return;
    }

    if (possibleCat.breadcrumbs
      && possibleCat.breadcrumbs.length >= category.breadcrumbs.length) {
      preferredCategory = possibleCat;
      category.breadcrumbs = possibleCat.breadcrumbs;
    }
  });

  if (preferredCategory) {
    category.preferredCategory = preferredCategory;
    category.breadcrumbs = fixBreadcrumbs(category);
  }
  // TODO
  if (category) {
    category.rootCategoryName = categoriesRef.length > 0 && categoriesRef[0].name;
  }
  return category;
}

export function getLabelDetails(onDiscount, onSale, isPriceFromTier, isNew) {
  let label = null;
  let labelKind = LabelKind.Label;

  if (!label) {
    if (onDiscount || onSale) {
      label = 'Tilboð';
      labelKind = LabelKind.Discount;
      if (isPriceFromTier) {
        label = 'Sérkjör';
        labelKind = LabelKind.B2BPrice;
      }

      if (isNew) {
        label = 'Kynningartilboð';
        labelKind = LabelKind.Sale;
      }

      // if (isRefurbished && isCard) {
      //   label = 'B-vörur';
      //   labelKind = LabelKind.Refurbished;
      // }
    // } else if (isRefurbished) {
    //   label = 'B-vörur';
    //   labelKind = LabelKind.Refurbished;
    } else if (isNew) {
      label = translateV2('labelAndTitle.NEW');
      labelKind = LabelKind.New;
    }
  }
  return { label, labelKind };
}

export function getPriceDetails(product) {
  const maxPrice = product.price_range.maximum_price;
  const minPriceBase = product.price_range.minimum_price;
  const isPriceFromTier = false;

  // For B2B price change Begin
  const hasPriceTiers = product.price_tiers && product.price_tiers.length;
  // TODO
  // if (hasPriceTiers) {
  //   const priceTiers = { ...product.price_tiers[0] };
  //   if (priceTiers.final_price.value <= minPriceBase.final_price.value) {
  //     priceTiers.regular_price = product.price_range.minimum_price.regular_price;
  //     minPriceBase = priceTiers;
  //     isPriceFromTier = isB2B && true;
  //   }
  // }
  // For B2B End
  const minPrice = minPriceBase;

  const hasVariablePrice = (
    (maxPrice.final_price.value !== minPrice.final_price.value)
    && !hasPriceTiers
  );
  const onSale = product.sale === 1;
  const hasDiscountAmount = minPrice.discount.amount_off !== 0
    && (minPrice.discount.amount_off > Config.ShowPercentageForDiscountUnder);
  const hasDiscountPerc = minPrice.discount.percent_off !== 0;
  const onDiscount = hasDiscountAmount || hasDiscountPerc;

  const { value: price, currency } = minPrice.final_price;
  const priceText = formatCurrency(price, currency);
  let regPriceText = null;
  let discountText = null;
  const hasPrice = price > 0.1;

  if (onDiscount) {
    regPriceText = formatCurrency(minPrice.regular_price.value, minPrice.regular_price.currency);
    if (hasDiscountAmount) {
      // Since rounding off for reg and final price, So here taking floor.
      const discountAmontOff = Math.floor(minPrice.discount.amount_off);
      const amount = formatCurrency(discountAmontOff, minPrice.regular_price.currency);
      discountText = `${amount}`;
    } else {
      discountText = `${formatNumber(minPrice.discount.percent_off, true)}%`;
    }
  }

  return {
    minPrice,
    maxPrice,
    isPriceFromTier,
    hasVariablePrice,
    onSale,
    onDiscount,
    hasDiscountAmount,
    hasDiscountPerc,
    priceText,
    regPriceText,
    discountText,
    hasPrice,
    price,
    currency,
  };
}

export function parseProduct(productRef, utils) {
  const {
    configVariationModelRef,
    attributeMeta,
    storeConfig,
    isB2B,
    isCard = true,
  } = utils;

  // eslint-disable-next-line no-underscore-dangle
  const baseProductType = productRef.__typename;
  let childProductSku = null; // It helps for delivery controller fetching.

  let product = { ...productRef };

  const {
    name, sku,
  } = product;
  let productLink = `/${product.url_key}${product.url_suffix}`;
  const productUrlKey = product.url_key;
  const configurableVariants = [...(product.variants || [])];

  let configProdVariationsInfo = { variants: configurableVariants };
  if (configurableVariants && configurableVariants.length > 0 && configVariationModelRef) {
    product = getVariantProduct(
      configurableVariants, product, configVariationModelRef, isCard,
    );
    childProductSku = product.childProductSku;
    configProdVariationsInfo = product.configProdVariationsInfo;
  }

  if (configProdVariationsInfo && configProdVariationsInfo.productLinkWithVariant) {
    productLink = configProdVariationsInfo.productLinkWithVariant;
  }

  const {
    onDiscount,
    onSale,
    isPriceFromTier,
    hasPrice,
  } = getPriceDetails(product);

  const isNew = product.new === 1;
  const shortDesc = product.short_description ? product.short_description.html : null;
  const detailDesc = product.description ? product.description.html : null;
  const upsellProducts = product.upsell_products;
  const crosssellProducts = product.crosssell_products;
  const relatedProducts = product.related_products;

  const configOptions = [...(product.configurable_options || [])]
    .sort((x, y) => x.position - y.position);
  const options = [...(product.options || [])];
  let bundledItemOptions = [];
  // eslint-disable-next-line no-underscore-dangle
  if (product.__typename === 'BundleProduct') {
    bundledItemOptions = [...(product.items || [])];
  }
  let groupedProducts = [];
  // eslint-disable-next-line no-underscore-dangle
  if (product.__typename === 'GroupedProduct') {
    groupedProducts = [...(product.items || [])];
  }
  const available = product.stock_status === 'IN_STOCK';
  const qtyLeft = product.only_x_left_in_stock;

  const hasImage = (product.image && (product.image.disabled !== true));

  const {
    image,
    hasMoreVariantAttributes,
  } = product;

  const manufacturer = rzIsManufacturerEnabled && product.rz_manufacturer;

  // TODO:
  // const isRefurbished = product.rz_b_product === 1;
  // const refurbishedNotes = product.rz_b_product_description;
  // const { rzEnergeyLabels } = storeConfig.attributeMeta;
  // const energyLabel = rzEnergeyLabels[product.rz_energy_label];
  // const energyLabelIcon = createEnergyLabelIconUrl(product.rz_energy_label, rzEnergeyLabels);

  const { label, labelKind } = getLabelDetails(
    onDiscount,
    onSale,
    isPriceFromTier,
    isNew,
  );

  const stockStatus = makeStockStatusV2(product, hasPrice, attributeMeta, storeConfig, isCard);
  // const stockStatus = {
  //   status: 'IN_STOCK',
  // }; // Remove once we integrate stocks.

  const category = getCategoriesCrumbs(product.categories);

  // TODO: Refer HT
  // let categories = [...(product.categories || [])];
  // categories = categories.reverse();

  // let preferredCategory = null;

  // const { listOfAllChildCategories } = storeConfig.categoryTreeData;
  // categories.forEach((possibleCat) => {
  //   if (!category && listOfAllChildCategories.includes(possibleCat.id)) {
  //     category = { ...possibleCat };
  //     preferredCategory = category;
  //     category.breadcrumbs = possibleCat.breadcrumbs || [];
  //     return;
  //   }

  //   if (listOfAllChildCategories.includes(possibleCat.id)) {
  //     if (possibleCat.breadcrumbs
  //       && possibleCat.breadcrumbs.length >= category.breadcrumbs.length) {
  //       preferredCategory = possibleCat;
  //       category.breadcrumbs = possibleCat.breadcrumbs;
  //     }
  //   }
  // });

  // if (preferredCategory) {
  //   category.preferredCategory = preferredCategory;
  //   category.breadcrumbs = fixBreadcrumbs(category);
  // }

  const gallery = prepareGalleryData(product, false);
  const thumbnail = gallery?.thumbnail?.url;

  // TODO:
  // const volume = product.rz_volume ? parseFloat(product.rz_volume) : null;
  // const assembleDays = product.rz_assembly_days ? parseInt(product.rz_assembly_days, 10) : null;

  const productData = {
    // ...product,
    id: product.id,
    isNew,
    // isRefurbished,
    // refurbishedNotes,
    // energyLabel,
    // energyLabelIcon,
    label,
    labelKind,
    name,
    sku,
    ...getPriceDetails(product),
    available,
    stockStatus,
    hasImage,
    productLink,
    category,
    brandId: manufacturer,
    shortDesc,
    detailDesc,
    image,
    gallery,
    upsellProducts,
    crosssellProducts,
    relatedProducts,
    configOptions,
    options,
    groupedProducts,
    bundledItemOptions,
    productUrlKey,
    // volume,
    // assembleDays,
    hasB2BPrice: isPriceFromTier,
    configProdVariationsInfo,
    qtyLeft,
    specifications: product.rzAttributeList,
    thumbnail,
    baseProductType,
    hasMoreVariantAttributes,
    unparsedProductAttrs: { ...product }, // Will be used for client specific attributes to parse.
    childProductSku,
  };

  const parsedProduct = parser(
    'product.basic',
    productData,
    {
      product,
      utils: {
        attributeMeta, storeConfig, isB2B,
      },
    },
  );
  return parsedProduct;
}

export function parseProductDetailV2(
  configVariationModel, product, attributeMeta, productLiveUpdates, storeConfig, isB2B,
) {
  let merged = {
    ...product,
  };

  if (productLiveUpdates) {
    merged = {
      ...product,
      ...productLiveUpdates,
    };
  }

  let reqPathRef = configVariationModel.reqPath;
  let pathParam = null;
  if (reqPathRef.includes(Config.ProductDisplaySettings.FiltersQueryPrefix)) {
    reqPathRef = reqPathRef.split(Config.ProductDisplaySettings.FiltersQueryPrefix);
    pathParam = reqPathRef;
  }

  const configVariationModelRef = {
    ...configVariationModel,
    variantIdInRoute: pathParam && pathParam[1],
  };

  const parsed = parseProduct(merged, {
    configVariationModelRef,
    attributeMeta,
    storeConfig,
    isB2B,
    isCard: false,
  });
  parsed.gallery.galleryFetched = true;

  const displayShops = product.rz_display_shops;
  const returnDays = product.rz_return_days;
  const crossSellAsOption = product.rz_cross_sell_as_option;
  let galleryVideo = product.media_gallery
    .filter((x) => x.video_content && x.video_content.video_url);

  if (parsed.gallery.hasRzGalleryMeta) {
    galleryVideo = parsed.gallery.videos;
  }

  const productData = {
    ...parsed,
    displayShops,
    returnDays,
    crossSellAsOption,
    galleryVideo,
  };
  const parsedProductDetail = parser(
    'product.detail',
    productData,
    {
      // product: merged,
      utils: {
        configVariationModel, attributeMeta, storeConfig, isB2B,
      },
      parentProduct: product,
    },
  );
  return parsedProductDetail;
}

export function buildSeoStructuredData(product) {
  const descText = product.shortDesc.replace(/(<([^>]+)>)/gi, '');
  const images = product.gallery.images.map((item) => item.url);
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: descText,
    sku: product.sku,
    offers: {
      '@type': 'AggregateOffer',
      offerCount: '5',
      lowPrice: '119.99',
      highPrice: '199.99',
      priceCurrency: 'USD',
    },
  };

  if (images) {
    structuredData.image = images;
  }

  if (product.brandId) {
    structuredData.brand = {
      '@type': 'Brand',
      name: `${product.brandId}`.toUpperCase(),
    };
  }

  if (product.hasPrice) {
    let availability = null;
    const itemCondition = 'https://schema.org/NewCondition';
    // Need full url?
    const url = product.productLink;
    const priceCurrency = product.currency;

    switch (product.stockStatus) {
      case StockStatus.IN_STOCK:
        availability = 'https://schema.org/InStock';
        break;
      case StockStatus.SOLD_OUT:
        availability = 'https://schema.org/SoldOut';
        break;
      default:
        availability = 'https://schema.org/BackOrder';
        break;
    }

    const priceProps = {
      url,
      priceCurrency,
      itemCondition,
      availability,
    };

    if (product.minPrice.final_price.value !== product.maxPrice.final_price.value) {
      structuredData.offers = {
        '@type': 'AggregateOffers',
        lowPrice: product.minPrice.final_price.value,
        highPrice: product.maxPrice.final_price.value,
        ...priceProps,
      };
    } else {
      structuredData.offers = {
        '@type': 'Offer',
        price: product.price,
        ...priceProps,
      };
    }
  }

  return structuredData;
}

export function parseProductPriceBasedOnVariation(
  configVariations, product, variantId, configOptions,
) {
  let productRef = {
    ...product,
    configurable_options: configOptions || [],
  };

  const configVariationModel = {
    variantIdInRoute: null,
    storedVariantIndex: variantId,
  };
  productRef = getVariantProduct(configVariations, productRef, configVariationModel);
  return {
    ...productRef,
    ...getPriceDetails(productRef),
    available: productRef.stock_status === 'IN_STOCK',
  };
}
