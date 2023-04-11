export function parseBool(val, defaultValue) {
  if (val === true) return true;

  const parsed = `${val}`.toLowerCase();
  if (parsed === '1' || parsed === 'true') {
    return true;
  }

  if (defaultValue === undefined) {
    return false;
  }

  return defaultValue;
}

// INFO: The string format should be `"steve;jobs;green;apple"`
// i.e, Item should be seperated with ';'
export function parseList(val, defaultValue) {
  const defaultVal = defaultValue || [];
  if (!val) return defaultVal;

  return val.split(';').map((x) => x.trim());
}

// INFO: The string format should be `"steve:1,jobs:2,green:apple"`
// i.e, Item should be seperated by ',' and pair should be seperated with ':'
export function parseObject(value, defaultValue) {
  const valueRef = value || defaultValue || '';
  const items = valueRef ? valueRef.split(',') : [];
  const obj = {};
  items.forEach((item) => {
    const pair = item.split(':');
    const [key, val] = pair;
    obj[key] = val;
  });
  return obj;
}

export const OmnishopDefaultConfig = {
  BackendPath: process.env.NEXT_PUBLIC_RZ_BACKEND_PATH,
  PrivateBackendPath: process.env.RZ_PRIVATE_BACKEND_PATH,
  BackendThemeId: process.env.NEXT_PUBLIC_RZ_BACKEND_THEME_ID || 3,
  IsProd: process.env.NODE_ENV === 'production',
  PageCacheSeconds: parseInt(process.env.RZ_PAGE_CACHE_SECONDS || 30, 10),
  HomePageCacheSeconds: parseInt(process.env.RZ_HOME_PAGE_CACHE_SECONDS || 5, 10),
  PreConnectUrls: parseList(process.env.NEXT_PUBLIC_RZ_PRECONNECT_URLS),
  SEOEnable: parseBool(process.env.NEXT_PUBLIC_SEO_ENABLE, false),
  StoreViewCode: process.env.NEXT_PUBLIC_RZ_STORE_VIEW_CODE || 'default',
  AssetsPath: process.env.NEXT_PUBLIC_RZ_ASSETS_PATH || '/',

  Currency: process.env.NEXT_PUBLIC_RZ_CURRENCY || 'ISK',
  CurrencySymbol: process.env.NEXT_PUBLIC_RZ_CURRENCY || 'kr',
  Locale: process.env.NEXT_PUBLIC_RZ_LOCALE || 'is-IS',
  PreferUserLocal: process.env.NEXT_PUBLIC_RZ_PREFER_USER_LOCALE || 0,
  DefaultCountryPhoneCode: process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_PHONE_CODE || '+354',

  GTM: process.env.NEXT_PUBLIC_RZ_GTM || '', // GTM-NQ4PD75 - Not sure whose id is this. Add Roanuz's here.
  CookieConsentLink: process.env.NEXT_PUBLIC_RZ_COOKIE_CONSENT_LINK || '/',
  CookieConsentVersion: process.env.NEXT_PUBLIC_RZ_COOKIE_CONSENT_VERSION || '1.0.0',
  CookieConsentDenyExpireSeconds: parseInt(
    process.env.NEXT_PUBLIC_RZ_COOKIE_CONSENT_DENY_EXPIRE || (24 * 60 * 60),
    10,
  ),

  AlgoliaConfiguration: {
    AlgoliaAppKey: process.env.NEXT_PUBLIC_RZ_ALGOLIA_APP,
    AlgoliaSearchKey: process.env.NEXT_PUBLIC_RZ_ALGOLIA_KEY,
    AlgoliaPrefetchSearch: parseInt(process.env.NEXT_PUBLIC_RZ_ALGOLIA_PREFETCH_SEARCH || 0, 10),
    AlgoliaIndexNamePrefix: process.env.NEXT_PUBLIC_RZ_ALGOLIA_INDEX_NAME_PREFIX || 'magento2_default_',
  },

  AppSettings: {
    StickHeaderAtPosition: 50,
  },

  ClientSideReFetchingEnable: parseBool(
    process.env.NEXT_PUBLIC_CLIENT_SIDE_RE_FETCHING_ENABLE, false,
  ),
  RestrictProductByWebsiteEnable: parseBool(
    process.env.NEXT_PUBLIC_RESTRICT_PRODUCT_BY_WEBSITE_ENABLE, false,
  ),

  CategoryPageSettings: {
    EnableAutoContentViewTillLevel: 3,
    filterSettings: {
      showOnlyChildLevel: true,
      closeDefaults: true,
      closePrice: true,
      closeFilters: true,

      showAsSlider: true,
      sliderAnimationMode: 'SlideInRight',
      quickFilterItemsDisplayLimit: ['color', 'size', 'brand', 'price'],
      showSelectedFilterOnFilterGroup: true,
    },
    productSortSettings: {
      // INFO: true for asc and false for desc
      defaultSortDirection: {
        rz_rank: false,
      },

      defaultSortBy: process.env.NEXT_PUBLIC_RZ_CATEGORY_FILTER_DEFAULT_SORT_BY || 'price',

      sortOptions: {
        // INFO
        // fieldName: {
        //   disabled: true,
        //   label: 'Name',
        //   suffix: 'x',
        // },
        position: { disabled: true },
        positionDesc: { disabled: true },

        name: { label: 'Name' },
        nameDesc: { disabled: true },

        new: { label: 'New' },
        newDesc: { disabled: true },

        price: { label: 'Lowest price' },
        priceDesc: { label: 'Highest price' },

        relevance: { label: 'Relevent', id: 'relevance' },
        relevanceDesc: { suffix: '', disabled: true },
      },
      enableRelevanceSortItem: true,
    },
    productsFetchSettings: {
      productsPerPage: 20,
      enableLoadMoreMode: false,
    },
    ExcludeAttributesToDisplay: parseList(process.env.NEXT_PUBLIC_RZ_EXCLUDE_ATTRIBUTES_TO_DISPLAY),
    FiltersQueryPrefix: process.env.NEXT_PUBLIC_RZ_FILTERS_QUERY_TITLE || '/facet=',
    showRootCategoryTreeBlock: false, // To enable the bottom categories in root category page
    showSubCategoriesList: true, // Enable to show the sub-category list on category landing page.
    subCategoriesListInitCount: 5,
  },

  EnquiryFormRecipientsEmail: process.env.NEXT_PUBLIC_RZ_ENQUIRY_FORM_RECIPIENTS_EMAIL || 'contact@roanuz.com',
  MerchantIdNumber: process.env.NEXT_PUBLIC_MERCHANT_ID_NUMBER || 'replace_client_id',
  MerchantAccountNumber: process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT_NUMBER || 'replace_client_acc',
  ProductReturndays: parseInt(process.env.NEXT_PUBLIC_RZ_PRODUCT_RETURN_DAYS || 14, 10),
  MinAmountForLoan: parseInt(process.env.NEXT_PUBLIC_RZ_MIN_AMOUNT_FOR_LOAN || 10000, 10),
  InsuranceProductLink: process.env.NEXT_PUBLIC_RZ_SITE_INSURANCE_PRODUCT_LINK || '/vi-botartrygging/',
  ShowPercentageForDiscountUnder:
    parseInt(process.env.NEXT_PUBLIC_RZ_SHOW_PERCENTAGE_FOR_DISCOUNT_UNDER || 10000, 10),
  WishListPageSize: parseInt(process.env.NEXT_PUBLIC_RZ_WISHLIST_PAGE_SIZE || 20, 10),

  ProductGalleryMetaConfig: {
    ProductImagePath: process.env.NEXT_PUBLIC_RZ_PRODUCT_IMAGE_PATH || '/',
    ProductImageSmallSize: process.env.NEXT_PUBLIC_RZ_PRODUCT_IMAGE_SMALL_SIZE || 'small',
    ProductImageExtension: process.env.NEXT_PUBLIC_RZ_PRODUCT_IMAGE_TYPE || 'jpeg',
    YoutubeVideoUrl: process.env.NEXT_PUBLIC_RZ_PRODUCT_VIDEO_URL || 'https://www.youtube.com/embed/',
    YoutubeVideoPreviewUrl: process.env.NEXT_PUBLIC_RZ_PRODUCT_VIDEO_PREVIEW_URL || 'https://i.ytimg.com/vi/',
    YoutubeVideoPreviewImageSize: process.env.NEXT_PUBLIC_RZ_PRODUCT_VIDEO_PREVIEW_IMAGE_SIZE || 'hqdefault',
  },

  rzSpecificQuerySets: {
    // SOON after backend ssn module deployed, this should be enabled,
    // else some internal issues are raising.
    rzAttributeList: true,
    rzIsSSNEnabled: true,
    rzIsUtilsEnabled: true,
    rzIsCustomerNotesEnabled: true,
    rzIsManufacturerEnabled: true,
    rzIsGalleryMetaEnabled: false,
    rzIsShippingModuleEnabled: true,
    rzOsDefaultStockAttributes: true,
  },

  ProductDisplaySettings: {
    FiltersQueryPrefix: process.env.NEXT_PUBLIC_RZ_PRODUCT_FILTERS_QUERY_TITLE || '.html/',
    VariantAttributeToLink: process.env.NEXT_PUBLIC_RZ_VARIANT_ATTR_AS_LINK || 'color',
    ShowVariantsSwitchInCard: parseBool(
      process.env.NEXT_PUBLIC_RZ_SHOW_VARIANTS_SIWTCH_IN_CARD, false,
    ),
  },

  ThressholdQuantityOfStock:
    parseInt(process.env.NEXT_PUBLIC_RZ_THRESSHOLD_QUANTITY_OF_STOCK || 3, 10),
  SpecificationsToDisplayInProductCard:
    parseList(process.env.NEXT_PUBLIC_RZ_SPECS_TO_DISPLAY_IN_PRODUCT_CARD),
  TermsAndConditionsLink: process.env.NEXT_PUBLIC_RZ_TERMS_AND_COND_LINK || '/vidskiptaskilmalar',

  cart: {
    paymentMethods: {
      checkmo: { title: 'Millifærsla' },
      netgiro: { title: 'Netgíró' },
      saltpaycard: { title: 'Greiða með debit/kredit korti' },
      borgunloanpayment: { title: 'Raðgreiðslur' },
      siminn_api: { title: 'Síminn Pay' },
      purchaseorder: { title: 'Setja í reikning' },
    },
  },

  DefaultShippingTaxLabel: process.env.NEXT_PUBLIC_RZ_DEFAULT_SHIPPING_TAX_LABEL || 'IS-Shipping-A',
  BrandCmsPagePattern: process.env.NEXT_PUBLIC_RZ_BRAND_CMS_PAGE_PATTERN || 'brand-$0',
  UseImagePathForSuggestion:
    parseBool(process.env.NEXT_PUBLIC_USE_IMAGE_PATH_FOR_SUGGESTION, false),
  EnableGetPageFromDatoCMS: parseBool(process.env.NEXT_PUBLIC_ENABLE_GET_PAGE_FROM_DATOCMS, false),

  GetProductsForCategoryUrlKeys:
    parseObject(process.env.NEXT_PUBLIC_RZ_GET_PRODUCTS_FOR_CATEGORY_URL_KEYS),

  CheckoutPageLink: process.env.NEXT_PUBLIC_RZ_CHECKOUT_PAGE_LINK || 'customer',
  SearchBarSettings: {
    enableAutoFocus: true,
    disableOnFocus: true,
    disableOnBlur: true,
    showRecentSearch: true,
    suggestedProducts: ['Watches', 'Gears', 'Bags'],
  },
  GetAnnouncementsFromDatoCMS: parseBool(
    process.env.NEXT_PUBLIC_GET_ANNOUNCEMENTS_FROM_DATOCMS, false,
  ),
  AnnouncementContent: parseList(process.env.NEXT_PUBLIC_RZ_STATIC_ANNOUNCEMENTS),
};
