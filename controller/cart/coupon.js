import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { ApplyCouponToCartMutation, RemoveCouponToCartMutation } from '@/roanuz/store/cart/query';
import { CouponView } from '@/roanuz/view/cart/coupon';
import { translateV2 } from '../../lib/utils';

export const CouponViewController = ({
  cart,
}) => {
  const [formInitVal] = useState({ coupon: '' });
  const [showMessage, setShowMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  const [applyCoupon,
    {
      loading: couponLoading,
      error: couponError,
      data: couponData,
    }] = useMutation(ApplyCouponToCartMutation, {
    onCompleted: () => {
      setShowSuccessMessage(translateV2('cart.DISCOUNT_ACTIVATED'));
    },
  });

  const [removeCoupon,
    {
      loading: couponRemoveLoading,
      error: couponRemoveError,
      data: couponRemoveData,
    }] = useMutation(RemoveCouponToCartMutation, {
    onCompleted: () => {
      setShowMessage(translateV2('cart.DISCOUNT_INACTIVATED'));
    },
  });

  const onSubmit = (values) => {
    const variables = { cart_id: cart.id, coupon_code: values.coupon };
    applyCoupon({ variables });
  };

  const onRemove = () => {
    const variables = { cart_id: cart.id };
    removeCoupon({ variables });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSuccessMessage('');
      setShowMessage('');
    }, 2000);
  }, [showMessage, showSuccessMessage]);

  return (
    <CouponView
      cart={cart}
      formInitVal={formInitVal}
      onSubmit={onSubmit}
      onRemove={onRemove}
      showSuccessMessage={showSuccessMessage}
      showMessage={showMessage}
      couponParser={{
        couponLoading,
        couponError,
        couponData,
        couponRemoveLoading,
        couponRemoveError,
        couponRemoveData,
      }}
    />
  );
};

CouponViewController.propTypes = {
  cart: PropTypes.object.isRequired,
};
