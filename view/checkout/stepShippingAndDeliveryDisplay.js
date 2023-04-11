import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { TextMedium16, Bold16 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import Config from '@/config';
import { AddressDisplayCard } from '@/roanuz/view/customer/addressDisplayCard';
import { ParagraphDisplayView } from '@/roanuz/view/customer/addressDisplayParaView';
import { parseStepsModal } from '@/roanuz/view/checkout/wizard';
import { displayRzShippingAttributes } from '@/roanuz/view/order/shippingAttributesView';
import { Button } from '../button';
import { translateV2 } from '../../lib/utils';

export const ShippingAndDeliveryDisplayViewWrapper = styled.div``;

export const ShippingAddressParagraphViewWrapper = styled.div`
  padding-bottom: ${asRem(15)};
  border-bottom: 1px solid #EBD3C7;
  margin-bottom: ${asRem(30)};
`;

export const BaseShippingAddressCardViewWrapper = styled.div`
  margin-top: ${asRem(15)};
  .card-wrapper {
    // padding-top: ${asRem(15)};
    display: flex;
    justify-content: space-between;
    width: 100%;
    .rz-address-card {
      width: 100%;
    }
    .selection {
      display: flex;
      justify-content: space-between;
    }
    &.no-justify {
      justify-content: initial;
    }
  }
  >.label {
    padding-bottom: 0.625rem;
    border-bottom: 1px solid var(--color-disabled-3);
  }
`;

export const BaseShippingAddressCardView = ({ data, onClick, hideEdit }) => {
  return (
    <BaseShippingAddressCardViewWrapper>
      <div className="card-wrapper">
        <AddressDisplayCard
          address={data}
          actionButtons={
            onClick && !hideEdit && (
              // To satisfy in Dependecy, added one more attr hideEdit for condition check.
              <div className="value">
                <Button
                  mode="primary"
                  noborder
                  nomargin
                  onClick={onClick}
                  ariaLabel="Edit"
                >
                  Edit
                </Button>
              </div>
            )
          }
          styleProps={{
            padding: false,
            border: false,
          }}
        />
      </div>
    </BaseShippingAddressCardViewWrapper>
  );
};

BaseShippingAddressCardView.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  hideEdit: PropTypes.bool,
};

export const BaseShippingAddressParagraphView = ({ data, onClick }) => {
  return (
    <ShippingAddressParagraphViewWrapper>
      <ParagraphDisplayView
        title={`${translateV2('myPages.SHIPPING_ADDRESS')}:`}
        data={data}
        actionButtons={(
          <div className="value">
            <Button
              mode="primary"
              noborder
              nomargin
              onClick={onClick}
              ariaLabel="Edit"
            >
              {translateV2('button.EDIT')}
            </Button>
          </div>
        )}
      />
    </ShippingAddressParagraphViewWrapper>
  );
};

BaseShippingAddressParagraphView.propTypes = {
  ...BaseShippingAddressCardView.PropTypes,
};

export const BaseShippingMethodCardView = ({ data, onClick, hideEdit }) => {
  return (
    <BaseShippingAddressCardViewWrapper>
      <div className="card-wrapper no-justify">
        <TextMedium16>{data.shippingMethod && data.shippingMethod.title}</TextMedium16>
        &nbsp;&nbsp;&nbsp;
        <Bold16 className="label">{data.shippingChargeText}</Bold16>
        {onClick && !hideEdit && (
          <div className="value">
            <Button
              mode="primary"
              noborder
              nomargin
              onClick={onClick}
              ariaLabel="Edit"
            >
              {translateV2('button.EDIT')}
            </Button>
          </div>
        )}
      </div>
      {displayRzShippingAttributes(JSON.parse(data.shippingAddress.rz_shipping_attributes))}
    </BaseShippingAddressCardViewWrapper>
  );
};

BaseShippingMethodCardView.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  hideEdit: PropTypes.bool,
};

export const BaseShippingMethodParagraphView = ({ data, onClick }) => {
  return (
    <ShippingAddressParagraphViewWrapper>
      <ParagraphDisplayView
        title="Afhendingarmáti:"
        data={data}
        actionButtons={(
          <div className="value">
            <Button
              mode="primary"
              noborder
              nomargin
              onClick={onClick}
              ariaLabel="Edit"
            >
              {translateV2('button.EDIT')}
            </Button>
          </div>
        )}
      />
    </ShippingAddressParagraphViewWrapper>
  );
};

BaseShippingMethodParagraphView.propTypes = {
  ...BaseShippingMethodCardView.PropTypes,
};

export const BaseShippingAndDeliveryDisplayView = ({ cart, activeStep, onEditShippingDetails }) => {
  const { CheckoutSettings } = Config;
  const { CheckoutSteps } = CheckoutSettings || {};

  const { checkoutStepsKeys, activeStepIndex } = parseStepsModal(CheckoutSteps, activeStep);

  const isDeliveryStep = activeStepIndex > checkoutStepsKeys.indexOf(CheckoutSteps.shipping.id);
  const isPaymentStep = activeStepIndex > (
    CheckoutSteps.delivery
      ? checkoutStepsKeys.indexOf(CheckoutSteps.delivery.id)
      : checkoutStepsKeys.indexOf(CheckoutSteps.shipping.id)
  );

  return (
    <ShippingAndDeliveryDisplayViewWrapper>
      {(cart.shippingAddress && isDeliveryStep) && (
        <ShippingAddressCardView
          data={cart.shippingAddress}
          onClick={() => onEditShippingDetails(CheckoutSteps.shipping.id)}
        />
      )}
      {cart.shippingMethod && isPaymentStep && (
        <ShippingMethodCardView
          data={cart}
          onClick={() => onEditShippingDetails(
            CheckoutSteps.delivery ? CheckoutSteps.delivery.id : CheckoutSteps.shipping.id,
          )}
        />
      )}
    </ShippingAndDeliveryDisplayViewWrapper>
  );
};

BaseShippingAndDeliveryDisplayView.propTypes = {
  cart: PropTypes.object.isRequired,
  activeStep: PropTypes.string,
  onEditShippingDetails: PropTypes.func,
};

export const ShippingAndDeliveryDisplayView = withDependencySupport(BaseShippingAndDeliveryDisplayView, 'ShippingAndDeliveryDisplayView');

export const ShippingAddressCardView = withDependencySupport(BaseShippingAddressCardView, 'ShippingAddressCardView');
export const ShippingAddressParagraphView = withDependencySupport(BaseShippingAddressParagraphView, 'ShippingAddressParagraphView');

export const ShippingMethodCardView = withDependencySupport(BaseShippingMethodCardView, 'ShippingMethodCardView');
export const ShippingMethodParagraphView = withDependencySupport(BaseShippingMethodParagraphView, 'ShippingMethodParagraphView');
