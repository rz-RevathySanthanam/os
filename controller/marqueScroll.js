import React from 'react';
import styled, { css } from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import PropTypes from 'prop-types';
import { Row } from '@/roanuz/layout';

export const MarqueScrollControllerWrapper = styled.div`
  ${(p) => p.data && css`
    --marquee-elements: ${p.data.length};
  `}
 
  ${(p) => p.elementDisplayed && css`
    --marquee-element-width: calc(100vw / ${p.elementDisplayed});
  `}
  
  ${(p) => p.elementWidth && css`
    --marquee-element-width: ${asRem(p.elementWidth)};
  `}

  min-width: 0;
  overflow: hidden;
  position: relative;

  .scroll-content-wrapper {
    display: flex;
    ${(p) => p.scrollDelay && css`
      animation: scrolling ${p.scrollDelay} linear infinite;
    `}

    @keyframes scrolling {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-1 * var(--marquee-element-width) * var(--marquee-elements))); 
      }
    }

    &:hover {
      animation-play-state: paused;
      .scroll-text {
        color: var(--color-button);
      }
      .rz-svg-icon {
        color: var(--color-button);
      }
    }

    .scroll-content {
      display: flex;
      justify-content: center;
      flex-shrink: 0;
      width: var(--marquee-element-width);
    }
  }
`;

export const MarqueScrollController = ({
  scrollDelay = '20s',
  elementDisplayed = 3,
  elementWidth,
  data,
}) => {
  return (
    <MarqueScrollControllerWrapper
      elementWidth={elementWidth}
      elementDisplayed={elementDisplayed}
      data={data}
      scrollDelay={scrollDelay}
    >
      <Row alignCenter className="scroll-content-wrapper">
        {[...Array(elementDisplayed)].map(() => (
          <>
            {data.map((item) => (
              <Row alignCenter className="scroll-content">
                {item}
              </Row>
            ))}
          </>
        ))}
      </Row>
    </MarqueScrollControllerWrapper>
  );
};

MarqueScrollController.propTypes = {
  elementDisplayed: PropTypes.number,
  scrollDelay: PropTypes.string,
  data: PropTypes.number,
  elementWidth: PropTypes.string,
};
