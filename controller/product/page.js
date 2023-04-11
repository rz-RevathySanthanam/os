import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ProductPageView } from '@/roanuz/view/product/page';
import { EnquiryFormController } from '@/roanuz/controller/product/enquiryForm';
import { DailogView } from '@/roanuz/view/dialog';
import { Text14 } from '@/roanuz/typopgraphy';
import { BreadcrumbView, buildProductBreadcrumbLinks } from '@/roanuz/view/breadcrumb';
import { ProductSpecView } from '@/roanuz/view/product/spec';
import { AddToCartPicker, AddToWishListPicker } from './actionPicker';
import { SiminnLoanOptionsController } from './siminnLoanOptions';
import { DeliveryPickupController } from './deliveryPickupTimes';
import { ProductOptionsSelectionController } from './productOptionsSelection';

export const ProductPageV2 = ({
  product,
  productBrand,
  userContext,
}) => {
  const initState = {
    withProduct: null,
  };

  const [showEnquiryForm, setShowEnquiryForm] = useState();
  const [showStockAlertConfirm, setShowStockAlertConfirm] = useState();

  const createStockAlert = () => {
    // Write Mutation.
    setShowStockAlertConfirm(true);
  };

  const [cartOption, setCartOption] = useState({ ...initState });
  const resetOption = () => {
    setCartOption({ ...initState });
  };

  useEffect(() => {
    resetOption();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.sku]);

  const specificationsList = (
    <ProductSpecView product={product} productBrand={productBrand} />
  );
  let mode = 'primary';

  if (!product.available) {
    mode = 'normal';
  } else if (product.isRefurbished) {
    mode = 'special';
  } else if (product.onDiscount || product.onSale) {
    mode = 'sale';
    if (product.hasB2BPrice) {
      mode = 'b2b-btn';
    }
  }

  const acButton = (
    <AddToCartPicker
      options={cartOption}
      product={product}
      onCartReset={resetOption}
      userContext={userContext}
      mode={mode}
      filled
      large
    />
  );

  const awButton = (
    <AddToWishListPicker
      product={product}
      userContext={userContext}
      large
    />
  );

  const onCartUpdate = (option, value) => {
    console.log('Cart Update', option, value);
    if (option === 'with-product') {
      setCartOption({
        ...cartOption,
        withProduct: value,
      });
    }
  };

  const onStockAlert = (email) => {
    createStockAlert({ variables: { email, productSku: product.sku } });
  };

  const onEnquiryForm = () => {
    setShowEnquiryForm(true);
  };

  const onEnquiryFormClose = () => {
    setShowEnquiryForm(false);
  };

  const breadcrumbLinks = buildProductBreadcrumbLinks({
    product,
  });

  const breadcrumb = (
    <BreadcrumbView links={breadcrumbLinks} />
  );

  const productOptionsSelection = (
    <ProductOptionsSelectionController product={product} />
  );

  return (
    <>
      <ProductPageView
        product={product}
        productBrand={productBrand}
        specificationsList={specificationsList}
        addToCart={acButton}
        tabIndexStart={5}
        onCartUpdate={onCartUpdate}
        addToWishList={awButton}
        SiminnLoan={SiminnLoanOptionsController}
        DeliveryPickup={DeliveryPickupController}
        onEnquiryForm={onEnquiryForm}
        stockAlertLoading={false}
        stockAlertError={{}}
        onStockAlert={onStockAlert}
        breadcrumb={breadcrumb}
        optionsSelection={productOptionsSelection}
      />
      <DailogView
        titleText="Fyrirspurn vegna sérpöntunnar"
        showClose
        onClose={onEnquiryFormClose}
        show={showEnquiryForm}
        containerWidth="440px"
      >
        <EnquiryFormController
          product={product}
        />
      </DailogView>
      <DailogView
        titleText="Skráning móttekin!"
        showClose
        onClose={() => { setShowStockAlertConfirm(false); }}
        show={showStockAlertConfirm}
        containerWidth="440px"
      >
        <Text14>
          Þér mun berast tölvupóstur um leið og varan verður aftur fáanleg
        </Text14>
      </DailogView>
    </>
  );
};

ProductPageV2.propTypes = {
  product: PropTypes.object.isRequired,
  productBrand: PropTypes.object,
  userContext: PropTypes.object,
};
