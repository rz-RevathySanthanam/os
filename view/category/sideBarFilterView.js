import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MenuModelContext } from '@/roanuz/store/core/menuContext';
import { translateV2 } from '@/roanuz/lib/utils';
import { SideBarView } from '@/roanuz/view/sideBar';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import { DisplayBold20 } from '@/roanuz/typopgraphy';
import { Button } from '@/roanuz/view/button';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem } from '@/roanuz/lib/css';

export const BaseSideBarFilterViewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  .btn-wrapper {
    display: flex;
    align-items: center;

    .clear-all-btn {
      display: none;
    }
  }
`;

export const SideBarFilterView = ({
  filter,
  onClearAllFiltersCtrl,
  customClearFilterButton,
  title,
  filterSettingsConfig,
  totalItems,
  selectedFilters,
  filterLoading,
}) => {
  const menuContext = useContext(MenuModelContext);
  const isSelectedFilters = selectedFilters && Object.keys(selectedFilters).length > 0;
  return (
    <SideBarView
      show={menuContext.showCategoryFilterModal}
      onClose={() => menuContext.toggleCategoryFilterModal(false)}
      restrictOnRouteChange
      animationMode={filterSettingsConfig.filterSettings.sliderAnimationMode}
      className="sidebar-category-filter"
      containerWidth={asRem(420)}
      titleSection={(
        <SideBarFilterViewWrapper>
          <DisplayBold20>{title || translateV2('button.ALL_FILTERS')}</DisplayBold20>
          <div className="btn-wrapper">
            {!customClearFilterButton ? (
              <Button
                onClick={onClearAllFiltersCtrl}
                mode="primary"
                className="clear-all-btn"
                disabled={!isSelectedFilters}
              >
                {translateV2('button.CLEAR_FILTER')}
              </Button>
            ) : (
              <>{customClearFilterButton}</>
            )}
            <Button
              icon={<CloseIcon />}
              noborder
              onClick={() => menuContext.toggleCategoryFilterModal(false)}
              ariaLabel="Close Button"
              className="close-btn"
            />
          </div>
        </SideBarFilterViewWrapper>
      )}
    >
      {filter}
      <div className="bottom-btn-wrapper">
        {!customClearFilterButton ? (
          <Button
            onClick={onClearAllFiltersCtrl}
            mode="primary"
            className="clear-all-btn"
            disabled={!isSelectedFilters}
          >
            {translateV2('button.CLEAR_FILTER')}
          </Button>
        ) : (
          <>{customClearFilterButton}</>
        )}
        <Button
          onClick={() => menuContext.toggleCategoryFilterModal(false)}
          mode="primary"
          filled
          disabled={filterLoading}
          className="view-btn"
        >
          {translateV2('button.VIEW')}
          {' '}
          {totalItems}
        </Button>
      </div>
    </SideBarView>
  );
};

SideBarFilterView.propTypes = {
  title: PropTypes.string,
  filter: PropTypes.element,
  onClearAllFiltersCtrl: PropTypes.func,
  filterSettingsConfig: PropTypes.object,
  customClearFilterButton: PropTypes.element,
  totalItems: PropTypes.number,
  selectedFilters: PropTypes.object,
  filterLoading: PropTypes.bool,
};

export const SideBarFilterViewWrapper = withDependencySupport(BaseSideBarFilterViewWrapper, 'SideBarFilterViewWrapper');
