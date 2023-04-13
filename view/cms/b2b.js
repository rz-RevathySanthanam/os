import React from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import styled from 'styled-components';

export const BaseB2BLayoutWrapper = styled.div`
`;

export const BaseB2BLayout = ({
  media, title, subtitle, description, link,
}) => (
  <B2BLayoutWrapper>
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
  </B2BLayoutWrapper>
);

BaseB2BLayout.propTypes = {
  media: PropTypes.element,
  title: PropTypes.element,
  subtitle: PropTypes.element,
  description: PropTypes.element,
  link: PropTypes.element,
};

export const B2BLayout = withDependencySupport(BaseB2BLayout, 'B2BLayout');
export const B2BLayoutWrapper = withDependencySupport(BaseB2BLayoutWrapper, 'B2BLayoutWrapper');
