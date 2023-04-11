import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VariantSelectionView } from '@/roanuz/view/product/pageComp/variantSelection';
import { useRouter } from 'next/router';
import { parser } from '@/roanuz/store/modelParser';

export const VariantSelectionController = ({
  product,
  configProdVariationsInfo,
  updateRouteVariation,
  ProductDisplaySettings,
  showOnlyPrimaryVariantAttribute,
  disableOutOfStockOptions = false,
  disableSelectionOnHover = false,
}) => {
  const {
    selectedCartVariantOptions,
    setStoreVariantIndex,
    variants,
    outOfStockConfigOptions,
    swatchImages,
    variantIdInRoute,
  } = configProdVariationsInfo;

  const router = useRouter();

  const [options, setOptions] = useState(selectedCartVariantOptions || {});

  // Storing the below 2 data, else it changes on changing variant - which is not required.
  const [outOfStockOptions] = useState(outOfStockConfigOptions || {});
  const [swatchImagesSet] = useState(swatchImages || {});

  const onOptionUpdate = (value, attributeCode) => {
    if (ProductDisplaySettings
      && updateRouteVariation && attributeCode === ProductDisplaySettings.VariantAttributeToLink) {
      updateRouteVariation(value.value);
    }
    setOptions((state) => {
      const updates = { ...state };
      updates[value.uid] = value.value;
      return updates;
    });
  };

  useEffect(() => {
    // const optionsValues = Object.values(options);
    // let variationIndex = null;
    // variants.forEach((variation, vIndex) => {
    //   const good = [];
    //   const { attributes } = variation;
    //   attributes.forEach((attribute) => {
    //     const attributeId = attribute.uid;
    //     if (optionsValues.includes(attributeId)) {
    //       good.push(attributeId);
    //     }
    //     if (good.length === attributes.length) {
    //       variationIndex = vIndex;
    //     }
    //   });
    // });

    const { pointer } = parser('product.getVariantPointer', { variants, variantIdInRoute, preSelectedCartVariantOptions: options });

    // console.log('Product-VariationIndex', variationIndex);
    setStoreVariantIndex(pointer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    setStoreVariantIndex(null);
  }, [router.asPath]);

  if (!selectedCartVariantOptions) { return null; }

  return (
    <VariantSelectionView
      configOptions={product.configOptions}
      onOptionUpdate={onOptionUpdate}
      // options={options}
      options={selectedCartVariantOptions || options}
      showOutOfStockOptionsAsDisabled={disableOutOfStockOptions && outOfStockOptions}
      showOnlyPrimaryVariantAttribute={showOnlyPrimaryVariantAttribute}
      ProductDisplaySettings={ProductDisplaySettings}
      swatchImages={swatchImagesSet}
      disableSelectionOnHover={disableSelectionOnHover}
    />
  );
};

VariantSelectionController.propTypes = {
  product: PropTypes.object,
  configProdVariationsInfo: PropTypes.object.isRequired,
  updateRouteVariation: PropTypes.func,
  ProductDisplaySettings: PropTypes.object,
  showOnlyPrimaryVariantAttribute: PropTypes.bool,
  disableOutOfStockOptions: PropTypes.bool,
  disableSelectionOnHover: PropTypes.bool,
};
