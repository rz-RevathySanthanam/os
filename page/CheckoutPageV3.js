import React from 'react';
import PropTypes from 'prop-types';
import { SEOHead } from '@/roanuz/document';
import { StoreConfigConsumer } from '@/roanuz/store/core/context';

import { CheckoutPageController } from '@/roanuz/controller/checkout/v3/page';
import ContainerWidgets from '@/roanuz/widgets/ContainerWidgets';
import { filterCartWidgets } from '@/roanuz/store/layout/widget';
import { LayoutContainer } from '@/roanuz/store/layout/layout';
import {
  dependencyRegister,
  // eslint-disable-next-line import/no-unresolved
} from '_WEBSITE_KEY_/dep/checkout';
import { translateV2 } from '../lib/utils';

dependencyRegister();

export const CheckoutPageV3 = ({ step, widgets, cartModel }) => {
  const pageWidgets = filterCartWidgets({ widgets, cart: cartModel.cart });

  return (
    <StoreConfigConsumer>
      {() => (
        <div>
          <SEOHead
            title={`${translateV2('orders.SERVE')} | ${step}`}
          />
          <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentTop} />
          <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.Content} />
          <CheckoutPageController
            activeStep={step}
            cartModel={cartModel}
          />
          <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentBottom} />
        </div>
      )}
    </StoreConfigConsumer>
  );
};

CheckoutPageV3.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.object),
  step: PropTypes.string,
  cartModel: PropTypes.object.isRequired,
};
