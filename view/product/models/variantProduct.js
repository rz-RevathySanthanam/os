import { parser } from '@/roanuz/store/modelParser';
import Config from '@/config';

const { ProductDisplaySettings } = Config;

// export function frameUrlPath(queries, asPath) {
//   let basePath = asPath;
//   let path = '';
//   [basePath] = basePath.split(ProductDisplaySettings.FiltersQueryPrefix);
//   path += queries;
//   return `${basePath}${path && ProductDisplaySettings.FiltersQueryPrefix}${path}`;
// }

export function frameConfigProductUrlPath(queries, asPath) {
  let path = asPath;
  if (path.includes(Config.ProductDisplaySettings.FiltersQueryPrefix)) {
    [path] = path.split(Config.ProductDisplaySettings.FiltersQueryPrefix);
    path = `${path}.html`;
  }
  return `${path}/${queries}`;
}

export function getVariantProduct(variants, product, configVariationModelRef, isCard) {
  const {
    variantIdInRoute,
    storedVariantIndex,
    preSelectedCartVariantOptions,
  } = configVariationModelRef;

  const { pointer, outOfStockConfigOptions, swatchImages } = storedVariantIndex === null
    ? parser('product.getVariantPointer', { variants, variantIdInRoute, preSelectedCartVariantOptions })
    : { pointer: storedVariantIndex };

  const selectedVariant = variants[pointer];

  let variantProduct = selectedVariant.product;
  const variantAttributes = selectedVariant.attributes;

  const sortConfOptions = (product.configurable_options || [])
    .slice().sort((x, y) => x.position - y.position);

  const selectedCartVariantOptions = {};

  let productLinkWithVariant = `/${product.url_key}${product.url_suffix}`;

  variantAttributes.forEach((e) => {
    sortConfOptions.forEach((x, xIndex) => {
      const rawCode = sortConfOptions[xIndex];
      if (rawCode.attribute_code === e.code) {
        selectedCartVariantOptions[rawCode.uid] = e.uid;
      }
      if (e.code === ProductDisplaySettings.VariantAttributeToLink) {
        productLinkWithVariant = frameConfigProductUrlPath(e.uid, productLinkWithVariant);
      }
    });
  });

  const configProdVariationsInfo = {
    ...configVariationModelRef,
    selectedCartVariantOptions,
    variants,
    storedVariantIndex: pointer,
    outOfStockConfigOptions,
    productLinkWithVariant,
    swatchImages,
  };

  if (isCard) {
    // If more than one variant attribute, Only image should change, not entire card.
    if (variantAttributes.length > 1) {
      variantProduct = { image: variantProduct.image, hasMoreVariantAttributes: true };
    }
  }

  variantProduct = {
    ...variantProduct,
    childProductSku: variantProduct.sku,
  };

  return {
    ...product,
    ...variantProduct,
    configProdVariationsInfo,
  };
}
