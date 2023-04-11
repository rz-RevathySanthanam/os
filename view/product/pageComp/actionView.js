import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
// import MagentoHtml from '@/components/layout/MagentoHtml';
import {
  DisplayBold24, Text14,
} from '@/roanuz/typopgraphy';
import { asRem, Breakpoint, changeContentAnimation } from '@/roanuz/lib/css';
import { ReactComponent as FormIcon } from '@/roanuz/view/imgs/FormIcon.svg';
import { Button, ButtonList } from '@/roanuz/view/button';
import { translateV2 } from '@/roanuz/lib/utils';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ProductAsOptionView } from '../productAsOption';
import { StockStatus } from '../models/stock';
import { StockAlertView } from '../stockAlert';

export const ProductPageOptionsView = ({ product, onCartUpdate, hideProductPageOptionsView }) => {
  if (hideProductPageOptionsView) {
    return null;
  }
  return (
    <ProductAsOptionView
      product={product}
      onChange={(value) => {
        if (onCartUpdate) {
          onCartUpdate('with-product', value);
        }
        return null;
      }}
    />
  );
};

ProductPageOptionsView.propTypes = {
  product: PropTypes.object,
  onCartUpdate: PropTypes.func,
  hideProductPageOptionsView: PropTypes.bool,
};

export const BaseProductPageActionViewLayout = styled.div`
  &.section-action-soldout {
    >.action-button-list {
      padding-top: ${asRem(20)};
    }
  }

  .action-button-list {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 120;
    background: #fff;
    box-shadow: 0px 4px 20px rgba(51, 51, 51, 0.12);
    border: 1px solid #EFEFEF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${asRem(10)} ${asRem(20)};

    > .product-price-text, > .button-list-wrapper {
      gap: ${asRem(16)};
      @media screen and (min-width: ${Breakpoint.sm}) {
        flex-direction: row;
      }
      .rz-button-wrapper {
        align-self: center;
        &.rz-button-atc {
          .rz-svg-icon {
            height: ${asRem(16)};
          }
        }
        &.rz-button-atw {
          span {
            display: none;
          }
        }
        span {
          margin: 0;
        }
      }
    }

    .rz-button-soldout {
      margin-bottom: 0;
    }

    @media screen and (min-width: ${Breakpoint.sm}) {
      position: initial;
      background: transparent;
      box-shadow: none;
      border: 0;
      display: block;
      padding: 0;
      z-index: 0;
    }
  }
  ${(p) => p.requirePriceUpdate && css`
    .action-button-list {
      .product-price-text {
        animation: ${changeContentAnimation} 1s ease-in;
      }
    }
  `}
`;

export const ProductPageActionView = ({
  product,
  onEnquiryForm,
  stockAlertLoading,
  stockAlertError,
  onStockAlert,
  addToCart, addToWishList,
  onCartUpdate,
}) => {
  if ((product.stockStatus.status === StockStatus.SOLD_OUT
    || product.stockStatus.status === StockStatus.SPECIAL_ORDER)) {
    return (
      !product.isRefurbished && (
        <ProductPageActionViewLayout className="section-action section-action-soldout" requirePriceUpdate={product.hasB2BPrice}>
          <Text14>
            Þessa vöru þarf að sérpanta, sendu okkur fyrirspurn og við verðum í sambandi
          </Text14>
          <div className="action-button-list">
            <DisplayBold24 className="hide-desktop product-price-text">
              {product.hasPrice && product.priceText}
            </DisplayBold24>
            <ButtonList block reverseOnMobile>
              <Button
                icon={<FormIcon />}
                mode="primary"
                large
                onClick={onEnquiryForm}
                ariaLabel={translateV2('button.SEND_AN_ENQUIRY')}
                className="rz-button-soldout"
              >
                {translateV2('button.SEND_AN_ENQUIRY')}
              </Button>
              {addToWishList}
            </ButtonList>
          </div>
        </ProductPageActionViewLayout>
      )
    );
  }

  return (
    <ProductPageActionViewLayout className="section-action" requirePriceUpdate={product.hasB2BPrice}>
      {product.stockStatus.status === StockStatus.AVAILABLE_SOON
        ? (
          <StockAlertView
            product={product}
            stockAlertLoading={stockAlertLoading}
            stockAlertError={stockAlertError}
            onSubmit={onStockAlert}
          />
        )
        : (
          <>
            <ProductPageOptionsView
              product={product}
              onCartUpdate={onCartUpdate}
            />
            <div className="action-button-list">
              <DisplayBold24 className="hide-desktop product-price-text">
                {product.priceText}
              </DisplayBold24>
              <ButtonList block reverseOnMobile>
                {addToCart}
                {addToWishList}
              </ButtonList>
            </div>
          </>
        )}
    </ProductPageActionViewLayout>
  );
};

ProductPageActionView.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.element,
  addToWishList: PropTypes.element,
  onCartUpdate: PropTypes.func,
  onEnquiryForm: PropTypes.func,
  stockAlertLoading: PropTypes.bool,
  stockAlertError: PropTypes.object,
  onStockAlert: PropTypes.func,
};

export const ProductPageActionViewLayout = withDependencySupport(BaseProductPageActionViewLayout, 'ProductPageActionViewLayout');
