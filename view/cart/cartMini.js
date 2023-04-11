import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Config from '@/config';
import { translateV2 } from '@/roanuz/lib/utils';
import { ProductPreviewView } from '../product/preview';
import { ProductPreviewDisplayMode } from '../../layout/product/preview';
import { Button, ButtonList } from '../button';
import { toolbarPopupView } from '../../layout/topToolbarPopupView';
import { RemoveFromCartMini } from '../../controller/product/addToCart';

const CartMiniViewWrapper = styled(toolbarPopupView)`
  .cart-button {
    & :hover {
      color: var(--color-text-rev);
    }
  }
  .cart-error {
    color: var(--color-focus);
  }
`;

export const CartMiniView = ({
  show,
  loading, error, cart, okay,
  outOfStockError,
}) => {
  return (
    <CartMiniViewWrapper show={show}>
      <div className="mini-view-container">
        {loading && (
          <div>{translateV2('cart.LOADING_MSG')}</div>
        )}
        {error && (
          <div>
            {error.message}
          </div>
        )}
        {outOfStockError && (
          <div className="cart-error">
            {outOfStockError}
          </div>
        )}
        {!okay && (
          <div>{translateV2('cart.EMPTY_MSG')}</div>
        )}
        {okay && (
          <>
            <h4>{translateV2('cart.CONTAINS_MSG')}</h4>
            <div>
              <div className="items">
                {cart.items.map((item) => (
                  <div className="item" key={item.uid}>
                    <ProductPreviewView
                      product={item.product}
                      displayMode={ProductPreviewDisplayMode.TwoCol}
                      actionView={<RemoveFromCartMini product={item} />}
                    />
                  </div>
                ))}
              </div>
              <div className="summary">
                <p>
                  {translateV2('cart.TOTAL')}
                  :&nbsp;
                  <strong>{cart.grandTotalPriceText}</strong>
                </p>
              </div>
              <div className="ctc">
                <ButtonList asList block>
                  <Link href={`/checkout/${Config.CheckoutPageLink}`}>
                    <Button
                      mode="primary"
                      filled
                      alt={translateV2('button.COMPLETE_THE_PURCHASE')}
                      ariaLabel={translateV2('button.COMPLETE_THE_PURCHASE')}
                    >
                      {translateV2('button.COMPLETE_THE_PURCHASE')}
                    </Button>
                  </Link>
                </ButtonList>
                <ButtonList asList block>
                  <Link href="/cart/">
                    <Button
                      mode="normal"
                      as="a"
                      alt="View Cart"
                      href={{}}
                      className="cart-button"
                      ariaLabel="View Cart"
                    >
                      {translateV2('button.VIEW_CART')}
                    </Button>
                  </Link>
                </ButtonList>
              </div>
            </div>
          </>
        )}
      </div>
    </CartMiniViewWrapper>
  );
};

CartMiniView.propTypes = {
  show: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  cart: PropTypes.object,
  okay: PropTypes.bool,
  outOfStockError: PropTypes.string,
};
