import { translateV2 } from '@/roanuz/lib/utils';

export const ServicesTree = {
  categories: {
    items: [
      {
        children: [],
        include_in_menu: 1,
        level: 2,
        name: translateV2('serviceLinks.TRACK_AN_ORDER'),
        position: 1,
        uid: '1',
        url_key: 'contact',
        url_path: 'contact',
        url_suffix: '/',
      },
      {
        children: [],
        include_in_menu: 1,
        level: 2,
        name: translateV2('serviceLinks.CUSTOMER_SERVICE'),
        position: 1,
        uid: '2',
        url_key: 'contact',
        url_path: 'contact',
        url_suffix: '/',
      },
      {
        children: [],
        include_in_menu: 1,
        level: 2,
        name: translateV2('serviceLinks.STORE_LOCATOR'),
        position: 1,
        uid: '3',
        url_key: 'contact',
        url_path: 'contact',
        url_suffix: '/',
      },
      {
        children: [],
        include_in_menu: 1,
        level: 2,
        name: translateV2('serviceLinks.GIFT_CARDS'),
        position: 1,
        uid: '4',
        url_key: 'contact',
        url_path: 'contact',
        url_suffix: '/',
      },
      {
        children: [],
        include_in_menu: 1,
        level: 2,
        name: translateV2('serviceLinks.SUPPORT'),
        position: 1,
        uid: '5',
        url_key: 'contact',
        url_path: 'contact',
        url_suffix: '/',
      },
    ],
  },
};

ServicesTree.propTypes = {};
