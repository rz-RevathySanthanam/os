import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import Link from 'next/link';
import { Display18, DisplayBold30 } from '@/roanuz/typopgraphy';
import { BreadcrumbView, buildBrandListBreadcrumbLinks } from '@/roanuz/view/breadcrumb';
import { BrandListPageLayout } from '@/roanuz/layout/brandList/page';
import { withDependencySupport } from '@/roanuz/lib/dep';

const BrandListViewWrapper = styled.div`
  h1 {
    padding: ${asRem(20)} 0;
    border-bottom: ${asRem(1)} solid var(--color-border-2);
    margin-bottom: ${asRem(30)};
    font-size: ${asRem(30)};
    font-weight: 900;
    line-height: ${asRem(40)};
  }

  .brands {
    column-count: 1;
    text-align: center;

    div {
      display: inline-block;
      width: 100%;
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
      height: ${asRem(40)};
    }
    
    @media screen and (min-width: ${Breakpoint.sm}) {
      column-count: 3;
    }

    @media screen and (min-width: ${Breakpoint.md}) {
      column-count: 4;
    }

    a {
      &:hover {
        color: #23527c;
        text-decoration: none;
      }
    }
  }
`;

export const BaseBrandListView = ({ brands, pageTitle }) => {
  // Sorting brands alphabeticaly
  const sortedBrands = brands && [...brands].sort(
    (x, y) => x.key.localeCompare(y.key, undefined, { numeric: true }),
  );

  const brandsList = (
    <div className="brands">
      {sortedBrands && sortedBrands.map((brand) => (
        <div key={brand.key}>
          <Link href={`brand/${brand.key}`}>
            <a title={brand.name}>
              <Display18 as="span">
                {brand.name}
              </Display18>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <BrandListViewWrapper>
      <BrandListPageLayout
        breadcrumb={(
          <BreadcrumbView links={buildBrandListBreadcrumbLinks()} />
        )}
        content={brandsList}
        title={<DisplayBold30 as="h1">{pageTitle}</DisplayBold30>}
      />
    </BrandListViewWrapper>
  );
};

BaseBrandListView.propTypes = {
  brands: PropTypes.array,
  pageTitle: PropTypes.string,
};

export const BrandListView = withDependencySupport(BaseBrandListView, 'BrandListView');
