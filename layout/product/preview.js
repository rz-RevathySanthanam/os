import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem } from '../../lib/css';

export const ProductPreviewDisplayMode = {
  ThreeCol: 'ThreeCol',
  TwoCol: 'TwoCol',
};

export const BaseProductPreviewLayoutWrapper = styled.div`
  >.container {
    display: flex;
    > .container-image {
      width: var(--size-product-card-preview-image-width);
      height: var(--size-product-card-preview-image-height);
      flex-shrink: 0;
      position: relative;
      .image {
        height: 100%;

        .rz-image-view {
          height: 100%;
          img {
            height: 100%;
            width: 100%;
            object-fit: contain;
          }
        }
      }
    }

    >.right {
      display: flex;
      justify-content: space-between;
      ${(p) => (p.displayMode === ProductPreviewDisplayMode.ThreeCol) && css`
        flex-grow: 1;
      `}

      ${(p) => (p.displayMode === ProductPreviewDisplayMode.TwoCol) && css`
        flex-direction: column;
      `}

      > .container-heading {
        padding-left: ${asRem(10)};
        padding-bottom: ${asRem(10)};
      }
      > .container-price {
        padding-left: ${asRem(10)};
        > .container-quantity {
          color: var(--color-disabled);
        }
      }
    }
  }
  >.container-action {
    text-align: right;
    margin-top: ${asRem(15)};
    transition: all 0.5s ease-out;
  }
`;

export const BaseProductPreviewLayout = ({
  image,
  heading, price, action, seondaryAction,
  displayMode,
  quantityUpdate,
  quantity,
}) => {
  return (
    <ProductPreviewLayoutWrapper
      className="rz-product-preview"
      displayMode={displayMode}
    >
      <div className="container">
        {image && (
          <div className="container-image">
            <div className="image">{image}</div>
          </div>
        )}
        <div className="right">
          <div className="container-heading">
            {heading}
            {quantity && (
              <div className="container-quantity">
                {quantity}
              </div>
            )}
          </div>
          {price && (
            <div className="container-price">
              {price}
            </div>
          )}
        </div>
      </div>
      {quantityUpdate && (
        <div className="container-quantity">
          {quantityUpdate}
        </div>
      )}
      {action && (
        <div className="container-action primary-cta">
          {action}
        </div>
      )}
      {seondaryAction && (
        <div className="container-action secondary-cta">
          {seondaryAction}
        </div>
      )}
    </ProductPreviewLayoutWrapper>
  );
};

BaseProductPreviewLayout.propTypes = {
  image: PropTypes.element,
  heading: PropTypes.element,
  price: PropTypes.element,
  action: PropTypes.element,
  seondaryAction: PropTypes.element,
  displayMode: PropTypes.oneOf([
    ProductPreviewDisplayMode.ThreeCol,
    ProductPreviewDisplayMode.TwoCol,
  ]),
  quantityUpdate: PropTypes.element,
  quantity: PropTypes.element,
};

export const ProductPreviewLayoutWrapper = withDependencySupport(BaseProductPreviewLayoutWrapper, 'ProductPreviewLayoutWrapper');
export const ProductPreviewLayout = withDependencySupport(BaseProductPreviewLayout, 'ProductPreviewLayout');
ProductPreviewLayout.propTypes = BaseProductPreviewLayout.propTypes;
