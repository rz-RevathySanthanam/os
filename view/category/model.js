import Config from '@/config';
import { translateV2, convertStringToTranslationKey, Utils } from '@/roanuz/lib/utils';

export function categoryLink(category) {
  if (!category) { return null; }
  let path = category.url_path;
  if (path && !path.startsWith('/')) {
    path = `/${path}`;
  }
  return `${path}${category.url_suffix || '.html'}`;
}

// Info
// [value]  - [Label]
// PRODUCTS - Products only
// PAGE - Static block only
// PRODUCTS_AND_PAGE - Static block and products

export function parseCategory(category) {
  if (!category) { return category; }
  const showStaticContent = (
    category.display_mode === null
    || category.display_mode === 'PRODUCTS_AND_PAGE'
    || category.display_mode === 'PAGE'
  )
  && (
    category.description
    || (category.cms_block && category.cms_block.content)
  );

  const showProducts = (
    category.display_mode === null
    || category.display_mode === 'PRODUCTS_AND_PAGE'
    || category.display_mode === 'PRODUCTS'
  );

  const levelValue = Config.CategoryPageSettings.EnableAutoContentViewTillLevel || 3;

  const showFilter = showProducts;
  const showAutoContent = (!showProducts) && category.level < levelValue;

  return {
    ...category,
    showStaticContent,
    showFilter,
    showProducts,
    showAutoContent,
  };
}

export function categoryFilterFacetLink(product, facetId, facetValue) {
  if (product.category) {
    const { breadcrumbs } = product.category;
    const breadcrumbsLength = breadcrumbs.length;
    const lastBreadcrumb = breadcrumbs[breadcrumbsLength - 1];
    let path = lastBreadcrumb.category_url_path;
    if (path && !path.startsWith('/')) {
      path = `/${path}`;
    }
    return `${path}.html${Config.CategoryPageSettings.FiltersQueryPrefix}${facetId}-${facetValue}`;
  }
  return null;
}

export const createAttributeIconUrl = (value, attributeCode, format = 'svg') => {
  if (!value) return null;
  // INFO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  const key = value.toLowerCase().replace(/ /g, '-').normalize('NFD');
  const basePath = `${attributeCode}/${key}.${format}`;
  return Utils.mergePaths([Config.AssetsPath, basePath]);
};

export const getSortSelectedKeyLabel = (sortItems, selectedKey) => {
  const sortSelectedKeyLabel = sortItems.find((item) => item.key === selectedKey);
  return translateV2(`category.${convertStringToTranslationKey(sortSelectedKeyLabel.label)}`) || sortSelectedKeyLabel.label;
};
