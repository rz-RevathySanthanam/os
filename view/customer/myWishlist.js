import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UserContext } from '@/roanuz/store/core/context';
import { asRem } from '@/roanuz/lib/css';
import { parseWishList } from '@/roanuz/view/customer/model';
import { ProductPreviewView } from '@/roanuz/view/product/preview';
import { RemoveFromWishListMini } from '@/roanuz/controller/product/addToWishList';
import { AddToCartPicker } from '@/roanuz/controller/product/actionPicker';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseMyWishListViewWrapper = styled.div`
  .debug-loading-view, .debug-error-view {
    margin: 0 auto;
    width: ${asRem(280)};
    color: var(--color-text);
    .text-center {
      transform: initial !important;
    }
    >div {
      background: #ffebf6;
      text-align: center;
      padding: ${asRem(20)};
      border-radius: ${asRem(10)};
    }
  }
  .debug-loading-view {
    >div {
      background: whitesmoke;
    }
  }

  .item {
    border-bottom: ${asRem(1)} solid var(--color-border);
    padding: ${asRem(15)} 0;
    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }
    .container {
      >.right {
        align-items: center;
      }
    }
    .rz-product-preview {
      text-align: right;
      >.container {
        text-align: initial;
      }
    }
    .container-action {
      margin: 0;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .gift-registry-btn {
    &, >div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    & {
      margin-bottom: ${asRem(15)};
    }

    >div {
      cursor: pointer;
      color: var(--color-button);
    }
  }
`;

export const MyWishListView = ({
  loading, error, wishList: wishListData,
}) => {
  const wishList = (wishListData
    && wishListData.customer && wishListData.customer.wishlist_v2)
    ? parseWishList(wishListData.customer.wishlist_v2, true) : null;
  const okay = (!loading) && (!error) && (wishList)
    && wishList.items.length > 0;
  const userContext = useContext(UserContext);

  const parseStockStatus = (item) => {
    const available = item.stockStatus === 'IN_STOCK';
    const productRef = { ...item };
    productRef.available = available;
    productRef.configProdVariationsInfo = {};
    return productRef;
  };

  const noItemsError = {
    message: translateV2('wishlist.EMPTY_MSG'),
  };

  return (
    <MyWishListViewWrapper>
      {/* TODO: Wishlist sharing (Gift Registry V1) support removed in Omni Shop. */}
      {(loading || !userContext.cartVerified) && (
        <LoadingView message={translateV2('wishlist.LOADING_MSG')} />
      )}
      {error && (
        <ErrorView error={error} />
      )}
      {userContext.loaded && !loading
        && (!wishList || (wishList && (wishList.items.length === 0))) && (
        <ErrorView error={noItemsError} />
      )}
      {okay && (
        wishList.items.map((item) => (
          <div className="item" key={item.product.uid}>
            <ProductPreviewView
              product={item.product}
              actionView={<RemoveFromWishListMini product={item} />}
              secondaryActionView={(
                <AddToCartPicker
                  options={{}} // TODO: Need to add bundled and group product options here.
                  product={parseStockStatus(item.product)}
                  userContext={userContext}
                />
              )}
            />
          </div>
        ))
      )}
    </MyWishListViewWrapper>
  );
};

MyWishListView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  wishList: PropTypes.object,
};

export const MyWishListViewWrapper = withDependencySupport(BaseMyWishListViewWrapper, 'MyWishListViewWrapper');
