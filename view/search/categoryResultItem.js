import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch-dom';
import Link from 'next/link';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import styled from 'styled-components';
import Config from '@/config';

export const CategoryResultItemWrapper = styled.div`
  margin-right: ${asRem(10)};
  margin-bottom: ${asRem(10)};
  mark {
    color: inherit;
    font-weight: bold;
    background-color: inherit;
  }
`;

export function extractCategoryLink(hit) {
  const { url } = hit;
  let relativeUrl = url.split('//')[1].split('/').slice(1).join('/');
  if (Config.StoreViewCode && relativeUrl.startsWith(`${Config.StoreViewCode}/`)) {
    if (relativeUrl.startsWith(`${Config.StoreViewCode}/`)) {
      relativeUrl = relativeUrl.split('/').slice(1).join('/');
    } else {
      return null;
    }
  }
  return `/${relativeUrl}`;
}

export const BaseCategoryResultItem = ({ hit, onCategoryClick }) => {
  // const data = useContext(StoreConfigContext);
  const url = extractCategoryLink(hit);
  if (!url) { return null; }
  // if (!data.categoryTreeData.listOfAllChildCategories.includes(parseInt(hit.objectID, 10))) {
  //   return null;
  // }
  return (
    <CategoryResultItemWrapper onClick={() => onCategoryClick(hit.name, extractCategoryLink(hit))}>
      <Link href={extractCategoryLink(hit)} prefetch={false}>
        <a alt={`Link to ${hit.name}`}>
          <Highlight attribute="name" hit={hit} tagName="mark" />
        </a>
      </Link>
    </CategoryResultItemWrapper>
  );
};

BaseCategoryResultItem.propTypes = {
  hit: PropTypes.object,
  onCategoryClick: PropTypes.func,
};

export const CategoryResultItem = withDependencySupport(BaseCategoryResultItem, 'CategoryResultItem');
