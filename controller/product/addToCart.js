import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useAddToCart,
  useRemoveFromCart,
  useUpdateProductQuantity,
  useCreateNewCart,
} from '@/roanuz/store/cart/cart';
import { AddToCartView } from '@/roanuz/view/product/a2c/addToCart';
import { AddToCartConfigView } from '@/roanuz/view/product/a2c/addToCartConfig';
import { AddToCartFailureView } from '@/roanuz/view/product/a2c/addToCartFailure';
// eslint-disable-next-line import/no-cycle
import { AddToCartSuccessView } from '@/roanuz/view/product/a2c/addToCartSuccess';
import { StatefulButton } from '@/roanuz/view/statefulView';
import { ReactComponent as DeleteIcon } from '@/roanuz/view/imgs/DeleteIcon.svg';
import styled, { keyframes } from 'styled-components';
import { formatCurrency } from '@/roanuz/lib/cart';
import { Formik, Form } from 'formik';
import { FormItem } from '@/roanuz/view/input';
import Validate from '@/roanuz/lib/validate';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { Button } from '@/roanuz/view/button';
import { StockStatus } from '@/roanuz/view/product/models/stock';
import { translateV2 } from '@/roanuz/lib/utils';
import { ReactComponent as BasePlusCounterIcon } from '@/roanuz/view/imgs/PlusCounterIcon.svg';
import { ReactComponent as BaseMinusCounterIcon } from '@/roanuz/view/imgs/MinusCounterIcon.svg';
import { Row } from '@/roanuz/layout';
import { Text14 } from '@/roanuz/typopgraphy';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import Link from 'next/link';

export const PlusCounterIcon = withDependencySupport(BasePlusCounterIcon, 'PlusCounterIcon');
export const MinusCounterIcon = withDependencySupport(BaseMinusCounterIcon, 'MinusCounterIcon');

export const AddToCart = ({
  product, options,
  onCartReset,
  onProductAdded,
  buttonText,
  successViewSettings,
  ...buttonParams
}) => {
  const { configProdVariationsInfo } = product;
  const initState = () => ({
    sku: product.sku,
    quantity: 1,
    selectedOptions: (
      configProdVariationsInfo && configProdVariationsInfo.selectedCartVariantOptions
    ) || {},
    // selectedOptions: {},
    enteredOptions: {},
    withProduct: null,
    groupedProducts: [],
  });

  const [configVisible, setConfigVisible] = useState(false);
  const [cartOption, setCartOption] = useState({ ...initState() });
  const [cartSuccess, setCartSuccess] = useState(false);
  const [showCrosssellProducts, setShowCrosssellProducts] = useState(false);
  const [productsAddedToCart, setProductsAddedToCart] = useState([]);
  const [cartFailure, setCartFailure] = useState(false);
  const [cartFailureCodes, setCartFailureCodes] = useState(null);

  const resetOption = () => {
    // console.log('Reseting Cart Options', initState());
    setCartOption({ ...initState() });
    if (onCartReset) {
      onCartReset();
    }
  };

  const onCartAdded = () => {
    setConfigVisible(false);
    resetOption();
    if (onProductAdded) {
      onProductAdded();
    }
    setCartSuccess(true);
    setShowCrosssellProducts(!cartOption.withProduct);
    setProductsAddedToCart([...productsAddedToCart, product]);
    if (cartOption.withProduct) {
      let withProductDetail = null;
      withProductDetail = product.crosssellProducts
        .filter((cp) => cp.sku === cartOption.withProduct);
      [withProductDetail] = withProductDetail;

      withProductDetail = {
        ...withProductDetail,
        isInsuranceProduct: true,
        priceText: formatCurrency(
          withProductDetail.price_range.minimum_price.final_price.value,
          withProductDetail.price_range.minimum_price.final_price.currency,
        ),
      };
      setProductsAddedToCart([...productsAddedToCart, product, withProductDetail]);
    }
  };

  const onCartStatusPicker = (data) => {
    const userErrors = data.addProductsToCart && data.addProductsToCart.user_errors;
    if (userErrors && userErrors.length > 0) {
      setConfigVisible(false);
      setCartFailure(true);
      setCartFailureCodes(userErrors);
    } else {
      onCartAdded();
    }
  };

  const closeCartFailure = () => {
    setCartFailure(false);
    setCartFailureCodes(null);
  };

  const [addToCart, { loading, error, data: addToCartData }] = useAddToCart({
    item: cartOption,
    onCompleted: onCartStatusPicker,
  });

  const handleOptionChanges = () => {
    const changes = {};
    if (options.withProduct !== undefined) {
      changes.withProduct = options.withProduct;
    }

    setCartOption({
      ...cartOption,
      ...changes,
    });
  };

  useEffect(() => {
    resetOption();
  }, [product.sku]);

  useEffect(() => {
    handleOptionChanges();
  }, [options]);

  useEffect(() => {
    if (configProdVariationsInfo && configProdVariationsInfo.selectedCartVariantOptions) {
      setCartOption({
        ...cartOption,
        selectedOptions: configProdVariationsInfo.selectedCartVariantOptions,
      });
    }
  }, [configProdVariationsInfo]);

  const setRequiredDefaultUid = (selectedOptions, config, item) => {
    if (config.required && item.is_default) {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      if (config.type === 'checkbox' || config.type === 'multi') {
        selectedOptions[config.uid] = selectedOptions[config.uid]
          ? [...selectedOptions[config.uid], item.uid] : [item.uid];
      } else {
        selectedOptions[config.uid] = item.uid;
      }
      setCartOption({
        ...cartOption,
        selectedOptions,
      });
    }
  };

  const bundleProductSelectionOptions = () => {
    const selectedOptions = {
      ...cartOption.selectedOptions,
    };
    product.bundledItemOptions.forEach((config) => {
      if (config.options) {
        if (config.options.length === 1) {
          const singleItem = config.options[config.options.length - 1];
          setRequiredDefaultUid(selectedOptions, config, singleItem);
        } else {
          config.options.forEach((optionItem) => {
            setRequiredDefaultUid(selectedOptions, config, optionItem);
          });
        }
      }
    });
  };

  const groupedProductSelectionOptions = () => {
    // Once we introduce quantity field throughtout app,
    // we can make quantity dynamic
    const groupedProducts = product.groupedProducts.map((v) => (
      { sku: v.product.sku, quantity: 1 /* v.qty */ }));
    cartOption.groupedProducts = groupedProducts;
  };

  const isOptionRequired = () => {
    if (product.bundledItemOptions && product.bundledItemOptions.length) {
      bundleProductSelectionOptions();
    }
    if (product.groupedProducts && product.groupedProducts.length) {
      groupedProductSelectionOptions();
    }
    return (
      (product.configOptions && product.configOptions.length > 0)
      || (product.options && product.options.length > 0)
      || (product.bundledItemOptions && product.bundledItemOptions.length > 0)
      || (product.groupedProducts && product.groupedProducts.length > 0)
    );
  };

  const onOptionUpdate = (option, value) => {
    // console.log('Option Update', option, value);
    if (option === 'selected') {
      const selectedOptions = {
        ...cartOption.selectedOptions,
      };
      selectedOptions[value.uid] = value.value;
      setCartOption({
        ...cartOption,
        selectedOptions,
      });
    } else if (option === 'entered') {
      const enteredOptions = {
        ...cartOption.enteredOptions,
      };
      enteredOptions[value.uid] = value.value;
      setCartOption({
        ...cartOption,
        enteredOptions,
      });
    }
  };

  const onATC = () => {
    if (
      (configProdVariationsInfo && !configProdVariationsInfo.selectedCartVariantOptions)
      && (!configVisible) && isOptionRequired()) {
      setConfigVisible(true);
    } else {
      addToCart();
    }
  };

  const ATC = ({ className: cn }) => (
    <AddToCartView
      className={cn}
      loading={loading}
      error={error}
      data={addToCartData}
      onClick={onATC}
      buttonText={buttonText}
      disabled={
        !product.available
        || (product.stockStatus && (product.stockStatus.status === StockStatus.AVAILABLE_SOON))
      }
      filled
      {...buttonParams}
    />
  );

  ATC.propTypes = {
    className: PropTypes.string,
  };

  const ATCLink = ({ className: cn }) => (
    <Link href={product.productLink}>
      <a alt={buttonText}>
        <AddToCartView
          className={cn}
          onClick={() => {}}
          buttonText={buttonText}
          disabled={
            !product.available
            || (product.stockStatus && (product.stockStatus.status === StockStatus.AVAILABLE_SOON))
          }
          filled
          {...buttonParams}
        />
      </a>
    </Link>
  );

  ATCLink.propTypes = {
    className: PropTypes.string,
  };

  const closeCartSuccess = () => {
    setCartSuccess(false);
    setProductsAddedToCart([]);
  };

  const crosssellProductAdded = (csp) => {
    const productRef = { ...csp };
    if (!productRef.priceText) {
      productRef.isInsuranceProduct = true;
      productRef.priceText = formatCurrency(
        csp.price_range.minimum_price.final_price.value,
        csp.price_range.minimum_price.final_price.currency,
      );
    }
    setProductsAddedToCart([...productsAddedToCart, productRef]);
    setShowCrosssellProducts(false);
  };

  return (
    <>
      {
        product.hasMoreVariantAttributes
          ? (<ATCLink className="rz-button-atc" />)
          : (<ATC className="rz-button-atc" />)
      }
      <AddToCartConfigView
        addToCart={(<ATC />)}
        product={product}
        cartOption={cartOption}
        onOptionCancel={() => setConfigVisible(false)}
        onOptionUpdate={onOptionUpdate}
        show={configVisible}
      />
      <AddToCartSuccessView
        show={cartSuccess}
        showCrosssellProducts={showCrosssellProducts}
        onOptionCancel={() => closeCartSuccess()}
        products={productsAddedToCart}
        crossSellProducts={product.crosssellProducts}
        onCrosssellProductAdded={(csp) => crosssellProductAdded(csp)}
        successViewSettings={successViewSettings}
      />
      <AddToCartFailureView
        show={cartFailure}
        onClosePopup={() => closeCartFailure()}
        errorCodes={cartFailureCodes}
      />
    </>
  );
};

AddToCart.propTypes = {
  product: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onCartReset: PropTypes.func,
  onProductAdded: PropTypes.func,
  buttonText: PropTypes.string,
  successViewSettings: PropTypes.object,
};

const RunningLoader = keyframes`
  0% {
    transform: translateX(15px);
  }
  30% {
    transform: translateX(60px) rotate(45deg);
  }
  50% {
    transform: translateX(60px) rotate(-45deg);
  }
  80% {
    transform: translateX(60px);
  }
  100% {
    transform: translateX(15px);
  }
`;

export const RemoveFromCartMini = ({
  product,
  ...buttonParams
}) => {
  const [removeFromCart,
    { removeLoading, removeError, data: removeFromCartData }] = useRemoveFromCart({});

  const onRFC = () => {
    removeFromCart(product.uid);
  };

  return (
    <StatefulButton
      noborder
      state={{ loading: removeLoading, error: removeError, data: removeFromCartData }}
      buttonIcon={<DeleteIcon />}
      loadingIcon={<DeleteIcon />}
      buttonText={translateV2('button.REMOVE')}
      doneText="Fjarlægt"
      errorText="Villa, vinsamlegast reynið aftur"
      loadingKeyFrame={RunningLoader}
      onClick={onRFC}
      {...buttonParams}
    />
  );
};

RemoveFromCartMini.propTypes = {
  product: PropTypes.object.isRequired,
};

const QuantitySelectorWrapper = styled.div`
  .counter-btns {
    gap: ${asRem(10)};
    .rz-button {
      padding: 0;
    }
    .total-qty {
      min-width: ${asRem(25)};
      text-align: center;
    }
  }
  .loading-view-wrapper, .debug-error-container, .update-success {
    position: absolute;
    text-align: center;
    align-items: center;
    display: flex;
    left: 0;
    bottom: ${asRem(15)};
    margin: 0;
    top: unset;
    right: 0;
    justify-content: center;
    @media screen and (min-width: ${Breakpoint.sm}) {
      right: unset;
    }
    .container, .debug-error-view {
      min-width: auto;
      padding: ${asRem(10)};
    }
  }
  .update-success {
    padding: ${asRem(10)};
    color: var(--color-order-success);
  }
`;

export const QuantitySelector = ({
  product, incrementBtns = true,
}) => {
  const [formInitVal] = useState({
    quantity: product.quantity,
  });

  const [updateProductQuantity,
    { loading, error, data: updateQuantityData }] = useUpdateProductQuantity({});

  const onQuantityUpdate = (qty) => {
    if (qty && !Number.isNaN(parseInt(qty, 10)) && product.quantity !== parseInt(qty, 10)) {
      updateProductQuantity(product.uid, qty);
    }
  };

  const fields = {
    quantity: {
      type: 'text',
      name: 'Magn',
      id: 'quantity',
      validateFn: Validate.all([
        Validate.required,
        Validate.number,
      ], { message: 'Vinsamlegast sláið inn númer' }),
    },
  };

  const onSubmit = (values) => {
    onQuantityUpdate(values.quantity);
  };

  const [value, setValue] = useState(formInitVal.quantity);

  useEffect(
    () => {
      if (incrementBtns) {
        const timer = setTimeout(() => onQuantityUpdate(value), 1000);
        return () => {
          clearTimeout(timer);
        };
      } return false;
    },
    [value],
  );

  return (
    <QuantitySelectorWrapper className="quantity-selector">
      <Formik initialValues={formInitVal} onSubmit={onSubmit}>
        {() => (
          <Form>
            {incrementBtns ? (
              <Row className="counter-btns" alignCenter>
                <Button
                  noborder
                  onClick={() => setValue(value - 1)}
                  icon={<MinusCounterIcon />}
                  disabled={value === 1}
                />
                <Text14 className="total-qty">{value}</Text14>
                <Button
                  noborder
                  onClick={() => setValue(value + 1)}
                  icon={<PlusCounterIcon />}
                />
              </Row>
            ) : (
              <FormItem
                key="quantity"
                field={{
                  ...fields.quantity,
                  onBlur: (event) => {
                    onQuantityUpdate(event.target.value);
                  },
                }}
              />
            )}
          </Form>
        )}
      </Formik>
      {loading && <LoadingView message={`${translateV2('loadingMsg.LOADING')}...`} />}
      {error && <ErrorView error={error} />}
      {!loading && !error && updateQuantityData
        && (
          <p className="update-success">
            {translateV2('loadingMsg.UPDATE_SUCCESS')}
          </p>
        )}
    </QuantitySelectorWrapper>
  );
};

QuantitySelector.propTypes = {
  product: PropTypes.object.isRequired,
  incrementBtns: PropTypes.bool,
};

export const CreateNewCart = ({ text }) => {
  const [clearCart] = useCreateNewCart();

  return (
    <Button
      className="clear-cart-btn"
      mode="primary"
      alt={text || 'Clear Cart'}
      onClick={() => clearCart()}
      ariaLabel={text || 'Clear Cart'}
    >
      {text || 'Eyða körfu'}
    </Button>
  );
};

CreateNewCart.propTypes = {
  text: PropTypes.string,
};
