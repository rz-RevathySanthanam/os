import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { TwoColumnArticleLayoutTypes } from '@/roanuz/view/datocms/types';
import { asRem, Breakpoint } from '@/roanuz/lib/css';

export const BaseTwoColumnSectionLayoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: ${asRem(20)};

  >.column-1, >.column-2 {
    @media screen and (min-width: ${Breakpoint.sm}) {
      width: 50%;
    }
    > div:not(:empty) {
      margin-bottom: ${asRem(20)};
    }
  }

  ${(p) => p.displayMode === TwoColumnArticleLayoutTypes.Left_Side_Image_Right_Side_Content && css`
    @media screen and (min-width: ${Breakpoint.sm}) {
      flex-direction: row;
    }
  `}

  ${(p) => p.displayMode === TwoColumnArticleLayoutTypes.Right_Side_Image_Left_Side_Content && css`
    flex-direction: column-reverse;
    @media screen and (min-width: ${Breakpoint.sm}) {
      flex-direction: row-reverse;
    }
  `}

  ${(p) => p.displayMode === TwoColumnArticleLayoutTypes.Image_At_Top_Content_At_Bottom && css`
  `}

  ${(p) => p.displayMode === TwoColumnArticleLayoutTypes.Image_At_Bottom_Content_At_Top && css`
    @media screen and (min-width: ${Breakpoint.sm}) {
      flex-direction: column-reverse;
    }
  `}
`;

export const BaseTwoColumnSectionLayout = ({
  displayMode,
  title,
  desc,
  image,
  link,
  smallPreTitle,
  className,
}) => {
  return (
    <TwoColumnSectionLayoutWrapper className={`${className} rz-section-content`} displayMode={displayMode}>
      {image && (
        <div className="column-1">
          {title && (
            <div className="section-title">
              {title}
            </div>
          )}
          {smallPreTitle && (
            <div className="section-pretitle">
              {smallPreTitle}
            </div>
          )}
          {image}
        </div>
      )}
      <div className="column-2">
        {smallPreTitle && (
          <div className="section-title section-pretitle">
            {smallPreTitle}
          </div>
        )}
        {title && (
          <div className="section-title">
            {title}
          </div>
        )}
        {desc && (
          <div className="section-desc">
            {desc}
          </div>
        )}
        {link && (
          <div className="section-link">
            {link}
          </div>
        )}
      </div>
    </TwoColumnSectionLayoutWrapper>
  );
};

BaseTwoColumnSectionLayout.propTypes = {
  title: PropTypes.element,
  desc: PropTypes.element,
  image: PropTypes.element,
  link: PropTypes.element,
  displayMode: PropTypes.string,
  smallPreTitle: PropTypes.element,
  className: PropTypes.string,
};

export const TwoColumnSectionLayoutWrapper = withDependencySupport(BaseTwoColumnSectionLayoutWrapper, 'TwoColumnSectionLayout');
export const TwoColumnSectionLayout = withDependencySupport(BaseTwoColumnSectionLayout, 'TwoColumnSectionLayout');
