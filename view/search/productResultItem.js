import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch-dom';
import Link from 'next/link';
import { productImageForSuggestion } from '@/roanuz/view/product/models/productGallery';
import { Text12 } from '@/roanuz/typopgraphy';
import { ImageView } from '@/roanuz/view/image';
import { formatCurrency } from '@/roanuz/lib/cart';
import { asRem, changeContentAnimation } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import styled from 'styled-components';
import Config from '@/config';

export const BaseProductResultItemWrapper = styled.div`
  display: flex;
  margin-right: ${asRem(20)};
  margin-bottom: ${asRem(20)};

  >.left {
    width: ${asRem(80)};
    .rz-image-view {
      height: ${asRem(80)};
      width: 100%;
      padding: ${asRem(5)} 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      max-height: 100%;
      max-width: 100%;
    }
  }
  >.right {
    width: ${asRem(180)};
    padding-left: ${asRem(10)};

    .ais-sku {
      color: var(--color-disabled);
      font-size: ${asRem(12)};
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      margin-top: ${asRem(4)};
    }

    .ais-Highlight {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;  
      overflow: hidden;
    }

    .price-text {
      padding-top: ${asRem(4)};
      color: var(--color-button);
    }
  }

  mark {
    color: inherit;
    font-weight: bold;
    background-color: inherit;
  }

  .animate-price-text {
    animation: ${changeContentAnimation} 1s ease-in;
  }
`;

export function extractProductLink(hit) {
  const { url } = hit;
  let relativeUrl = url.split('//')[1].split('/').slice(1).join('/');
  if (relativeUrl.startsWith(`${Config.StoreViewCode}/`)) {
    relativeUrl = relativeUrl.split('/').slice(1).join('/');
  }
  if (relativeUrl.includes('product/view/id')) {
    let rebuiltRelativeUrl = relativeUrl.split('s/');
    rebuiltRelativeUrl = rebuiltRelativeUrl[1].replace('/', '');
    return `/${rebuiltRelativeUrl}.html`;
  }
  return `/${relativeUrl}`;
}

export function productRenderTest(hit) {
  let good = true;
  if (Config.RestrictProductByWebsiteEnable) {
    if (!hit.rz_visible_websites || !hit.rz_visible_websites.length) {
      good = false;
    }
    if (typeof hit.rz_visible_websites === 'string') {
      if (hit.rz_visible_websites !== Config.WebsiteKey.toUpperCase()) {
        good = false;
      }
    } else if (!hit.rz_visible_websites.includes(Config.WebsiteKey.toUpperCase())) {
      good = false;
    }
  }
  return good;
}

export const BaseProductResultItem = ({ hit, onProductClick }) => {
  const result = productRenderTest(hit);
  if (!result) { return null; }
  return (
    <ProductResultItemWrapper>
      <div className="left">
        <ImageView
          src={productImageForSuggestion(hit)}
          alt={`Image of ${hit.name}`}
          showDefaultPlaceholder
          skipMediaUrlFix={!hit.rz_gallery_meta}
        />
      </div>
      <div className="right">
        <div onClick={() => onProductClick(hit.name, extractProductLink(hit))} role="presentation">
          <Link href={extractProductLink(hit)} prefetch={false}>
            <a alt={`Link to ${hit.name}`}>
              <Highlight attribute="name" hit={hit} tagName="mark" />
            </a>
          </Link>
        </div>
        <Text12 className="ais-sku">{hit.sku}</Text12>
        {/* For Temporary display  */}
        {hit.price && (
          <Text12 className="price">{formatCurrency(hit.price.ISK.default, 'ISK')}</Text12>
        )}
        {/* <div className={`price-text ${hitB2BPrice ? 'animate-price-text' : null}`}> */}
        {/* Need a better way to find currency */}
        {/* {hitB2BPrice || formatCurrency(hit.price.ISK.default, 'ISK')}
        </div> */}
      </div>
    </ProductResultItemWrapper>
  );
};

BaseProductResultItem.propTypes = {
  hit: PropTypes.object,
  onProductClick: PropTypes.func,
};

export const ProductResultItemWrapper = withDependencySupport(BaseProductResultItemWrapper, 'ProductResultItemWrapper');
export const ProductResultItem = withDependencySupport(BaseProductResultItem, 'ProductResultItem');
