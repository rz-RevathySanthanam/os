import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Text16, TextMedium16,
} from '@/roanuz/typopgraphy';
import {
  ProductSpecLayout,
  ProductSpecLineLayout,
} from '@/roanuz/layout/product/spec';
import { withDependencySupport } from '@/roanuz/lib/dep';
import Config from '@/config';

export const BaseProductMiniSpecCardViewWrapper = styled.div`
`;

export const ProductMiniSpecCardView = ({ groups }) => {
  if (!groups || groups.length === 0) return null;
  const attrToDisplay = Config.SpecificationsToDisplayInProductCard || [];
  return (
    <ProductMiniSpecCardViewWrapper>
      <ProductSpecLayout>
        {groups.map((group) => (
          <div key={group.group} className="group-set">
            <p className="group-name">{group.group}</p>
            {group.attributes.map((attribute) => (
              <div key={attribute.code} className="code-set">
                {attrToDisplay.includes(attribute.code) && (
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
                )}
              </div>
            ))}
          </div>
        ))}
      </ProductSpecLayout>
    </ProductMiniSpecCardViewWrapper>
  );
};

ProductMiniSpecCardView.propTypes = {
  groups: PropTypes.array,
};

export const ProductMiniSpecCardViewWrapper = withDependencySupport(BaseProductMiniSpecCardViewWrapper, 'ProductMiniSpecCardViewWrapper');
