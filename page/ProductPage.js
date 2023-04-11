import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Head from 'next/head';

import { StoreConfigConsumer, StoreConfigContext } from '@/roanuz/store/core/context';
import { lookUpQuery } from '@/roanuz/store/api';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { parseProductDetailV2 } from '@/roanuz/view/product/modelV2';
import { ProductPageV2 as ProductPageController } from '@/roanuz/controller/product/page';
import { SEOHead } from '@/roanuz/document';
import {
  dependencyRegister,
// eslint-disable-next-line import/no-unresolved
} from '_WEBSITE_KEY_/dep/product';
import Config from '@/config';
import { useBrandList } from '@/roanuz/view/brand/model';
import ContainerWidgets from '@/roanuz/widgets/ContainerWidgets';
import { filterProductWidgets } from '@/roanuz/store/layout/widget';
import { LayoutContainer } from '@/roanuz/store/layout/layout';
import { translateV2 } from '../lib/utils';

dependencyRegister();

const ProductPageV2 = ({
  reqPath,
  urlMeta, storeConfig, attributeMeta, sku, widgets, userContext,
}) => {
  const urlParts = urlMeta && urlMeta.relative_url.split('/');
  const urlKey = urlParts && urlParts[urlParts.length - 1].replace(storeConfig.product_url_suffix, '');

  let webSiteCode = null;
  if (Config.RestrictProductByWebsite && attributeMeta.rzVisibleProdcutOnWebsiteCode) {
    webSiteCode = attributeMeta.rzVisibleProdcutOnWebsiteCode;
  }
  const {
    loading: pageLoading,
    error: pageError,
    data: pageaData,
  } = useQuery(
    lookUpQuery('product.queries.productDetail'), {
      variables: { ...(urlKey ? { urlKey } : { sku }), webSiteCode },
    },
  );

  const {
    loading: brandsLoading,
    error: brandsError,
    brands,
  } = useBrandList();

  const storeConfigContext = useContext(StoreConfigContext);

  const [storedVariantIndex, setStoreVariantIndex] = useState(null);

  // TODO: B@B in Product Detail
  // const userContext = useContext(UserContext);
  // const { isB2B } = userContext;
  // const clientReady = useWaitForClientSide();
  // const {
  //   data: productLiveUpdatesData,
  // } = useQuery(ProductLiveUpdatesQuery, {
  //   variables: { ...(urlKey ? { urlKey } : { sku }) },
  //   fetchPolicy: 'no-cache',
  //   skip: !clientReady,
  // });

  if ((!pageaData) && pageLoading) return (<PageLoadingView message={translateV2('loadingMsg.PRODUCT_PAGE')} />);
  if ((!pageaData) && pageError) return (<PageErrorView error={pageError} />);

  // if ((!brands) && brandsLoading) return (<PageLoadingView message={translateV2('loadingMsg.PRODUCT_PAGE')} />);
  // if ((!brands) && brandsError) return (<PageErrorView error={brandsError} />);
  if (pageaData
    && (!pageaData.products || !pageaData.products.items || !pageaData.products.items.length)) {
    return (
      <PageErrorView
        error={{ message: translateV2('loadingMsg.PRODUCTS_NOT_FOUND') }}
      />
    );
  }

  const product = pageaData.products.items[0];
  // const productLiveUpdates = productLiveUpdatesData && productLiveUpdatesData.products.items[0];

  // let isVariantProduct = false;
  // if (product && product.variants && Config.VariantsSelectionViewEnable) {
  //   isVariantProduct = true;
  // }

  // const parsedProduct = parseProductDetail(
  //   { isVariantProduct, variantIndex }, product, attributeMeta, {}, storeConfigContext,
  // );

  // const [variantIndex, setVariantIndex] = useState(null);

  const configVariationModel = {
    reqPath,
    storedVariantIndex,
    setStoreVariantIndex,
  };

  const parsedProduct = parseProductDetailV2(
    configVariationModel, product, attributeMeta, {}, storeConfigContext,
  );

  const pageWidgets = filterProductWidgets({ widgets, product });
  const breadcrumbs = product.category ? product.category.breadcrumbs : [];
  let pageTitle = product.meta_title;

  if (!pageTitle) {
    pageTitle = parsedProduct.name;
    if (breadcrumbs && breadcrumbs.length) {
      const seperator = ` ${storeConfig.title_separator} `;
      const names = breadcrumbs.map((x) => x.category_name);
      pageTitle = `${pageTitle}${seperator}${names.join(seperator)}`;
    }
  }

  const matchedBrands = brands?.filter((x) => x.id === `${parsedProduct.brandId}`);
  let productBrand = null;
  if (matchedBrands && matchedBrands.length > 0) {
    [productBrand] = matchedBrands;
  }

  const stockMeta = null;
  // switch (parsedProduct.stockStatus.status) {
  //   case 'IN_STOCK':
  //     stockMeta = 'in stock';
  //     break;
  //   case 'SPECIAL_ORDER':
  //     stockMeta = 'available for order';
  //     break;
  //   case 'AVAILABLE_SOON':
  //     stockMeta = 'out of stock';
  //     break;
  //   default:
  //     break;
  // }

  return (
    <StoreConfigConsumer>
      {() => (
        <div>
          <SEOHead
            title={pageTitle}
            desc={product.meta_description || parsedProduct.name}
            keywords={product.meta_keyword}
          />
          <Head>
            {/* <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={
                { __html: JSON.stringify(buildSeoStructuredData(parsedProduct)) }
              }
              key="jsonld"
            /> */}
            <meta
              property="og:type"
              content="og:product"
              key="og_type"
            />
            {/* <meta
              property="og:image"
              content={parsedProduct.gallery.image.url}
              key="og_image"
            /> */}
            <meta
              property="product:price:amount"
              content={`${parsedProduct.price}`}
            />
            <meta
              property="product:price:currency"
              content={parsedProduct.currency}
            />
            <meta
              property="product:availability"
              content={stockMeta}
            />
            {productBrand && productBrand.name && (
              <meta
                property="product:brand"
                content={productBrand.name}
              />
            )}
            {/* This is a temporary product condition. Client wants this as 'new' always for now */}
            <meta
              property="product:condition"
              content="new"
            />
          </Head>
          <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentTop} />
          <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.Content} />
          <ProductPageController
            product={parsedProduct}
            productBrand={productBrand}
            userContext={userContext}
          />
          <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentBottom} />
        </div>
      )}
    </StoreConfigConsumer>
  );
};

ProductPageV2.propTypes = {
  reqPath: PropTypes.string.isRequired,
  sku: PropTypes.string,
  urlMeta: PropTypes.object,
  widgets: PropTypes.arrayOf(PropTypes.object),
  storeConfig: PropTypes.object.isRequired,
  attributeMeta: PropTypes.object,
  userContext: PropTypes.object,
};

export default ProductPageV2;
