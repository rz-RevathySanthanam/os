import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Config from '@/config';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { StickBarFeaturesPicker } from './featurePicker';

export const BaseStickBarLeftFeaturesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .menu-icon {
    margin-right: ${asRem(20)};
  }
  .col-logo {
    margin-right: ${asRem(5)};
    img {
      height: ${asRem(36)};
      transition: all 0.3s ease-in-out;
    }
    @media screen and (min-width: ${Breakpoint.md}) {
      margin-right: ${asRem(17)};
    }
  }

  ${(props) => props.reachedScrollTop && css`
    @media screen and (min-width: ${Breakpoint.md}) {
      .show-category-menu .category-menu-container {
        padding-top: ${asRem(30)};
      }
    }
  `}
`;

export const BaseStickBarLeftSideFeatures = ({
  features,
  menuMode,
  scrollPosition,
  categoryTree,
  menuContext,
}) => {
  return (
    <StickBarLeftFeaturesWrapper
      reachedScrollTop={scrollPosition > Config.AppSettings.StickHeaderAtPosition}
    >
      {features && features.map((feature, fIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div
          className={
            [`left-item-${fIndex}`,
              `${feature.class_name ? feature.class_name : ''}`,
            ].join(' ')
          }
          // eslint-disable-next-line react/no-array-index-key
          key={fIndex}
        >
          <StickBarFeaturesPicker
            feature={feature}
            menuMode={menuMode}
            categoryTree={categoryTree}
            menuContext={menuContext}
          />
        </div>
      ))}
    </StickBarLeftFeaturesWrapper>
  );
};

BaseStickBarLeftSideFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object),
  menuMode: PropTypes.string,
  scrollPosition: PropTypes.number,
  categoryTree: PropTypes.object,
  menuContext: PropTypes.object,
};

export const StickBarLeftSideFeatures = withDependencySupport(BaseStickBarLeftSideFeatures, 'StickBarLeftSideFeatures');
export const StickBarLeftFeaturesWrapper = withDependencySupport(BaseStickBarLeftFeaturesWrapper, 'StickBarLeftFeaturesWrapper');
