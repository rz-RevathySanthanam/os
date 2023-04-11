import Config from '@/config';

const {
  ProductImagePath,
  ProductImageSmallSize,
  ProductImageExtension,
  YoutubeVideoUrl,
  YoutubeVideoPreviewUrl,
  YoutubeVideoPreviewImageSize,
} = Config.ProductGalleryMetaConfig;

export function parseGallery(product) {
  const energyLabelKey = 'rz_energy_label';
  const gallery = [];
  let energyLabelImage = null;

  if (product.media_gallery) {
    product.media_gallery.forEach((item) => {
      // eslint-disable-next-line no-underscore-dangle
      if (item.__typename === 'ProductVideo') {
        return;
      }
      if (item.disabled) {
        return;
      }

      if (item.label === energyLabelKey) {
        energyLabelImage = item;
      } else {
        // A bug in backend which is saving product witout label attribute,
        // using filename as a hot fix
        const parts = item.url.split('.');
        const cParts = parts[parts.length - 2].split('_');
        const lastPart = cParts[cParts.length - 1];
        if (lastPart.toLowerCase() === 'label') {
          energyLabelImage = item;
        } else {
          gallery.push(item);
        }
      }
    });
  }

  return [energyLabelImage, gallery];
}

export function parseGalleryMeta(meta) {
  /* INFO: rz_gallery_meta
    Need to update a new custom attribute rz_gallery_meta in product to give
    hint about number of images.This requires 3 part values separated by ';'.

    rz_gallery_meta: Part-1;Part-2;Part-3;Part-4

    Part-1: Number of product images plus one for energy label image. So if there are 3 product
            image and one energy label image, value should be 4
    Part-2: 1 if energy label is available else 0
    Part-3: Version Number - incremental number, using timestamp is recommended.
    Part-4: Youtube video ids. '/' will be used to add multiple videos

    For example:
    rz_gallery_meta: 7;1;1638932951;BaLHthRsqQk/XKfgdkcIUxw/861Dt8Fy0IA
    -- Which indicates that it has 6 product images, 1 energy label image, and 3 videos.
  */
  let items = 0;
  let hasEnergyLabel = false;
  let version = null;
  let videoItems = [];

  if (meta) {
    const parts = meta.split(';');
    items = (parts.length > 0) ? parseInt(parts[0], 10) : 0;
    hasEnergyLabel = (parts.length > 1) ? parts[1] === '1' : false;
    version = (parts.length > 2) ? parts[2] : null;
    videoItems = (parts.length > 3) && parts[3].split('/');
    if (hasEnergyLabel) {
      items -= 1;
    }
  }

  return {
    items, hasEnergyLabel, version, videoItems,
  };
}

export function buildProductImageUrl(product, index, type, version, isSearchHit) {
  const extension = ProductImageExtension || 'jpeg';
  const fileName = `${type}_${index || 0}.${extension}`;
  let skuRef = product.sku;
  if ((isSearchHit || product.rz_b_product) && product.rz_parent_sku) {
    skuRef = product.rz_parent_sku;
  }

  if (version) {
    return `${ProductImagePath}${skuRef}/${version}/web/${fileName}`;
  }
  return `${ProductImagePath}${skuRef}/web/${fileName}`;
}

function buildImageData(url, label) {
  return {
    url,
    label,
    disabled: false,
  };
}

export function buildProductImageUrlSmall(product, index, version, isSearchHit = false) {
  return buildImageData(buildProductImageUrl(product, index, ProductImageSmallSize, version, isSearchHit), `product image ${index}`);
}

export function buildProductImageUrlLarge(product, index, version) {
  return buildImageData(buildProductImageUrl(product, index, 'large2x', version), `product image ${index}`);
}

export function buildProductImageUrlEnergyLabel(product, version) {
  return buildImageData(buildProductImageUrl(product, 'label', 'large2x', version), 'product energy label');
}

function buildYoutubeVideoImageUrl(id) {
  const fileName = `${YoutubeVideoPreviewImageSize}.jpg`;
  return `${YoutubeVideoPreviewUrl}${id}/${fileName}`;
}

export function buildProductVideoInfo(videoId, index) {
  const data = {
    video_content: {
      video_url: `${YoutubeVideoUrl}${videoId}`,
      video_title: `Video preview ${index}`,
    },
    ...buildImageData(buildYoutubeVideoImageUrl(videoId), `video preview ${index}`),
  };
  return data;
}

export function productImageForSuggestion(hit) {
  if (Config.UseImagePathForSuggestion && hit.rz_gallery_meta) {
    const meta = parseGalleryMeta(hit.rz_gallery_meta);
    return buildProductImageUrlSmall(hit, 0, meta.version, true).url;
  }

  return hit.image_url;
}

export function prepareGalleryData(product, galleryFetched) {
  let [labelImage, images] = parseGallery(product);
  let { image } = product;
  let smallImage = image;
  let hasImage = (product.image && (product.image.disabled !== true));
  let hasEnergyLabel = labelImage !== null;
  let videos = [];

  if (product.rz_gallery_meta) {
    const {
      items,
      version,
      hasEnergyLabel: hasLabelImage,
      videoItems,
    } = parseGalleryMeta(product.rz_gallery_meta);

    hasEnergyLabel = hasLabelImage;

    if (items > 0) {
      hasImage = true;
      smallImage = buildProductImageUrlSmall(product, 0, version);
      image = buildProductImageUrlLarge(product, 0, version);
    }

    if (hasEnergyLabel) {
      labelImage = buildProductImageUrlEnergyLabel(product, version);
    }

    images = [];
    for (let i = 0; i < items; i += 1) {
      const data = {
        position: i,
        ...buildProductImageUrlLarge(product, i, version),
      };
      images.push(data);
    }

    videos = [];
    for (let j = 0; j < videoItems.length; j += 1) {
      const videoId = videoItems[j];
      const data = {
        position: j,
        ...buildProductVideoInfo(videoId, j),
      };
      videos.push(data);
    }
  }

  const gallery = {
    hasImage,
    smallImage,
    image,
    hasEnergyLabel,
    galleryFetched,
    energyLabelImage: labelImage,
    images,
    hasRzGalleryMeta: product.rz_gallery_meta,
    videos,
  };

  return gallery;
}

export const GalleryTabDisplayMode = {
  Image: 'image',
  Video: 'video',
};
