import Config from '@/config';
import { Utils, checkEligibilityOfQuerySet } from '@/roanuz/lib/utils';
import { useQuery } from '@apollo/client';
import { CustomAttributeMetaData } from '@/roanuz/store/general/query';

export function createBrandKey(name) {
  if (!name) { return null; }
  const parsed = `${name}`.toLowerCase().replace(/\s/g, '-').replace(/_/g, '-');
  return encodeURIComponent(parsed);
}

export function createBrandLink(brandKey, categoryId) {
  const baseUrl = `/brand/${brandKey}/`;

  if (categoryId) {
    return `${baseUrl}category/${categoryId}`;
  }

  return baseUrl;
}

export function createBrandImageUrl(brandKey) {
  const basePath = `brand/${brandKey}.png`;
  return Utils.mergePaths([Config.AssetsPath, basePath]);
}

export function useBrandList() {
  const rzIsManufacturerEnabled = checkEligibilityOfQuerySet('rzIsManufacturerEnabled');
  const {
    loading,
    error,
    data,
  } = useQuery(CustomAttributeMetaData, {
    variables: {
      attributeCodes: [
        { attribute_code: 'rz_manufacturer', entity_type: 'catalog_product' },
      ],
    },
    skip: !rzIsManufacturerEnabled,
  });
  if (!rzIsManufacturerEnabled) {
    return {
      loading: false,
      error: { message: 'NO Brands, Replicate rz_manufacturer' },
      brands: null,
    };
  }
  let brands = null;

  if (data) {
    const items = data.customAttributeMetadata.items[0].attribute_options;
    if (items) {
      brands = items.map((raw) => {
        const key = createBrandKey(raw.label);
        return {
          key,
          id: raw.value,
          name: raw.label,
          link: createBrandLink(key),
          imageUrl: createBrandImageUrl(key),
        };
      });
    }
  }

  return {
    loading,
    error,
    brands,
  };
}
