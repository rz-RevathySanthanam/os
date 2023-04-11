import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DisplayBold40, Text16 } from '@/roanuz/typopgraphy';
import { ProductGrid } from '@/roanuz/controller/product/list';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const CategoriesAndProductsViewWrapper = styled.div`
`;

export const BaseCategoriesAndProductsView = ({ title, catsAndProds }) => {
  return (
    <CategoriesAndProductsViewWrapper>
      <div className="rz-section-content">
        <DisplayBold40>{title}</DisplayBold40>
        {catsAndProds.map((category) => (
          <div key={category.url_key}>
            <Text16>{category.name}</Text16>
            <ProductGrid
              products={category.products.items}
              autoFit
              showShortDesc
            />
          </div>
        ))}
      </div>
    </CategoriesAndProductsViewWrapper>
  );
};

BaseCategoriesAndProductsView.propTypes = {
  catsAndProds: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export const CategoriesAndProductsView = withDependencySupport(BaseCategoriesAndProductsView, 'CategoriesAndProductsView');
