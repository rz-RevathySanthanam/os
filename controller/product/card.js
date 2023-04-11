import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { ProductCardView } from '@/roanuz/view/product/product';
import { ProductCardDisplayMode, ProductCardLayoutMode } from '@/roanuz/layout/product/product';
import { parseProduct } from '@/roanuz/view/product/modelV2';
import { StoreConfigContext, UserContext } from '@/roanuz/store/core/context';
import { VariantSelectionController } from '@/roanuz/controller/product/variantSelection';
import Config from '@/config';
import { AddToCartPicker, AddToWishListPicker } from './actionPicker';

export const ProductCard = ({
  product,
  displayMode,
  showShortDesc,
  className,
  cardLayoutType = ProductCardLayoutMode.Default,
}) => {
  const storeConfig = useContext(StoreConfigContext);
  const userContext = useContext(UserContext);
  const { isB2B } = userContext;

  const { ProductDisplaySettings } = Config;
  const [storedVariantIndex, setStoreVariantIndex] = useState(null);

  const parsedProduct = parseProduct(
    product,
    {
      storeConfig,
      isB2B,
      configVariationModelRef: ProductDisplaySettings.ShowVariantsSwitchInCard ? {
        storedVariantIndex,
        setStoreVariantIndex,
      } : null,
    },
  );

  const acButton = (
    <AddToCartPicker options={{}} product={parsedProduct} userContext={userContext} />
  );
  const awButton = (
    <AddToWishListPicker
      product={parsedProduct}
      userContext={userContext}
    />
  );

  // INFO: By Default, ShowVariantsSwitchInCard is false. And display parent product data on card.
  //       Upon Making it true in config. It allows you to display variant selection switches
  //       in the product card and displays the variant product information
  //       in the product card instead of parent data.
  const variantsSwitch = (
    <>
      {parsedProduct.baseProductType === 'ConfigurableProduct'
      && ProductDisplaySettings.ShowVariantsSwitchInCard && (
        <VariantSelectionController
          product={parsedProduct}
          configProdVariationsInfo={parsedProduct.configProdVariationsInfo}
          showOnlyPrimaryVariantAttribute
          ProductDisplaySettings={ProductDisplaySettings}
        />
      )}
    </>
  );

  return (
    <ProductCardView
      product={parsedProduct}
      addToCart={acButton}
      addToWishList={awButton}
      displayMode={displayMode}
      showShortDesc={showShortDesc}
      className={className}
      cardLayoutType={cardLayoutType}
      variantsSwitch={variantsSwitch}
    />
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  displayMode: PropTypes.oneOf(Object.values(ProductCardDisplayMode)),
  showShortDesc: PropTypes.bool,
  className: PropTypes.string,
  cardLayoutType: PropTypes.oneOf(Object.values(ProductCardLayoutMode)),
};
