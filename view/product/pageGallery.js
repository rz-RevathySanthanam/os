import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ReactComponent as VideoPlayIcon } from '@/roanuz/view/imgs/VideoPlayIcon.svg';
import { DailogView } from '@/roanuz/view/dialog';
import { GalleryLargeView } from '@/roanuz/view/product/galleryLargeView';
import { ImageView, NoImageView } from '../image';
import { GalleryTabDisplayMode } from './models/productGallery';
import { ImageThumbnails, ImageThumbnailsViewV2 } from './galleryThumbnail';

export const BaseProductGalleryViewWrapper = styled.div`
  --preview-height: ${asRem(250)};
  --preview-width: ${asRem(250)};
  @media screen and (min-width: ${Breakpoint.sm}) {
    --preview-height: ${asRem(768)};
    --preview-width: ${asRem(768)};
  }
  
  .gallery-container {
    display: flex;
    height: 100%;
    flex-direction: row-reverse;
    justify-content: center;

    .preview-area {
      width: 100%;
      height: var(--preview-height);
      max-width: var(--preview-width);
      margin-bottom: ${asRem(20)};

      img {
        width: 100%;
        height: var(--preview-height);
        object-fit: contain;
        object-position: center;
      }
    }
  }

  .image-large-display {
    ${(props) => !props.preventGalleryPreview && css`
      cursor: pointer;
    `}
    position: relative;
    svg {
      width: ${asRem(90)};
      height: ${asRem(90)};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: ${asRem(10)};
      background: rgba(51, 51, 51, 0.8);
      color: #fff;
      transition: transform .3s ease-in-out;
      path {
        stroke: #fff;
      }
    }
    &:hover {
      svg {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
  }

  &.gallery-view-1 {
    .gallery-container {
      flex-direction: column;
      width: 100%;
      align-items: center;
    }

    @media screen and (min-width: ${Breakpoint.md}) {
      .gallery-container {
        flex-direction: row-reverse;
        align-items: start;
      }
    }
  }
`;

export const ProductGalleryView = ({ product, preventGalleryPreview = false }) => {
  const skipMediaUrlFix = !product.gallery.hasRzGalleryMeta;
  const [previewItem, setPreviewItem] = useState(product.gallery.images[0]);

  const [showFullScreen, setShowFullScreen] = useState(false);
  const [tabItem, setTabItem] = useState(GalleryTabDisplayMode.Image);

  const previewGalleryLargeView = (tab = GalleryTabDisplayMode.Image) => {
    if (!preventGalleryPreview) {
      let tabRef = tab;
      if (previewItem.video_content) {
        tabRef = GalleryTabDisplayMode.Video;
      }
      setShowFullScreen(true);
      setTabItem(tabRef);
    }
  };

  useEffect(() => {
    setPreviewItem(product.gallery.images[0]);
  }, [product.sku, product.gallery]);
  return (
    <ProductGalleryViewWrapper
      preventGalleryPreview={preventGalleryPreview}
      className={`${product.gallery.images.length <= 3 ? 'gallery-view-1' : 'gallery-view-2'}`}
    >
      <DailogView
        titleText=" "
        showClose
        onClose={() => setShowFullScreen(false)}
        show={previewItem && showFullScreen} // Exclude preview for noimage: Need to decide & remove
      >
        <GalleryLargeView
          product={product}
          previewItemHandle={previewItem}
          tabItemHandle={tabItem}
        />
      </DailogView>
      <div className="gallery-container">
        {product.gallery.images.length <= 3 ? (
          <>
            <div className="preview-area">
              <div
                className="preview-item"
                onClick={() => previewGalleryLargeView()}
                onKeyPress={() => { previewGalleryLargeView(); }}
                role="button"
                tabIndex="0"
              >
                {previewItem
                  ? (
                    <div className="image-large-display">
                      <ImageView
                        src={previewItem.url}
                        alt={`Image of ${product.name}`}
                        showDefaultPlaceholder
                        skipMediaUrlFix={skipMediaUrlFix}
                      />
                      {previewItem.video_content && (
                        <div className="video-icon-wrapper">
                          <VideoPlayIcon />
                        </div>
                      )}
                    </div>
                  ) : <NoImageView />}
              </div>
            </div>
            <ImageThumbnails
              thumbnails={product.gallery}
              previewItem={previewItem}
              setPreviewItem={setPreviewItem}
              skipMediaUrlFix={skipMediaUrlFix}
              previewGalleryLargeView={previewGalleryLargeView}
              galleryVideo={product.galleryVideo}
            />
          </>
        ) : (
          <ImageThumbnailsViewV2
            thumbnails={product.gallery}
            previewItem={previewItem}
            setPreviewItem={setPreviewItem}
            skipMediaUrlFix={skipMediaUrlFix}
            previewGalleryLargeView={previewGalleryLargeView}
            galleryVideo={product.galleryVideo}
          />
        )}
      </div>
    </ProductGalleryViewWrapper>
  );
};

ProductGalleryView.propTypes = {
  product: PropTypes.object,
  preventGalleryPreview: PropTypes.bool,
};

export const ProductGalleryViewWrapper = withDependencySupport(BaseProductGalleryViewWrapper, 'ProductGalleryViewWrapper');
