import React from 'react';
import styled, { css } from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import PropTypes from 'prop-types';

export const Wrapper = styled.div`
  background-color: var(--color-mypages-loading-left);

  ${(p) => p.animate && css`
    position: relative;
    overflow: hidden;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      transform: translateX(-100px);
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: loading 0.8s infinite;
    }
  `}
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }

  &.image {
    height: var(--size-product-card-16-image-height);
  }

  ${(p) => p.h && css`
    height: ${asRem(p.h)};
  `}

  ${(p) => p.w && css`
    width: ${`${p.w}%`};
  `}

  ${(p) => p.mB && css`
    margin-bottom: ${asRem(p.mB)};
  `}
`;

export const Image = () => {
  return (
    <Wrapper animate className="image" />
  );
};

export const Block = ({
  h, w, mB,
  animate, className,
}) => {
  return (
    <Wrapper
      h={h || '15'}
      w={w || '100'}
      mB={mB || '10'}
      animate={animate}
      className={className}
    />
  );
};

Block.propTypes = {
  h: PropTypes.string,
  w: PropTypes.string,
  mB: PropTypes.string,
  animate: PropTypes.bool,
  className: PropTypes.string,
};
