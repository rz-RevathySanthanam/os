/*
  FYI, This component has been re-written / modified in few clients wise.
*/
import React from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { AddToWishList } from './addToWishList';
import { AddToCart } from './addToCart';

/*
  A component to decide whether to show wishlist or quick order feature.
*/
export const BaseAddToWishListPicker = ({
  product, buttonText, userContext,
  ...buttonParams
}) => {
  return (
    <AddToWishList product={product} buttonText={buttonText} {...buttonParams} />
  );
};

BaseAddToWishListPicker.propTypes = {
  product: PropTypes.object.isRequired,
  buttonText: PropTypes.string,
  userContext: PropTypes.object,
};

/*
  A component to display cart button accordingly based on conditions.
*/
export const BaseAddToCartPicker = ({
  product, options, resetOption, mode, userContext,
  ...buttonParams
}) => {
  return (
    <AddToCart
      options={options}
      product={product}
      onCartReset={resetOption}
      mode={mode}
      {...buttonParams}
    />
  );
};

BaseAddToCartPicker.propTypes = {
  product: PropTypes.object.isRequired,
  options: PropTypes.object,
  resetOption: PropTypes.func,
  mode: PropTypes.string,
  userContext: PropTypes.object,
};

export const AddToWishListPicker = withDependencySupport(BaseAddToWishListPicker, 'AddToWishListPicker');
export const AddToCartPicker = withDependencySupport(BaseAddToCartPicker, 'AddToCartPicker');
