import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as BaseWishListIcon } from '@/roanuz/view/imgs/HeartIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { IconIndicatorView } from './iconIndicator';

export const WishListIcon = withDependencySupport(BaseWishListIcon, 'WishListIcon');

export const WishListIndicatorView = ({
  loading, error, item,
}) => {
  return (
    <IconIndicatorView
      loading={loading}
      error={error}
      item={item}
      hideIndicatorForZero={!item || item.total_quantity === 0}
      iconHeightPx={20}
    >
      <WishListIcon />
    </IconIndicatorView>
  );
};

WishListIndicatorView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  item: PropTypes.shape({
    total_quantity: PropTypes.number,
  }),
};
