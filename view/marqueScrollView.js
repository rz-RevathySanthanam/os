import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MarqueScrollController } from '@/roanuz/controller/marqueScroll';
import { DisplayBold40 } from '@/roanuz/typopgraphy';
import { Row } from '@/roanuz/layout';
import { asRem } from '@/roanuz/lib/css';
import { LogoView } from '@/roanuz/view/brand';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseMarqueScrollViewWrapper = styled.div`
  .scroll-content-wrapper {
    .scroll-items {
      gap: ${asRem(20)};
      cursor: pointer;
      transition: 0.5s ease;
      
      .rz-svg-icon {
        opacity: 0.5;
      }
    }
  }
`;

export const MarqueScrollView = ({ text }) => {
  const textItems = text.split(',');
  const items = [];
  if (!textItems.length) {
    return null;
  }
  textItems.forEach((item) => {
    items.push((
      <Row className="scroll-items" alignCenter>
        <LogoView />
        <DisplayBold40 className="scroll-text">
          {item}
        </DisplayBold40>
      </Row>
    ));
  });
  return (
    <MarqueScrollViewWrapper>
      <MarqueScrollController
        data={items}
        elementWidth={700}
      />
    </MarqueScrollViewWrapper>
  );
};

MarqueScrollView.propTypes = {
  text: PropTypes.string,
};

export const MarqueScrollViewWrapper = withDependencySupport(BaseMarqueScrollViewWrapper, 'MarqueScrollViewWrapper');
