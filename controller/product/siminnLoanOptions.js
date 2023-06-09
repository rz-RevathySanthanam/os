import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Config from '@/config';
import { SiminnLoanOptionsWrapper } from '@/roanuz/view/product/siminnLoanOptionViews/siminnLoanOptionsWrapper';
// import { SiminnLoanOptionsQuery } from '@/store/product/product.graphql';
import siminnLoanOptionsData from '@/stories/sample-data/siminnOptions';

const SiminnLoanOptionsControllerWrapper = styled.div`
`;

export const SiminnLoanOptionsController = ({ product }) => {
  // const { loading, data, error } = useQuery(
  //   SiminnLoanOptionsQuery,
  //   { variables: { amount: product.price } },
  // );

  if (product.price < Config.MinAmountForLoan) {
    return null;
  }

  // if (error) {
  //   console.log('Error loading Siminn Loan Options', error);
  //   return null;
  // }

  let options = {};
  if (siminnLoanOptionsData) {
    options = siminnLoanOptionsData.rzSiminnLoanOptions;
  }

  if (!options.recommended || options.options.length === 0) {
    return null;
  }

  return (
    <SiminnLoanOptionsControllerWrapper>
      <SiminnLoanOptionsWrapper
        loading={false}
        options={options}
        product={product}
      />
    </SiminnLoanOptionsControllerWrapper>
  );
};

SiminnLoanOptionsController.propTypes = {
  product: PropTypes.object.isRequired,
};
