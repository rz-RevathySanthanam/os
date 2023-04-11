import React from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ReactComponent as BaseMenuIcon } from '@/roanuz/view/imgs/MenuIcon.svg';
import { SVGIcon } from '@/roanuz/view/icon';
import { useToggleMenuHandler } from '@/roanuz/store/core/menuContext';
import { StickBarMenuModeTypes } from './featureTypes';

export const MenuIcon = withDependencySupport(BaseMenuIcon, 'MenuIcon');

export const BaseMenuIconActionView = ({
  mode,
}) => {
  const isMobileMenu = mode === StickBarMenuModeTypes.MobileBurgerMenuMode;
  const [showMenu] = useToggleMenuHandler();

  return (
    <div className="menu-icon">
      <SVGIcon
        heightPx={24}
      >
        <MenuIcon onClick={() => showMenu(true, isMobileMenu)} />
      </SVGIcon>
    </div>
  );
};

BaseMenuIconActionView.propTypes = {
  mode: PropTypes.string,
};

export const MenuIconActionView = withDependencySupport(BaseMenuIconActionView, 'MenuIconActionView');
