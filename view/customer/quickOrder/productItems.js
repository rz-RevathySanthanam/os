import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ProductListResultItemWrapper } from '@/roanuz/view/searchAndSelectProducts';
import { Button } from '@/roanuz/view/button';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import { Text12 } from '@/roanuz/typopgraphy';
import Link from 'next/link';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { VariantProductPriceChangeController } from '@/roanuz/controller/product/variantProductPriceChange';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseQuickOrderProductItemsViewWrapper = styled.div`
  .result-wrapper {
    padding: ${asRem(10)} ${asRem(20)};
    margin: ${asRem(20)} 0;
    border: ${asRem(1)} solid #EBD3C7;
    border-radius: ${asRem(20)};
    .choose-btn {
      transform: initial;
      &.loading {
        opacity: 0.5;
      }
    }
    display: block;
    @media screen and (min-width: ${Breakpoint.lg}) {
      display: flex;
    }
    >.right {
      padding-left: 0;
      @media screen and (min-width: ${Breakpoint.lg}) {
        display: flex;
        padding-left: ${asRem(10)};
      }
    }
    &.error-line {
      border-color: red;
    }
  }
`;

export const QuickOrderProductItems = ({
  productsList,
  actions,
  customerListModel,
  errorState,
  loadingState,
}) => {
  const productsListRef = Object.keys(productsList);
  const { removeProduct, onSelectedProductOptions } = actions;
  return (
    <QuickOrderProductItemsViewWrapper>
      {productsListRef?.map((product) => {
        const item = productsList[product];
        const errorStateKeys = errorState && Object.keys(errorState);
        const isLineError = errorStateKeys && errorStateKeys.length > 0 && errorStateKeys.includes(item.sku);
        return (
          <ProductListResultItemWrapper
            key={item.sku}
            className={`result-wrapper ${isLineError ? 'error-line' : ''}`}
          >
            <div className="left">
              <Button
                noborder
                nomargin
                onClick={() => !loadingState.includes(item.sku) && removeProduct(item.sku)}
                onKeyDown={() => !loadingState.includes(item.sku) && removeProduct(item.sku)}
                icon={<CloseIcon />}
                className={`${loadingState.includes(item.sku) ? 'loading' : ''} choose-btn`}
                disabled={loadingState.includes(item.sku)}
              />
              <Text12 className="ais-sku">{item.sku}</Text12>
              <Link href={item.productLink} prefetch={false}>
                <a className="plain hover-underline">
                  {item.name}
                </a>
              </Link>
            </div>
            <div className="right">
              <VariantProductPriceChangeController
                product={item}
                onSelectedProductOptions={onSelectedProductOptions}
                customerListModel={customerListModel}
              />
            </div>
          </ProductListResultItemWrapper>
        );
      })}
    </QuickOrderProductItemsViewWrapper>
  );
};

QuickOrderProductItems.propTypes = {
  productsList: PropTypes.object,
  actions: PropTypes.object,
  customerListModel: PropTypes.object,
  errorState: PropTypes.object,
  loadingState: PropTypes.object,
};

export const QuickOrderProductItemsViewWrapper = withDependencySupport(BaseQuickOrderProductItemsViewWrapper, 'QuickOrderProductItemsViewWrapper');
