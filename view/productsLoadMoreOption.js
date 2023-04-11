import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { Button } from '@/roanuz/view/button';
import { TextMedium16 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { OverallItemsCountView } from './overallItemsCount';

export const BaseProductsLoadMoreOptionWrapper = styled.div`
  .load-more-btn {
    padding-bottom: ${asRem(20)};
    button {
      padding: ${asRem(14)} ${asRem(80)};
      &:hover {
        opacity: 0.8;
      }
      >span {
        display: flex;
        gap: ${asRem(10)};
      }
    }
  }
`;

export const ProductsLoadMoreOption = ({
  itemsTo,
  totalItems,
  onLoadMoreUpdates,
  className,
  totalPages,
  filterLoading,
  hideCount,
  strictlyDisabled,
}) => {
  console.debug(`Left for future use ${totalPages}`);
  return (
    <ProductsLoadMoreOptionWrapper className={className}>
      <div className="load-more-btn">
        <Button
          onClick={() => !((itemsTo === totalItems) || strictlyDisabled) && onLoadMoreUpdates()}
          ariaLabel="Load more"
          disabled={(itemsTo === totalItems) || strictlyDisabled}
          mode="primary"
          filled
        >
          <TextMedium16>
            {translateV2('button.MORE')}
          </TextMedium16>
          {filterLoading}
        </Button>
      </div>
      {!hideCount && (
        <OverallItemsCountView
          itemsTo={itemsTo}
          totalItems={totalItems}
        />
      )}
    </ProductsLoadMoreOptionWrapper>
  );
};

ProductsLoadMoreOption.propTypes = {
  itemsTo: PropTypes.number,
  totalItems: PropTypes.number,
  onLoadMoreUpdates: PropTypes.func,
  className: PropTypes.string,
  totalPages: PropTypes.number,
  filterLoading: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  hideCount: PropTypes.bool,
  strictlyDisabled: PropTypes.bool,
};

const ProductsLoadMoreOptionWrapper = withDependencySupport(BaseProductsLoadMoreOptionWrapper, 'ProductsLoadMoreOptionWrapper');
