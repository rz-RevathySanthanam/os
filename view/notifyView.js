import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  DisplayBold20,
} from '@/roanuz/typopgraphy';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import ClientOnlyPortal from '@/roanuz/view/clientOnlyPortal';
import { BaseDailogViewWrapper } from '@/roanuz/view/dialog';
import { asRem } from '@/roanuz/lib/css';
import { Button, ButtonList } from './button';

export const NotifyViewWrapper = styled(BaseDailogViewWrapper)`
  position:fixed;
  top: 0;
  z-index: 999;
  overflow: hidden;
  transition: height 0.2s ease-in;
  right: 0;
  height: initial;
  width: initial;
  left: initial;

  transform: translate(calc(100% + (2 * ${asRem(15)})), 0);
  transition: 1s ease;

  ${(p) => p.show && css`
      transform: translate(0, 0);
    }
  `}

  >.dialog-container-wrapper {
    filter: none;
    .dialog-container {
      background-color: var(--color-charcoal);
      color: var(--color-simple-white);
      opacity: 1;
      transform: none;

      display: flex;
      flex-direction: row-reverse;
      align-items: flex-start;
      gap: ${asRem(50)};
      
      .dialog-title {
        justify-content: flex-end;
        margin: 0;
        .close-btn {
          padding: 0;
          .rz-svg-icon {
            &:hover {
              color: var(--color-simple-white);
            }
          }
        }        
      }
      .items-line {
        margin: 0;
      }
    }
  }
`;

export const NotifyView = ({
  show, children,
  titleText, titleSection,
  actionSection, confirmText,
  containerWidth,
  onConfirm, onClose,
}) => {
  const [openPopup, setOpenPopup] = useState(null);
  const onViewClose = (timer = 100) => {
    if (onClose) {
      setTimeout(() => {
        setOpenPopup(false);
      }, timer);
      setTimeout(() => {
        onClose();
      }, timer + 600);
    }
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setOpenPopup(show);
      }, 750);
      onViewClose(3000);
    }
  }, [show]);

  if ((!openPopup) && (!show)) {
    return null;
  }

  return (
    <ClientOnlyPortal>
      <NotifyViewWrapper
        show={openPopup}
        containerWidth={containerWidth}
      >
        <div className="dialog-container-wrapper">
          <div className="dialog-container">
            <div className="dialog-title">
              {titleSection}
              {titleText && (
                <DisplayBold20>{titleText}</DisplayBold20>
              )}
              {onClose && (
                <Button
                  icon={<CloseIcon />}
                  noborder
                  onClick={() => onViewClose()}
                  ariaLabel="Close Button"
                  className="close-btn"
                />
              )}
            </div>
            <div className="dialog-content">
              {children}
            </div>
            {(actionSection || confirmText) && (
              <div className="dialog-action">
                {actionSection}
                {confirmText && onConfirm && (
                  <ButtonList asList>
                    <Button
                      mode="primary"
                      onClick={onConfirm}
                      ariaLabel="Confirm"
                    >
                      {confirmText}
                    </Button>
                  </ButtonList>
                )}
              </div>
            )}
          </div>
        </div>
      </NotifyViewWrapper>
    </ClientOnlyPortal>
  );
};

NotifyView.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.element.isRequired,

  titleText: PropTypes.string,
  titleSection: PropTypes.element,

  actionSection: PropTypes.element,
  confirmText: PropTypes.string,

  containerWidth: PropTypes.string,

  onConfirm: PropTypes.func,
  onClose: PropTypes.func,

};
