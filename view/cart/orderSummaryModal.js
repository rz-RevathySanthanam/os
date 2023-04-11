import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { CartSideView } from '@/roanuz/view/cart/side';
import { Button } from '@/roanuz/view/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Display20, DisplayBold20 } from '@/roanuz/typopgraphy';
import { ReactComponent as UserIcon } from '@/roanuz/view/imgs/UserIcon.svg';
import { ReactComponent as ShoppingBagIcon } from '@/roanuz/view/imgs/ShoppingBagIcon.svg';
import { IconIndicatorView } from '@/roanuz/view/iconIndicator';
import { UserConsumer } from '@/roanuz/store/core/context';
import { SideBarView } from '@/roanuz/view/sideBar';
import { translateV2 } from '@/roanuz/lib/utils';

const OrderSummaryWrapper = styled.div`
  margin-bottom: ${asRem(20)};
  >.links {
    margin-right: -${asRem(15)};
    margin-left: -${asRem(15)};
    padding: ${asRem(14)} ${asRem(20)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(22, 108, 200, 0.1);
    svg {
      width: ${asRem(28)};
      height: ${asRem(28)};
    }
    button {
      margin-left: ${asRem(20)};
      color: var(--color-button);
    }
  }
  .cart-summary-card {
    .cart-summary {
      >h4 {
        display: none;
      }
    }
  }
`;

export const OrderSummaryModalView = ({
  cart, menuContext, shippingAndDeliveryDisplayView,
  isCartPage, isPaymentStep,
}) => {
  const [summaryModal, setSummaryModal] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(cart && cart.total_quantity);
  const router = useRouter();
  const userConsumer = useContext(UserConsumer);

  useEffect(() => {
    setCartItemsCount(cart && cart.total_quantity);
  }, [cart && cart.total_quantity]);

  return (
    <>
      <OrderSummaryWrapper>
        <div className="links">
          <div className="left">
            <Display20>
              {translateV2('cart.TOTAL')}
            </Display20>
            <DisplayBold20>{cart ? cart.grandTotalPriceText : '...'}</DisplayBold20>
          </div>
          <div className="right">
            <Button
              noborder
              nomargin
              onClick={() => setSummaryModal(true)}
              ariaLabel="Bag Icon Button"
            >
              <IconIndicatorView
                item={{ total_quantity: cartItemsCount || '.' }}
                iconHeightPx={20}
              >
                <ShoppingBagIcon />
              </IconIndicatorView>
            </Button>
            {!isPaymentStep && (
              <Link prefetch={false} href={(userConsumer && userConsumer.token) ? '/customer/account' : `/customer/account/login?next=${router && router.asPath ? router.asPath : null}`}>
                <Button
                  icon={<UserIcon />}
                  mode="primary"
                  noborder
                  nomargin
                  ariaLabel="User Icon Button"
                />
              </Link>
            )}
          </div>
        </div>
      </OrderSummaryWrapper>
      <SideBarView
        show={summaryModal}
        onClose={() => setSummaryModal(false)}
        animationMode="SlideInRight"
        showClose
        titleText={translateV2('cart.SUMMARY')}
      >
        <OrderSummaryWrapper>
          <div className="cart-summary-card">
            {cart && (
              <CartSideView
                cart={cart}
                isCartPage={isCartPage}
                menuContext={menuContext}
                shippingAndDeliveryDisplayView={shippingAndDeliveryDisplayView}
              />
            )}
          </div>
        </OrderSummaryWrapper>
      </SideBarView>
    </>
  );
};

OrderSummaryModalView.propTypes = {
  cart: PropTypes.object.isRequired,
  menuContext: PropTypes.object,
  shippingAndDeliveryDisplayView: PropTypes.element,
  isCartPage: PropTypes.bool,
  isPaymentStep: PropTypes.bool,
};
