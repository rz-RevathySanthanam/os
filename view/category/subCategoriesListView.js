import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Display20 } from '@/roanuz/typopgraphy';
import { ImageView } from '@/roanuz/view/image';
import { Col } from '@/roanuz/layout';
import DefaultImage from '@/public/DefaultImage.png';
import Link from 'next/link';
import Config from '@/config';
import { translateV2 } from '@/roanuz/lib/utils';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { categoryLink } from './model';
import { Button } from '../button';

export const BaseSubCategoriesListViewWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-x: auto;
    @media screen and (min-width: ${Breakpoint.md}) {
      flex-wrap: wrap;
    }
    .item {
      margin: 0 ${asRem(34)} ${asRem(34)} 0;
  
      &:last-child {
        margin-right: 0;
      }
  
      .rz-image-view {
        img {
          max-width: ${asRem(150)};
          max-height: ${asRem(150)};

          @media screen and (min-width: ${Breakpoint.md}) {
            max-width: ${asRem(200)};
            max-height: ${asRem(200)};
          }
        }
      }
  
      >p {
        text-align: center;

        a {
          white-space: nowrap;
        }
      }
    }
  }
`;

export const BaseSubCategoriesListView = ({ category }) => {
  const [initCount, setInitCount] = useState(
    Config.CategoryPageSettings.subCategoriesListInitCount,
  );
  const countText = category.children.length - initCount;
  const categoryData = category.children.length > 0 && category.children;
  const items = categoryData && categoryData.slice(0, initCount);

  const isBrowser = () => typeof window !== 'undefined';

  const [width, setWidth] = useState(isBrowser() && window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (width <= 798) {
      setInitCount(category.children.length);
    }

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  const onClickEvent = () => {
    setInitCount(category.children.length);
  };

  return (
    <SubCategoriesListViewWrapper>
      {category.display_mode === 'PRODUCTS_AND_PAGE' && category.children.length >= 1 && (
        <>
          <div className="container">
            {items.map((item) => (
              <Col className="item" key={item.id}>
                <Display20>
                  <Link href={categoryLink(item)} prefetch={false}>
                    <a alt={`Link to ${item.name}`} className="plain">
                      <ImageView
                        src={item.image || DefaultImage}
                        alt={item.name}
                      />
                      {item.name}
                    </a>
                  </Link>
                </Display20>
              </Col>
            ))}
          </div>
          {items.length !== category.children.length && (
            <Button
              mode="primary"
              onClick={() => onClickEvent()}
              disabled={items.length === category.children.length}
            >
              {`${translateV2('button.SHOW_ALL_CATEGORIES')} (+${countText})`}
            </Button>
          )}
        </>
      )}
    </SubCategoriesListViewWrapper>
  );
};

BaseSubCategoriesListView.propTypes = {
  category: PropTypes.object.isRequired,
};

export const SubCategoriesListView = withDependencySupport(BaseSubCategoriesListView, 'SubCategoriesListView');
export const SubCategoriesListViewWrapper = withDependencySupport(BaseSubCategoriesListViewWrapper, 'SubCategoriesListViewWrapper');
