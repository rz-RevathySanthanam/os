import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from '@/roanuz/layout';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { MenuModelContext, useToggleMenuHandler } from '@/roanuz/store/core/menuContext';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import { Button } from '@/roanuz/view/button';
import { LogoView } from '@/roanuz/view/brand';
import { ServicesTree } from '@/roanuz/lib/servicesTree';
import { SideBarView } from '@/roanuz/view/sideBar';
import { asRem } from '@/roanuz/lib/css';
import { StickBarMenuModeTypes } from '../featureTypes';
import { MobileMenuView } from './mobileMenuView';
import { SuperMenuFrame, SuperMenuView } from './superMenuView';

const StickBarMenuViewWrapper = styled.div`
`;

export const SideBarCustomHeader = ({
  toggleMenu,
}) => {
  return (
    <Row alignCenter>
      <Col>
        <Button
          icon={<CloseIcon />}
          noborder
          onClick={() => toggleMenu()}
          ariaLabel="Close Button"
        />
      </Col>
      <Col><LogoView /></Col>
    </Row>
  );
};

SideBarCustomHeader.propTypes = {
  toggleMenu: PropTypes.func,
};

export const BaseStickBarMenuView = ({
  menuSettings,
  categoryTree,
}) => {
  const menuContext = useContext(MenuModelContext);
  const mode = menuSettings.menu_mode || StickBarMenuModeTypes.MobileBurgerMenuMode;
  const isMobileMenu = mode === StickBarMenuModeTypes.MobileBurgerMenuMode;
  const [toggleMenu] = useToggleMenuHandler();

  const rightSection = (menuSettings.animation_mode === 'SplitScreen'
    ? (
      <SuperMenuFrame
        superMenuTrigger={toggleMenu}
        menuContext={menuContext}
        categoryTree={categoryTree}
        serviceTree={ServicesTree}
      />
    ) : null
  );

  return (
    <StickBarMenuViewWrapper>
      <SideBarView
        show={isMobileMenu
          ? menuContext.showMobileBurgerMenuModal
          : menuContext.showSuperMenuModal}
        onClose={() => toggleMenu(false, isMobileMenu)}
        titleSection={<SideBarCustomHeader toggleMenu={() => toggleMenu(false, isMobileMenu)} />}
        animationMode={menuSettings.animation_mode}
        rightSection={rightSection}
        containerWidth={isMobileMenu ? asRem(380) : null}
        className={`sidebar-menu-view ${menuSettings.className}`}
      >
        {(isMobileMenu) ? (
          <MobileMenuView
            mobileMenuSettings={menuSettings.mobileMenuSettings}
            categoryTree={categoryTree}
            serviceTree={ServicesTree}
          />
        ) : (
          <>
            <SuperMenuView
              superMenuSettings={menuSettings.superMenuSettings}
              superMenuTrigger={toggleMenu}
              menuContext={menuContext}
              categoryTree={categoryTree}
              serviceTree={ServicesTree}
              animationMode={menuSettings.animation_mode}
            />
            {menuSettings.animation_mode !== 'SplitScreen' && (
              <SuperMenuFrame
                superMenuTrigger={toggleMenu}
                menuContext={menuContext}
                categoryTree={categoryTree}
                serviceTree={ServicesTree}
              />
            )}
          </>
        )}
      </SideBarView>
    </StickBarMenuViewWrapper>
  );
};

BaseStickBarMenuView.propTypes = {
  menuSettings: PropTypes.object,
  categoryTree: PropTypes.object,
};

export const StickBarMenuView = withDependencySupport(BaseStickBarMenuView, 'StickBarMenuView');
