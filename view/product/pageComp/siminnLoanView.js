import React from 'react';
import PropTypes from 'prop-types';
import Config from '@/config';

export const ProductPageSiminnLoanView = ({ product, SiminnLoan }) => {
  if ((!SiminnLoan) || (product.price < Config.MinAmountForLoan)) {
    return null;
  }

  return (
    <div className="section-loan">
      <SiminnLoan product={product} />
    </div>
  );
};

ProductPageSiminnLoanView.propTypes = {
  product: PropTypes.object,
  SiminnLoan: PropTypes.elementType,
};
