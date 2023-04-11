import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { TextBold14, TextMedium14 } from '@/roanuz/typopgraphy';
import { Button } from '@/roanuz/view/button';
import MagentoHtml from '@/roanuz/widgets/MagentoHtml';
import { scrollIntoViewHandler } from '@/roanuz/components/scrollHandler';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseProductPageShortDescViewWrapper = styled(TextMedium14)`
  margin-top: ${asRem(8)};
  .prod-page-desc-title {
    display: none;
  }
  
  .rz-magento-html {
    // To Remove unwannted <br> tags.
    br {
      display: block;
      content: ' ';
    }
    iframe {
      padding: ${asRem(20)} 0;
      max-width: 100%;
    }
    ul {  
      list-style: disc inside none;
      li {
        padding-bottom: ${asRem(12)};
      }
    }
  }

  .read-more {
    font-weight: 500;
    padding: 0;
  }
`;

export const ProductPageShortDescView = ({ product }) => {
  const showDetailDescription = () => {
    scrollIntoViewHandler('product_detail_description');
  };

  return (
    <ProductPageShortDescViewWrapper as="div">
      <TextBold14 as="strong" className="prod-page-desc-title">Vörulýsing</TextBold14>
      <MagentoHtml
        html={product.shortDesc}
      />
      {product.shortDesc && (
        <Button
          ariaLabel="Lesa meira"
          className="read-more"
          mode="primary"
          noborder
          onClick={showDetailDescription}
        >
          sjá meira
        </Button>
      )}
    </ProductPageShortDescViewWrapper>
  );
};

ProductPageShortDescView.propTypes = {
  product: PropTypes.object,
};

export const ProductPageDetailDescView = ({ desc }) => {
  return (
    <ProductPageShortDescViewWrapper as="div" id="product_detail_description">
      <TextBold14 as="strong" className="prod-page-desc-title">Vörulýsing</TextBold14>
      <MagentoHtml
        html={desc}
      />
    </ProductPageShortDescViewWrapper>
  );
};

ProductPageDetailDescView.propTypes = {
  desc: PropTypes.string,
};

export const ProductPageShortDescViewWrapper = withDependencySupport(BaseProductPageShortDescViewWrapper, 'ProductPageShortDescViewWrapper');
