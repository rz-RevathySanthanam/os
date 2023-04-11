import React from 'react';
import { ImageListView } from './imageListView';

export default {
  title: 'Omni Shop / View / Image Widget',
  component: ImageListView,
};

const jsonData = {
  column_count: 6,
  mobile_column_count: 2,
  slides: [
    {
      image_url: 'https://omni-shop-backend.roanuz.com/media/catalog/product/cache/f915d4ceb166b0d0f002f11001c0434f/l/u/luma-yoga-brick.jpg',
      title: 'Brik',
      link: '#',
    },
    {
      image_url: 'https://omni-shop-backend.roanuz.com/media/catalog/product/cache/f915d4ceb166b0d0f002f11001c0434f/u/g/ug04-bk-0.jpg',
      title: 'Brik2',
      link: '',
    },
    {
      image_url: 'https://omni-shop-backend.roanuz.com/media/catalog/product/cache/f915d4ceb166b0d0f002f11001c0434f/u/g/ug07-bk-0.jpg',
      title: 'Brik3',
      link: '',
    },
    {
      image_url: 'https://omni-shop-backend.roanuz.com/media/catalog/product/cache/f915d4ceb166b0d0f002f11001c0434f/l/u/luma-yoga-brick.jpg',
      title: 'Brik4',
      link: '',
    },
    {
      image_url: 'https://omni-shop-backend.roanuz.com/media/catalog/product/cache/f915d4ceb166b0d0f002f11001c0434f/u/g/ug04-bk-0.jpg',
      title: 'Brik5',
      link: '',
    },
    {
      image_url: 'https://omni-shop-backend.roanuz.com/media/catalog/product/cache/f915d4ceb166b0d0f002f11001c0434f/u/g/ug07-bk-0.jpg',
      title: 'Brik6',
      link: '',
    },
  ],
};

const ImagesTemplate = () => (
  <ImageListView
    desktopSlides={jsonData.column_count}
    mobileSlides={jsonData.mobile_column_count}
    slides={jsonData.slides}
  />
);

export const ImageCarousel = ImagesTemplate.bind({});

const twoColumnJsonData = {
  column_count: 2,
  mobile_column_count: 2,
  slides: [
    {
      image_url: 'https://omni-shop-backend.roanuz.com/media/catalog/product/cache/f915d4ceb166b0d0f002f11001c0434f/u/g/ug07-bk-0.jpg',
      title: '',
      link: 'http://localhost:3000/women/bottoms/pants.html',
    },
    {
      image_url: 'https://omni-shop-backend.roanuz.com/media/catalog/product/cache/f915d4ceb166b0d0f002f11001c0434f/u/g/ug07-bk-0.jpg',
      title: '',
      link: '',
    },
  ],
};

const ImageGridTemplate = () => (
  <ImageListView
    columnCount={twoColumnJsonData.column_count}
    mobileColumnCount={twoColumnJsonData.mobile_column_count}
    slides={twoColumnJsonData.slides}
  />
);

export const ImageGrid = ImageGridTemplate.bind({});
