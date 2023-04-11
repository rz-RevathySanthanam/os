import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  InstantSearch, SearchBox, Hits,
  Highlight,
  Index,
  Configure,
  connectStateResults,
} from 'react-instantsearch-dom';
import styled, { css } from 'styled-components';
import algoliasearch from 'algoliasearch/lite';
import Config from '@/config';
import { withDependencySupport } from '@/roanuz/lib/dep';
import 'instantsearch.css/themes/satellite.css';
import { asRem, Breakpoint, changeContentAnimation } from '@/roanuz/lib/css';
import { Button } from '@/roanuz/view/button';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import { prepareSku } from '@/roanuz/view/customer/quickOrder/model';
import { Text12 } from '../typopgraphy';
import { formatCurrency } from '../lib/cart';

export const BaseProductListResultItemWrapper = styled.div`
  display: flex;
  margin-bottom: ${asRem(20)};
  justify-content: space-between;
  align-items: center;

  >.left {
    display: flex;
    gap: ${asRem(15)};
    align-items: flex-start;
    position: relative;
    flex-wrap: wrap;
    justify-content: space-between;
    @media screen and (min-width: ${Breakpoint.lg}) {
      gap: ${asRem(20)};
      align-items: center;
      flex-wrap: nowrap;
    }
    >.ais-Highlight, >a {
      max-width: ${asRem(180)};
      position: absolute;
      top: ${asRem(60)};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      padding-right: ${asRem(10)};
      @media screen and (min-width: ${Breakpoint.sm}) {
        max-width: ${asRem(300)};
      }
      @media screen and (min-width: ${Breakpoint.lg}) {
        margin-left: ${asRem(20)};
        position: relative;
        top: 0;
        display: inline-block;
        width: auto;
      }
    }
    >p {
      width: calc(100% - ${asRem(50)});
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @media screen and (min-width: ${Breakpoint.lg}) {
        min-width: ${asRem(80)};
        width: ${asRem(80)};
        text-align: left;
      }
    }
  }
  >.right {
    position: relative;
    z-index: 2;
    padding-left: ${asRem(10)};
    @media screen and (min-width: ${Breakpoint.lg}) {
      min-width: ${asRem(410)};
      justify-content: flex-end;
    }
    >div {
      margin: -${asRem(35)} 0 0;
      @media screen and (min-width: ${Breakpoint.lg}) {
        margin: 0;
      }
      >div:not(:first-child).price-qty-wrapper {
        .price-val {
          padding-top: 0;
          padding-bottom: ${asRem(10)};
          @media screen and (min-width: ${Breakpoint.lg}) {
            padding-bottom: 0;
          }
        }
      }
    }
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

    .rz-custom-inputbox {
      select {
        background-color: transparent;
      }
    }

    >p {
      text-align: right;
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

  .choose-btn {
    transform: rotate(45deg);
    cursor: pointer;
    ${(p) => p.disableHit && css`
      cursor: not-allowed;
    `}
  }

  ${(p) => p.disableHit && css`
    cursor: not-allowed;
    opacity: 0.6;
  `}
`;

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

export const ProductResultItem = ({ hit, selectProduct, disableHit }) => {
  const result = productRenderTest(hit);
  if (!result) { return null; }
  return (
    <ProductListResultItemWrapper disableHit={disableHit}>
      <div className="left">
        <Button
          noborder
          nomargin
          onClick={() => !disableHit && selectProduct(hit.sku)}
          onKeyDown={() => !disableHit && selectProduct(hit.sku)}
          icon={<CloseIcon />}
          className="choose-btn"
        />
        <Text12 className="ais-sku">{prepareSku(hit.sku)}</Text12>
        <Highlight attribute="name" hit={hit} tagName="mark" />
      </div>
      <div className="right">
        {hit.price && (
          <Text12 className="price">{formatCurrency(hit.price.ISK.default, 'ISK')}</Text12>
        )}
      </div>
    </ProductListResultItemWrapper>
  );
};

ProductResultItem.propTypes = {
  hit: PropTypes.object,
  selectProduct: PropTypes.func,
  disableHit: PropTypes.bool,
};

export const Content = connectStateResults(({ searchState, searchResults }) => {
  if (searchResults && searchResults.nbHits !== 0) {
    return null;
  }
  return (
    <div>
      No products has been found for
      {' '}
      {searchState.query}
    </div>
  );
});

export const BaseSearchProductsBarViewWrapper = styled.div`
  position: relative;
  transition: all 0.5s ease-out;

  .ais-SearchBox-input, .ais-SearchBox-form {
    background-color: inherit;
    box-shadow: none;
  }
  .ais-SearchBox-input {
    background-color: #fff;
    border-radius: ${asRem(6)};
    transition: all 0.5s ease-out;
  }

  ${(p) => p.showResult && css`
    .ais-SearchBox-input {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  `}

  .result-container {
    position: absolute;
    z-index: 101;
    background: #fff;
    padding: ${asRem(20)};
    max-height: ${asRem(350)};
    right: 0;
    left: 0;
    overflow: scroll;
    overflow-x: hidden;

    display: flex;
    font-size: ${asRem(14)};
    line-height: ${asRem(20)};
    font-weight: 500;
    border-radius: ${asRem(6)};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: 0 ${asRem(2)} ${asRem(12)} rgba(0, 0, 0, 0.08);

    .ais-Hits-list {
      padding: 0;
      margin: 0;
      flex-direction: column;

      .ais-Hits-item {
        padding: 0;
        margin: 0;
        box-shadow: none;

        >div {
          >.left {
            width: 100%;
            @media screen and (min-width: ${Breakpoint.lg}) {
              width: auto;
            }
            > p {
              min-width: ${asRem(200)};
              text-align: left;
            }
            >.ais-Highlight {
              top: unset;
              bottom: 0;
            }
          }
  
          >.right {
            align-self: flex-end;
            position: absolute;
            right: ${asRem(20)};
            @media screen and (min-width: ${Breakpoint.lg}) {
              min-width: ${asRem(150)};
              align-self: unset;
              position: relative;
            }
          }
        }
      }
    }

    h4 {
      padding-bottom: ${asRem(10)};
      color: var(--color-disabled);
    }

    a {
      color: var(--color-text);
    }

    .product-container {
      width: 100%;
      .ais-Hits-list {
        .ais-Hits-item{
          display: block;
          font-size: ${asRem(14)};
          line-height: ${asRem(20)};
          font-weight: 500;
        }
      }
      .ais-Hits-list {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  .ais-SearchBox {
    width: 100%;
  }
`;

export const SearchProductsBarView = ({
  productIndexName,
  selectProduct,
  selectedProductsList,
}) => {
  const { AlgoliaAppKey, AlgoliaSearchKey } = Config.AlgoliaConfiguration;
  const searchClient = algoliasearch(AlgoliaAppKey, AlgoliaSearchKey);
  const [showResult, setShowResult] = useState(false);

  const [prefetchResults, setPrefetchResults] = useState(false);

  const hideResult = (e) => {
    setTimeout(() => {
      // Short break to ensure click happend before hide
      setShowResult(false);
      if (!e.target.value) {
        setPrefetchResults(0);
      }
    }, 300);
  };

  const [previousQuery, setPreviousQuery] = useState();

  const prepareSearchClient = {
    search(requests) {
      if (previousQuery === requests[0].params.query) {
        return null;
      }
      setPreviousQuery(requests[0].params.query);
      if (prefetchResults === 0) {
        return null;
      }
      if (requests.every(({ params }) => !params.query)) {
        return null;
      }
      return searchClient.search(requests);
    },
  };

  const showResultContainer = (e) => {
    if (e.target.value) {
      setShowResult(true);
    } else if (!Config.AlgoliaPrefetchSearch) {
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  return (
    <BaseSearchProductsBarViewWrapper showResult={showResult}>
      <InstantSearch
        searchClient={prepareSearchClient}
        indexName={productIndexName}
      >
        {Config.RestrictProductByWebsiteEnable && (
          <Configure filters={`rz_visible_websites:${Config.WebsiteKey.toUpperCase()}`} />
        )}
        <SearchBox
          translations={{
            placeholder: 'Vörunúmer / Vöruheiti',
          }}
          onBlur={hideResult}
          onChange={() => [setPrefetchResults(1), setShowResult(true)]}
          onClick={showResultContainer}
          onFocus={showResultContainer}
        />
        {showResult && (
          <div className="result-container">
            <div className="product-container">
              <Index indexName={productIndexName}>
                <Hits
                  hitComponent={
                    (hit) => (
                      <ProductResultItem
                        hit={hit.hit}
                        selectProduct={selectProduct}
                        disableHit={selectedProductsList.includes(prepareSku(hit.hit.sku))}
                      />
                    )
                  }
                />
              </Index>
              <Content />
            </div>
          </div>
        )}
      </InstantSearch>
    </BaseSearchProductsBarViewWrapper>
  );
};

SearchProductsBarView.propTypes = {
  productIndexName: PropTypes.string.isRequired,
  selectProduct: PropTypes.func,
  selectedProductsList: PropTypes.array,
};

export const SearchProductsBarViewWrapper = withDependencySupport(BaseSearchProductsBarViewWrapper, 'SearchProductsBarViewWrapper');
export const ProductListResultItemWrapper = withDependencySupport(BaseProductListResultItemWrapper, 'ProductListResultItemWrapper');
