import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseProductPageLayoutWrapper = styled.div`
  --page-product-image-height: ${asRem(1038)};
  --page-sidebar-width: ${asRem(440)};
  --page-section-bottom: ${asRem(24)};
  margin-bottom: ${asRem(40)};
  .page-section-top {
    margin: ${asRem(38)} auto ${asRem(8)};
  }

  .page-product-section {
    margin-top: ${asRem(40)};
    @media screen and (min-width: ${Breakpoint.md}) {
      display: flex;
    }
    .page-section-left {
      @media screen and (min-width: ${Breakpoint.md}) {
        padding-right: ${asRem(60)};
        flex: 1;
      }

      .section-gallery {
        margin-bottom: ${asRem(48)};
      }
    }
    .section-sidebar {
      margin-bottom: var(--page-section-bottom);
      .variant-selction-view {
        >section:last-child {
          padding-bottom: 0;
        }
      }
    }
    .page-section-right {
      .desc-container .section-price {
        margin-top: var(--page-section-bottom);
      }
      @media screen and (min-width: ${Breakpoint.md}) {
        width: var(--page-sidebar-width);
      }
    }
    .page-section-desc {
      margin-top: var(--page-section-bottom);
    }
    .page-spacing-bottom {
      >div:not(:last-child) {
        margin-bottom: var(--page-section-bottom);
      }
    }
  }
`;

export const BaseProductPageLayout = ({
  className,
  breadcrumb, notice,
  title, titleRight,
  gallery, desc, sidebar,
  details,
  relatedItems,
  widgets,
}) => {
  return (
    <ProductPageLayoutWrapper
      hasNotice={notice}
      className={className}
    >
      <div className="rz-section-content page-section-top">
        {breadcrumb && (
          <div className="page-breadcrumb">{breadcrumb}</div>
        )}
        {notice && (
          <div className="page-notice">{notice}</div>
        )}
      </div>
      <div className="rz-section-content page-product-section">
        <div className="page-section-left">
          <div className="section-gallery">{gallery}</div>
          <div className="hide-ipad-start page-section-desc">
            {details && (
              <div className="page-details-section">
                {details}
              </div>
            )}
          </div>
        </div>
        <div className="page-section-right">
          <div className="page-title">
            {title && (
              <div className="left-container">{title}</div>
            )}
            {titleRight && (
              <div className="right-container">{titleRight}</div>
            )}
          </div>
          <div className="desc-container">
            <div className="section-sidebar">{sidebar}</div>
            <div className="section-desc">{desc}</div>
            <div className="page-section-desc">
              {details && (
                <div className="page-details-section">
                  {details}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="rz-section-content page-section-bottom">
        {relatedItems && (
          <div className="page-related-section">
            {relatedItems}
          </div>
        )}
        {widgets && (
          <div className="page-widgets-section">
            {widgets}
          </div>
        )}
      </div>
    </ProductPageLayoutWrapper>
  );
};

BaseProductPageLayout.propTypes = {
  className: PropTypes.string,
  breadcrumb: PropTypes.element,
  notice: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  title: PropTypes.element.isRequired,
  titleRight: PropTypes.element,
  gallery: PropTypes.element.isRequired,
  desc: PropTypes.element.isRequired,
  sidebar: PropTypes.element.isRequired,
  details: PropTypes.element,
  relatedItems: PropTypes.element,
  widgets: PropTypes.element,
};

export const ProductPageLayoutWrapper = withDependencySupport(BaseProductPageLayoutWrapper, 'ProductPageLayoutWrapper');
export const ProductPageLayout = withDependencySupport(BaseProductPageLayout, 'ProductPageLayout');
