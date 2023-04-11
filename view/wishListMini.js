import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parseWishList } from '@/roanuz/view/customer/model';
import { ProductPreviewView } from './product/preview';
import { ProductPreviewDisplayMode } from '../layout/product/preview';
import { toolbarPopupView } from '../layout/topToolbarPopupView';
import { RemoveFromWishListMini } from '../controller/product/addToWishList';
import { translateV2 } from '../lib/utils';

const WishListMiniViewWrapper = styled(toolbarPopupView)`
`;

export const WishListMiniView = ({
  show,
  loading, error, wishList: wishListData,
}) => {
  const wishList = (wishListData
    && wishListData.customer && wishListData.customer.wishlist_v2)
    ? parseWishList(wishListData.customer.wishlist_v2) : null;
  const okay = (!loading) && (!error) && (wishList)
  && wishList.items.length > 0;

  return (
    <WishListMiniViewWrapper show={show}>
      <div className="mini-view-container">
        {loading && (
          <div>{translateV2('wishlist.LOADING_MSG')}</div>
        )}
        {error && (
          <div>{error.message}</div>
        )}
        {!okay && (
          <div>{translateV2('wishlist.EMPTY_MSG')}</div>
        )}
        {okay && (
          <>
            <h4>{translateV2('wishlist.CONTAINS_MSG')}</h4>
            <div>
              <div className="items">
                {wishList.items.map((item) => (
                  <div className="item" key={item.product.uid}>
                    <ProductPreviewView
                      product={item.product}
                      displayMode={ProductPreviewDisplayMode.TwoCol}
                      actionView={<RemoveFromWishListMini product={item} />}
                    />
                  </div>
                ))}
              </div>
              <div className="summary">
                <p>
                  {translateV2('cart.TOTAL')}
                  :
                  <strong>{wishList.totalWishListItems}</strong>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </WishListMiniViewWrapper>
  );
};

WishListMiniView.propTypes = {
  show: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  wishList: PropTypes.object,
};
