import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ButtonList } from '@/roanuz/view/button';

export const ProductCardDisplayMode = {
  OneBySix: 'OneBySix',
  OneByFour: 'OneByFour',
  OneByThree: 'OneByThree',
  OneByTwo: 'OneByTwo',
};

export const ProductCardLayoutMode = {
  Default: 'Default',
  TwoColumnDisplayCard: 'TwoColumnDisplayCard',
};

export const BaseProductCardLayoutWrapper = styled.div`
  --card-width: var(--size-product-card-16-width);
  --card-image-height: var(--size-product-card-16-image-height);
  --card-heading-height: var(--size-product-card-16-heading-height);
  --card-shortdesc-height: var(--size-product-card-16-shortdesc-height);
  --card-offer-height: var(--size-product-card-16-offer-height);

  width: var(--card-width);

  ${(p) => (p.displayMode === ProductCardDisplayMode.OneByTwo) && css`
    --card-image-height: var(--size-product-card-12-image-height);
    --card-heading-height: var(--size-product-card-12-heading-height);
    --card-offer-height: var(--size-product-card-12-offer-height);
    --card-width: var(--size-product-card-12-width);
    border: 1px solid var(--color-disabled-3);
    border-radius: ${asRem(6)};
    padding: ${asRem(30)};
  `}


  ${(props) => (props.displayMode === ProductCardDisplayMode.OneByThree) && css`
    --card-image-height: var(--size-product-card-13-image-height);
    --card-heading-height: var(--size-product-card-13-heading-height);
    --card-offer-height: var(--size-product-card-13-offer-height);
    --card-width: var(--size-product-card-13-width);
  `}

  @media screen and (min-width: ${Breakpoint.sm}) {
    ${(p) => (p.displayMode === ProductCardDisplayMode.OneByTwo) && css`
      column-count: 2;
    `}
  }

  @media screen and (min-width: ${Breakpoint.lg}) {
    ${(p) => (p.displayMode === ProductCardDisplayMode.OneByTwo) && css`
      ${'' /* --card-width: var(--size-product-card-12-width); */}
      min-height: ${asRem(295)};
    `}
  }
  display: flex;
  flex-direction: column;
  height: 100%;

  > .container-image {
    height: var(--card-image-height);
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

    .top-overlay {
      position: absolute;
      top: 0;
      left: 0;
    }

    .bottom-overlay {
      position: absolute;
      bottom: 0;
      right: 0;
      text-align: right;
    }
  }

  > .container-heading {
    margin-top: ${asRem(8)};
    ${(p) => (p.displayMode === ProductCardDisplayMode.OneByThree) && css`
      padding-top: ${asRem(24)};
      border-top: 1px solid var(--color-disabled-3);
    `}
  }

  > .container-short-desc {
    height: var(--card-shortdesc-height);
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    .rz-magento-html {
      max-width: ${asRem(217)};
      ul {
        height: 8ch;
        overflow: hidden;
        list-style: disc inside none;
      }

      iframe {
        width: 100%;
        height: 100%;
      }
    }
  }

  > .container-offer {
    margin-top: ${asRem(8)};
    min-height: var(--card-offer-height);
  }

  > .container-content {
    margin-top: ${asRem(4)};
    > .container-action {
      transition: all 0.5s ease-out;
      margin-top: ${asRem(8)};
      @media screen and (min-width: ${Breakpoint.lg}) {
        margin-top: 0;
      }

      .rz-button-atw {
        .rz-svg-icon {
          padding-right: 0;
        }
      }
    }

    .container-variant-switch {
      margin-top: ${asRem(8)};
      .variants-wrapper {
        margin-top: ${asRem(8)};
      }
    }

    ${(p) => (p.displayMode === ProductCardDisplayMode.OneByThree) && css`
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      > .container-action {
        margin-top: 0;
      }
    `}
  }

  &.OneByThree {
    .container-content {
      flex-direction: column;
      @media screen and (min-width: ${Breakpoint.lg}) {
        flex-direction: row;
      }
      .container-action {
        margin-top: ${asRem(10)};
        >div {
          flex-direction: initial;
        }
      }
    }
  }
`;

export const BaseProductCardLayout = ({
  image, imageOverlayTop, imageOverlayBottom,
  heading, offer, price,
  displayMode,
  labelColor,
  shortDesc,
  cartAction,
  wishListAction,
  cardLayoutType,
  variantsSwitch,
  stockIndicatorView,
}) => {
  // Use the "cardLayoutType" and create seperate layout for product in client level.
  // Example: Lets say you want to change layout of card only in landing page
  //   where you placed the Product Card and in other places of site you want in
  //   default mode then based on `cardLayoutType` write a different layout in component level.
  console.debug(`Left for future use ${cardLayoutType}`);
  const actionView = (
    <ButtonList
      reverse={displayMode === ProductCardDisplayMode.OneByThree}
    >
      {wishListAction}
      {cartAction}
    </ButtonList>
  );
  return (
    <ProductCardLayoutWrapper
      className={`rz-product-card ${displayMode} rz-product-label-${labelColor}`}
      displayMode={displayMode || ProductCardDisplayMode.OneBySix}
    >
      {image && (
        <div className="container-image">
          <div className="image">{image}</div>
          {imageOverlayTop && (
            <div className="top-overlay">{imageOverlayTop}</div>
          )}
          {imageOverlayBottom && (
            <div className="bottom-overlay">{imageOverlayBottom}</div>
          )}
        </div>
      )}
      {heading && (
        <div className="container-heading">
          {heading}
        </div>
      )}
      {shortDesc && (
        <div className="container-short-desc">
          {shortDesc}
        </div>
      )}
      <div className="container-offer">
        {offer}
      </div>
      <div className="container-content">
        {price && (
          <div className="container-price">
            {price}
          </div>
        )}
        {actionView && (
          <div className="container-action">
            {actionView}
          </div>
        )}
      </div>
      {stockIndicatorView && (
        <div className="container-stock-indicator">
          {stockIndicatorView}
        </div>
      )}
      {variantsSwitch && (
        <div className="container-variant-switch">
          {variantsSwitch}
        </div>
      )}
    </ProductCardLayoutWrapper>
  );
};

BaseProductCardLayout.propTypes = {
  image: PropTypes.element,
  imageOverlayTop: PropTypes.element,
  imageOverlayBottom: PropTypes.element,
  heading: PropTypes.element,
  labelColor: PropTypes.string,
  shortDesc: PropTypes.element,
  offer: PropTypes.element,
  price: PropTypes.element,
  displayMode: PropTypes.oneOf([
    ProductCardDisplayMode.OneBySix,
    ProductCardDisplayMode.OneByFour,
    ProductCardDisplayMode.OneByThree,
  ]),
  cartAction: PropTypes.element,
  wishListAction: PropTypes.element,
  cardLayoutType: PropTypes.oneOf(Object.values(ProductCardLayoutMode)),
  variantsSwitch: PropTypes.element,
  stockIndicatorView: PropTypes.element,
};

export const BaseProductCardHeadingLayoutWrapper = styled.div``;

export const BaseProductCardHeadingLayout = ({
  name, sku,
}) => {
  return (
    <ProductCardHeadingLayoutWrapper
      className="heading-container"
    >
      {name}
      {sku}
    </ProductCardHeadingLayoutWrapper>
  );
};

BaseProductCardHeadingLayout.propTypes = {
  name: PropTypes.element,
  sku: PropTypes.element,
};

export const ProductCardLayoutWrapper = withDependencySupport(BaseProductCardLayoutWrapper, 'ProductCardLayoutWrapper');
export const ProductCardLayout = withDependencySupport(BaseProductCardLayout, 'ProductCardLayout');

export const ProductCardHeadingLayoutWrapper = withDependencySupport(BaseProductCardHeadingLayoutWrapper, 'ProductCardHeadingLayoutWrapper');
export const ProductCardHeadingLayout = withDependencySupport(BaseProductCardHeadingLayout, 'ProductCardHeadingLayout');

ProductCardLayout.propTypes = BaseProductCardLayout.propTypes;
