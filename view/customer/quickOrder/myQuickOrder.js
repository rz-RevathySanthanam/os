import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SearchProductsBarView } from '@/roanuz/view/searchAndSelectProducts';
import Config from '@/config';
import { QuickOrderActionView } from './actionView';
import { prepareSku } from './model';
import { QuickOrderProductItems } from './productItems';

export const MyQuickOrderViewWrapper = styled.div`
`;

export const MyQuickOrderView = ({
  container,
  customerListModel,
  addToCartModel,
}) => {
  const {
    choosenProducts,
    pushItemToList,
    removeItemFromList,
    onSelectedProductOptions,
  } = container;

  const { AlgoliaIndexNamePrefix } = Config.AlgoliaConfiguration;
  let indexPrefix = `${AlgoliaIndexNamePrefix}`;
  if (Config.StoreViewCode) {
    indexPrefix = `${indexPrefix}${Config.StoreViewCode}_`;
  }

  const listContainerSkus = Object.keys(choosenProducts);
  const selectProductHandler = (sku) => {
    if (!listContainerSkus.includes(prepareSku(sku))) {
      pushItemToList(prepareSku(sku));
    }
  };

  return (
    <MyQuickOrderViewWrapper>
      <SearchProductsBarView
        productIndexName={`${indexPrefix}products`}
        selectProduct={selectProductHandler}
        selectedProductsList={listContainerSkus}
      />
      <QuickOrderProductItems
        productsList={choosenProducts}
        actions={{
          removeProduct: removeItemFromList,
          onSelectedProductOptions,
        }}
        customerListModel={customerListModel}
        errorState={addToCartModel.validationState}
        loadingState={addToCartModel.loadingState}
      />
      {listContainerSkus.length > 0 && (
        <QuickOrderActionView
          addToCartModel={addToCartModel}
          removeAllAndClear={customerListModel.removeAllAndClear}
        />
      )}
    </MyQuickOrderViewWrapper>
  );
};

MyQuickOrderView.propTypes = {
  container: PropTypes.object,
  customerListModel: PropTypes.object,
  addToCartModel: PropTypes.object,
};
