import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '@/roanuz/layout';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { WishListIndicatorView } from '@/roanuz/view/wishListIndicator';
import { ClientSideView } from '@/roanuz/clientSide';
import { UserContext } from '@/roanuz/store/core/context';

const WishListActionViewWrapper = styled(Row)`
  justify-content: space-between;
  .wishlist-item {
    .rz-icon-indicator {
      text-align: center;
    }
  }
`;

export const BaseWishListActionView = ({
  featureConfig,
  wishList,
  WishListMiniType,
}) => {
  const userContext = useContext(UserContext);
  const [wishListMiniVisible, setWishListMiniVisible] = useState(false);
  const showWishListMini = () => {
    setWishListMiniVisible(true);
  };
  const hideWishListMini = () => {
    setWishListMiniVisible(false);
  };
  return (
    <WishListActionViewWrapper>
      <div
        onMouseOver={showWishListMini}
        onMouseOut={hideWishListMini}
        onFocus={showWishListMini}
        onBlur={hideWishListMini}
        className="wishlist-item"
      >
        <ClientSideView
          loadingView={(
            <Link href="/customer/account">
              <a alt="Goto Login">
                <WishListIndicatorView />
              </a>
            </Link>
          )}
        >
          {userContext.token
            ? (
              <>
                <Link href="/customer/account/wishlist">
                  <a alt="Goto My Wishlist">
                    <WishListIndicatorView
                      loading={wishList.loading}
                      error={wishList.error}
                      item={wishList.item}
                    />
                  </a>
                </Link>
                {featureConfig.showMiniView && (
                  <WishListMiniType show={wishListMiniVisible} />
                )}
              </>
            )
            : (
              <Link href="/customer/account">
                <a alt="Goto Login">
                  <WishListIndicatorView />
                </a>
              </Link>
            )}
        </ClientSideView>
      </div>
    </WishListActionViewWrapper>
  );
};

BaseWishListActionView.propTypes = {
  featureConfig: PropTypes.object,
  wishList: PropTypes.object,
  WishListMiniType: PropTypes.elementType,
};

export const WishListActionView = withDependencySupport(BaseWishListActionView, 'WishListActionView');
