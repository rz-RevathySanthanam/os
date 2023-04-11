import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '@/roanuz/layout';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { MenuModelContext } from '@/roanuz/store/core/menuContext';

const CartActionViewWrapper = styled(Row)`
  justify-content: space-between;
`;

export const BaseCartActionView = ({
  featureConfig,
  cart,
  CartMiniType,
}) => {
  const [cartMiniVisible, setCartMiniVisible] = useState(false);
  const menuContext = useContext(MenuModelContext);
  if (featureConfig.modalView) {
    return (
      <CartActionViewWrapper>
        <div
          role="presentation"
          onClick={() => menuContext.toggleCartModal(true)}
          className="cart-item"
        >
          {cart}
        </div>
        <CartMiniType show={menuContext.showCartModal} cartConfig={featureConfig} />
      </CartActionViewWrapper>
    );
  }
  const showCartMini = () => {
    setCartMiniVisible(true);
  };
  const hideCartMini = () => {
    setCartMiniVisible(false);
  };
  return (
    <CartActionViewWrapper>
      {CartMiniType
        ? (
          <>
            <div
              onMouseOver={showCartMini}
              onMouseOut={hideCartMini}
              onFocus={showCartMini}
              onBlur={hideCartMini}
              className="cart-item"
            >
              <Link href="/cart/">
                <a alt="Goto Cart">
                  {cart}
                </a>
              </Link>
              {featureConfig.showMiniView && (
                <CartMiniType show={cartMiniVisible} cartConfig={featureConfig} />
              )}
            </div>
          </>
        ) : (
          <></>
        )}
    </CartActionViewWrapper>
  );
};

BaseCartActionView.propTypes = {
  featureConfig: PropTypes.object,
  cart: PropTypes.element,
  CartMiniType: PropTypes.elementType,
};

export const CartActionView = withDependencySupport(BaseCartActionView, 'CartActionView');
