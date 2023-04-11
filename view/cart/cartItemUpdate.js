import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text16 } from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
// import { translateV2 } from '@/roanuz/lib/utils';

export const UpdateCartItemVariantViewWrapper = styled.div`
  display: flex;
  gap: ${asRem(6)};
  align-items: center;
  margin-top: ${asRem(6)};
  color: var(--color-text-secondary);
  .selected-variant-list {
    >span.list {
      padding-right: ${asRem(6)};
      &:first-child {
        &:after{
          content: ',';
        }
      }
      &:last-child {
        &:after{
          content: '';
        }
      }
    }
  }
  .as-link {
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const UpdateCartItemVariantView = ({
  // onEdit,
  product,
}) => {
  const { selectedDetails } = product.choosenVariant;
  return (
    <UpdateCartItemVariantViewWrapper>
      <Text16 as="p" className="selected-variant-list">
        {Object.keys(selectedDetails).map((variant) => (
          <span className="list" key={variant}>
            {variant}
            :&nbsp;
            {selectedDetails[variant]}
          </span>
        ))}
      </Text16>
      {/* Hidden the below edit button for now temporarily,
      once backend find a patch for update cart muations for config options update,
      will eneble it back.
      <Text16
        as="p"
        onClick={() => onEdit && onEdit(true)}
        onKeyDown={() => onEdit && onEdit(true)}
        role="presentation"
        className="as-link"
      >
        {translateV2('button.EDIT')}
      </Text16> */}
    </UpdateCartItemVariantViewWrapper>
  );
};

UpdateCartItemVariantView.propTypes = {
  // onEdit: PropTypes.func,
  product: PropTypes.object,
};
