import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Display24, TextMedium14,
} from '@/roanuz/typopgraphy';
import Link from 'next/link';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import Config from '@/config';
import { translateV2 } from '@/roanuz/lib/utils';
import { ProductPreviewView } from '../preview';
import { Button, ButtonList } from '../../button';
// eslint-disable-next-line import/no-cycle
import { CrosssellProducts } from './crossSellProducts';
import { CartActionPopupView } from './cartActionPopup';
import { withDependencySupport } from '../../../lib/dep';

export const BaseAddToCartSuccessTitleViewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: initial;
  width: 100%;
  h4 {
    order: 2;
    margin-top: ${asRem(10)};
  }
  @media screen and (min-width: ${Breakpoint.sm}) {
    align-items: center;
    flex-direction: initial;
    h4 {
      order: initial;
      margin-top: 0;
    }
  }
  >.action-btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media screen and (min-width: ${Breakpoint.sm}) {
      justify-content: initial;
      width: initial;
    }
  }
  button {
    &:not(.icon) {
      color: var(--color-button);
      &:hover {
        filter: brightness(0.7);
      }
      padding-left: 0;
    }
    &.icon {
      color: var(--color-disabled);
      margin-top: ${asRem(5)};
      svg {
        width: ${asRem(24)};
        height: ${asRem(24)};
      }
      >div {
        padding: 0;
      }
      &:hover {
        filter: brightness(0.5);
      }
    }
  }
`;

export const BaseAddToCartSuccessViewDisplayCardWrapper = styled.div`
  >.config-container {
    >.config-content {
      .items-line {
        margin: ${asRem(20)} 0;
      }
      .product-item {
        padding-bottom: ${asRem(20)};
        &:last-child {
          padding-bottom: 0;
        }
        &.is-insurance {
          .rz-image-view {
            background: #ECF3FB;
            border-radius: ${asRem(6)};
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: ${asRem(38)};
              height: ${asRem(38)};
            }
          }
        }
      }
      .container-image {
        width: ${asRem(80)};
        height: ${asRem(80)};
      }
      .right {
        flex-direction: column;
        justify-content: center;
        color: var(--color-text);
      }
      .container-price {
        display: flex;
        flex-direction: column-reverse;
        padding-left: ${asRem(20)};
        strong {
          font-size: ${asRem(16)};
          line-height: ${asRem(22)};
          @media screen and (min-width: ${Breakpoint.sm}) {
            font-size: ${asRem(24)};
            line-height: ${asRem(32)};
          }
        }
      }
      .container-heading {
        padding-left: ${asRem(20)};
        padding-bottom: ${asRem(8)};
        .sku {
          display: none;
        }
        p {
          font-size: ${asRem(16)};
          line-height: ${asRem(22)};
          @media screen and (min-width: ${Breakpoint.sm}) {
            font-size: ${asRem(20)};
          }
        }
      }
      .ctc {
        text-align: right;
        >div {
          display: block;
        }
        a {
          text-decoration: none;
          margin-top: ${asRem(5)};
          &:last-child {
            margin-left: ${asRem(10)};
          }
          @media screen and (min-width: ${Breakpoint.sm}) {
            margin-top: 0;
            margin-left: ${asRem(10)};
          }
        }
      }
    }
  }
`;

export const BaseAddToCartSuccessViewDisplayCard = ({
  products,
  crossSellProducts,
  showCrosssellProducts,
  onCrosssellProductAdded,
  customSuccessMsg = null,
  successViewSettings,
}) => {
  console.debug(`Left for future use ${successViewSettings}`);
  return (
    <AddToCartSuccessViewDisplayCardWrapper>
      <div className="config-container">
        <div className="config-content">
          <div className="items-line">
            {products && products.map((product) => (
              <div
                className="product-item"
                key={product.sku}
              >
                <ProductPreviewView
                  shouldLinkTitle={false}
                  product={product}
                />
              </div>
            ))}
            {customSuccessMsg && (
              <p>{customSuccessMsg}</p>
            )}
            {crossSellProducts && showCrosssellProducts && (
              <CrosssellProducts
                products={crossSellProducts}
                onConfirm={onCrosssellProductAdded}
              />
            )}
          </div>
          <div className="ctc">
            <ButtonList>
              <Link href="/cart/">
                <Button
                  mode="primary"
                  as="a"
                  alt="Skoða körfu"
                  href={{}}
                  ariaLabel="Skoða körfu"
                >
                  Skoða körfu
                </Button>
              </Link>
              <Link href={`/checkout/${Config.CheckoutPageLink}`}>
                <Button
                  mode="primary"
                  filled
                  as="a"
                  alt={translateV2('button.COMPLETE_THE_PURCHASE')}
                  href={{}}
                  ariaLabel={translateV2('button.COMPLETE_THE_PURCHASE')}
                >
                  {translateV2('button.COMPLETE_THE_PURCHASE')}
                </Button>
              </Link>
            </ButtonList>
          </div>
        </div>
      </div>
    </AddToCartSuccessViewDisplayCardWrapper>
  );
};

BaseAddToCartSuccessViewDisplayCard.propTypes = {
  products: PropTypes.array,
  crossSellProducts: PropTypes.array,
  onCrosssellProductAdded: PropTypes.func,
  showCrosssellProducts: PropTypes.bool,
  customSuccessMsg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  successViewSettings: PropTypes.object,
};

export const AddToCartSuccessViewDisplayCardWrapper = withDependencySupport(BaseAddToCartSuccessViewDisplayCardWrapper, 'AddToCartSuccessViewDisplayCardWrapper');

export const AddToCartSuccessView = ({
  show,
  showCrosssellProducts,
  onOptionCancel,
  products,
  crossSellProducts,
  onCrosssellProductAdded,
  customSuccessMsg,
  successViewSettings,
}) => {
  return (
    <CartActionPopupView
      modelSettings={{
        show,
        containerWidth: '530px',
        titleSection: (
          <AddToCartSuccessTitleViewWrapper>
            <Display24>Vöru bætt í körfu</Display24>
            <div className="action-btn">
              <Button
                onClick={onOptionCancel}
                noborder
                ariaLabel="Halda áfram að versla"
              >
                <TextMedium14>Halda áfram að versla</TextMedium14>
              </Button>
              <Button
                className="close-icon"
                icon={<CloseIcon />}
                noborder
                onClick={onOptionCancel}
                ariaLabel="Close Icon Button"
              />
            </div>
          </AddToCartSuccessTitleViewWrapper>
        ),
        onClosePopup: onOptionCancel,
      }}
    >
      <AddToCartSuccessViewDisplayCard
        showCrosssellProducts={showCrosssellProducts}
        products={products}
        crossSellProducts={crossSellProducts}
        onCrosssellProductAdded={onCrosssellProductAdded}
        customSuccessMsg={customSuccessMsg}
        successViewSettings={successViewSettings}
      />
    </CartActionPopupView>
  );
};

AddToCartSuccessView.propTypes = {
  show: PropTypes.bool,
  onOptionCancel: PropTypes.func,
  products: PropTypes.array,
  crossSellProducts: PropTypes.array,
  onCrosssellProductAdded: PropTypes.func,
  showCrosssellProducts: PropTypes.bool,
  customSuccessMsg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  successViewSettings: PropTypes.object,
};

export const AddToCartSuccessViewDisplayCard = withDependencySupport(BaseAddToCartSuccessViewDisplayCard, 'AddToCartSuccessViewDisplayCard');
export const AddToCartSuccessTitleViewWrapper = withDependencySupport(BaseAddToCartSuccessTitleViewWrapper, 'AddToCartSuccessTitleViewWrapper');
