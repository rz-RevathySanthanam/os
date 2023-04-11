import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text16, Display20 } from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
import { AddToCartView } from '@/roanuz/view/product/a2c/addToCart';
import { Button } from '@/roanuz/view/button';
import { AddToCartSuccessView } from '@/roanuz/view/product/a2c/addToCartSuccess';
import { translateV2 } from '@/roanuz/lib/utils';

export const QuickOrderActionViewWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .right-section {
    text-align: right;
    .error-message {
      margin-top: ${asRem(10)};
    }
  }
  .left-section {
    .rz-button {
      span {
        white-space: nowrap;
      }
    }
  }
`;

export const QuickOrderActionView = ({
  addToCartModel,
  removeAllAndClear,
}) => {
  const {
    validationState, onAddAllProductsToCart,
    cartFailureCodes, addToCartCompleted,
  } = addToCartModel;
  const isAddToCartDisabled = validationState && Object.keys(validationState).length > 0;
  return (
    <QuickOrderActionViewWrapper>
      <div className="left-section">
        <Button
          noborder
          underline
          onClick={() => removeAllAndClear()}
        >
          {translateV2('button.REMOVE_ALL')}
        </Button>
      </div>
      <div className="right-section">
        <AddToCartView
          onClick={() => !isAddToCartDisabled && onAddAllProductsToCart()}
          disabled={isAddToCartDisabled}
        />
        <AddToCartSuccessView
          show={addToCartCompleted}
          onOptionCancel={() => (null)}
          customSuccessMsg={<Display20>Products added to cart</Display20>}
        />
        {isAddToCartDisabled && (
          <Text16 className="error-message">
            Few of products are out of stock, either change the variation or remove product.
          </Text16>
        )}
        {cartFailureCodes && cartFailureCodes.map((code) => (
          <div className="items-line" key={code.code}>
            <Text16 className="error-message">
              {`Few of ${code.message}, other products have been added to cart.`}
            </Text16>
          </div>
        ))}
      </div>
    </QuickOrderActionViewWrapper>
  );
};

QuickOrderActionView.propTypes = {
  addToCartModel: PropTypes.object,
  removeAllAndClear: PropTypes.func,
};
