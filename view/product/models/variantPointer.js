import Config from '@/config';

export function getVariantPointer({ variants, variantIdInRoute, preSelectedCartVariantOptions }) {
  // INFO: This function is responsible for finding variant point
  // and map out of stock config options based on primary config attribute.
  let variantPointer = 0;
  let shouldSkip = false;

  const outOfStockConfigOptions = {};
  const swatchImages = {};

  const optionsValues = preSelectedCartVariantOptions
    && Object.values(preSelectedCartVariantOptions);

  variants.forEach((variation, vIndex) => {
    const good = [];
    const { attributes, product } = variation;

    const productAvailable = product.stock_status === 'IN_STOCK';

    const { VariantAttributeToLink } = Config.ProductDisplaySettings;
    const primaryAttribute = attributes.find((a) => a.code === VariantAttributeToLink);

    if (primaryAttribute) {
      if (!Object.keys(outOfStockConfigOptions).includes(primaryAttribute.uid)) {
        outOfStockConfigOptions[primaryAttribute.uid] = [];
      }
      if (!Object.keys(swatchImages).includes(primaryAttribute.uid)) {
        const productVariantImage = { ...product.image };
        if (productVariantImage.url.includes('placeholder')) {
          productVariantImage.url = null;
        }
        swatchImages[primaryAttribute.uid] = productVariantImage;
      }
    }

    attributes.forEach((attribute) => {
      const attributeId = attribute.uid;
      if (
        optionsValues
        && optionsValues.length > 0
      ) {
        if (optionsValues.includes(attributeId)) {
          good.push(attributeId);
        }
        if (good.length === attributes.length) {
          variantPointer = vIndex;
          shouldSkip = true;
        }
      }
      if (variantIdInRoute) {
        if (attributeId === variantIdInRoute) { // Since router has id, not checking stock
          if (!shouldSkip) {
            variantPointer = vIndex;
            shouldSkip = true;
          }
        }
        if (!productAvailable) {
          if (attribute.code !== VariantAttributeToLink) {
            if (primaryAttribute) {
              outOfStockConfigOptions[primaryAttribute.uid].push(attributeId);
            }
          }
        }
      } else if (productAvailable) {
        if (!shouldSkip) {
          variantPointer = vIndex;
          shouldSkip = true;
        }
      } else if (attribute.code !== VariantAttributeToLink) {
        if (primaryAttribute) {
          outOfStockConfigOptions[primaryAttribute.uid].push(attributeId);
        }
      }
    });
  });
  // console.log('Variant Pointer', variantPointer);
  return { pointer: variantPointer, outOfStockConfigOptions, swatchImages };
}
