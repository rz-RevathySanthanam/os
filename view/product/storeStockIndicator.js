import React from 'react';
import PropTypes from 'prop-types';
import { asRem } from '@/roanuz/lib/css';
import styled, { css } from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ReactComponent as DeliveryIcon } from '@/roanuz/view/imgs/TruckIcon.svg';
import { ReactComponent as CollectIcon } from '@/roanuz/view/imgs/CollectIcon.svg';
import { CircleIcon, SVGIcon } from '../icon';
import { TextMedium14 } from '../../typopgraphy';
import { AvailableStatus } from './models/stock';

export const StoreStockIndicatorItemViewWrapper = styled.li`

  padding-right: ${asRem(14)};
  display: flex;
  align-items: center;
  .rz-svg-icon {
    padding-right: ${asRem(12)};
    position: relative;

    svg {
      position: absolute;
    }
  }

  .active {
    color: var(--stock-indicatore-color-active);
    &.rz-svg-icon {
      color: var(--stock-indicatore-color-active);
    }
  }

  .inactive {
    color: var(--stock-indicatore-color-inactive);
    &.rz-svg-icon {
      color: var(--stock-indicatore-color-inactive);
    }
  }

  .yellow {
    &.rz-svg-icon {
      color: var(--color-indicator);
    }
  }

  .label-text {
    display: flex;
    gap: ${asRem(15)};
    padding-right: ${asRem(10)};
  }

  .icon-view {
    svg {
      fill: var(--color-text-primary);
    }
  }
`;

export const indicatorClass = (status) => {
  switch (status) {
    case AvailableStatus.YES:
      return 'active';
    case AvailableStatus.YELLOW:
      return 'yellow';
    default:
      return 'inactive';
  }
};

export const BaseStoreStockIndicatorItemView = ({ status, name, iconType }) => {
  return (
    <StoreStockIndicatorItemViewWrapper>
      <div className="label-text">
        {iconType && (
          <SVGIcon
            heightPx={16}
            className="icon-view"
          >
            {iconType}
          </SVGIcon>
        )}
        <TextMedium14 as="span">
          {name}
        </TextMedium14>
      </div>
      <CircleIcon heightPx={8} className={indicatorClass(status)} />
    </StoreStockIndicatorItemViewWrapper>
  );
};

BaseStoreStockIndicatorItemView.propTypes = {
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  iconType: PropTypes.element,
};

export const StoreStockIndicatorItemView = withDependencySupport(BaseStoreStockIndicatorItemView, 'StoreStockIndicatorItemView');

export const BaseStoreStockIndicatorViewWrapper = styled.ul`
  display: flex;
  margin-top: ${asRem(10)};
  ${(props) => props.asList && css`
    flex-direction: column;
    li {
      padding-bottom: ${asRem(10)};
    }
  `}
`;

export const StoreStockIndicatorViewWrapper = withDependencySupport(BaseStoreStockIndicatorViewWrapper, 'StoreStockIndicatorViewWrapper');

export const StoreStockIndicatorView = ({ items, asList }) => {
  return (
    <StoreStockIndicatorViewWrapper asList={asList}>
      {items.map((item) => (
        <StoreStockIndicatorItemView
          key={item.name}
          status={item.status}
          name={item.name}
          iconType={item.type && (item.type === 'onWeb' ? <DeliveryIcon /> : <CollectIcon />)}
        />
      ))}
    </StoreStockIndicatorViewWrapper>
  );
};

StoreStockIndicatorView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(StoreStockIndicatorItemView.propTypes)),
  asList: PropTypes.bool,
};
