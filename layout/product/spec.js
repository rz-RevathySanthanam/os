import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '../../lib/css';

const ProductSpecLayoutWrapper = styled.div`
`;

export const ProductSpecLayout = ({ children, className }) => {
  return (
    <ProductSpecLayoutWrapper className={className}>
      {children}
    </ProductSpecLayoutWrapper>
  );
};

ProductSpecLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  className: PropTypes.string,
};

export const BaseProductSpecGroupLayoutWrapper = styled.div`
  display: flex;
  margin-bottom: ${asRem(40)};

  .product-spec-group-label {
    min-width: ${asRem(240)};
    padding-right: ${asRem(20)};
  }

  .product-spec-group {
    flex: 1;
  }
    
  @media screen and (min-width: ${Breakpoint.sm}) {
    flex-direction: row;
  }
`;

export const ProductSpecGroupLayout = ({ groupName, children }) => {
  return (
    <ProductSpecGroupLayoutWrapper>
      <div className="product-spec-group-label">{groupName}</div>
      <div className="product-spec-group">{children}</div>
    </ProductSpecGroupLayoutWrapper>
  );
};

ProductSpecGroupLayout.propTypes = {
  groupName: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export const BaseProductSpecLineLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${asRem(10)} ${asRem(20)};
  div {
    :first-child {
      min-width: ${asRem(200)};
      padding-right: ${asRem(20)};
    }
  }

  &:nth-child(odd) {
    background-color: var(--color-disabled-5);
  }

  @media screen and (min-width: ${Breakpoint.sm}) {
    flex-direction: row;
  }
  .product-spec-content {
    a {
      cursor: pointer;
    }
  }
`;

export const ProductSpecLineLayout = ({ label, children }) => {
  return (
    <ProductSpecLineLayoutWrapper className="product-spec-container">
      <div className="product-spec-label">{label}</div>
      <div className="product-spec-content">{children}</div>
    </ProductSpecLineLayoutWrapper>
  );
};

ProductSpecLineLayout.propTypes = {
  label: PropTypes.element,
  children: PropTypes.element,
};

export const ProductSpecGroupLayoutWrapper = withDependencySupport(BaseProductSpecGroupLayoutWrapper, 'ProductSpecGroupLayoutWrapper');
export const ProductSpecLineLayoutWrapper = withDependencySupport(BaseProductSpecLineLayoutWrapper, 'ProductSpecLineLayoutWrapper');
