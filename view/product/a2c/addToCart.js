import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as BaseCartIcon } from '@/roanuz/view/imgs/CartIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem } from '@/roanuz/lib/css';
import { translateV2 } from '@/roanuz/lib/utils';
import { StatefulButton } from '../../statefulView';
import { CircleSVG } from '../../icon';

export const BaseAddToCartViewWrapper = styled.div`
  >.rz-button-wrapper {
    .rz-button {
      gap: ${asRem(10)};
    }
  }
`;

export const BaseAddToCartView = ({
  loading, error, data,
  onClick, disabled,
  className, buttonText = translateV2('button.ADD_TO_CART'),
  ...buttonParams
}) => {
  return (
    <AddToCartViewWrapper className={`rz-button-wrapper ${className}`}>
      <StatefulButton
        state={{ loading, error, data }}
        buttonIcon={<CartIcon />}
        loadingIcon={<CircleSVG />}
        buttonText={disabled ? 'Uppselt' : buttonText}
        doneText="Added"
        hideDoneText
        errorText="Villa, vinsamlegast reynið aftur"
        onClick={onClick}
        disabled={disabled}
        {...buttonParams}
      />
    </AddToCartViewWrapper>
  );
};

BaseAddToCartView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  buttonText: PropTypes.string,
};

export const AddToCartView = withDependencySupport(BaseAddToCartView, 'AddToCartView');
export const AddToCartViewWrapper = withDependencySupport(BaseAddToCartViewWrapper, 'AddToCartViewWrapper');
export const CartIcon = withDependencySupport(BaseCartIcon, 'CartIcon');
