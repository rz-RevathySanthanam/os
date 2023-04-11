import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Config from '@/config';
import { VariantSelectionController } from '@/roanuz/controller/product/variantSelection';
import { frameConfigProductUrlPath } from '@/roanuz/view/product/models/variantProduct';

export const ProductOptionsSelectionController = ({ product }) => {
  const router = useRouter();

  const { ProductDisplaySettings } = Config;

  const updateRouteVariation = (id) => {
    const nextPath = frameConfigProductUrlPath(id, router.asPath);
    router.push({
      pathname: nextPath,
    }, null, { shallow: true });
  };

  if (product.configOptions && product.configOptions.length) {
    const { configProdVariationsInfo } = product;
    return (
      <VariantSelectionController
        product={product}
        configProdVariationsInfo={configProdVariationsInfo}
        updateRouteVariation={updateRouteVariation}
        ProductDisplaySettings={ProductDisplaySettings}
        disableOutOfStockOptions
        disableSelectionOnHover
      />
    );
  }

  return null;
};

ProductOptionsSelectionController.propTypes = {
  product: PropTypes.object,
};
