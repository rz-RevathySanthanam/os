import React from 'react';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem } from '@/roanuz/lib/css';
import { Block, Image } from './elements';

export const BaseLazyLoadingProductCardViewWrapper = styled.div`
  padding: 0 ${asRem(25)};
  >div {
    margin-bottom: ${asRem(10)};
  }
`;

export const LazyLoadingProductCardView = () => {
  return (
    <LazyLoadingProductCardViewWrapper>
      <Image />
      <Block h="20" />
      <Block h="12" w="40" />
      <Block h="12" w="25" />
    </LazyLoadingProductCardViewWrapper>
  );
};

LazyLoadingProductCardView.propTypes = {
};

export const LazyLoadingProductCardViewWrapper = withDependencySupport(BaseLazyLoadingProductCardViewWrapper, 'LazyLoadingProductCardViewWrapper');
