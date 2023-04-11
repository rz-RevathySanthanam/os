import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Config from '@/config';
import { ProductGrid } from '@/roanuz/controller/product/list';
import { Pagination } from '@/roanuz/view/pagination';
import { asRem } from '@/roanuz/lib/css';
import { ProductsLoadMoreOption } from '@/roanuz/view/productsLoadMoreOption';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseProductsGridPickerWrapper = styled.div`
  .pagination-line {
    margin-top: ${asRem(50)};
    text-align: center;
  }
`;

export const ProductsGridPicker = ({
  products,
  totalPages,
  currentPage,
  selectPage,
  itemsTo,
  totalItems,
  onLoadMoreUpdates,
  filterLoading,
  showLazyLoadingOnCard,
}) => {
  const { productsFetchSettings } = Config.CategoryPageSettings;
  return (
    <ProductsGridPickerWrapper>
      <ProductGrid
        products={products}
        autoFit
        showShortDesc
        showLazyLoad={showLazyLoadingOnCard}
      />
      {(productsFetchSettings.enableLoadMoreMode) ? (
        <ProductsLoadMoreOption
          totalPages={totalPages}
          totalItems={totalItems}
          itemsTo={itemsTo}
          onLoadMoreUpdates={onLoadMoreUpdates}
          className="pagination-line"
          filterLoading={filterLoading}
        />
      ) : (
        totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChanged={(value) => selectPage(value)}
            className="pagination-line"
          />
        )
      )}
    </ProductsGridPickerWrapper>
  );
};

ProductsGridPicker.propTypes = {
  products: PropTypes.array,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  selectPage: PropTypes.func,
  itemsTo: PropTypes.number,
  totalItems: PropTypes.number,
  onLoadMoreUpdates: PropTypes.func,
  filterLoading: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  showLazyLoadingOnCard: PropTypes.bool,
};

export const ProductsGridPickerWrapper = withDependencySupport(BaseProductsGridPickerWrapper, 'ProductsGridPickerWrapper');
