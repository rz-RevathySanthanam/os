import { checkEligibilityOfQuerySet } from '@/roanuz/lib/utils';

const rzIsGalleryMetaEnabled = checkEligibilityOfQuerySet('rzIsGalleryMetaEnabled');
const rzIsShippingModuleEnabled = checkEligibilityOfQuerySet('rzIsShippingModuleEnabled');

export function rzIsGalleryMetaEnabledTest() {
  if (rzIsGalleryMetaEnabled) {
    return 'rz_gallery_meta';
  }
  return '';
}

export function rzIsShippingModuleEnabledTest(attribute) {
  if (rzIsShippingModuleEnabled) {
    return attribute;
  }
  return '';
}
