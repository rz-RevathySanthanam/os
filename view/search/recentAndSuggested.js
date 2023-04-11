import React from 'react';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as ClockIcon } from '@/roanuz/view/imgs/ClockIcon.svg';
import { ReactComponent as SearchIcon } from '@/roanuz/view/imgs/SearchIcon.svg';
import { Button } from '@/roanuz/view/button';
import { ReactComponent as DeleteIcon } from '@/roanuz/view/imgs/DeleteIcon.svg';
import {
  Text16,
  Bold16,
  Small,
} from '@/roanuz/typopgraphy';
import { translateV2 } from '@/roanuz/lib/utils';
import { Row } from '@/roanuz/layout';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseRecentAndSuggestedWrapper = styled.div`
  position: absolute;
  margin-top: ${asRem(100)};
  @media screen and (min-width: ${Breakpoint.sm}) {
    margin-left: ${asRem(50)};
  }
  a:hover {
    text-decoration: unset;
  }
  .suggested-products {
    display: flex;
    gap: ${asRem(16)};
    margin-bottom: ${asRem(32)};
    flex-wrap: wrap;
    .suggested-item {
      background-color: var(--color-inner-border);
      padding: ${asRem(8)};
      border-radius: ${asRem(4)};
      .rz-svg-icon {
        color: var(--color-active);
      }
    }
  }
  .recent-search-list {
    margin-top: ${asRem(10)};
  }
  .recent-search-item {
    border-top: ${asRem(1)} solid var(--color-border);
    >.rz-row {
      gap: ${asRem(16)};
    }
    &:last-child {
      border-bottom: ${asRem(1)} solid var(--color-border);
    }
    .rz-button {
      gap: ${asRem(16)};
      margin: ${asRem(8)} 0;
      p {
        width: ${asRem(250)};
        @media screen and (min-width: ${Breakpoint.sm}) {
          width: ${asRem(300)};
        }
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: left;
      }
    }
  }
`;

export const RecentAndSuggested = ({ suggestedProd, recent, removeRecentSearch }) => {
  return (
    <RecentAndSuggestedWrapper className="recent-search">
      {suggestedProd.length > 0 && (
        <div className="suggested-products">
          {suggestedProd.map((item) => (
            <Link href={`/catalogsearch/result?q=${item}`}>
              <a
                alt={`Go to ${item}`}
              >
                <Button
                  icon={<SearchIcon />}
                  iconHeightPx={18}
                  noborder
                  nomargin
                  className="suggested-item"
                >
                  <Small as="p">
                    {translateV2('search.TRY_THIS')}
                    <span className="quote"> &quot;</span>
                    <span className="item-name">
                      {item}
                    </span>
                    <span className="quote">&quot;</span>
                  </Small>
                </Button>
              </a>
            </Link>
          ))}
        </div>
      )}
      {recent?.length > 0 && (
        <>
          <Text16 as="p">{translateV2('search.RECENT_SEARCH')}</Text16>
          <div className="recent-search-list">
            {recent.slice(0, 3).map((searchItem) => (
              <div className="recent-search-item">
                <Row spaceBetween alignCenter>
                  <Link href={searchItem.link}>
                    <a
                      alt={`Go to ${searchItem.label}`}
                    >
                      <Button
                        icon={<ClockIcon />}
                        iconHeightPx={20}
                        noborder
                        nomargin
                      >
                        <Bold16 as="p">{searchItem.label}</Bold16>
                      </Button>
                    </a>
                  </Link>
                  <Button
                    icon={<DeleteIcon />}
                    iconHeightPx={20}
                    noborder
                    nomargin
                    onClick={() => removeRecentSearch(searchItem.label)}
                  />
                </Row>
              </div>
            ))}
          </div>
        </>
      )}
    </RecentAndSuggestedWrapper>
  );
};

RecentAndSuggested.propTypes = {
  suggestedProd: PropTypes.array,
  recent: PropTypes.array,
  removeRecentSearch: PropTypes.func,
};

export const RecentAndSuggestedWrapper = withDependencySupport(BaseRecentAndSuggestedWrapper, 'RecentAndSuggestedWrapper');
