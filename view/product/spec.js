import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  DisplayMedium18, Text16, TextMedium16,
} from '@/roanuz/typopgraphy';
import {
  ProductSpecGroupLayout,
  ProductSpecLayout,
  ProductSpecLineLayout,
} from '@/roanuz/layout/product/spec';
import { withDependencySupport } from '@/roanuz/lib/dep';

const ProductSpecViewWrapper = styled.div`
`;

export const BaseProductSpecView = ({ product, productBrand }) => {
  const { specifications } = product;
  console.debug(`Left for future use ${productBrand}`);
  if (!specifications || specifications.length === 0) return null;
  return (
    <ProductSpecViewWrapper>
      <ProductSpecLayout>
        {specifications.map((group) => (
          <ProductSpecGroupLayout
            key={group.group}
            groupName={(
              <DisplayMedium18>{group.group}</DisplayMedium18>
            )}
          >
            {group.attributes.map((attribute) => (
              <ProductSpecLineLayout
                key={attribute.code}
                label={(
                  <Text16 className="product-spec-label">{attribute.label}</Text16>
                )}
              >
                <TextMedium16 className="product-spec-value">
                  {!Number.isNaN(attribute.value)
                    ? attribute.value : parseInt(attribute.value, 10)}
                </TextMedium16>
              </ProductSpecLineLayout>
            ))}
          </ProductSpecGroupLayout>
        ))}
      </ProductSpecLayout>
    </ProductSpecViewWrapper>
  );
};

BaseProductSpecView.propTypes = {
  product: PropTypes.object,
  productBrand: PropTypes.object,
};

export const ProductSpecView = withDependencySupport(BaseProductSpecView, 'ProductSpecView');
