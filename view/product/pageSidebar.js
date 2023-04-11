import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ProductPageSidebarLayout } from '@/roanuz/layout/product/pageSidebar';
import { useRouter } from 'next/router';
import { scrollIntoViewHandler } from '@/roanuz/components/scrollHandler';
// import { StockStatus } from './models/stock';
import { asRem } from '@/roanuz/lib/css';
import { DisplayMedium20 } from '@/roanuz/typopgraphy';
import {
  ProductPageActionView,
  ProductPageOptionsView,
} from './pageComp/actionView';
import { ProductEnergyLabelView } from './energyLabel';
import { ProductPagePriceView } from './pageComp/priceView';
import { ProductPageReturnDaysView } from './pageComp/returnDays';
import { ProductPageSiminnLoanView } from './pageComp/siminnLoanView';
import {
  ProductPageShortDescView,
  ProductPageDetailDescView,
} from './pageComp/descriptionViews';
import { StoreStocksView } from './storeStockView';

export const ProductSidebarViewWrapper = styled(ProductPageSidebarLayout)`
  .variants-wrapper {
    li {
      padding: 0;
      border: none;
      .rz-button {
        border: ${asRem(1)} solid transparent;
      }
      &:not([disabled]) {
        &.active, &:hover {
          border: none;
          .rz-button {
            border: ${asRem(1)} solid var(--color-text);
            .rz-image-view {
              height: ${asRem(35)};
            }
          }
        }
      }
    }
  }
`;

export const BaseStocksAndDeliveryViewWrapper = styled.div`
  h2 {
    margin-bottom: ${asRem(8)};
  }
  .stocks-delivery-wrapper {
    display: flex;
    flex-direction: column;
    gap: ${asRem(20)};
    padding: ${asRem(20)};
    border: ${asRem(1)} solid var(--color-inner-border);
    border-radius: ${asRem(8)};
  }
`;

export const StocksAndDeliveryViews = ({ product, DeliveryPickup }) => {
  return (
    <StocksAndDeliveryViewWrapper className="stocks-and-delivery-view">
      <DisplayMedium20 as="h2">How to get it</DisplayMedium20>
      <div className="stocks-delivery-wrapper">
        <StoreStocksView
          storesList={product.stockStatus.storesStatus}
          // showPieceStores={product.stockStatus.showPieceStores}
        />
        <DeliveryPickup
          product={product}
        />
      </div>
    </StocksAndDeliveryViewWrapper>
  );
};

StocksAndDeliveryViews.propTypes = {
  product: PropTypes.object,
  DeliveryPickup: PropTypes.elementType,
};

export const StocksAndDeliveryViewWrapper = withDependencySupport(BaseStocksAndDeliveryViewWrapper, 'StocksAndDeliveryViewWrapper');

export const BaseProductSidebarView = ({
  product,
  // eslint-disable-next-line no-unused-vars
  tabIndexStart,
  addToCart, addToWishList,
  onCartUpdate,
  SiminnLoan,
  DeliveryPickup,
  onEnquiryForm,
  stockAlertLoading,
  stockAlertError,
  onStockAlert,
  optionsSelection,
}) => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined' && router.asPath.includes('#specification')) {
      scrollIntoViewHandler('specification');
    }
  }, []);

  return (
    <ProductSidebarViewWrapper
      hasCrossSellProducts={product.crossSellAsOption || product.crosssellProducts.length}
      shortDesc={product.shortDesc && (
        <ProductPageShortDescView product={product} />
      )}
      energyLabel={product.energyLabel && (
        <ProductEnergyLabelView product={product} labelAsButton />
      )}
      storesStatus={(
        <StoreStocksView
          storesList={product.stockStatus.storesStatus}
          // showPieceStores={product.stockStatus.showPieceStores}
        />
      )}
      returnDays={(
        <ProductPageReturnDaysView product={product} />
      )}
      delivery={(DeliveryPickup
      // && (product.stockStatus.status !== StockStatus.AVAILABLE_SOON)
      ) && (
      <DeliveryPickup
        product={product}
      />
      )}
      price={(
        <ProductPagePriceView product={product} />
      )}
      loan={(
        <ProductPageSiminnLoanView product={product} SiminnLoan={SiminnLoan} />
      )}
      options={(
        <ProductPageOptionsView
          product={product}
          onCartUpdate={onCartUpdate}
        />
      )}
      stocksAndDeliveryViews={(
        <StocksAndDeliveryViews
          product={product}
          DeliveryPickup={DeliveryPickup}
        />
      )}
      actions={(
        <>
          {optionsSelection}
          <ProductPageActionView
            product={product}
            addToCart={addToCart}
            addToWishList={addToWishList}
            onCartUpdate={onCartUpdate}
            SiminnLoan={SiminnLoan}
            DeliveryPickup={DeliveryPickup}
            onEnquiryForm={onEnquiryForm}
            stockAlertLoading={stockAlertLoading}
            stockAlertError={stockAlertError}
            onStockAlert={onStockAlert}
            optionsSelection={optionsSelection}
          />
        </>
      )}
      detailDesc={product.detailDesc && (
        <ProductPageDetailDescView desc={product.detailDesc} />
      )}
    />
  );
};

BaseProductSidebarView.propTypes = {
  product: PropTypes.object,
  tabIndexStart: PropTypes.number,
  addToCart: PropTypes.element,
  addToWishList: PropTypes.element,
  onCartUpdate: PropTypes.func,
  SiminnLoan: PropTypes.elementType,
  DeliveryPickup: PropTypes.elementType,
  onEnquiryForm: PropTypes.func,
  stockAlertLoading: PropTypes.bool,
  stockAlertError: PropTypes.object,
  onStockAlert: PropTypes.func,
  optionsSelection: PropTypes.element,
};

export const ProductSidebarView = withDependencySupport(BaseProductSidebarView, 'ProductSidebarView');
