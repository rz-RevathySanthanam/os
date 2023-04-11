import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import {
  Text16, Bold16,
} from '@/roanuz/typopgraphy';
import { asRem, Breakpoint, changeContentAnimation } from '@/roanuz/lib/css';
import { RawHtmlView } from '@/roanuz/view/rawHtml';
import {
  ProductCardLayout,
  ProductCardHeadingLayout,
  ProductCardLayoutMode,
} from '@/roanuz/layout/product/product';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { NoImageView, ImageView } from '../image';
import {
  ProductLabelView,
  ProductPriceHeadView,
  LabelKind,
  ProductPriceTextView,
} from './label';
import { StoreStockIndicatorView } from './storeStockIndicator';

export const BaseProductCardViewWrapper = styled.div`
  cursor: pointer;
  > .rz-product-card {
    > .container-heading {
      .title {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sku {
        color: var(--color-text);
      }
    }
    > .container-content {
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      @media screen and (min-width: ${Breakpoint.lg}) {
        display: flex;
      }
      > .container-price {
        .stock-indicator {
          margin-top: ${asRem(6)};
        }
      }
      > .container-action {
        @media screen and (min-width: ${Breakpoint.sm}) {
          opacity: 0;
        }
        .rz-button-atc {
          margin-left: ${asRem(16)};
          button {
            width: ${asRem(40)};
            height: ${asRem(40)};
            padding: ${asRem(10)};
            border: none;
            span {
              display: none;
            }
          }
        }
        // .rz-button-atw.rz-button-wrapper {
        //   margin-left: ${asRem(16)};
        // }

        .rz-button-atw {
          button {
            border-radius: 50%;
            span {
              display: none;
            }
            & :hover {
              background-color: var(--color-border);
            }
          }
        }
      }
    }
    &:hover {
      > .container-content {
        > .container-action {
          opacity: 1;
        }
      }
    }
  }
  .container-price {
    .price {
      &.no-price {
        min-height: 32px;
        display: block;
      }
    }
  }
  ${(p) => p.requirePriceUpdate && css`
    .container-price .price, .container-offer { 
      animation: ${changeContentAnimation} 1s ease-in;
    }
  `}
`;

export const BaseProductCardView = ({
  product, displayMode,
  addToCart, addToWishList,
  showShortDesc,
  className,
  cardLayoutType,
  variantsSwitch,
}) => {
  const stockIndicatorItems = [
    { status: product.stockStatus.onWeb, name: translateV2('delivery.PRODUCT_CARD_STOCK_ON_WEB'), type: 'onWeb' },
    { status: product.stockStatus.onStore, name: translateV2('delivery.PRODUCT_CARD_STOCK_ON_STORE'), type: 'onStore' },
  ];
  const topOverlay = product.label && (
    <ProductLabelView
      text={product.label}
      kind={product.labelKind}
      product={product}
      isCardView
    />
  );

  const imageView = product.gallery.hasImage
    ? (
      <Link href={product.productLink} prefetch={false}>
        <a>
          <ImageView
            src={product.gallery.smallImage.url}
            alt={`Image of ${product.gallery.smallImage.label}`}
            showDefaultPlaceholder
            skipMediaUrlFix={!product.gallery.hasRzGalleryMeta}
          />
        </a>
      </Link>
    )
    : (
      <NoImageView />
    );

  const headingView = (
    <ProductCardHeadingLayout
      name={(
        <Bold16 className="title">
          <Link href={product.productLink} prefetch={false}>
            <a className="plain hover-underline">
              {product.name}
            </a>
          </Link>
        </Bold16>
      )}
      brandName={(
        <Text16 as="h2" className="brand-name">
          BRAND
        </Text16>
      )}
      sku={(
        <Text16 as="div" className="sku">
          {product.sku}
        </Text16>
      )}
    />
  );

  const offerView = (<ProductPriceHeadView product={product} />);
  const onlyDiscountView = (<ProductPriceHeadView product={product} onlyDiscountView />);

  const priceView = (<ProductPriceTextView product={product} displayMode={displayMode} />);

  let labelColor = null;

  if (product.labelKind && product.label) {
    switch (product.labelKind) {
      case LabelKind.New:
        labelColor = 'green';
        break;
      case LabelKind.Refurbished:
        labelColor = 'purple';
        break;
      default:
        labelColor = 'yellow';
        break;
    }
  }

  const stockIndicatorView = (
    <StoreStockIndicatorView items={stockIndicatorItems} asList showIcons />
  );

  return (
    <ProductCardViewWrapper
      displayMode={displayMode}
      className={className}
      requirePriceUpdate={product.hasB2BPrice}
    >
      <ProductCardLayout
        imageOverlayTop={topOverlay}
        image={imageView}
        heading={headingView}
        labelColor={labelColor}
        shortDesc={showShortDesc && (
          <Text16 as="div">
            <RawHtmlView
              html={product.shortDesc || ''}
            />
          </Text16>
        )}
        offer={offerView}
        onlyDiscountView={onlyDiscountView}
        price={priceView}
        // action={actionView}
        displayMode={displayMode}
        cartAction={addToCart}
        wishListAction={addToWishList}
        sku={product.sku}
        stockIndicatorView={stockIndicatorView}
        cardLayoutType={cardLayoutType}
        variantsSwitch={variantsSwitch}
      />
    </ProductCardViewWrapper>
  );
};

BaseProductCardView.propTypes = {
  product: PropTypes.object,
  displayMode: ProductCardLayout.propTypes.displayMode,
  addToCart: PropTypes.element,
  addToWishList: PropTypes.element,
  showShortDesc: PropTypes.bool,
  className: PropTypes.string,
  cardLayoutType: PropTypes.oneOf(Object.values(ProductCardLayoutMode)),
  variantsSwitch: PropTypes.element,
};

export const ProductCardViewWrapper = withDependencySupport(BaseProductCardViewWrapper, 'ProductCardViewWrapper');
export const ProductCardView = withDependencySupport(BaseProductCardView, 'ProductCardView');
