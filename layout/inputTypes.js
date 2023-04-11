import styled, { css } from 'styled-components';
import { asRem } from '@/roanuz/lib/css';

export const StyledRadio = styled('div').attrs({ className: 'rz-custom-radio' })`
  input[type="radio"] {
    margin-right: ${asRem(10)};
    width: ${asRem(24)};
    height: ${asRem(24)};
    border: 1px solid;
    border-radius: ${asRem(18)};
    margin-top: 0;
    position: relative;

    &::before {
      content: "";
      display: block;
      width: ${asRem(9)};
      height: ${asRem(9)};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    transition: all .3s ease-in-out;

    &:checked {
      border-color: var(--color-button);
      background-color: var(--color-button);
      &::before {
        background-color: #fff;
      }
    }
  }
`;

export const StyledCheckbox = styled('div').attrs({ className: 'rz-custom-checkbox' })`
  input[type="checkbox"] {
    width: ${asRem(24)};
    height: ${asRem(24)};
    border: 1px solid;
    border-radius: ${asRem(2)};
    margin-top: 0;
    position: relative;
    cursor: pointer;

    &::before {
      content: "";
      display: block;
      width: ${asRem(5)};
      height: ${asRem(12)};
      position: absolute;
      top: ${asRem(3)};
      left: ${asRem(8)};
      border: solid transparent;
      border-width: 0 1px 1px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    &:checked {
      background-color: var(--color-button);
      border-color: var(--color-button);
      &::before {
        border-color: #fff;
      }
      &:hover {
        &::before {
          border-color: #fff;
        }     
      }
    }

    &:disabled {
      &:hover {
        &::before {
          border-color: #fff;
        }     
      }
    }

    &:hover {
      &::before {
        border-color: var(--color-grey);
      }     
    }
  }
`;

export const StyledPlainInputbox = styled('div').attrs({ className: 'rz-custom-inputbox' })`
  input[type="text"],
  input[type="textarea"],
  input[type="number"],
  select {
    display: flex;
    border: ${asRem(1)} solid #B3B3B3;;
    box-shadow: none;
    outline: 0;
    height: ${asRem(34)};
    width: ${asRem(60)};
    ${(p) => p.width && css`
      width: ${asRem(p.width)};
    `}
    margin-right: 0;
    max-width: ${asRem(80)};
    border-radius: ${asRem(6)};
    padding: 0 ${asRem(10)};
  }
  label {
    margin-bottom: ${asRem(5)};
    display: block;
  }
`;
