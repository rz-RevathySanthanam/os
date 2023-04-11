import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text14, TextBold14 } from '@/roanuz/typopgraphy';
import { ReactComponent as FilterSVG } from '@/roanuz/view/imgs/FilterSVG.svg';
import Config from '@/config';
import { Breakpoint } from '@/roanuz/lib/css';
import { Button } from '../button';

export const ProductsCountDisplayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .mobile-filter {
    @media screen and (min-width: ${Breakpoint.sm}) {
      display: none;
    }
    span {
      display: flex;
      align-items: center;
    }
  }
`;

export const ProductsCountDisplay = ({
  itemsFrom,
  itemsTo,
  totalItems,
  menuContext,
}) => {
  return (
    <ProductsCountDisplayWrapper>
      <div>
        <Text14 as="span">
          Sýni&nbsp;
          {itemsFrom}
          -
          {itemsTo}
          &nbsp;af&nbsp;
          {totalItems}
        </Text14>
        <TextBold14 as="span">&nbsp;vörum</TextBold14>
      </div>
      {!Config.CategoryPageSettings.filterSettings.showAsSlider && (
        <Button
          icon={<FilterSVG />}
          noborder
          className="mobile-filter"
          onClick={() => menuContext.toggleCategoryFilterModal(true)}
          ariaLabel="Filter Button"
        >
          Sía
        </Button>
      )}
    </ProductsCountDisplayWrapper>
  );
};

ProductsCountDisplay.propTypes = {
  itemsFrom: PropTypes.number,
  itemsTo: PropTypes.number,
  totalItems: PropTypes.number,
  menuContext: PropTypes.object,
};
