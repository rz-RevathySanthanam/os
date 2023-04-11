import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { StickBarFeaturesPicker } from './featurePicker';

export const BaseStickBarRightFeaturesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: ${asRem(10)};

  div[class^="right-item-"]:not(:empty) {
    &.btn-border {
      .cta-btn a {
        padding: ${asRem(13)} ${asRem(32)} ${asRem(13)} ${asRem(25)};
        border: ${asRem(1)} solid var(--color-button);
        border-radius: ${asRem(40)};
        span, svg {
          color: var(--color-button);
        }
        &:hover {
          border: ${asRem(1)} solid var(--color-button-hover);
          span, svg {
            color: var(--color-button-hover);
          }
        }
      }
    }
  }

  @media screen and (min-width: ${Breakpoint.md}) {
    gap: ${asRem(20)};
  }
`;

export const BaseStickBarRightSideFeatures = ({
  features,
  searchView,
  cart,
  CartMiniType,
  wishList,
  WishListMiniType,
  menuContext,
  menuMode,
  categoryTree,
}) => {
  return (
    <StickBarRightFeaturesWrapper>
      {features && features.map((feature, fIndex) => (
        <div
          className={
            [`right-item-${fIndex}`,
              `${feature.class_name ? feature.class_name : ''}`,
            ].join(' ')
          }
          // eslint-disable-next-line react/no-array-index-key
          key={fIndex}
        >
          <StickBarFeaturesPicker
            feature={feature}
            searchView={searchView}
            cart={cart}
            CartMiniType={CartMiniType}
            wishList={wishList}
            WishListMiniType={WishListMiniType}
            menuContext={menuContext}
            menuMode={menuMode}
            categoryTree={categoryTree}
          />
        </div>
      ))}
    </StickBarRightFeaturesWrapper>
  );
};

BaseStickBarRightSideFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object),
  searchView: PropTypes.element,
  cart: PropTypes.element,
  CartMiniType: PropTypes.elementType,
  WishListMiniType: PropTypes.elementType,
  wishList: PropTypes.object,
  menuContext: PropTypes.object,
  menuMode: PropTypes.string,
  categoryTree: PropTypes.object,
};

export const StickBarRightSideFeatures = withDependencySupport(BaseStickBarRightSideFeatures, 'StickBarRightSideFeatures');
export const StickBarRightFeaturesWrapper = withDependencySupport(BaseStickBarRightFeaturesWrapper, 'StickBarRightFeaturesWrapper');
