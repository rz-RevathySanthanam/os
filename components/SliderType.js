import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';

// import { DailogView } from '@/roanuz/view/dialog';
import { SideBarView } from '@/roanuz/view/sideBar';

const SliderWrapper = styled.div`
`;

// Edit in client level if you want to use roanuz/view/sideBar.
export const BaseSliderModal = ({
  showSliderModal, closeModal, children,
  titleText, containerWidth = '400px',
  titleSection, showClose = true,
}) => {
  return (
    <SliderWrapper>
      <SideBarView
        show={showSliderModal}
        containerWidth={containerWidth}
        titleText={titleText}
        showClose={showClose}
        onClose={closeModal}
        animationMode="SlideInRight"
        titleSection={titleSection}
      >
        {children}
      </SideBarView>
    </SliderWrapper>
  );
};

BaseSliderModal.propTypes = {
  showSliderModal: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.element,
  titleText: PropTypes.string,
  containerWidth: PropTypes.string,
  titleSection: PropTypes.element,
  showClose: PropTypes.bool,
};

export const SliderModal = withDependencySupport(BaseSliderModal, 'SliderModal');
