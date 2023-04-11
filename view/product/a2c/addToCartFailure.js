import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Display18,
} from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
import Config from '@/config';
import { CartActionPopupView } from './cartActionPopup';

const AddToCartFailureViewWrapper = styled.div`
  >.config-container {
    >.config-content {
      .items-line {
        margin: ${asRem(5)} 0;
      }
    }
  }
`;

export const AddToCartFailureView = ({
  show,
  onClosePopup,
  errorCodes,
}) => {
  return (
    <CartActionPopupView
      modelSettings={{
        show,
        containerWidth: '400px',
        titleText: 'Villa',
        showClose: true,
        onClosePopup,
      }}
    >
      <AddToCartFailureViewWrapper>
        <div className="config-container">
          <div className="config-content">
            {errorCodes && errorCodes.map((code) => (
              <div className="items-line" key={code.code}>
                <Display18>
                  {
                    (Config.CartErrorTranslations
                    && Config.CartErrorTranslations[code.code]) || code.message
                  }
                  .
                </Display18>
              </div>
            ))}
          </div>
        </div>
      </AddToCartFailureViewWrapper>
    </CartActionPopupView>
  );
};

AddToCartFailureView.propTypes = {
  show: PropTypes.bool,
  onClosePopup: PropTypes.func,
  errorCodes: PropTypes.array,
};
