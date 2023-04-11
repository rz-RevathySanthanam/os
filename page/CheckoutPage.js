import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SEOHead } from '@/roanuz/document';
import { StoreConfigConsumer } from '@/roanuz/store/core/context';

import { CheckoutPageController } from '@/roanuz/controller/checkout/page';
import ContainerWidgets from '@/roanuz/widgets/ContainerWidgets';
import { filterCartWidgets } from '@/roanuz/store/layout/widget';
import { LayoutContainer } from '@/roanuz/store/layout/layout';
import { useRouter } from 'next/router';
import {
  dependencyRegister,
  // eslint-disable-next-line import/no-unresolved
} from '_WEBSITE_KEY_/dep/checkout';
import { translateV2 } from '../lib/utils';

dependencyRegister();

export const CheckoutPage = ({
  currentStep, widgets, cartModel, checkoutSteps,
}) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(currentStep);
  const {
    cartLoading,
    cartError,
    profileLoading,
    cart,
    isCartDataEmpty,
  } = cartModel;

  useEffect(() => {
    setActiveStep(router.query.step);
  }, [router.query.step]);

  const pageWidgets = filterCartWidgets({ widgets, cart });

  return (
    <StoreConfigConsumer>
      {() => (
        <div>
          <SEOHead
            title={`${translateV2('orders.SERVE')} | ${checkoutSteps[activeStep].title}`}
          />
          <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentTop} />
          <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.Content} />
          <CheckoutPageController
            cart={cart}
            currentStep={currentStep}
            cartFetchingStatus={{
              pageLoading: cartLoading,
              pageError: cartError,
              profileLoading,
              isCartDataEmpty,
            }}
            stepStatus={{
              activeStep,
            }}
          />
          <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentBottom} />
        </div>
      )}
    </StoreConfigConsumer>
  );
};

CheckoutPage.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.object),
  currentStep: PropTypes.string,
  cartModel: PropTypes.object.isRequired,
  checkoutSteps: PropTypes.object.isRequired,
};

// export default CheckoutPage;
