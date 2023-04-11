import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseDatoCmsDynamicBlockViewWrapper = styled.div`
`;

export const DatoCmsDynamicBlockView = ({ children, className }) => {
  return (
    <DatoCmsDynamicBlockViewWrapper className={className}>
      <div className="rz-section-content">{children}</div>
    </DatoCmsDynamicBlockViewWrapper>
  );
};

DatoCmsDynamicBlockView.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

export const DatoCmsDynamicBlockViewWrapper = withDependencySupport(BaseDatoCmsDynamicBlockViewWrapper, 'DatoCmsDynamicBlockViewWrapper');
