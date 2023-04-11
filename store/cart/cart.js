import {
  CartQuery, CustomerCartQuery,
  CreateEmptyCartMutation,
  AddToCartMutation,
  RemoveFromCartMutation,
  UpdateCartItemsMutation,
} from '@/roanuz/store/cart/query';
import { useMutation } from '@apollo/client';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/roanuz/store/core/context';

export const useAddToCart = ({
  item,
  onCompleted = null,
}) => {
  const userContext = useContext(UserContext);
  // Response
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  const [waitingForSession, setWaitingForSession] = useState(false);

  // Add to cart
  const [addToCart, addToCartResponse] = useMutation(AddToCartMutation, {
    onCompleted: (cartData) => {
      setResponse({
        ...response,
        loading: false,
        error: null,
        data: cartData,
      });
      if (onCompleted) {
        onCompleted(cartData);
      }
      // To hide the done text after 3s.
      setTimeout(() => {
        setResponse((state) => ({
          ...state,
          data: null,
        }));
      }, 3000);
    },
  });

  const callAddToCart = (forCartId) => {
    const selected = Object.keys(item.selectedOptions).map((key) => {
      const val = item.selectedOptions[key];
      if (val !== null && val !== undefined) {
        return val;
      }
      return null;
    }).filter(
      (x) => x !== null,
    );

    const entered = Object.keys(item.enteredOptions).map((uid) => {
      const value = item.enteredOptions[uid];
      const newValue = { uid, value };
      if (newValue.value instanceof Array) {
        newValue.value = value.join(',');
      }

      return newValue;
    }).filter(
      (x) => x.value !== '',
    );

    const updatedItem = {
      sku: item.sku,
      quantity: item.quantity,
      selected_options: selected.length === 0 ? null : selected.flat(),
      entered_options: entered.length === 0 ? null : entered,
    };
    const anotherProduct = item.withProduct;
    let cartItems = null;

    if (item.groupedProducts && item.groupedProducts.length) {
      cartItems = item.groupedProducts;
    } else {
      cartItems = [updatedItem];
    }

    if (anotherProduct) {
      cartItems.push({
        sku: anotherProduct,
        quantity: 1,
      });
    }
    const cartVariables = { cartItems };
    console.log('⏳ Adding item to new cart', cartVariables);
    const refetchQueries = [];
    if (userContext.token) {
      refetchQueries.push(
        { query: CustomerCartQuery },
      );
    } else {
      refetchQueries.push(
        { query: CartQuery, variables: { cartId: forCartId } },
      );
    }
    addToCart({
      variables: { cartId: forCartId, ...cartVariables },
      refetchQueries,
    });
  };

  // Create Empty Cart
  const [createCart, createCartResponse] = useMutation(CreateEmptyCartMutation, {
    onCompleted: (createData) => {
      const updatedCartId = createData.createEmptyCart;
      console.log('🛒 New Cart created', updatedCartId);
      userContext.setCartId(updatedCartId, true);
      callAddToCart(updatedCartId);
    },
  });

  // Track Add to Cart
  useEffect(() => {
    const errorMessage = addToCartResponse.error && addToCartResponse.error.message;
    if (errorMessage === 'The cart isn\'t active.') {
      console.log('Cart should be removed and try again');
      // userContext.unsetCartId();
      createCart();
    }
    setResponse((state) => ({
      ...state,
      loading: addToCartResponse.loading,
      error: addToCartResponse.error,
    }));
  }, [addToCartResponse.loading, addToCartResponse.error]);

  const handleAddToCart = () => {
    if (!userContext.cartId) {
      createCart();
    } else {
      callAddToCart(userContext.cartId);
    }
  };

  useEffect(() => {
    if (waitingForSession) {
      if (userContext.loaded && userContext.cartVerified) {
        setWaitingForSession(false);
        handleAddToCart();
      }
    }
  }, [waitingForSession, userContext.loaded, userContext.cartVerified]);

  // Track Empty Cart ERROR
  useEffect(() => {
    setResponse((state) => ({
      ...state,
      error: createCartResponse.error,
    }));
  }, [createCartResponse.error]);

  const onAddToCart = () => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    if (userContext.loaded && userContext.cartVerified) {
      handleAddToCart();
    } else {
      // Cart is being verified by ClientUserSession. Wait for it.
      console.log('😐 Waiting for cart to be verified');
      setWaitingForSession(true);
    }
  };

  return [onAddToCart, response];
};

export const useRemoveFromCart = ({
  onCompleted = null,
}) => {
  const userContext = useContext(UserContext);
  // Response
  const [response, setResponse] = useState({
    called: false,
    removeLoading: false,
    removeError: null,
    data: null,
  });

  // Remove from Cart
  const [removeFromCart, removeFromCartMutation] = useMutation(RemoveFromCartMutation, {
    onCompleted: (cartData) => {
      setResponse({
        ...response,
        removeLoading: false,
        removeError: null,
        data: cartData,
      });
      if (onCompleted) {
        onCompleted(cartData);
      }
    },
  });

  // Track Remove from Cart
  useEffect(() => {
    setResponse((state) => ({
      ...state,
      removeLoading: removeFromCartMutation.loading,
      removeError: removeFromCartMutation.error,
    }));
  }, [removeFromCartMutation.loading, removeFromCartMutation.error]);

  const callRemoveFromCart = (itemUid, forCartId) => {
    const cartVariables = { cart_item_uid: itemUid };

    console.log('⏳ Removing item from cart', cartVariables);
    const refetchQueries = [];
    if (userContext.token) {
      refetchQueries.push(
        { query: CustomerCartQuery },
      );
    } else {
      refetchQueries.push(
        { query: CartQuery, variables: { cartId: forCartId } },
      );
    }
    removeFromCart({
      variables: { cartId: forCartId, ...cartVariables },
      refetchQueries,
    });
  };

  const onRemoveFromCart = (itemUid, newCartIdFromSession) => {
    setResponse((state) => ({
      ...state,
      removeLoading: true,
    }));

    callRemoveFromCart(itemUid, userContext.cartId || newCartIdFromSession);
  };

  return [onRemoveFromCart, response];
};

export const useUpdateProductQuantity = ({
  onCompleted = null,
}) => {
  const userContext = useContext(UserContext);
  // Response
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  // Update the quantity in Cart
  const [updateItemQuantity, updateItemQuantityMutation] = useMutation(UpdateCartItemsMutation, {
    onCompleted: (cartData) => {
      setResponse({
        ...response,
        loading: false,
        error: null,
        data: cartData,
      });
      if (onCompleted) {
        onCompleted(cartData);
      }
      setTimeout(() => {
        setResponse((state) => ({
          ...state,
          data: null,
        }));
      }, 3000);
    },
  });

  // Track Update the Cart
  useEffect(() => {
    setResponse((state) => ({
      ...state,
      loading: updateItemQuantityMutation.loading,
      error: updateItemQuantityMutation.error,
    }));
  }, [updateItemQuantityMutation.loading, updateItemQuantityMutation.error]);

  const callUpdateItemQuantity = (forCartId, uid, qty) => {
    const updatedItem = {
      cart_item_uid: uid,
      quantity: parseInt(qty, 10),
    };
    const cartItems = [updatedItem];
    const cartVariables = { cartItems };

    console.log('⏳ Updating item in cart', cartVariables);
    const refetchQueries = [];
    if (userContext.token) {
      refetchQueries.push(
        { query: CustomerCartQuery },
      );
    } else {
      refetchQueries.push(
        { query: CartQuery, variables: { cartId: forCartId } },
      );
    }
    updateItemQuantity({
      variables: { cartId: forCartId, ...cartVariables },
      refetchQueries,
    });
  };

  const onUpdateItemQuantity = (uid, qty) => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    callUpdateItemQuantity(userContext.cartId, uid, qty);
  };

  return [onUpdateItemQuantity, response];
};

export const useCreateNewCart = () => {
  const userContext = useContext(UserContext);
  // Response
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  // Delete the Cart
  const [createCart, createCartResponse] = useMutation(CreateEmptyCartMutation, {
    onCompleted: (createData) => {
      const updatedCartId = createData.createEmptyCart;
      console.log('🛒 New Cart created', updatedCartId);
      userContext.setCartId(updatedCartId, true);
    },
  });

  // Track Empty Cart ERROR
  useEffect(() => {
    setResponse((state) => ({
      ...state,
      error: createCartResponse.error,
    }));
  }, [createCartResponse.error]);

  const onCreateCart = () => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    createCart();
  };

  return [onCreateCart, response];
};

export const useRemoveErrorItemsFromCart = ({
  onCompleted = null,
}) => {
  const [totalItemsLength, setTotalItemsLength] = useState(0);
  const [tracker, updateTracker] = useState([]);
  const [doneCounter, setDoneCounter] = useState(0);
  const onParticularItemRemoved = () => {
    updateTracker([...tracker, 'Done']);
  };

  useEffect(() => {
    if (tracker.length) {
      setDoneCounter(tracker.length);
    }
  }, [tracker]);

  useEffect(() => {
    if (totalItemsLength && doneCounter === totalItemsLength && onCompleted) {
      onCompleted();
    }
  }, [doneCounter]);

  const [removeItem] = useRemoveFromCart({
    onCompleted: onParticularItemRemoved,
  });

  const onRemoveItem = (items, newCartIdFromSession) => {
    setTotalItemsLength(items.length);
    items.forEach((item) => {
      removeItem(item.uid, newCartIdFromSession);
    });
  };

  return [onRemoveItem, { completed: false }];
};

export const useReAddBulkProductsToCart = ({
  onCompleted = null,
}) => {
  const userContext = useContext(UserContext);
  // Response
  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  // Add to Cart
  const [addItemsToCart, addItemsToCartMutation] = useMutation(AddToCartMutation, {
    onCompleted: (cartData) => {
      setResponse({
        ...response,
        loading: false,
        error: null,
        data: cartData,
      });
      if (onCompleted) {
        onCompleted(cartData);
      }
    },
  });

  // Track Add to the Cart
  useEffect(() => {
    setResponse((state) => ({
      ...state,
      loading: addItemsToCartMutation.loading,
      error: addItemsToCartMutation.error,
    }));
  }, [addItemsToCartMutation.loading, addItemsToCartMutation.error]);

  const callReAddBulkProductsToCart = (forCartId, items) => {
    const cartItems = items;
    const cartVariables = { cartItems };

    console.log('⏳ Adding all items to the cart', cartVariables);
    const refetchQueries = [];
    if (userContext.token) {
      refetchQueries.push(
        { query: CustomerCartQuery },
      );
    } else {
      refetchQueries.push(
        { query: CartQuery, variables: { cartId: forCartId } },
      );
    }
    addItemsToCart({
      variables: { cartId: forCartId, ...cartVariables },
      refetchQueries,
    });
  };

  const onReAddBulkProductsToCart = (newCartIdFromSession, items) => {
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    callReAddBulkProductsToCart(newCartIdFromSession, items);
  };

  return [onReAddBulkProductsToCart, response];
};

export const useRemoveAllProductsFromCart = ({
  onCompleted = null,
}) => {
  const userContext = useContext(UserContext);

  const [removeItemsCount, setRemoveItemsCount] = useState();

  const [response, setResponse] = useState({
    called: false,
    loading: false,
    error: null,
    data: null,
  });

  const [removeItems, removeItemsMutation] = useMutation(RemoveFromCartMutation, {
    onCompleted: (cartData) => {
      setRemoveItemsCount(removeItemsCount - 1);

      if (removeItemsCount === 1) {
        setResponse({
          ...response,
          loading: false,
          error: null,
          data: cartData,
        });
        if (onCompleted) {
          onCompleted(cartData);
        }
        setTimeout(() => {
          setResponse((state) => ({
            ...state,
            data: null,
          }));
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (removeItemsCount === 1) {
      setResponse((state) => ({
        ...state,
        loading: removeItemsMutation.loading,
        error: removeItemsMutation.error,
      }));
    }
  }, [removeItemsMutation.loading, removeItemsMutation.error]);

  const callRemoveItems = (forCartId, uid, index) => {
    const cartVariables = { cart_item_uid: uid };

    console.log(`⏳ Removing item ${uid} from cart`, cartVariables);
    const refetchQueries = [];
    if (index === removeItemsCount - 1) {
      if (userContext.token) {
        refetchQueries.push(
          { query: CustomerCartQuery },
        );
      } else {
        refetchQueries.push(
          { query: CartQuery, variables: { cartId: forCartId } },
        );
      }
    }
    removeItems({
      variables: { cartId: forCartId, ...cartVariables },
      refetchQueries,
    });
  };

  const onRemoveItems = async (items, cartId) => {
    setRemoveItemsCount(items.length);
    setResponse((state) => ({
      ...state,
      loading: true,
    }));

    const deletions = items.map((item, index) => callRemoveItems(
      cartId, item.uid, index,
    ));
    await Promise.all(deletions);
  };

  return [onRemoveItems, response];
};
