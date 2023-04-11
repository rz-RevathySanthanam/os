import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseOverallItemsCountViewWrapper = styled.div`

`;

export const OverallItemsCountView = ({
  itemsTo,
  totalItems,
  className,
  seperator = '/',
  translation = translateV2('button.RESULTS', 'results'),
}) => {
  return (
    <OverallItemsCountViewWrapper className={className}>
      <div className="items-in-display">
        <span>
          <span>{itemsTo}</span>
          &nbsp;
          {seperator}
          &nbsp;
          <span>{totalItems}</span>
          &nbsp;
          {translation}
        </span>
      </div>
    </OverallItemsCountViewWrapper>
  );
};

OverallItemsCountView.propTypes = {
  itemsTo: PropTypes.number,
  totalItems: PropTypes.number,
  className: PropTypes.string,
  seperator: PropTypes.string,
  translation: PropTypes.string,
};

const OverallItemsCountViewWrapper = withDependencySupport(BaseOverallItemsCountViewWrapper, 'OverallItemsCountViewWrapper');
