import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { TextMedium14 } from '@/roanuz/typopgraphy';
import { ReactComponent as BaseBreadCrumbArrowIcon } from '@/roanuz/view/imgs/BreadCrumbArrow.svg';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { parser } from '@/roanuz/store/modelParser';
import { SVGIcon } from './icon';
import { categoryLink } from './category/model';

export const ItemViewWrapper = styled(TextMedium14)`
  color: var(--color-button);
  max-width: 24ch;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;

  ${(p) => p.isActive && css`
    color: var(--color-text);
  `};

  .clickable-link {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const BaseItemView = ({
  text, href, alt, isActive,
}) => {
  return (
    <Link href={href}>
      <ItemViewWrapper
        isActive={isActive}
        as="a"
        alt={alt || text}
        href={href}
      >
        {text}
      </ItemViewWrapper>
    </Link>
  );
};

BaseItemView.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  alt: PropTypes.string,
  isActive: PropTypes.bool,
};

export const BreadcrumbItemView = withDependencySupport(BaseItemView, 'BreadcrumbItemView');

export const BaseBreadcrumbViewWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  align-items: center;
  > li {
    display: flex;
    > span {
      display: block;
      color: var(--color-breadcrumb-inactive);
    }

    > a {
      color: var(--color-breadcrumb);
    }

    svg {
      color: var(--color-grey);
      padding: 0 ${asRem(7)};
    }

    & :last-child {
      > span, svg {
        display: none;
      }
    }
  }
`;

export const BreadcrumbView = ({ links }) => {
  const handler = (link) => {
    if (!link.isActive) {
      return (<BreadcrumbItemView {...link} />);
    }
    return (<TextMedium14 as="label">{link.text}</TextMedium14>);
  };
  return (
    <BreadcrumbViewWrapper>
      {links.map((link) => (
        <li key={link.text}>
          {handler(link)}
          <TextMedium14 as="span">
            <SVGIcon heightPx={10}>
              <BreadCrumbArrowIcon />
            </SVGIcon>
          </TextMedium14>
        </li>
      ))}
    </BreadcrumbViewWrapper>
  );
};

BreadcrumbView.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape(BreadcrumbItemView.propTypes)),
};

export function buildCategoryBreadcrumbLinks({
  category,
  includeHome = true,
  includeCategory = true,
}) {
  const links = [];

  if (includeHome) {
    links.push(...parser('any.categoryBreadCrumbSet'));
  }

  if (category) {
    const urlSuffix = category.url_suffix;

    if (category.breadcrumbs) {
      category.breadcrumbs.forEach((item) => {
        let categoryPath = item.category_url_path;
        if (!categoryPath.startsWith('/')) {
          categoryPath = `/${categoryPath}`;
        }
        links.push({
          text: item.category_name,
          href: `${categoryPath}${urlSuffix}`,
        });
      });
    }

    if (includeCategory && category.url_path) {
      let categoryPath = category.url_path;
      if (!categoryPath.startsWith('/')) {
        categoryPath = `/${categoryPath}`;
      }
      links.push({
        text: category.name,
        href: `${categoryPath}${urlSuffix}`,
        isActive: true,
      });
    }
  }

  return links;
}

export function buildCategoryTitle(category, separator) {
  let titleItems = [category.name];
  const breadcrumbs = category.breadcrumbs || [];
  const sep = ` ${separator || '|'} `;
  if (breadcrumbs) {
    const names = breadcrumbs.map((x) => x.category_name);
    titleItems = [...names, ...titleItems];
  }
  return titleItems.reverse().join(sep);
}

export const BreadcrumbViewWrapper = withDependencySupport(BaseBreadcrumbViewWrapper, 'BreadcrumbViewWrapper');

export function buildProductBreadcrumbLinks({
  product,
  includeHome = true,
  includeProduct = true,
}) {
  const links = [];

  if (includeHome) {
    links.push(...parser('any.categoryBreadCrumbSet'));
  }

  if (product.category) {
    const urlSuffix = product.category.url_suffix;

    product.category.breadcrumbs.forEach((item) => {
      let categoryPath = item.category_url_path;
      if (!categoryPath.startsWith('/')) {
        categoryPath = `/${categoryPath}`;
      }
      links.push({
        text: item.category_name,
        href: `${categoryPath}${urlSuffix}`,
      });
    });
  }

  if (includeProduct) {
    links.push({
      text: product.name,
      href: product.productLink,
      isActive: true,
    });
  }

  return links;
}

export function buildBrandBreadcrumbLinks({
  brandMeta,
  category = null,
  includeHome = true,
  includeBrand = true,
}) {
  const links = [];

  if (includeHome) {
    links.push(...parser('any.brandBreadCrumbSet'));
  }

  if (includeBrand) {
    links.push({
      text: brandMeta.name,
      href: brandMeta.link,
      isActive: !category,
    });
  }

  if (category) {
    links.push({
      text: category.name,
      href: categoryLink(category),
      isActive: true,
    });
  }

  return links;
}

export function buildBrandListBreadcrumbLinks() {
  const links = [];

  links.push(...parser('any.brandListBreadCrumbSet'));

  return links;
}

export const BreadCrumbArrowIcon = withDependencySupport(BaseBreadCrumbArrowIcon, 'BreadCrumbArrowIcon');
