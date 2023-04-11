import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { ReactComponent as DownArrowIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { ReactComponent as BackArrowIcon } from '@/roanuz/view/imgs/BackArrowIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { SVGIcon } from '@/roanuz/view/icon';
import { Row, Col } from '@/roanuz/layout';
import {
  TextMedium16, DisplayMedium18, DisplayBold20, DisplayMedium20,
  TextBold16, Display20,
} from '@/roanuz/typopgraphy';
import { translateV2 } from '@/roanuz/lib/utils';
import LoadingView from '@/roanuz/components/LoadingView';
import { categoryLink } from '../category/model';
import { MenuItem } from './menuItemView';
import { ImageView } from '../image';

// Hover View::Start
const LinkItemsWrapper = styled.ul`
  min-width: ${asRem(160)};
  @media screen and (min-width: ${Breakpoint.lg}) {
    margin-right:  ${asRem(40)};
  }
  ul:empty {
    display: none;
  }
  li {
    a {
      display: block;
      padding-bottom: ${asRem(12)};
    }
    &.level-3 {
      >a {
        font-weight: bold;
      }
      &.has-children {
        ul {
          >li {
            a {
              padding-left: ${asRem(12)};
              border-left: 1px solid var(--color-disabled-3);
            }
            &:last-child {
              a {
                padding-bottom: 0;
              }
            }
          }
        }
      }
    }

    ul {
      padding-bottom: ${asRem(12)};
    }
  }
`;

export const BaseCategoryMenuTreeViewWrapper = styled.div`
  position: relative;
  display: none;
  &.show-category-menu {
    display: block;
    .category-menu-container {
      height: auto;
      padding-top: ${asRem(25)};
      @media screen and (min-width: ${Breakpoint.md}) {
        padding-top: ${asRem(40)};
      }
    }
  }
  .category-menu-container {
    left: -100%;
    position: absolute;
    z-index: 102;
    display: flex;
    a { 
      color: var(--color-text);
    }
    .overflow-container {
      position: relative;
      &:before {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: -${asRem(12)};
        left: 50%;
        border-top: ${asRem(8)} solid transparent;
        border-bottom: ${asRem(8)} solid transparent;
        border-right: ${asRem(8)} solid #fff;
        transform: rotate(90deg);
      }
      ul {
        overflow-y: auto;
        max-height: calc(100vh - ${asRem(173)}); // Height of TL header + 20
      }
    }

    li {
      &.active {
        a {
          color: var(--color-button);
        }

        .rz-svg-icon {
          color: var(--color-button);
        }
      }
    }

    .level-parent {
      width: ${asRem(278)};
      background-color: #fff;
      border-radius: ${asRem(8)};
      padding: ${asRem(10)} 0;
      transition: all 0.35s ease-out;
      box-shadow: -8px 4px 12px rgba(17, 17, 17, 0.3);
      position: relative;
      &.has-child-level {
        border-top-right-radius: 0;
      }

      .rz-svg-icon {
        color: var(--color-disabled);
        svg {
          transform: rotate(-90deg);
        }
      }

      li {
        padding: ${asRem(10)} ${asRem(20)};

        &:hover {
          background: #7e7e7e12; 
        }

        a {
          display: flex;
          justify-content: space-between;

          >span {
            display: block;
            flex: 1;
          }
        }
      }
    }

    .level-n {
      z-index: 100;
      background-color: #fff;
      border-radius: ${asRem(8)};
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding: ${asRem(30)};
      box-shadow: 6px 4px 12px rgba(17, 17, 17, 0.35);
      border-left: ${asRem(1)} solid var(--color-border);

      font-weight: 500;
      font-size: ${asRem(14)};
      line-height: ${asRem(20)};
      /* column-count: 1; */
      /* column-fill: auto; */
      overflow-x: auto;
      max-height: calc(100vh - ${asRem(173)}); // Height of TL header + 20
      display: flex;
      &.moreThan-20>ul {
        column-count: 2;
        height: fit-content;
        li {
          -webkit-column-break-inside: avoid;
          page-break-inside: avoid;
          break-inside: avoid;
        }
      }
      &.moreThan-40>ul {
        @media screen and (min-width: ${Breakpoint.md}) {
          column-count: 3;
          height: fit-content;
          li {
            -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      }
    }

    &.sticky {
      .overflow-container {
        ul {
          max-height: calc(100vh - ${asRem(103)}); // Height of sticky header + 20
        }
      }
      .level-n {
        max-height: calc(100vh - ${asRem(103)}); // Height of sticky header + 20
      }
    }
  }

`;

export const LinkItems = ({ items }) => {
  if ((!items) || items.length === 0) {
    return null;
  }
  const itemsRef = [...items];
  const itemsSorted = itemsRef.sort((x, y) => x.position - y.position);
  const itemFiltered = itemsSorted.filter((x) => x.product_count > 0);
  const className = `level-${itemFiltered[0] && itemFiltered[0].level}`;
  const elements = itemFiltered.filter((x) => x.include_in_menu === 1).map((item) => (
    <li
      key={item.uid}
      className={
        `${className} ${(item.children && item.children.length > 0) ? 'has-children' : ''}`
      }
    >
      <>
        <Link href={categoryLink(item)} prefetch={false}>
          <a alt={`Link to ${item.name}`} className="plain">{item.name}</a>
        </Link>
        {item.children && (
          <LinkItems items={item.children} prefetch={false} />
        )}
      </>
    </li>
  ));

  return (
    <LinkItemsWrapper>
      {elements}
    </LinkItemsWrapper>
  );
};

LinkItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function filterCategoryItems(tree, isServiceLinks) {
  let itemsRef = tree.categories.items
    .filter((x) => x.include_in_menu)
    .sort((x, y) => x.position - y.position);
  if (!isServiceLinks) {
    itemsRef = itemsRef.filter((x) => x.product_count > 0);
  }
  return itemsRef;
}

export const BaseCategoryMenuTreeView = ({
  tree,
  loading,
  show,
  isServiceLinks = false,
}) => {
  const [activeParent, setActiveParent] = useState();

  if (!tree) return (<LoadingView />);

  const items = filterCategoryItems(tree, isServiceLinks);

  if (loading) return (<LoadingView />);

  let allChildrenLength = null;
  if (items[activeParent] && items[activeParent].children) {
    allChildrenLength = items[activeParent].children.length;
  }
  const fetchAllNestedChildrenLength = (obj) => {
    if (!obj.children) {
      return;
    }
    if (obj.children && obj.children.length) {
      allChildrenLength += obj.children.length;
      obj.children.forEach((child) => fetchAllNestedChildrenLength(child));
    }
  };
  if (items[activeParent] && items[activeParent].children) {
    items[activeParent].children.forEach((op) => {
      fetchAllNestedChildrenLength(op);
    });
  }

  return (
    <CategoryMenuTreeViewWrapper className={show ? 'show-category-menu' : ''}>
      <div className="category-menu-container">
        <div className="overflow-container">
          <ul
            className={`level-parent ${items[activeParent] && items[activeParent].children.length > 0 ? 'has-child-level' : ''}`}
          >
            {items.map((item, i) => (
              <li
                key={item.uid}
                onMouseOver={() => setActiveParent(i)}
                onFocus={() => 0}
                className={i === activeParent ? 'active' : ''}
              >
                <Link href={categoryLink(item)} prefetch={false}>
                  <a alt={`Link to ${item.name}`} className="plain">
                    <TextMedium16 as="span">{item.name}</TextMedium16>
                    {item.children.length > 0 && (
                      <SVGIcon heightPx={22}>
                        <DownArrowIcon />
                      </SVGIcon>
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {items[activeParent] && items[activeParent].children.length > 0 && (
          <div
            className={`level-n
              ${allChildrenLength > 20 ? 'moreThan-20' : ''}
              ${allChildrenLength > 40 ? 'moreThan-40' : ''}
            `}
            id="level_n_container"
          >
            <LinkItems items={items[activeParent].children} />
          </div>
        )}
      </div>
    </CategoryMenuTreeViewWrapper>
  );
};

BaseCategoryMenuTreeView.propTypes = {
  tree: PropTypes.object,
  loading: PropTypes.bool,
  show: PropTypes.bool,
  isServiceLinks: PropTypes.bool,
};

export const CategoryMenuTreeViewWrapper = withDependencySupport(BaseCategoryMenuTreeViewWrapper, 'CategoryMenuTreeViewWrapper');
export const CategoryMenuTreeView = withDependencySupport(BaseCategoryMenuTreeView, 'CategoryMenuTreeView');

// Hover View::End

// Dropdown One by One View (Mobile)::Start
const MobileMenuViewWrapper = styled.div`
  position: relative;
  >.category-menu-container {
    transition: all 0.4s ease-out;
    height: auto;
    overflow: hidden;
    display: flex;
    a { 
      color: var(--color-text);
    }

    li {
      &.active {
        a {
          color: var(--color-button);
        }

        .rz-svg-icon {
          color: var(--color-button);
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }

    .level-parent {
      width: 100%;
      padding: ${asRem(10)} 0;
      transition: all 0.35s ease-out;

      .rz-svg-icon {
        color: var(--color-disabled);
      }

      > li {
        padding: 0;
        margin-bottom: ${asRem(18)};
        &.active {
          border-bottom: 1px solid var(--color-disabled-3);
        }

        a {
          >span {
            font-size: ${asRem(18)};
            line-height: ${asRem(24)};
          }
        }
      }
    }

    .level-n {
      padding-top: ${asRem(10)};
      padding-bottom: ${asRem(10)};
      font-weight: 500;
      font-size: ${asRem(14)};
      line-height: ${asRem(20)};
      li {
        &.has-children {
          > a {
            font-weight: 700;
          }
        }
        a {
          color: var(--color-text);
        }
      }
    }
  }

`;

const MobileMenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${asRem(8)};
  cursor: pointer;
  font-weight: 500;
`;

export const BaseMobileCategoryMenuTreeView = ({
  tree,
  loading,
  isServiceLinks = false,
}) => {
  const [activeParent, setActiveParent] = useState(false);

  const changeActiveMenu = (e, i) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (activeParent !== i) {
      setActiveParent(i);
    } else {
      setActiveParent(false);
    }
  };

  useEffect(() => {
    const activeParentSelector = document.querySelector('.level-parent li.active');
    const navBarContainerSelector = document.querySelector('.sidebar-container');
    if (activeParentSelector && navBarContainerSelector) {
      navBarContainerSelector.scrollTop = activeParentSelector.offsetTop - 50;
    }
  }, [activeParent]);

  if (!tree) return (<LoadingView />);
  const items = filterCategoryItems(tree, isServiceLinks);
  if (loading) return (<LoadingView />);

  return (
    <MobileMenuViewWrapper>
      <div className="category-menu-container">
        <ul className="level-parent">
          {items.map((item, i) => (
            <li
              key={item.uid}
              className={(i !== false) && (i === activeParent) ? 'active' : ''}
            >
              <MobileMenuItem
                onClick={(e) => changeActiveMenu(e, i)}
                onFocus={() => 0}
              >
                {item.children.length > 0 ? (
                  <>
                    <DisplayMedium18 as="span">{item.name}</DisplayMedium18>
                    <SVGIcon
                      heightPx={22}
                    >
                      <DownArrowIcon />
                    </SVGIcon>
                  </>
                ) : (
                  <Link href={categoryLink(item)} prefetch={false}>
                    <a alt={`Link to ${item.name}`} className="plain">
                      <DisplayMedium18 as="span">{item.name}</DisplayMedium18>
                    </a>
                  </Link>
                )}
              </MobileMenuItem>
              <div>
                {activeParent === i && items[activeParent]
                  && items[activeParent].children.length > 0 && (
                  <div className="level-n">
                    <LinkItems items={items[activeParent].children} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MobileMenuViewWrapper>
  );
};

BaseMobileCategoryMenuTreeView.propTypes = {
  tree: PropTypes.object,
  loading: PropTypes.bool,
  isServiceLinks: PropTypes.bool,
};

export const MobileCategoryMenuTreeView = withDependencySupport(BaseMobileCategoryMenuTreeView, 'MobileCategoryMenuTreeView');

// Dropdown One by One View (Mobile)::End

// Two Columns View::Start
const CategoryMenuTreeColumnViewWrapper = styled.div`
  display: flex;
  &.mobile-view {
    .parent-level-wrapper {
      display: none;
      @media screen and (min-width: ${Breakpoint.sm}) {
        display: block;
      }
    }
    .level-n-wrapper {
      @media screen and (min-width: ${Breakpoint.sm}) {
        border-left: ${asRem(1)} solid var(--color-border);
        margin-left: ${asRem(100)};
        padding-left: ${asRem(43)};
        padding-right: ${asRem(40)};
      }
    }
  }
  .back-icon {
    cursor: pointer;
    
    .rz-svg-icon {
      margin: ${asRem(4)} 0 0 ${asRem(13)};
    }
  }
`;

const ParentLevelViewWrapper = styled.div`
  margin-left: ${asRem(10)};

  .child-level-2 {
    .menu-item {
      padding: 0;
      cursor: initial;
      align-items: flex-start;
      margin: 0;
      &:hover {
        text-decoration: none;
        color: var(--color-text);
      }
    }
  }

  .overflow-container {
    padding-top: ${asRem(26)};

    li {
      display: flex;
      align-items: center;
      padding-bottom: ${asRem(10)};
      &:not(:first-child) {
        padding-top: ${asRem(10)};
      }
      cursor: pointer;
      .rz-svg-icon {
        margin-top: ${asRem(5)};
        margin-left: ${asRem(10)};
        svg {
          transform: rotate(-90deg);
        }
      }
      &:hover {
        color: var(--color-button);
      }
      span {
        font-weight: 400;
      }
      &.active {
        color: var(--color-button);
      }
    }
  }
`;

const LevelNViewWrapper = styled.div`
  margin-left: ${asRem(20)};

  > ul {
    padding-top: ${asRem(26)};
    > li {
      padding-bottom: ${asRem(8)};
      &.level-3 >a {
        font-weight: normal;
        font-size: ${asRem(20)};
        line-height: ${asRem(26)};
      }
    }
    li {
      &.level-4 >a {
        font-size: ${asRem(18)};
        line-height: ${asRem(23)};
      }
    }
  }
`;

export const BaseCategoryMenuTreeColumnView = ({
  levelTitle = translateV2('category.CATEGORIES'),
  tree,
  loading,
  isServiceLinks = false,
  resetMenu,
}) => {
  const [activeParent, setActiveParent] = useState(null);
  if (!tree) return (<LoadingView />);

  const items = filterCategoryItems(tree, isServiceLinks);

  if (loading) return (<LoadingView />);

  const moveBack = () => {
    if (activeParent === null) {
      resetMenu();
    }
    setActiveParent(null);
  };

  return (
    <CategoryMenuTreeColumnViewWrapper
      className={(items[activeParent] && items[activeParent].children.length > 0) ? 'mobile-view' : null}
    >
      <div className="back-icon">
        <SVGIcon heightPx={18}>
          <BackArrowIcon
            onClick={() => moveBack()}
          />
        </SVGIcon>
      </div>
      <ParentLevelViewWrapper className="parent-level-wrapper">
        <Row className="child-level-2">
          <Col>
            <MenuItem>
              <DisplayBold20 as="span">{levelTitle}</DisplayBold20>
            </MenuItem>
          </Col>
        </Row>
        {!tree && (
          <LoadingView />
        )}
        <div className="overflow-container">
          <ul>
            {items.map((item, i) => (
              <li
                key={item.uid}
                onClick={() => setActiveParent(i)}
                onKeyPress={() => setActiveParent(i)}
                role="presentation"
                className={i === activeParent ? 'active' : ''}
              >
                {item.children.length > 0 ? (
                  <>
                    <DisplayMedium20 as="span">{item.name}</DisplayMedium20>
                    <SVGIcon heightPx={18}>
                      <DownArrowIcon />
                    </SVGIcon>
                  </>
                ) : (
                  <Link href={categoryLink(item)} prefetch={false}>
                    <a alt={`Link to ${item.name}`} className="plain">
                      <DisplayMedium20 as="span">{item.name}</DisplayMedium20>
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ParentLevelViewWrapper>
      {items[activeParent] && items[activeParent].children.length > 0 && (
        <LevelNViewWrapper className="level-n-wrapper">
          <DisplayBold20 as="span">{items[activeParent].name}</DisplayBold20>
          <LinkItems items={items[activeParent].children} />
        </LevelNViewWrapper>
      )}
    </CategoryMenuTreeColumnViewWrapper>
  );
};

BaseCategoryMenuTreeColumnView.propTypes = {
  tree: PropTypes.object,
  loading: PropTypes.bool,
  isServiceLinks: PropTypes.bool,
  levelTitle: PropTypes.string,
  resetMenu: PropTypes.func,
};

export const CategoryMenuTreeColumnView = withDependencySupport(BaseCategoryMenuTreeColumnView, 'CategoryMenuTreeColumnView');
// Two Columns View::End

// List View With Children :: Start
export const BaseListViewWithChildrenWrapper = styled.div`
  .category-container {
    display: flex;
    flex-direction: column;
    column-gap: ${asRem(20)};
   
    .category {
      min-width: ${asRem(180)};
    }
    .sub-category ul {
      padding: 0;
      margin-top: ${asRem(10)};
      >li {
        margin-top: ${asRem(10)};
        &.has-children >ul {
          border-left: ${asRem(1)} solid var(--color-border);
          a {
            border: none;
          }
        }
      } 
    } 
  }
`;
export const BaseListViewWithChildren = ({
  tree, loading, isServiceLinks = false,
}) => {
  if (!tree || loading) return (<LoadingView />);

  const items = filterCategoryItems(tree, isServiceLinks);

  return (
    <ListViewWithChildrenWrapper className="category-list">
      {items && (
        <div className="category-container">
          {items.map((item) => (
            <div className="category" key={item.id}>
              <TextBold16 className="category-title">
                <Link href={categoryLink(item)} prefetch={false}>
                  <a className="plain">
                    {item.name}
                  </a>
                </Link>
              </TextBold16>
              <div className="sub-category">
                <LinkItems items={item.children} prefetch={false} />
              </div>
            </div>
          ))}
        </div>
      )}
    </ListViewWithChildrenWrapper>
  );
};

BaseListViewWithChildren.propTypes = {
  tree: PropTypes.object,
  loading: PropTypes.bool,
  isServiceLinks: PropTypes.bool,
};

export const ListViewWithChildren = withDependencySupport(BaseListViewWithChildren, 'ListViewWithChildren');
export const ListViewWithChildrenWrapper = withDependencySupport(BaseListViewWithChildrenWrapper, 'ListViewWithChildrenWrapper');
// List View With Children :: End

// List View With Image :: Start
export const BaseCategoryListWithImageWrapper = styled.div`
  .category-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: ${asRem(20)};
    color: var(--color-charcoal);
    @media screen and (min-width: ${Breakpoint.lg}) {
      flex-direction: column;
    }

    .category {
      display: flex;
      align-items: center;
      position: relative;
      gap: ${asRem(11)};
      width: ${asRem(160)};
      margin-bottom: ${asRem(100)};
      padding-left: ${asRem(15)};
    
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: ${asRem(-30)};
        width: 100%;
        height: ${asRem(60)};
        background-color: var(--color-grey-light);
      }

      @media screen and (min-width: ${Breakpoint.md}) {
        gap: ${asRem(30)};
        width: ${asRem(200)};
        &::before {
          bottom: ${asRem(-15)};
          height: ${asRem(40)};
        }
      }

      .rz-image-view {
        position: relative;
        z-index: 1;
        height: ${asRem(160)};
        @media screen and (min-width: ${Breakpoint.md}) {
          height: ${asRem(120)};
        }

        img {
          max-height: 100%;
          max-width: 100%;
        }
      }
      
      p {
        padding-bottom: ${asRem(6)};
        margin-bottom: ${asRem(15)};
        a {
          transform: rotate(-90deg);
          width: ${asRem(80)};
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: inline-block;
        }
        @media screen and (min-width: ${Breakpoint.sm}) {
          margin-bottom: 0;
          a {
            transform: rotate(0);
            width: auto;
            white-space: unset;
          }
        }
      }
    }
  }
  .all-categories-btn {
    text-align: right;
    margin-top: ${asRem(30)};
    a {
      text-decoration: underline;
    }
  }  
`;

export const BaseCategoryListWithImage = ({
  tree,
  loading,
  isServiceLinks,
  className,
  showButtonItemCount = 4,
}) => {
  const items = filterCategoryItems(tree, isServiceLinks);
  if (!tree || loading) return (<LoadingView />);

  return (
    <CategoryListWithImageWrapper className={className}>
      <div className="category-items">
        {items.map((item) => (
          <Col className="category" key={item.id}>
            <Link href={categoryLink(item)} prefetch={false}>
              <a alt={`Link to ${item.name}`} className="plain">
                <ImageView
                  src={item.image}
                  alt={item.name}
                />
              </a>
            </Link>
            <Display20>
              <Link href={categoryLink(item)} prefetch={false}>
                <a alt={`Link to ${item.name}`} className="plain">{item.name}</a>
              </Link>
            </Display20>
          </Col>
        ))}
      </div>
      {items.length > showButtonItemCount && (
        <div className="all-categories-btn">
          <Link href="/categories" prefetch={false}>
            <a alt="Link to Categories">Skoða alla flokka</a>
          </Link>
        </div>
      )}
    </CategoryListWithImageWrapper>
  );
};

BaseCategoryListWithImage.propTypes = {
  tree: PropTypes.object,
  loading: PropTypes.bool,
  isServiceLinks: PropTypes.bool,
  className: PropTypes.string,
  showButtonItemCount: PropTypes.number,
};

export const CategoryListWithImageWrapper = withDependencySupport(BaseCategoryListWithImageWrapper, 'CategoryListWithImageWrapper');
export const CategoryListWithImage = withDependencySupport(BaseCategoryListWithImage, 'CategoryListWithImage');
// List View With Image :: End
