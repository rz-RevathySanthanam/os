import { keyframes } from 'styled-components';

export const BouncingBallKF = keyframes`
  0% {
    transform: translateY(-80%);
    color: var(--color-button);
  }

  50% {
    color: var(--color-refurbished);
  }

  100% {
    transform: translateY(160%) scaleY(80%);
  }
`;
