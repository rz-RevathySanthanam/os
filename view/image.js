import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fixMediaUrl } from '@/roanuz/lib/utils';
import { withDependencySupport } from '@/roanuz/lib/dep';
import DefaultImage from '@/public/DefaultImage.png';

const ImageViewWrapper = styled.div`
  img {
    text-indent: -9999px;
    font-size: 0;
  }
`;

export const ImageView = ({
  src, alt, skipMediaUrlFix,
  className = null, width, height,
  fallBackImage, skipFallBackImage,
}) => {
  let fullSrc = src;
  if (!skipMediaUrlFix) {
    fullSrc = fixMediaUrl(fullSrc);
  }

  const classes = [];

  if (className) {
    classes.push(className);
  }
  return (
    <ImageViewWrapper
      className="rz-image-view"
    >
      <img
        src={fullSrc}
        className={classes.join(' ')}
        alt={alt || 'Image'}
        width={width}
        height={height}
        onError={({ currentTarget }) => {
          /* eslint-disable no-param-reassign */
          if (!skipFallBackImage) {
            currentTarget.onerror = null;
            currentTarget.src = fallBackImage || DefaultImage;
          } else {
            currentTarget.style.visibility = 'hidden';
          }
        }}
      />
    </ImageViewWrapper>
  );
};

ImageView.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  skipMediaUrlFix: PropTypes.bool,
  fallBackImage: PropTypes.string,
  skipFallBackImage: PropTypes.bool,
};

export const NoImageView = ({ alt, className }) => {
  return (
    <ImageView
      src={DefaultImage}
      alt={alt || 'Image Missing'}
      className={className}
    />
  );
};

NoImageView.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
};

export const BaseProductLoadingView = () => {
  return (
    <ImageView
      src={DefaultImage}
      alt="Product Loading"
    />
  );
};

BaseProductLoadingView.propTypes = {
};

export const ProductLoadingView = withDependencySupport(BaseProductLoadingView, 'ProductLoadingView');
