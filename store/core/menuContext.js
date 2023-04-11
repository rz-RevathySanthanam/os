import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const MenuModelState = {
  showMobileBurgerMenuModal: false,
  showSuperMenuModal: false,
  superMenuModalActiveFrame: -1,
  showCategoryFilterModal: false,
  showCartModal: false,
  showSearchModal: false,
};

export const MenuModelContext = React.createContext({
  ...MenuModelState,
});
export const MenuModelConsumer = MenuModelContext.Consumer;

export const MenuModelProvider = ({ value, children }) => {
  const [modelContext, setmodelContext] = useState({
    toggleMobileBurgerMenuModal: (showMobileBurgerMenuModal) => {
      setmodelContext((state) => ({
        ...state,
        showMobileBurgerMenuModal,
      }));
    },
    toggleSuperMenuModal: (showSuperMenuModal, activeFrame) => {
      setmodelContext((state) => ({
        ...state,
        showSuperMenuModal,
        superMenuModalActiveFrame: activeFrame,
      }));
    },
    toggleCategoryFilterModal: (showCategoryFilterModal) => {
      setmodelContext((state) => ({
        ...state,
        showCategoryFilterModal,
      }));
    },
    toggleCartModal: (showCartModal) => {
      setmodelContext((state) => ({
        ...state,
        showCartModal,
      }));
    },
    toggleSearchModel: (showSearchModal) => {
      setmodelContext((state) => ({
        ...state,
        showSearchModal,
      }));
    },
    ...value,
  });
  return (
    <MenuModelContext.Provider value={modelContext}>
      {children}
    </MenuModelContext.Provider>
  );
};

MenuModelProvider.propTypes = {
  value: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export const useToggleMenuHandler = () => {
  const menuContext = useContext(MenuModelContext);
  const onHandlerTrigger = (val, isMobileMenu, frame = -1) => {
    const prevFrameState = menuContext.superMenuModalActiveFrame;
    if (isMobileMenu) {
      menuContext.toggleMobileBurgerMenuModal(val);
    } else {
      menuContext.toggleSuperMenuModal(val, val ? frame : prevFrameState);
    }
  };
  return [onHandlerTrigger];
};
