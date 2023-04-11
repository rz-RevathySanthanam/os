import React from 'react';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import PropTypes from 'prop-types';
import { ReactComponent as VideoPlayIcon } from '@/roanuz/view/imgs/VideoPlayIcon.svg';
import { Display24 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ImageView } from '../image';
import { GalleryTabDisplayMode } from './models/productGallery';

export const ImageThumbnailsWrapper = styled.div`
  .image-list {
    display: flex;
    flex-direction: row;
    align-items: start;
    overflow: auto;
    margin-right: ${asRem(24)};

    .image-item {
      max-width: ${asRem(80)};
      max-height: ${asRem(80)};
      margin-bottom: ${asRem(32)};
      margin-right: ${asRem(10)};
      padding: ${asRem(4)};
      border: ${asRem(1)} solid transparent;
      border-radius: ${asRem(2)};
      cursor: pointer;

      img {
        width: 100%;
        height: ${asRem(72)};
        object-fit: contain;
      }

      &:last-child {
        margin-right: 0
      }

      &.active {
        border-color: var(--color-grey);
      }

      &:not(.video-btn) {
        &:focus {
          outline: 0;
          border: ${asRem(1)} solid var(--color-grey);
        }
      }
    }
  }

  .masked-image {
    position: relative;
    .count {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${asRem(72)};
      height: ${asRem(72)};
      border-radius: ${asRem(6)};
      background-color: var(--color-text);
      color: var(--color-text-rev);
      opacity: 0.7;
      object-fit: contain;
    }
  }

  .video-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 100%;
    height: ${asRem(80)};
    border-radius: ${asRem(6)};
    object-fit: contain;
  }

  .play-btn-wrapper {
    position: relative;
    .play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${asRem(35)};
      height: ${asRem(35)};
      transform: translate(-50%, -50%);
    }
  }


  @media screen and (min-width: ${Breakpoint.md}) {
    .image-list {
      flex-direction: column;
  
      .image-item {
        margin-right: 0;
      }
    }
  }
`;

export const ImageThumbnails = ({
  thumbnails,
  previewItem,
  setPreviewItem,
  skipMediaUrlFix,
  previewGalleryLargeView,
  galleryVideo,
}) => {
  const maskedImageIndex = thumbnails.images.length === 5 ? 5 : 4;
  const hasVideo = galleryVideo;
  const previewItemsCount = Math.min(thumbnails.images.length - (hasVideo ? 1 : 0), 4);
  const hiddentemsCount = thumbnails.images.length - previewItemsCount - (hasVideo ? 1 : 0);
  return (
    <>
      {(thumbnails.images.length > 1 || galleryVideo.length > 0) && (
        <ImageThumbnailsWrapper>
          <div className="image-list">
            {thumbnails.images.map((item, index) => (
              index < maskedImageIndex
                ? (
                  <div
                    key={item.position}
                    className={`image-item ${item.url === previewItem.url ? 'active' : ''}`}
                    role="button"
                    tabIndex="0"
                    onClick={() => { setPreviewItem(item); }}
                    onKeyPress={() => { setPreviewItem(item); }}
                  >
                    <ImageView
                      src={item.url}
                      alt={`${item.position} Image Preview`}
                      showDefaultPlaceholder
                      skipMediaUrlFix={skipMediaUrlFix}
                    />
                  </div>
                ) : null
            ))}
            {thumbnails.images[maskedImageIndex] && (
              <div
                key={thumbnails.images[maskedImageIndex].position}
                className="image-item masked-image"
                role="button"
                tabIndex="0"
                onClick={() => previewGalleryLargeView()}
                onKeyPress={() => previewGalleryLargeView()}
              >
                <ImageView
                  src={thumbnails.images[maskedImageIndex].url}
                  alt={`${thumbnails.images[maskedImageIndex].position} Image Preview`}
                  showDefaultPlaceholder
                  skipMediaUrlFix={skipMediaUrlFix}
                />
                <Display24 as="p" className="count">
                  +
                  {hiddentemsCount}
                </Display24>
              </div>
            )}
            {galleryVideo && galleryVideo.length > 0 && (
              <div
                key={galleryVideo[0].position}
                className="image-item video-btn"
                role="button"
                tabIndex="0"
                onClick={() => previewGalleryLargeView(GalleryTabDisplayMode.Video)}
                onKeyPress={() => previewGalleryLargeView(GalleryTabDisplayMode.Video)}
                arial-label="Video-icon"
              >
                <div className="play-btn-wrapper">
                  {galleryVideo[0].url && (
                    <ImageView
                      src={galleryVideo[0].url}
                      alt="Video Preview"
                      showDefaultPlaceholder
                      skipMediaUrlFix={skipMediaUrlFix}
                    />
                  )}
                  <VideoPlayIcon className="play-btn" />
                </div>
              </div>
            )}
          </div>
        </ImageThumbnailsWrapper>
      )}
    </>
  );
};

ImageThumbnails.propTypes = {
  thumbnails: PropTypes.object,
  previewItem: PropTypes.object,
  setPreviewItem: PropTypes.func,
  skipMediaUrlFix: PropTypes.bool,
  previewGalleryLargeView: PropTypes.func,
  galleryVideo: PropTypes.array,
};

export const BaseImageThumbnailsViewWrapperV2 = styled.div`
  width: 100%;

  .image-list {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;

    .image-item {
      text-align: center;
      width: 100%;
      height: 100%;
      max-width: ${asRem(380)};
      max-height: ${asRem(300)};
      margin-right: ${asRem(12)};
      scroll-snap-align: center;
      cursor: pointer;

      img {
        max-width: ${asRem(380)};
        max-height: ${asRem(300)};
      }

      &:not(.video-btn) {
        &:focus {
          border: none;
        }
      }
    }

    .video-btn {
      .video-ply-btn-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        max-width: ${asRem(90)};
        max-height: ${asRem(90)};
        border-radius: 50%;
        background: var(--color-text-rev);
        opacity: 0.5;
        transform: translate(-50%, -50%);
        transition: transform .3s ease-in-out;
      }

      :hover {
        .video-ply-btn-wrapper {
          transform: translate(-50%, -50%) scale(1.1);
        }
      }
    }

    @media screen and (min-width: ${Breakpoint.sm}) {
      .image-item {
        margin: 0 ${asRem(24)} ${asRem(24)} 0;
      }
    }
    
    @media screen and (min-width: ${Breakpoint.md}) {
      flex-wrap: wrap;
      
      .image-item {
        max-width: ${asRem(420)};
        max-height: ${asRem(420)};

        img {
          max-width: ${asRem(420)};
          max-height: ${asRem(420)};
        }

        :nth-child(even) {
          margin-right: 0;
        }
      }
    }
  }

  .video-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 100%;
    height: ${asRem(80)};
    border-radius: ${asRem(6)};
    object-fit: contain;
  }

  .play-btn-wrapper {
    position: relative;
    .play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${asRem(35)};
      height: ${asRem(35)};
      transform: translate(-50%, -50%);
    }
  }
`;

export const ImageThumbnailsViewV2 = ({
  thumbnails,
  skipMediaUrlFix,
  previewGalleryLargeView,
  galleryVideo,
  setPreviewItem,
}) => {
  return (
    <>
      {(thumbnails.images.length > 1 || galleryVideo.length > 0) && (
        <ImageThumbnailsViewWrapperV2>
          <div className="image-list">
            {thumbnails.images.map((item) => (
              <div
                key={item.position}
                className="image-item"
                role="button"
                tabIndex="0"
                onClick={() => {
                  previewGalleryLargeView();
                  setPreviewItem(item);
                }}
                onKeyPress={() => {
                  previewGalleryLargeView();
                  setPreviewItem(item);
                }}
              >
                <ImageView
                  src={item.url}
                  alt={`${item.position} Image Preview`}
                  showDefaultPlaceholder
                  skipMediaUrlFix={skipMediaUrlFix}
                />
              </div>
            ))}
            {galleryVideo && galleryVideo.length > 0 && (
              <div
                key={galleryVideo[0].position}
                className="image-item video-btn"
                role="button"
                tabIndex="0"
                onClick={() => previewGalleryLargeView(GalleryTabDisplayMode.Video)}
                onKeyPress={() => previewGalleryLargeView(GalleryTabDisplayMode.Video)}
                arial-label="Video-icon"
              >
                <div className="play-btn-wrapper">
                  {galleryVideo[0].url && (
                    <ImageView
                      src={galleryVideo[0].url}
                      alt="Video Preview"
                      showDefaultPlaceholder
                      skipMediaUrlFix={skipMediaUrlFix}
                    />
                  )}
                  <div className="video-ply-btn-wrapper">
                    <VideoPlayIcon className="play-btn" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ImageThumbnailsViewWrapperV2>
      )}
    </>
  );
};

ImageThumbnailsViewV2.propTypes = {
  ...ImageThumbnails.PropTypes,
};

export const ImageThumbnailsViewWrapperV2 = withDependencySupport(BaseImageThumbnailsViewWrapperV2, 'ImageThumbnailsViewWrapperV2');
