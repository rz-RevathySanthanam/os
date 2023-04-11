/*
  FYI, This component has been re-written / modified in few clients wise.
*/
import React from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { CartSideView } from './side';

export const BaseCartSideViewPicker = ({
  cart, userContext,
}) => {
  console.debug(`Left for future use ${userContext}`);
  return (
    <CartSideView
      cart={cart}
    />
  );
};

BaseCartSideViewPicker.propTypes = {
  cart: PropTypes.object.isRequired,
  userContext: PropTypes.object,
};

export const CartSideViewPicker = withDependencySupport(BaseCartSideViewPicker, 'CartSideViewPicker');
