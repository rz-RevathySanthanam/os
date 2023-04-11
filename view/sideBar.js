import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import ClientOnlyPortal from '@/roanuz/view/clientOnlyPortal';
import { DisplayBold20 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { useRouter } from 'next/router';
import { Button } from './button';

/* Possible Animation Types
SlideInLeft - default
SlideInRight
SplitScreen
*/

export const AnimationModeTypes = {
  SlideInLeft: 'SlideInLeft',
  SlideInRight: 'SlideInRight',
  SplitScreen: 'SplitScreen',
};

export const BaseSideBarViewWrapper = styled.div`
  position:fixed;
  left: 0;
  top: 0;
  z-index: 999;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  transition: height 0.2s ease-in;
  ${(p) => p.containerWidth && css`
    --container-width: ${p.containerWidth};
    --container-width-negative: -${p.containerWidth};
  `}

  >.sidebar-bg {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    display: block;
    transition: all 0.4s ease-out;
  }

  >.sidebar-container-wrapper {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25));
    overflow: hidden;
    @media screen and (min-width: ${Breakpoint.sm}) {
      min-width: var(--container-width);
      max-width: initial;
      width: fit-content;
      overflow-y: unset;
    }

    ${(p) => p.animationMode === 'SlideInRight' && css`
      margin-left: auto;
    `}

    >.sidebar-container {
      width: 100%;
      transition: all 0.5s ease-out;
      background: var(--color-text-rev);
      display: flex;
      height: 100%;
      flex-direction: column;
      overflow-y: auto;
      position: relative;
      z-index: 3;
      transform: translateX(-100%);
      @media screen and (min-width: ${Breakpoint.sm}) {
        width: var(--container-width);
        transform: translateX(var(--container-width-negative));
      }

      ${(p) => p.animationMode === 'SlideInRight' && css`
        transform: translateX(100%);
        @media screen and (min-width: ${Breakpoint.sm}) {
          transform: translateX(var(--container-width));
        }
      `}
    
      .sidebar-title, .sidebar-content {
        padding: ${asRem(15)};
        @media screen and (min-width: ${Breakpoint.sm}) {
          padding: ${asRem(20)};
        }
      }

      .sidebar-content {
        padding-top: ${asRem(30)};
        flex: 1;
      }
    }

    .sidebar-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &.end {
        justify-content: end;
      }
    }

    .right-wrapper {
      ${(p) => p.animationMode === 'SplitScreen' && css`
        position: fixed;
        top: 0;
        height: 100%;
        left: 0;
        transition: all 0.5s ease-in-out;
        background-color: var(--color-text-rev);
        padding: ${asRem(20)} 0;
        z-index: 3;
        @media screen and (min-width: ${Breakpoint.md}) {
          left: var(--container-width);
          width: calc(100vw - var(--container-width));
          transform: translateX(calc(100vw - var(--container-width)));
        }
      `}
    }
  }

  /* Menu bar  */
  &.sidebar-menu-view {
    >.sidebar-container-wrapper {
      ${(p) => p.animationMode === 'SplitScreen' && css`
        overflow: unset;
      `}
      >.sidebar-container {
        ${(p) => p.animationMode !== 'SplitScreen' && css`
          @media screen and (min-width: ${Breakpoint.sm}) {
            min-width: var(--container-width);
            max-width: initial;
            width: fit-content;
            overflow-y: unset;
            transform: translateX(-100%);
          }
        `}

        ${(p) => p.animationMode === 'SlideInRight' && css`
          @media screen and (min-width: ${Breakpoint.sm}) {
            transform: translateX(100%);
          }
        `}
      }
    }
  }

  // My Pages
  &.customerpage-sidebar {
    .sidebar-title {
      border-bottom: ${asRem(1)} solid var(--color-border);
    }
    .main-title {
      display: none;
    }
  }

  .bottom-btn-wrapper {
    margin-top: ${asRem(50)};
    .clear-all-btn {
      margin-right: ${asRem(16)};
    }
  }

  // Category Filters
  &.sidebar-category-filter {
    .sidebar-title {
      .close-btn {
        padding-right: 0;
      }
    }
    .sidebar-container-wrapper {
      .sidebar-container .sidebar-content {
        padding-top: ${asRem(10)};
      }
    }
  }

  // Searchbar view
  &.search-bar-view {
    .sidebar-container-wrapper {
      .default-left-wrapper {
        min-height: 100vh;
        transform: translateY(-100%);
        ${(p) => p.show && css`
          transform: translateY(0);
        `}
        .sidebar-title {
          display: none;
        }

        .sidebar-content {
          padding: 0;
        }
      }
    }
  }


  ${(p) => p.show && css`
    >.sidebar-bg {
      background-color: rgba(51, 51, 51, 0.48);
    }
    >.sidebar-container-wrapper {
      >.sidebar-container.default-left-wrapper, .right-wrapper {
        transform: translateX(0);
      }
    }
  `}
`;

export const SideBarView = ({
  show, children,
  showClose,
  containerWidth,
  onClose, titleText,
  titleSection,
  rightSection,
  animationMode = AnimationModeTypes.SlideInLeft,
  className,
  restrictOnRouteChange = false,
}) => {
  const onViewClose = (event) => {
    if (onClose) {
      onClose(event);
    }
  };

  const onBgKeyPress = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Esc' || event.key === 'Escape') {
      onViewClose();
    }

    event.preventDefault();
  };

  // To wait for animation to finish while closing
  const [confirmedState, setConfirmedState] = useState(show);
  const [softState, setSoftState] = useState(show);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setSoftState(show);
    }, 10);
  }, [show]);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      setConfirmedState(softState);
    }, 510);
    setTimerId(newTimerId);

  // Don't listen to timerId
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [softState]);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`,
      );
      setTimeout(() => {
        if (!restrictOnRouteChange) {
          onViewClose();
        }
      }, 1000);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  if ((!confirmedState) && (!softState) && (!show)) {
    return null;
  }

  return (
    <ClientOnlyPortal>
      <SideBarViewWrapper
        show={softState}
        containerWidth={containerWidth || asRem(350)}
        animationMode={animationMode}
        className={className}
      >
        <div
          className="sidebar-bg"
          onClick={onViewClose}
          onKeyDown={onBgKeyPress}
          role="presentation"
        />
        <div className="sidebar-container-wrapper">
          <div className="sidebar-container default-left-wrapper">
            <div className={`sidebar-title ${!(titleText || titleSection) ? 'end' : null}`}>
              {titleSection}
              {titleText && (
                <DisplayBold20>{titleText}</DisplayBold20>
              )}
              {showClose && onClose && (
                <Button
                  icon={<CloseIcon />}
                  noborder
                  onClick={onViewClose}
                  className="close-button"
                  ariaLabel="Close Button"
                />
              )}
            </div>
            <div className="sidebar-content">
              {children}
            </div>
          </div>
          {animationMode === 'SplitScreen' && (
            <div className="right-wrapper">
              {rightSection}
            </div>
          )}
        </div>
      </SideBarViewWrapper>
    </ClientOnlyPortal>
  );
};

SideBarView.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.element.isRequired,
  showClose: PropTypes.bool,
  containerWidth: PropTypes.string,
  onClose: PropTypes.func,
  titleText: PropTypes.string,
  titleSection: PropTypes.element,
  rightSection: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  animationMode: PropTypes.string,
  className: PropTypes.string,
  restrictOnRouteChange: PropTypes.bool,
};

export const SideBarViewWrapper = withDependencySupport(BaseSideBarViewWrapper, 'SideBarViewWrapper');
