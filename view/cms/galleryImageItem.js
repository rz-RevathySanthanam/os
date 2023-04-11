import React from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import styled from 'styled-components';

export const BaseGalleryImageItemLayoutWrapper = styled.div`
`;

export const BaseGalleryImageItemLayout = ({
  media, title, subtitle, description, link,
}) => (
  <GalleryImageItemLayoutWrapper>
    <div className="banner-media">
      {media && (
        <>
          {media}
        </>
      )}
    </div>
    <div className="banner-content">
      {title && (
        <>
          {title}
        </>
      )}
      {subtitle && (
        <>
          {subtitle}
        </>
      )}
      {description && (
        <>
          {description}
        </>
      )}
      {link && (
        <div className="banner-link">
          {link}
        </div>
      )}
    </div>
  </GalleryImageItemLayoutWrapper>
);

BaseGalleryImageItemLayout.propTypes = {
  media: PropTypes.element,
  title: PropTypes.element,
  subtitle: PropTypes.element,
  description: PropTypes.element,
  link: PropTypes.element,
};

export const GalleryImageItemLayout = withDependencySupport(BaseGalleryImageItemLayout, 'GalleryImageItemLayout');
export const GalleryImageItemLayoutWrapper = withDependencySupport(BaseGalleryImageItemLayoutWrapper, 'GalleryImageItemLayoutWrapper');
