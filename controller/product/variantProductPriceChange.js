import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { parseProductPriceBasedOnVariation } from '@/roanuz/view/product/modelV2';
import {
  VariantProductPriceChange as VariantProductPriceChangeView, PriceAndQuanity,
} from '@/roanuz/view/product/pageComp/variantProductPriceChange';

export const VariantProductPriceChangeController = ({
  product, displayAsButton,
  onSelectedProductOptions, customerListModel,
}) => {
  const {
    configOptions,
    configProdVariationsInfo,
  } = product;

  const { captureCustomerListInfo, updateItemToList, setValidationState } = customerListModel || {};

  const savedOptions = captureCustomerListInfo
    && captureCustomerListInfo.productItems
    && captureCustomerListInfo.productItems[product.sku];
  const [options, setOptions] = useState(
    (savedOptions && savedOptions.config) || {},
  );
  const [qty, setQty] = useState(
    (savedOptions && savedOptions.qty) || 1,
  );

  const [selectedVariantProduct, setSelectedVariantProduct] = useState();

  const updateItemToListHandler = (optionsRef) => {
    const obj = {
      listId: captureCustomerListInfo.listId,
      items: [{
        sku: product.sku,
        qty,
      }],
    };
    if (optionsRef) {
      obj.items[0].config = JSON.stringify(optionsRef);
    }
    updateItemToList(obj);
  };

  const onOptionUpdate = (value) => {
    setOptions((state) => {
      const updates = { ...state };
      updates[value.uid] = value.value;
      return updates;
    });
  };

  useEffect(() => {
    if (
      Object.keys(options).length === 0
      && selectedVariantProduct
      && selectedVariantProduct.configProdVariationsInfo
      && selectedVariantProduct.configProdVariationsInfo.selectedCartVariantOptions
    ) {
      const preSeletedOptions = selectedVariantProduct
        .configProdVariationsInfo.selectedCartVariantOptions;
      const preSeletedOptionsKeys = Object.keys(preSeletedOptions);
      preSeletedOptionsKeys.forEach((config) => {
        onOptionUpdate({ uid: config, value: preSeletedOptions[config] });
      });
    }
    if (selectedVariantProduct && setValidationState) {
      const isAvailable = selectedVariantProduct.available;
      setValidationState((state) => {
        const updates = { ...state };
        if (!isAvailable) {
          updates[product.sku] = isAvailable;
        } else if (Object.keys(updates).includes((product.sku))) {
          delete updates[product.sku];
        }
        return updates;
      });
    }
  }, [selectedVariantProduct]);

  useState(() => {
    if (!(configOptions && configOptions.length > 0)) {
      const isAvailable = product.available;
      if (!isAvailable) {
        setValidationState((state) => {
          const updates = { ...state };
          updates[product.sku] = isAvailable;
          return updates;
        });
      }
    }
  }, [product]);

  useEffect(() => {
    if (!(configOptions && configOptions.length > 0)) {
      // Since for simple product there will be no variations, so comparing based on QTY.
      if (
        JSON.stringify(qty) !== JSON.stringify(savedOptions && savedOptions.qty)
        && updateItemToList
      ) {
        updateItemToListHandler();
      }
      return;
    }

    if (onSelectedProductOptions) {
      onSelectedProductOptions(options, product.sku, qty);
    }

    const optionsValues = Object.values(options);
    if (
      optionsValues && optionsValues.length > 0
      && (JSON.stringify(options) !== JSON.stringify(savedOptions && savedOptions.config))
      && updateItemToList
    ) {
      updateItemToListHandler(options);
    }

    let variationIndex = null;
    configProdVariationsInfo.variants.forEach((variation, vIndex) => {
      const good = [];
      const { attributes } = variation;
      attributes.forEach((attribute) => {
        const attributeId = attribute.uid;
        if (optionsValues.includes(attributeId)) {
          good.push(attributeId);
        }
        if (good.length === attributes.length) {
          variationIndex = vIndex;
        }
      });
    });
    // console.log('Product-VariationIndex', variationIndex);
    setSelectedVariantProduct(
      parseProductPriceBasedOnVariation(
        configProdVariationsInfo.variants, product, variationIndex, configOptions,
      ),
    );
  }, [options]);

  useEffect(() => {
    const isVaries = savedOptions && savedOptions.qty
      && JSON.stringify(qty) !== JSON.stringify(savedOptions && savedOptions.qty)
      && updateItemToList;
    const timeOutId = setTimeout(
      () => isVaries && updateItemToListHandler(), 1000,
    );

    if (onSelectedProductOptions) {
      onSelectedProductOptions(null, product.sku, qty);
    }
    return () => clearTimeout(timeOutId);
  }, [qty]);

  if (!(configOptions && configOptions.length > 0)) {
    return (
      <PriceAndQuanity
        product={product}
        quantityModel={{
          qty,
          setQty,
        }}
      />
    );
  }

  return (
    <VariantProductPriceChangeView
      product={product}
      displayAsButton={displayAsButton}
      onOptionUpdate={onOptionUpdate}
      options={options}
      selectedVariantProduct={selectedVariantProduct}
      quantityModel={{
        qty,
        setQty,
      }}
    />
  );
};

VariantProductPriceChangeController.propTypes = {
  product: PropTypes.object,
  displayAsButton: PropTypes.bool,
  onSelectedProductOptions: PropTypes.func,
  customerListModel: PropTypes.object,
};
