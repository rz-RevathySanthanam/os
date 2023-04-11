import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { lookUpQuery } from '@/roanuz/store/api';
import React, { useEffect, useContext } from 'react';
import { UserContext, StoreConfigContext } from '@/roanuz/store/core/context';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { ProductCardDisplayMode } from '@/roanuz/layout/product/product';
import { SweetSlider } from '@/roanuz/view/sweetSlider/sweetSlider';
import { useWaitForClientSide } from '@/roanuz/hooks/core';
import { ProductGridLayout } from '@/roanuz/layout/product/grid';
import { ProductLoadingView } from '@/roanuz/view/image';
import { LazyLoadingProductCardView } from '@/roanuz/components/floatingPlaceholders/productCard';
import { ProductCard } from './card';
import Config from '../../../config';

function fetchWebSiteCode(config) {
  if (Config.RestrictProductByWebsiteEnable && config.attributeMeta.rzVisibleProdcutOnWebsiteCode) {
    return config.attributeMeta.rzVisibleProdcutOnWebsiteCode;
  }
  return null;
}

function preserveURLOrder(urlKeys, loadedProducts) {
  const sorted = [];
  urlKeys.forEach((url) => {
    const item = loadedProducts.find((x) => x.url_key === url);
    if (item) {
      sorted.push(item);
    }
  });
  return sorted;
}

export const ProductSlider = ({
  products,
  displayMode,
  showShortDesc,
  settings,
}) => {
  const { responsiveSettings } = settings || {};
  let responsive = responsiveSettings ? { responsiveSettings } : {
    xs: { columns: 2, showPageArrows: false, space: '15px' },
    sm: { columns: 3, showPageArrows: false, space: '25px' },
    md: { columns: 4, showPageArrows: false, space: '25px' },
    lg: { columns: 5, showPageArrows: false, space: '25px' },
  };

  if (displayMode === ProductCardDisplayMode.OneByThree) {
    responsive = {
      xs: { columns: 1, showPageArrows: false },
      sm: { columns: 2, showPageArrows: false },
      md: { columns: 3, showPageArrows: false },
      lg: { columns: 3, showPageArrows: false },
    };
  }

  const items = products.map((product) => (
    <ProductCard
      key={product.url_key}
      product={product}
      displayMode={displayMode}
      showShortDesc={showShortDesc}
      className="product-slider-card"
    />
  ));

  return (
    <SweetSlider
      items={items}
      responsive={responsive}
      settings={settings}
      space="25px"
      className="product-slider"
    />
  );
};

ProductSlider.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  showShortDesc: PropTypes.bool,
  displayMode: PropTypes.oneOf(Object.values(ProductCardDisplayMode)),
};

export const ProductSliderWithLoader = ({
  products,
  settings,
  ...options
}) => {
  const urlKeys = products.map((p) => p.url_key);
  const clientReady = useWaitForClientSide();
  const userContext = useContext(UserContext);
  const storeConfigInstance = useContext(StoreConfigContext);
  const webSiteCode = fetchWebSiteCode(storeConfigInstance);

  const { showFloating } = settings || {};

  const {
    loading, error, data: productData, refetch,
  } = useQuery(lookUpQuery('product.queries.productCardList'), {
    variables: { urlKeys, webSiteCode },
    skip: !urlKeys.length,
  });

  useEffect(() => {
    if (clientReady && userContext.token && Config.EnableClientSideRefresh) {
      refetch();
    }
  }, [clientReady, refetch]);

  if (!showFloating) {
    if ((!productData) && loading) return (<LoadingView />);
    if (error) return (<ErrorView error={error} />);
  } else if ((!productData) && loading) return (<ProductLoadingView />);
  // TODO: Some bug on placing in card, so placed here

  if (!productData || !productData.products || !productData.products.items) {
    return null;
  }
  const loadedProducts = preserveURLOrder(urlKeys, productData.products.items);

  return (
    <ProductSlider
      {...options}
      products={loadedProducts}
      settings={settings}
    />
  );
};

ProductSliderWithLoader.propTypes = {
  ...ProductSlider.propTypes,
};

export const ProductGrid = ({
  products,
  autoFit,
  withBorder,
  withFlexScroll,
  displayMode,
  showShortDesc,
  className,
  cardClassName,
  showLazyLoad,
}) => {
  return (
    <ProductGridLayout
      autoFit={autoFit}
      withBorder={withBorder}
      withFlexScroll={withFlexScroll}
      displayMode={displayMode}
      showShortDesc={showShortDesc}
      className={className}
    >
      {products.map((product) => (
        showLazyLoad ? (
          <LazyLoadingProductCardView />
        ) : (
          <ProductCard
            key={product.url_key}
            product={product}
            displayMode={displayMode}
            showShortDesc={showShortDesc}
            className={`product-grid-card ${cardClassName}`}
          />
        )
      ))}
    </ProductGridLayout>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  autoFit: PropTypes.bool,
  withBorder: PropTypes.bool,
  withFlexScroll: PropTypes.bool,
  displayMode: PropTypes.oneOf(Object.values(ProductCardDisplayMode)),
  showShortDesc: PropTypes.bool,
  className: PropTypes.string,
  cardClassName: PropTypes.string,
  showLazyLoad: PropTypes.bool,
};
