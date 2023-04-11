import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UpdateCartItemVariantView } from '@/roanuz/view/cart/cartItemUpdate';
import { useRemoveFromCart, useAddToCart } from '@/roanuz/store/cart/cart';
import { DailogView } from '@/roanuz/view/dialog';
import { translateV2 } from '@/roanuz/lib/utils';
import { ProductQuickView } from '@/roanuz/view/product/pageComp/quickView';
import { parseProduct } from '@/roanuz/view/product/modelV2';

export const UpdateCartItemVariantController = ({ product }) => {
  const initState = () => ({
    sku: null,
    quantity: 1,
    selectedOptions: {},
    enteredOptions: {},
    withProduct: null,
    groupedProducts: [],
  });

  const [cartOption, setCartOption] = useState({ ...initState() });

  const [openEditView, setOpenEditView] = useState(false);
  const [storedVariantIndex, setStoreVariantIndex] = useState(null);

  const onCartItemAdded = (info) => {
    if (info && info.addProductsToCart) {
      setOpenEditView(false);
      setCartOption({ ...initState() });
    }
  };

  const [addToCart] = useAddToCart({
    item: cartOption,
    onCompleted: onCartItemAdded,
  });

  const onCartItemRemoved = (info) => {
    if (info && info.removeItemFromCart) {
      addToCart();
    }
  };

  const [removeFromCart] = useRemoveFromCart({
    onCompleted: onCartItemRemoved,
  });

  const {
    selectedCartVariantOptions,
    productInfo,
  } = product.product.choosenVariant;

  const parsedProduct = parseProduct(
    productInfo,
    {
      storeConfig: {},
      isB2B: false,
      configVariationModelRef: Object.keys(selectedCartVariantOptions).length > 0 ? {
        storedVariantIndex,
        setStoreVariantIndex,
        preSelectedCartVariantOptions: selectedCartVariantOptions,
      } : null,
      isCard: false,
    },
  );

  // Storing the below 2 data, else it changes on changing variant - which is not required.
  const [outOfStockOptions] = useState(
    parsedProduct.configProdVariationsInfo.outOfStockConfigOptions || {},
  );
  const [swatchImagesSet] = useState(parsedProduct.configProdVariationsInfo.swatchImages || {});

  const onUpdateCartItemVariant = (values) => {
    setCartOption({
      ...cartOption,
      sku: product.product.sku,
      quantity: product.quantity,
      selectedOptions: values,
    });
    removeFromCart(product.uid);
  };

  const onUpdateCart = () => {
    onUpdateCartItemVariant(parsedProduct.configProdVariationsInfo.selectedCartVariantOptions);
  };

  if (product
    && product.product.choosenVariant
    && product.product.choosenVariant.selectedDetails
    && !Object.keys(product.product.choosenVariant.selectedDetails).length
  ) {
    return null;
  }

  return (
    <>
      <UpdateCartItemVariantView
        onEdit={() => setOpenEditView(true)}
        product={product.product}
      />
      <DailogView
        titleText={translateV2('labelAndTitle.PRODUCT_QUICKVIEW')}
        showClose
        onClose={() => setOpenEditView(false)}
        show={openEditView}
        containerWidth="400px"
      >
        <ProductQuickView
          product={parsedProduct}
          selectedCartVariantOptions={selectedCartVariantOptions}
          onUpdateCart={onUpdateCart}
          configProdVariationsInfo={{
            ...parsedProduct.configProdVariationsInfo,
            swatchImages: swatchImagesSet,
            outOfStockConfigOptions: outOfStockOptions,
          }}
        />
      </DailogView>
    </>
  );
};

UpdateCartItemVariantController.propTypes = {
  product: PropTypes.object.isRequired,
};
