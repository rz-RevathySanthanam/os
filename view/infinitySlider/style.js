import styled, { css } from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseInfinitySliderWrapper = styled.div`
  text-align: center;
  @keyframes fade-In {
    100% {
      opacity: 1;
    }
  }
  .infinity-slider-container-items {
    ${(p) => p.itemWidth && css`
      width: ${p.itemWidth * p.itemOnView}%;
    `}
    margin: auto;
    overflow: hidden;
    position: relative;
    height: 100%;


    overflow-x: auto;
    overflow-y: hidden;
  
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
    ::-webkit-scrollbar { 
      display: none;  /* Safari and Chrome */
    }
  

    &::before, &::after {
      content: '';
      // background: linear-gradient(90deg,#fbf7f4 50%,hsla(26,47%,97%,0));
      display: block;
      height: 100%;
      position: absolute;
      top: 0;
      width: ${asRem(30)};
      z-index: 3;
      left: 0;
    }
    &::after {
      left: unset;
      right: 0;    
      // background: linear-gradient(90deg,hsla(26,47%,97%,0),#fbf7f4 50%);
    }
    .carousel-wrapper {
      display: flex;
      flex-wrap: nowrap;
      text-align: center;
      .item {
        flex-shrink: 0;
        ${(p) => p.itemWidth && css`
          width: ${p.itemWidth}%;
        `}
        ${(p) => p.transitionDelay && css`
          transition: ${p.transitionDelay}s ease;
        `}
        padding: ${asRem(10)};
        display: flex;
        flex-direction: column;
      }
    }
  }

  .carousel-wrapper .item {
    transform: translateX(-0%) translateY(0%) scale(.55);
    -webkit-transform-origin-y: bottom!important;
    transform-origin: 100% 50%;
    &.previous-slide {
      -webkit-transform-origin-x: 0;
    }
    &.active-slide {
      transform: translateX(0%) translateY(0%) scale(1);
    }
  }

  >.infinity-slider-container {
    position: relative;
  
    >.arrow-item {
      background-color: #ffffff9c;
      border-radius: 50%;
      text-align: center;
  
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 99;
      /* display: none; */
      min-width: var(--arrow-button-width);
      right: 0;
      left: auto;
  
      .rz-svg-icon {
        padding-right: 0;
      }
  
      &.arrow-left {
        right: auto;
        left: 0;
        svg {
          transform: rotate(-180deg);
        }
      }
  
      &.arrow-right {
        z-index: 6;
      }
      
      button {
        width: ${asRem(42)};
        height: ${asRem(42)};
        justify-content: center;
      }
    }
  }
`;

export const InfinitySliderWrapper = withDependencySupport(BaseInfinitySliderWrapper, 'InfinitySliderWrapper');
