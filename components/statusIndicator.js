import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { asRem } from '@/roanuz/lib/css';

export const StatusIndicatorWrapper = styled.span`
  width: ${asRem(10)};
  height: ${asRem(10)};
  display: inline-block;
  background-color: #eee;
  border-radius: 50%;
  margin-right: ${asRem(8)};
  ${(props) => props.color && css`
    background-color: var(${props.color});
  `}
  ${(props) => props.rawColor && css`
    background-color: ${props.rawColor};
  `}
`;

export const StatusIndicator = ({ color, rawColor }) => {
  return (
    <StatusIndicatorWrapper color={color} rawColor={rawColor} />
  );
};

StatusIndicator.propTypes = {
  color: PropTypes.string,
  rawColor: PropTypes.string,
};
