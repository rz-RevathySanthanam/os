import React from 'react';
import styled from 'styled-components';
import { WishListConsumer } from '@/roanuz/store/core/wishlistContext';
import { MyWishListView } from '@/roanuz/view/customer/myWishlist';

const MyWishlistControllerWrapper = styled.div`
`;

export const MyWishlistController = () => {
  return (
    <WishListConsumer>
      {(wishListContext) => (
        <MyWishlistControllerWrapper>
          <MyWishListView
            loading={wishListContext.loading}
            error={wishListContext.error}
            wishList={wishListContext.wishListData}
          />
        </MyWishlistControllerWrapper>
      )}
    </WishListConsumer>
  );
};

MyWishlistController.propTypes = {
};
