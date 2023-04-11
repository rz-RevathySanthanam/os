import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as BaseCartIcon } from '@/roanuz/view/imgs/CartIcon.svg';
import { IconIndicatorView } from './iconIndicator';
import { withDependencySupport } from '../lib/dep';

export const CartIndicatorView = ({
  loading, error, itemsCount,
  hasCart,
}) => {
  // TODO: cartInternallyProcessing loader - removed temporarily
  return (
    <>
      <IconIndicatorView
        loading={loading}
        error={error}
        item={{ total_quantity: hasCart ? itemsCount : 0 }}
        iconHeightPx={23}
      >
        <CartIcon />
      </IconIndicatorView>
    </>
  );
};

CartIndicatorView.propTypes = {
  loading: PropTypes.bool,
  hasCart: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  itemsCount: PropTypes.number,
};

export const CartIndicatorLoadingView = () => {
  return (
    <CartIndicatorView
      loading
    />
  );
};

export const CartIcon = withDependencySupport(BaseCartIcon, 'CartIcon');
