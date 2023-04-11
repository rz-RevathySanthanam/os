import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { parser } from '@/roanuz/store/modelParser';
import { SVGIcon } from './icon';
import { asRem } from '../lib/css';
import { Tiny } from '../typopgraphy';

const LoadingAnimationFrame = keyframes`
  0% {
    border-radius: ${asRem(4)};
  }
  50% {
    border-radius: ${asRem(18)};
  }
  100% {
    border-radius: ${asRem(4)};
  }
`;

const IconIndicatorViewWrapper = styled.div.attrs(
  {
    className: 'rz-icon-indicator',
  },
)`
  min-width: ${asRem(32)};
  > .indicator-container {
    position: relative;
    border-radius: 50%;
    width: ${asRem(42)};
    height: ${asRem(42)};
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: var(--color-sticky-icons-hover);
      cursor: pointer;
    }

    > .indicator {
      position:absolute;
      top: 0;
      right: 0;

      text-align: center;
      padding: ${asRem(3)} 0;
      &:not(:empty) {
        min-width: ${asRem(18)};
        background-color: var(--color-indicator);
      }
      border-radius: ${asRem(18)};
      color: inherit;
      transition: all 0.5s ease-in;

      &.error {
        color: inherit;
        background-color: var(--color-error);
      }

      &.loading {
        animation: ${LoadingAnimationFrame} 1s linear infinite alternate;
        transform: scale(0.9);
        opacity: 0.9;
      }

    }

  }
`;

export const IconIndicatorView = ({
  loading, error, item, children,
  hideIndicatorForZero,
  iconHeightPx,
}) => {
  const wrapper = (classes, content) => {
    return (
      <IconIndicatorViewWrapper>
        <div className="indicator-container">
          {content !== '' && (
            <Tiny className={classes}>{content}</Tiny>
          )}
          <SVGIcon heightPx={iconHeightPx} useOriginal>
            {children}
          </SVGIcon>
        </div>
      </IconIndicatorViewWrapper>
    );
  };

  if (error) {
    console.log('Error', error);
    return wrapper('indicator error', '!');
  }

  if (loading) {
    return wrapper('indicator check loading', '..');
  }

  if (hideIndicatorForZero) {
    return wrapper('', '');
  }

  return wrapper('indicator loaded', parser('any.cartIndicatorViewStyle', item));
};

IconIndicatorView.propTypes = {
  children: PropTypes.element.isRequired,
  hideIndicatorForZero: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  item: PropTypes.shape({
    total_quantity: PropTypes.number,
  }),
  iconHeightPx: PropTypes.number,
};
