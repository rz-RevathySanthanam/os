import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
// import { filterCategoryWidgets } from '@/store/layout/widget';
import { translateV2 } from '@/roanuz/lib/utils';
import Config from '@/config';
import { BreadcrumbView, buildCategoryBreadcrumbLinks, buildBrandBreadcrumbLinks } from '@/roanuz/view/breadcrumb';
import { Display32, Display24, Display48Base } from '@/roanuz/typopgraphy';
import { CategoryPageLayout } from '@/roanuz/layout/category/page';
import { ImageView } from '@/roanuz/view/image';
import { BlockView } from '@/roanuz/widgets/Block';
import MagentoHtml from '@/roanuz/widgets/MagentoHtml';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { StoreConfigContext } from '@/roanuz/store/core/context';
import ContainerWidgets from '@/roanuz/widgets/ContainerWidgets';
import { filterCategoryWidgets } from '@/roanuz/store/layout/widget';
import { LayoutContainer } from '@/roanuz/store/layout/layout';
import { CategoryAutoContentView } from './autoContent';
import { CategoryProductsWithFilterViewV2 } from './productsWithFilter';
import { CategoryListWithImage } from '../stickyBar/categoryMenuTree';
import { SubCategoriesListView } from './subCategoriesListView';

export const BaseCategoryPageViewWrapper = styled.div`
  .category-banner-image {
    >.rz-image-view {
      max-width: 100%;
      width: ${asRem(50)};
      margin: auto;
      img {
        max-width: 100%;
      }
    }
  }
  .page-title {
    h1 {
      @media screen and (min-width: ${Breakpoint.lg}) {
        ${Display48Base}
      }
    }
  }
`;

export const BaseCategoryCmsBlock = ({ category }) => {
  return (
    <div>
      {category.description && (
        <MagentoHtml html={category.description} className="rz-section-content" />
      )}
      {category.cms_block && category.cms_block.content && (
        <BlockView content={category.cms_block} className="rz-section-content" />
      )}
    </div>
  );
};

BaseCategoryCmsBlock.propTypes = {
  category: PropTypes.object.isRequired,
};

export const CategoryPageView = ({
  category,
  widgets,
  categoryTree,
  featuredCategories,
  filterResult,
  filterLoading,
  filterError,
  filterInput,
  sortInput,
  onFilterUpdate,
  onSortUpdate,
  onPageChange,
  brandMeta,
  forceFilterView,
  titleText,
  categoryImmediateChildren,
  initialAggregations,
  aggregationsItemCounts,
  initPageFilters,
  activeFilter,
  isSearchResultPage,
  onClearIndividualFilter,
  onClearAllFilters,
  onLoadMoreUpdates,
}) => {
  const breadcrumbLinks = (brandMeta)
    ? buildBrandBreadcrumbLinks({ brandMeta, category })
    : buildCategoryBreadcrumbLinks({ category });

  // Todo: Search page widgets missing. May be this comp shoudl recive filtered widgets
  const pageWidgets = category ? filterCategoryWidgets({ widgets, category }) : [];

  const breadcrumb = (
    <BreadcrumbView links={breadcrumbLinks} />
  );

  let titleStr = titleText || translateV2('category.PRODUCTS');
  if (category) {
    titleStr = category.name;
  }

  const title = (
    <Display32 as="h1">{titleStr}</Display32>
  );

  const { showSubCategoriesList } = Config.CategoryPageSettings;
  const subCategoriesList = (
    <>
      {category?.children && showSubCategoriesList && (
        <SubCategoriesListView category={category} />
      )}
    </>
  );

  const topWidgets = (
    <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentTop} />
  );
  let topContent = null;

  const bottomWidgets = (
    <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentBottom} />
  );
  let bottomContent = bottomWidgets;

  let cmsContent = null;
  if (
    (!forceFilterView) && category && category.showStaticContent) {
    cmsContent = (
      <CategoryCmsBlock
        category={category}
        title={title}
        breadcrumb={breadcrumb}
      />
    );
  }

  let imageView = null;
  if (
    (!forceFilterView) && category
    && category.image
    // Cateogry level 3 images is used in Root catgory page
    && category.level !== 3
  ) {
    imageView = (
      <div className="category-banner-image">
        <ImageView
          src={category.image}
          alt="Banner Image"
        />
      </div>
    );
  }

  let mainContent = null;
  if (
    (!forceFilterView) && category && category.showAutoContent) {
    mainContent = (
      <CategoryAutoContentView
        contentTopWidgets={topWidgets}
        contentBottomWidgets={bottomWidgets}
        imageView={imageView}
        cmsContentView={cmsContent}
        categoryTree={categoryTree}
        featuredCategories={featuredCategories}
      />
    );

    topContent = null;
    bottomContent = null;
  } else if (
    (!forceFilterView) && category && !category.showProducts) {
    mainContent = cmsContent;
  } else {
    mainContent = (
      <CategoryProductsWithFilterViewV2
        contentTopWidgets={topWidgets}
        contentBottomWidgets={null}
        imageView={imageView}
        cmsContentView={cmsContent}
        category={category}
        filterResult={filterResult}
        filterLoading={filterLoading}
        filterError={filterError}
        filterInput={filterInput}
        sortInput={sortInput}
        onFilterUpdate={onFilterUpdate}
        onSortUpdate={onSortUpdate}
        onPageChange={onPageChange}
        forceFilterView={forceFilterView}
        categoryImmediateChildren={categoryImmediateChildren}
        initialAggregations={initialAggregations}
        aggregationsItemCounts={aggregationsItemCounts}
        selectedFilters={initPageFilters}
        activeFilter={activeFilter}
        isSearchResultPage={isSearchResultPage}
        onClearIndividualFilter={onClearIndividualFilter}
        onClearAllFilters={onClearAllFilters}
        onLoadMoreUpdates={onLoadMoreUpdates}
      />
    );

    topContent = null;
  }

  const storeConfig = useContext(StoreConfigContext);
  return (
    <CategoryPageViewWrapper>
      <CategoryPageLayout
        breadcrumb={breadcrumb}
        title={title}
        topContent={topContent}
        content={mainContent}
        bottomContent={bottomContent}
        isSearchResultPage={isSearchResultPage}
        className={(category && category.showStaticContent && category.cms_block) && 'cms-banner-view'}
        subCategoriesList={subCategoriesList}
      />
      {Config.CategoryPageSettings.showRootCategoryTreeBlock && (
        <div className="rz-section-content">
          <Display24 className="decorative-title"><span>{translateV2('category.OUR_PRODUCTS')}</span></Display24>
          {storeConfig.categoryTreeData.categoryTree && (
            <CategoryListWithImage className="categorywithproducts" tree={storeConfig.categoryTreeData.categoryTree} />
          )}
        </div>
      )}
    </CategoryPageViewWrapper>
  );
};

CategoryPageView.propTypes = {
  category: PropTypes.object.isRequired,
  widgets: PropTypes.arrayOf(PropTypes.object),
  categoryTree: PropTypes.arrayOf(PropTypes.object),
  featuredCategories: PropTypes.arrayOf(PropTypes.element),
  filterResult: PropTypes.object,
  filterLoading: PropTypes.bool,
  filterError: PropTypes.object,
  filterInput: PropTypes.object,
  sortInput: PropTypes.object,
  onFilterUpdate: PropTypes.func,
  onSortUpdate: PropTypes.func,
  onPageChange: PropTypes.func,
  brandMeta: PropTypes.object,
  forceFilterView: PropTypes.bool,
  titleText: PropTypes.string,
  categoryImmediateChildren: PropTypes.array,
  initialAggregations: PropTypes.object,
  aggregationsItemCounts: PropTypes.object,
  initPageFilters: PropTypes.object,
  activeFilter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  isSearchResultPage: PropTypes.bool,
  onClearIndividualFilter: PropTypes.func,
  onClearAllFilters: PropTypes.func,
  onLoadMoreUpdates: PropTypes.func,
};

export const CategoryCmsBlock = withDependencySupport(BaseCategoryCmsBlock, 'CategoryCmsBlock');
export const CategoryPageViewWrapper = withDependencySupport(BaseCategoryPageViewWrapper, 'CategoryPageViewWrapper');
