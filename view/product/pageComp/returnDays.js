import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { ReactComponent as ReturnDaysIcon } from '@/roanuz/view/imgs/ReturnDaysIcon.svg';
import { TextBold14, TextMedium14 } from '@/roanuz/typopgraphy';
import Config from '@/config';
import { SVGIcon } from '../../icon';

export const ProductPageReturnDaysViewWrapper = styled.div`
  &.returnDays {
    display: flex;
    >.rz-svg-icon {
      margin-top: 0.5ch;
      margin-right: ${asRem(14)};
      display: block;
    }
    section {
      >strong {
        padding-bottom: ${asRem(4)};
      }
    }
  }
`;

export const ProductPageReturnDaysView = ({ product }) => {
  return (
    <ProductPageReturnDaysViewWrapper className="returnDays">
      {/* <SVGIcon heightPx={42}>
        <ReturnDaysIcon />
      </SVGIcon>
      <section>
        <TextBold14 as="strong">Skilareglur</TextBold14>
        <TextMedium14>
          {(product.returnDays && product.returnDays !== '0') ? (
            `${product.returnDays} skilaréttur`
          ) : (`${Config.ProductReturndays} daga skilaréttur`)}
        </TextMedium14>
      </section> */}
    </ProductPageReturnDaysViewWrapper>
  );
};

ProductPageReturnDaysView.propTypes = {
  product: PropTypes.object,
};
