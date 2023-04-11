import React from 'react';
import PropTypes from 'prop-types';
import {
  InstantSearch, Hits,
  Index,
  Configure,
} from 'react-instantsearch-dom';
import styled, { css } from 'styled-components';
import Config from '@/config';
import { withDependencySupport } from '@/roanuz/lib/dep';
import 'instantsearch.css/themes/satellite.css';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { translateV2 } from '@/roanuz/lib/utils';
import { SearchBoxView } from '@/roanuz/view/search/searchBoxView';
import { CategoryResultItem } from '@/roanuz/view/search/categoryResultItem';
import { ProductResultItem } from '@/roanuz/view/search/productResultItem';
import { RecentAndSuggested } from '@/roanuz/view/search/recentAndSuggested';

export const BaseSearchBarViewWrapper = styled.div`
  position: relative;
  transition: all 0.5s ease-out;
  width: 100%;

  .ais-SearchBox-input, .ais-SearchBox-form {
    background-color: inherit;
    box-shadow: none;
    height: ${asRem(48)};
    border-color: transparent;
  
    &:focus {
      border-color: var(--color-active);
    }
  }
  .ais-SearchBox-input {
    background-color: var(--color-search-bg);
    border-radius: ${asRem(30)};
    transition: all 0.5s ease-out;
  }

  ${(p) => p.showResult && css`
    .ais-SearchBox-input {
      border-radius: ${asRem(5)};
    }
  `}

  &.search-input {
    width: 100%;
    display: flex;
    input[type="search"]::-webkit-search-cancel-button {
      display: none;
    }
    .search-form {
      display: flex;
      flex: 1;
      align-items: center;
      width: 100%;
      padding: ${asRem(14)} ${asRem(16)};
      border: ${asRem(1)} solid var(--color-active);
      border-radius: ${asRem(24)};
      background: var(--color-search-bg);

      >.rz-button {
        padding: 0;
        margin-left: ${asRem(15)};
      }

      .search-input-box {
        margin-left: ${asRem(8)};
        border: none;
        flex: 1;
        background: var(--color-search-bg);

        &:focus-visible {
          outline: none;
        }

        &::placeholder {
          color: var(--color-text);
        }
      }

      @media screen and (min-width: ${Breakpoint.md}) {
        margin: 0 ${asRem(24)};
      }
    }

    .result-container {
      overflow: unset;
      overflow-y: auto;
      height: calc(100vh - ${asRem(80)});
      max-height: calc(100vh - ${asRem(80)});
      box-shadow: none;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      flex-wrap: wrap;
      z-index: 4;
      position: absolute;
      top: ${asRem(80)};
      left: 0;
      padding: 0;
      margin: 0;

      @media screen and (min-width: ${Breakpoint.lg}) {
        flex-wrap: nowrap;
      }

      h4 {
        padding-bottom: ${asRem(46)};
        color: var(--color-text);
      }
  
      .ais-sku {
        color: var(--color-text-secondary);
      }

      .product-container, .category-container {
        padding-left: ${asRem(16)};
        border: none;
      }

      .category-container {
        border: none;
        margin: 0;
        .ais-Hits {
          .ais-Hits-item {
            a {
              display: inline-block;
              padding: ${asRem(10)} ${asRem(22)};
              font-size: ${asRem(14)};
            }
          }
        }
      }
  
      .product-container {
        padding: 0;
        padding-bottom: ${asRem(30)};
        .ais-Hits-list {
          justify-content: center;
          @media screen and (min-width: ${Breakpoint.md}) {
            justify-content: flex-start;
            width: ${asRem(915)};
          }
          .ais-Hits-item {
            padding-bottom: ${asRem(20)};
            margin-bottom: ${asRem(60)};
            @media screen and (min-width: ${Breakpoint.sm}) {
              border-bottom: none;
              padding-bottom: 0;
            }
          }
        }
      }
    }

    @media screen and (min-width: ${Breakpoint.sm}) {
      .result-container {
        margin: 0 ${asRem(24)};
        gap: ${asRem(40)};
        .product-container {
          .ais-Hits-list {
            width: 100%;
          }
        }
        .category-container .ais-Hits-list {
          width: 100%;
        }
      }
    }

    @media screen and (min-width: ${Breakpoint.md}) {
      .result-container {
        .product-container {
          .ais-Hits-list {
            width: ${asRem(400)};
          }
        }
        .category-container .ais-Hits-list {
          width: ${asRem(300)};
        }
      }
    }

    @media screen and (min-width: ${Breakpoint.lg}) {
      .result-container {
        min-width: ${asRem(1115)};
        .product-container {
          .ais-Hits {
            .ais-Hits-list {
              width: ${asRem(670)};
            }
          }
        }
        .category-container .ais-Hits-list {
          width: ${asRem(250)};
        }
      }
    }
  }

  .result-container {
    position: absolute;
    z-index: 101;
    background: #fff;
    padding: ${asRem(20)};
    max-height: ${asRem(350)};
    right: 0;
    overflow: scroll;

    display: flex;
    font-size: ${asRem(14)};
    line-height: ${asRem(20)};
    font-weight: 500;
    border-radius: ${asRem(10)};
    border-top-right-radius: 0;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);

    .ais-Hits-list {
      padding: 0;
      margin: 0;

      .ais-Hits-item {
        padding: 0;
        margin: 0;
        box-shadow: none;
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
      padding-top: ${asRem(20)};
      .ais-Hits-list {
        .ais-Hits-item{
          font-size: ${asRem(14)};
          line-height: ${asRem(20)};
          font-weight: 500;
        }
      }
    }

    .category-container {
      .ais-Hits-list {
        .ais-Hits-item{
          font-size: ${asRem(16)};
          line-height: ${asRem(21)};
          font-weight: 500;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .result-container {
      flex-flow: column-reverse;
      width: 100%;
    }
  }

  @media screen and (min-width: ${Breakpoint.sm}) {
    .result-container {
      .product-container {
        padding-top: ${asRem(20)};
        padding-left: ${asRem(20)};
        .ais-Hits-list {
          display: flex;
          flex-wrap: wrap;
        }
      }

      .category-container {
        margin-top: ${asRem(20)};
        margin-left: ${asRem(20)};
        border-right: 1px solid var(--color-disabled-3);
      }
    }
  }

  @media screen and (min-width: ${Breakpoint.md}) {
    .result-container {
      .product-container {
        .ais-Hits-list {
          width: ${asRem(580)};
        }
      }
      .category-container .ais-Hits-list {
        width: ${asRem(200)};
      }
    }
  }

  @media screen and (min-width: ${Breakpoint.lg}) {
    .result-container {
      min-width: ${asRem(950)};
      .product-container {
        .ais-Hits-list {
          width: ${asRem(580)};
        }
      }
      .category-container .ais-Hits-list {
        width: ${asRem(300)};
      }
    }
  }
`;

export const SearchBarView = ({
  productIndexName,
  categoryIndexName,
  searchText,
  menuContext,
  searchClient,
  showResult,
  suggestedProd,
  eventHandlers,
  recent,
}) => {
  const {
    hideResult,
    onSubmitEvent,
    showResultContainer,
    onFocus,
    onChangeEvent,
    removeRecentSearch,
    updateRecentSearch,
  } = eventHandlers;
  return (
    <SearchBarViewWrapper showResult={showResult} className="search-input">
      <InstantSearch
        searchClient={searchClient}
        indexName={productIndexName}
      >
        {Config.RestrictProductByWebsiteEnable && (
          <Configure filters={`rz_visible_websites:${Config.WebsiteKey.toUpperCase()}`} />
        )}
        <SearchBoxView
          searchText={searchText}
          menuContext={menuContext}
          translations={{
            placeholder: `${translateV2('search.SEARCH')}`,
          }}
          onFocus={onFocus}
          onBlur={hideResult}
          onChange={onChangeEvent}
          onSubmit={onSubmitEvent}
          onClick={showResultContainer}
          autoFocus={Config.SearchBarSettings && Config.SearchBarSettings.enableAutoFocus}
        />
        {!showResult && Config.SearchBarSettings.showRecentSearch && (
          <RecentAndSuggested
            suggestedProd={suggestedProd}
            recent={recent}
            removeRecentSearch={removeRecentSearch}
          />
        )}
        {showResult && (
          <div className="result-container">
            <div className="category-container">
              <h4>{translateV2('category.CATEGORIES')}</h4>
              <Index indexName={categoryIndexName}>
                <Hits
                  hitComponent={({ hit }) => (
                    <CategoryResultItem
                      hit={hit}
                      onCategoryClick={updateRecentSearch}
                    />
                  )}
                />
              </Index>
            </div>
            <div className="product-container">
              <h4>{translateV2('search.SEARCH_RESULT')}</h4>
              <Index indexName={productIndexName}>
                <Hits
                  hitComponent={({ hit }) => (
                    <ProductResultItem
                      hit={hit}
                      onProductClick={updateRecentSearch}
                    />
                  )}
                />
              </Index>
            </div>
          </div>
        )}
      </InstantSearch>
    </SearchBarViewWrapper>
  );
};

SearchBarView.propTypes = {
  productIndexName: PropTypes.string.isRequired,
  categoryIndexName: PropTypes.string.isRequired,
  searchText: PropTypes.string,
  menuContext: PropTypes.object,
  searchClient: PropTypes.string,
  showResult: PropTypes.bool,
  suggestedProd: PropTypes.array,
  eventHandlers: PropTypes.object,
  recent: PropTypes.array,
};

export const SearchBarViewWrapper = withDependencySupport(BaseSearchBarViewWrapper, 'SearchBarViewWrapper');
