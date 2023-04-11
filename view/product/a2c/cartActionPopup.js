import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DailogView } from '@/roanuz/view/dialog';
import { withDependencySupport } from '@/roanuz/lib/dep';

const CartActionPopupViewWrapper = styled.div`
`;

export const BaseCartActionPopupView = ({
  children,
  modelSettings,
}) => {
  const {
    onClosePopup,
    containerWidth,
    titleText,
    titleSection,
    show,
    showClose,
  } = modelSettings;
  return (
    <DailogView
      show={show}
      containerWidth={containerWidth}
      titleText={titleText}
      showClose={showClose}
      onClose={onClosePopup}
      titleSection={titleSection}
    >
      <CartActionPopupViewWrapper>
        {children}
      </CartActionPopupViewWrapper>
    </DailogView>
  );
};

BaseCartActionPopupView.propTypes = {
  children: PropTypes.element,
  modelSettings: PropTypes.object,
};

export const CartActionPopupView = withDependencySupport(BaseCartActionPopupView, 'CartActionPopupView');
