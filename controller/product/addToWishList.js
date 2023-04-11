import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { WishListContext } from '@/roanuz/store/core/wishlistContext';
import { useAddToWishList, useRemoveFromWishList } from '@/roanuz/store/wishlist/wishlist';
import { AddToWishListView } from '@/roanuz/view/product/addToWishList';
import { StatefulButton } from '@/roanuz/view/statefulView';
import { ReactComponent as DeleteIcon } from '@/roanuz/view/imgs/DeleteIcon.svg';
import { translateV2 } from '@/roanuz/lib/utils';
import styled from 'styled-components';

export const AddToWishList = ({
  product, buttonText,
  ...buttonParams
}) => {
  const initState = () => ({
    sku: product.sku,
    quantity: 1,
  });

  const [wishListOption, setWishListOption] = useState({ ...initState() });

  const onWishListAdded = () => {
  };
  const [addToWishList, { loading, error, data: addToWishData }] = useAddToWishList({
    item: wishListOption,
    onCompleted: onWishListAdded,
  });

  const handleOptionChanges = () => {
    const changes = {};
    setWishListOption({
      ...wishListOption,
      ...changes,
    });
  };

  useEffect(() => {
    handleOptionChanges();
  }, []);

  const onAdd2WishList = () => {
    addToWishList();
  };

  const wishListContext = useContext(WishListContext);
  const { productMiniData } = wishListContext;
  const allProductSKU = Object.keys(productMiniData);

  const [removeFromWishList,
    { removeLoading, removeError, done: removeFromWishData }] = useRemoveFromWishList({});

  const onRemoveFromWishList = (item) => {
    removeFromWishList(item);
  };

  const toggleWishListAction = () => {
    if (allProductSKU.includes(product.sku)) {
      onRemoveFromWishList(productMiniData[product.sku]);
    } else {
      onAdd2WishList();
    }
  };

  return (
    <>
      <AddToWishListView
        className="rz-button-atw"
        loading={loading || removeLoading}
        error={error || removeError}
        data={addToWishData || removeFromWishData}
        onClick={toggleWishListAction}
        inWishList={allProductSKU.includes(product.sku)}
        buttonText={buttonText}
        {...buttonParams}
      />
    </>
  );
};

AddToWishList.propTypes = {
  product: PropTypes.object.isRequired,
  buttonText: PropTypes.string,
};

const RemoveFromWishListMiniWrapper = styled.div`
  .rz-button-wrapper .rz-button {
    color: var(--color-text-secondary);
  }
`;

export const RemoveFromWishListMini = ({
  product,
}) => {
  const [removeFromWishList,
    { removeLoading, removeError, data: removeFromWishListData }] = useRemoveFromWishList({});

  const onRFW = () => {
    removeFromWishList(product.id);
  };

  return (
    <RemoveFromWishListMiniWrapper>
      <StatefulButton
        noborder
        state={{ loading: removeLoading, error: removeError, data: removeFromWishListData }}
        buttonIcon={<DeleteIcon />}
        loadingIcon={<DeleteIcon />}
        buttonText={translateV2('button.REMOVE')}
        doneText="Fjarlægt"
        errorText="Villa, vinsamlegast reynið aftur"
        onClick={onRFW}
        iconHeightPx={16}
      />
    </RemoveFromWishListMiniWrapper>
  );
};

RemoveFromWishListMini.propTypes = {
  product: PropTypes.object.isRequired,
};
