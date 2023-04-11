import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint, changeContentAnimation } from '@/roanuz/lib/css';
import { LogoView } from '@/roanuz/view/brand';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { DisplayBold20, Bold16 } from '@/roanuz/typopgraphy';
import OmnishopLogoTitle from '@/roanuz/view/imgs/OmnishopLogoTitle.svg';
import { ReactComponent as DeliveryIcon } from '@/roanuz/view/imgs/TruckIcon.svg';
import { ReactComponent as CollectIcon } from '@/roanuz/view/imgs/CollectIcon.svg';
import { translateV2 } from '@/roanuz/lib/utils';
import { SVGIcon } from '../../icon';

export const BaseShippingOrCollectionSwitchViewWrapper = styled.div`
  ul {
    display: flex;
    align-items: center;
    gap: ${asRem(16)};
    margin-bottom: ${asRem(32)};
    li {
      border: ${asRem(1)} solid var(--color-border);
      border-radius: ${asRem(4)};
      padding: ${asRem(16)} ${asRem(32)};
      cursor: pointer;
      transition: all .3s ease-in-out;
      display: flex;
      align-items: center;
      gap: ${asRem(16)};
      &.active, &:hover {
        border-color: #202020;
      }
    }
  }
  .form-name {
    margin-bottom: ${asRem(24)};
  }
`;

const methodTypeIcon = {
  Shipping: <DeliveryIcon />,
  Collection: <CollectIcon />,
};

export const BaseShippingOrCollectionSwitchView = ({
  methodTypeDetails, values, setSelectedMethodTypeHandler,
  isShippingType,
}) => {
  const {
    selectedShippmentMethodType,
    types,
  } = methodTypeDetails;
  return (
    <ShippingOrCollectionSwitchViewWrapper>
      <ul>
        {Object.keys(types).map((type) => (
          <li
            key={type}
            onClick={() => setSelectedMethodTypeHandler(type, values)}
            onKeyPress={() => setSelectedMethodTypeHandler(type, values)}
            role="presentation"
            className={type === selectedShippmentMethodType ? 'active' : ''}
          >
            <SVGIcon heightPx={20}>
              {methodTypeIcon[type]}
            </SVGIcon>
            <Bold16>
              {translateV2(`orders.${types[type].toUpperCase()}`)}
            </Bold16>
          </li>
        ))}
      </ul>
      <div className="form-wrapper">
        <DisplayBold20 as="h2" className="form-name">
          {translateV2(isShippingType ? 'orders.SHIPPING_ADDRESS' : 'orders.CUSTOMER_INFORMATION')}
        </DisplayBold20>
      </div>
    </ShippingOrCollectionSwitchViewWrapper>
  );
};

BaseShippingOrCollectionSwitchView.propTypes = {
  methodTypeDetails: PropTypes.object.isRequired,
  values: PropTypes.object,
  setSelectedMethodTypeHandler: PropTypes.func,
  isShippingType: PropTypes.bool,
};

export const StepNumberViewWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${asRem(40)};
  height: ${asRem(40)};
  color: var(--color-button);
  border: 1px solid var(--color-button);
  border-radius: 50%;
  transition: all .3s ease-in-out;
  ${(p) => p.isActive && css`
    background: var(--color-button);
    color: #fff;
  `}
`;

export const BaseStepNumberView = ({ stepNumber, isActive, className }) => {
  return (
    <StepNumberViewWrapper
      className={className}
      isActive={isActive}
    >
      {stepNumber}
    </StepNumberViewWrapper>
  );
};

BaseStepNumberView.propTypes = {
  stepNumber: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export const CheckoutPageLogoViewWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${asRem(13)};
  padding: ${asRem(10)} var(--space-page-side-padding);
  background-color: var(--color-checkout-left-bg);

  @media screen and (min-width: ${Breakpoint.sm}) {
    padding: ${asRem(20)} var(--space-page-side-padding);
  }
  .title-logo {
    svg {
      height: ${asRem(35)};
    }
  }
`;

export const OmniShopCheckoutPageLogoViewWithTitle = () => {
  return (
    <CheckoutPageLogoViewWrapper className="checkout-logo-view">
      <LogoView className="hide-desktop" />
      <div className="hide-mobile title-logo">
        <LogoView logo={OmnishopLogoTitle} />
      </div>
    </CheckoutPageLogoViewWrapper>
  );
};

export const BaseCheckoutPageLogoView = () => {
  return (
    <CheckoutPageLogoViewWrapper className="checkout-logo-view">
      <LogoView />
    </CheckoutPageLogoViewWrapper>
  );
};

export const BaseCheckoutStepOnInActiveView = ({
  stepNumberView,
  title,
  card,
  stepNumber,
}) => {
  console.debug(`Left for future use ${stepNumber}`);
  return (
    <>
      <div className="title-with-num">
        {stepNumberView}
        {title}
      </div>
      <div className="checkout-step-content">
        {card}
      </div>
    </>
  );
};

BaseCheckoutStepOnInActiveView.propTypes = {
  stepNumberView: PropTypes.element.isRequired,
  title: PropTypes.element,
  card: PropTypes.element,
  stepNumber: PropTypes.number,
};

export const BaseCheckoutStepsCommonViewWrapper = styled.div`
  position: relative;
  margin-top: ${asRem(20)};
  ${(props) => props.isActive && css`
    animation: ${changeContentAnimation} .5s ease-in;
  `}
  
  .title-with-num {
    display: flex;
    justify-content: flex-start;
    gap: ${asRem(16)};
    align-items: center;
    margin-bottom: ${asRem(16)};

    @media screen and (min-width: ${Breakpoint.md}) {
      gap: ${asRem(32)};
    }

    h1 {
      flex: 1;
    }
    ${(props) => props.isActive && css`
      .step-title {
        font-size: ${asRem(24)};
        line-height: ${asRem(32)};
        @media screen and (min-width: ${Breakpoint.md}) {
          font-size: ${asRem(32)};
          line-height: ${asRem(40)};
        }
      }
    `}
  }

  .checkout-step-content {
    margin-bottom: ${asRem(48)};
    @media screen and (min-width: ${Breakpoint.lg}) {
      padding-left: ${asRem(76)};
    }
  }

  .rz-address-card {
    .selection {
      align-items: center;
      flex-direction: row;
      position: relative;
      .container-actions {
        padding: 0;
        margin: 0;
        position: absolute;
        top: 0;
        right: 0;
        button {
          padding: 0;
          .rz-svg-icon {
            display: none;
          }
          >span {
            text-decoration: underline;
          }
        }
      }
      >.address-container {
        flex: 1;
        .label {
          display: none;
        }
        .address {
          padding-bottom: ${asRem(4)};
        }
      }
      &.input-selection {
        >.address-container {
          margin-left: 0;
        }
      }
    }
  }

  .edit-btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const ShippingOrCollectionSwitchView = withDependencySupport(BaseShippingOrCollectionSwitchView, 'ShippingOrCollectionSwitchView');
export const CheckoutPageLogoView = withDependencySupport(BaseCheckoutPageLogoView, 'CheckoutPageLogoView');
export const CheckoutStepsCommonViewWrapper = withDependencySupport(BaseCheckoutStepsCommonViewWrapper, 'CheckoutStepsCommonViewWrapper');
export const StepNumberView = withDependencySupport(BaseStepNumberView, 'StepNumberView');
export const CheckoutStepOnInActiveView = withDependencySupport(BaseCheckoutStepOnInActiveView, 'CheckoutStepOnInActiveView');
export const ShippingOrCollectionSwitchViewWrapper = withDependencySupport(BaseShippingOrCollectionSwitchViewWrapper, 'ShippingOrCollectionSwitchViewWrapper');
