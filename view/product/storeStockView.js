import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextBold14, Text14 } from '@/roanuz/typopgraphy';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ReactComponent as CollectIcon } from '@/roanuz/view/imgs/CollectIcon.svg';
import { translateV2 } from '@/roanuz/lib/utils';
import { StoreStockIndicatorView } from './storeStockIndicator';
import { SVGIcon, CircleIcon } from '../icon';

export const BaseStoreStocksViewWrapper = styled.div`
display: flex;
gap: ${asRem(8)};

>section {
  &:last-child {
    margin-bottom: 0;
  }
}
@media screen and (min-width: ${Breakpoint.sm}) {
  >section {
    margin-bottom: ${asRem(34)};
  }
}

.inactive {
  display: flex;
  align-items: center;

  &::before {
    content: "";
    width: 1rem;
    height: 1rem;
    margin-left: ${asRem(-4)};
    // background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguOTM5OTYgOC41MDAwNEwxMS44MDY2IDUuNjQwMDRDMTEuOTMyMiA1LjUxNDUxIDEyLjAwMjcgNS4zNDQyNCAxMi4wMDI3IDUuMTY2NzFDMTIuMDAyNyA0Ljk4OTE3IDExLjkzMjIgNC44MTg5MSAxMS44MDY2IDQuNjkzMzhDMTEuNjgxMSA0LjU2Nzg0IDExLjUxMDggNC40OTczMSAxMS4zMzMzIDQuNDk3MzFDMTEuMTU1OCA0LjQ5NzMxIDEwLjk4NTUgNC41Njc4NCAxMC44NiA0LjY5MzM4TDcuOTk5OTYgNy41NjAwNEw1LjEzOTk2IDQuNjkzMzhDNS4wMTQ0MiA0LjU2Nzg0IDQuODQ0MTYgNC40OTczMSA0LjY2NjYzIDQuNDk3MzFDNC40ODkwOSA0LjQ5NzMxIDQuMzE4ODMgNC41Njc4NCA0LjE5MzI5IDQuNjkzMzhDNC4wNjc3NiA0LjgxODkxIDMuOTk3MjMgNC45ODkxNyAzLjk5NzIzIDUuMTY2NzFDMy45OTcyMyA1LjM0NDI0IDQuMDY3NzYgNS41MTQ1MSA0LjE5MzI5IDUuNjQwMDRMNy4wNTk5NiA4LjUwMDA0TDQuMTkzMjkgMTEuMzZDNC4xMzA4MSAxMS40MjIgNC4wODEyMSAxMS40OTU4IDQuMDQ3MzcgMTEuNTc3QzQuMDEzNTIgMTEuNjU4MiAzLjk5NjA5IDExLjc0NTQgMy45OTYwOSAxMS44MzM0QzMuOTk2MDkgMTEuOTIxNCA0LjAxMzUyIDEyLjAwODUgNC4wNDczNyAxMi4wODk4QzQuMDgxMjEgMTIuMTcxIDQuMTMwODEgMTIuMjQ0NyA0LjE5MzI5IDEyLjMwNjdDNC4yNTUyNyAxMi4zNjkyIDQuMzI5IDEyLjQxODggNC40MTAyNCAxMi40NTI2QzQuNDkxNDggMTIuNDg2NSA0LjU3ODYyIDEyLjUwMzkgNC42NjY2MyAxMi41MDM5QzQuNzU0NjMgMTIuNTAzOSA0Ljg0MTc3IDEyLjQ4NjUgNC45MjMwMSAxMi40NTI2QzUuMDA0MjUgMTIuNDE4OCA1LjA3Nzk4IDEyLjM2OTIgNS4xMzk5NiAxMi4zMDY3TDcuOTk5OTYgOS40NDAwNEwxMC44NiAxMi4zMDY3QzEwLjkyMTkgMTIuMzY5MiAxMC45OTU3IDEyLjQxODggMTEuMDc2OSAxMi40NTI2QzExLjE1ODEgMTIuNDg2NSAxMS4yNDUzIDEyLjUwMzkgMTEuMzMzMyAxMi41MDM5QzExLjQyMTMgMTIuNTAzOSAxMS41MDg0IDEyLjQ4NjUgMTEuNTg5NyAxMi40NTI2QzExLjY3MDkgMTIuNDE4OCAxMS43NDQ3IDEyLjM2OTIgMTEuODA2NiAxMi4zMDY3QzExLjg2OTEgMTIuMjQ0NyAxMS45MTg3IDEyLjE3MSAxMS45NTI2IDEyLjA4OThDMTEuOTg2NCAxMi4wMDg1IDEyLjAwMzggMTEuOTIxNCAxMi4wMDM4IDExLjgzMzRDMTIuMDAzOCAxMS43NDU0IDExLjk4NjQgMTEuNjU4MiAxMS45NTI2IDExLjU3N0MxMS45MTg3IDExLjQ5NTggMTEuODY5MSAxMS40MjIgMTEuODA2NiAxMS4zNkw4LjkzOTk2IDguNTAwMDRaIiBmaWxsPSIjRTU0QjRCIi8+Cjwvc3ZnPgo=");
  }

  .rz-svg-icon {
    display: none;
  }
}

.title-container {
  padding-bottom: ${asRem(10)};
  .rz-svg-icon {
    margin-left: ${asRem(10)};
    color: var(--stock-indicatore-color-active);
  }
}
`;

export const BaseStoreStockIndicatorViewList = ({ items }) => {
  return (
    <StoreStockIndicatorView items={items} asList />
  );
};

BaseStoreStockIndicatorViewList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export const StoreStockIndicatorViewGroupWrapper = styled.div`
  >.list {
    display: flex;
    align-items: start;
    &:first-child {
      margin-bottom: ${asRem(10)};
    }
    p {
      font-size: ${asRem(14)};
    }
    .active-icon, .inactive-icon {
      white-space: nowrap;
      display: flex;
      align-items: center;
      margin-right: ${asRem(5)};
      
      &::before {
        display: inline-block;
        content: "";
        width: ${asRem(16)};
        height: ${asRem(16)};
        margin-left: ${asRem(-2)};
        margin-right: ${asRem(3)};
      }
    }
    .inactive-icon ::before {
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguOTM5OTYgOC41MDAwNEwxMS44MDY2IDUuNjQwMDRDMTEuOTMyMiA1LjUxNDUxIDEyLjAwMjcgNS4zNDQyNCAxMi4wMDI3IDUuMTY2NzFDMTIuMDAyNyA0Ljk4OTE3IDExLjkzMjIgNC44MTg5MSAxMS44MDY2IDQuNjkzMzhDMTEuNjgxMSA0LjU2Nzg0IDExLjUxMDggNC40OTczMSAxMS4zMzMzIDQuNDk3MzFDMTEuMTU1OCA0LjQ5NzMxIDEwLjk4NTUgNC41Njc4NCAxMC44NiA0LjY5MzM4TDcuOTk5OTYgNy41NjAwNEw1LjEzOTk2IDQuNjkzMzhDNS4wMTQ0MiA0LjU2Nzg0IDQuODQ0MTYgNC40OTczMSA0LjY2NjYzIDQuNDk3MzFDNC40ODkwOSA0LjQ5NzMxIDQuMzE4ODMgNC41Njc4NCA0LjE5MzI5IDQuNjkzMzhDNC4wNjc3NiA0LjgxODkxIDMuOTk3MjMgNC45ODkxNyAzLjk5NzIzIDUuMTY2NzFDMy45OTcyMyA1LjM0NDI0IDQuMDY3NzYgNS41MTQ1MSA0LjE5MzI5IDUuNjQwMDRMNy4wNTk5NiA4LjUwMDA0TDQuMTkzMjkgMTEuMzZDNC4xMzA4MSAxMS40MjIgNC4wODEyMSAxMS40OTU4IDQuMDQ3MzcgMTEuNTc3QzQuMDEzNTIgMTEuNjU4MiAzLjk5NjA5IDExLjc0NTQgMy45OTYwOSAxMS44MzM0QzMuOTk2MDkgMTEuOTIxNCA0LjAxMzUyIDEyLjAwODUgNC4wNDczNyAxMi4wODk4QzQuMDgxMjEgMTIuMTcxIDQuMTMwODEgMTIuMjQ0NyA0LjE5MzI5IDEyLjMwNjdDNC4yNTUyNyAxMi4zNjkyIDQuMzI5IDEyLjQxODggNC40MTAyNCAxMi40NTI2QzQuNDkxNDggMTIuNDg2NSA0LjU3ODYyIDEyLjUwMzkgNC42NjY2MyAxMi41MDM5QzQuNzU0NjMgMTIuNTAzOSA0Ljg0MTc3IDEyLjQ4NjUgNC45MjMwMSAxMi40NTI2QzUuMDA0MjUgMTIuNDE4OCA1LjA3Nzk4IDEyLjM2OTIgNS4xMzk5NiAxMi4zMDY3TDcuOTk5OTYgOS40NDAwNEwxMC44NiAxMi4zMDY3QzEwLjkyMTkgMTIuMzY5MiAxMC45OTU3IDEyLjQxODggMTEuMDc2OSAxMi40NTI2QzExLjE1ODEgMTIuNDg2NSAxMS4yNDUzIDEyLjUwMzkgMTEuMzMzMyAxMi41MDM5QzExLjQyMTMgMTIuNTAzOSAxMS41MDg0IDEyLjQ4NjUgMTEuNTg5NyAxMi40NTI2QzExLjY3MDkgMTIuNDE4OCAxMS43NDQ3IDEyLjM2OTIgMTEuODA2NiAxMi4zMDY3QzExLjg2OTEgMTIuMjQ0NyAxMS45MTg3IDEyLjE3MSAxMS45NTI2IDEyLjA4OThDMTEuOTg2NCAxMi4wMDg1IDEyLjAwMzggMTEuOTIxNCAxMi4wMDM4IDExLjgzMzRDMTIuMDAzOCAxMS43NDU0IDExLjk4NjQgMTEuNjU4MiAxMS45NTI2IDExLjU3N0MxMS45MTg3IDExLjQ5NTggMTEuODY5MSAxMS40MjIgMTEuODA2NiAxMS4zNkw4LjkzOTk2IDguNTAwMDRaIiBmaWxsPSIjRTU0QjRCIi8+Cjwvc3ZnPgo=");
    }
    .active-icon ::before {
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjQ3MzUgNS4zMDY3QzEyLjQxMTUgNS4yNDQyMSAxMi4zMzc4IDUuMTk0NjEgMTIuMjU2NSA1LjE2MDc3QzEyLjE3NTMgNS4xMjY5MiAxMi4wODgxIDUuMTA5NSAxMi4wMDAxIDUuMTA5NUMxMS45MTIxIDUuMTA5NSAxMS44MjUgNS4xMjY5MiAxMS43NDM3IDUuMTYwNzdDMTEuNjYyNSA1LjE5NDYxIDExLjU4ODggNS4yNDQyMSAxMS41MjY4IDUuMzA2N0w2LjU2MDEzIDEwLjI4TDQuNDczNDYgOC4xODY3QzQuNDA5MTEgOC4xMjQ1NCA0LjMzMzE1IDguMDc1NjYgNC4yNDk5MiA4LjA0Mjg2QzQuMTY2NjggOC4wMTAwNiA0LjA3NzggNy45OTM5NyAzLjk4ODM0IDcuOTk1NTJDMy44OTg4OSA3Ljk5NzA2IDMuODEwNjIgOC4wMTYyMiAzLjcyODU3IDguMDUxODhDMy42NDY1MSA4LjA4NzU0IDMuNTcyMjkgOC4xMzkwMiAzLjUxMDEzIDguMjAzMzZDMy40NDc5NyA4LjI2NzcxIDMuMzk5MDkgOC4zNDM2NyAzLjM2NjI5IDguNDI2OTFDMy4zMzM0OSA4LjUxMDE0IDMuMzE3NCA4LjU5OTAzIDMuMzE4OTUgOC42ODg0OEMzLjMyMDUgOC43Nzc5MyAzLjMzOTY1IDguODY2MjEgMy4zNzUzMSA4Ljk0ODI2QzMuNDEwOTcgOS4wMzAzMSAzLjQ2MjQ1IDkuMTA0NTQgMy41MjY4IDkuMTY2N0w2LjA4NjggMTEuNzI2N0M2LjE0ODc3IDExLjc4OTIgNi4yMjI1MSAxMS44Mzg4IDYuMzAzNzQgMTEuODcyNkM2LjM4NDk4IDExLjkwNjUgNi40NzIxMiAxMS45MjM5IDYuNTYwMTMgMTEuOTIzOUM2LjY0ODE0IDExLjkyMzkgNi43MzUyNyAxMS45MDY1IDYuODE2NTEgMTEuODcyNkM2Ljg5Nzc1IDExLjgzODggNi45NzE0OSAxMS43ODkyIDcuMDMzNDYgMTEuNzI2N0wxMi40NzM1IDYuMjg2N0MxMi41NDExIDYuMjI0MjcgMTIuNTk1MSA2LjE0ODUgMTIuNjMyMSA2LjA2NDE3QzEyLjY2OSA1Ljk3OTgzIDEyLjY4ODEgNS44ODg3NiAxMi42ODgxIDUuNzk2N0MxMi42ODgxIDUuNzA0NjMgMTIuNjY5IDUuNjEzNTYgMTIuNjMyMSA1LjUyOTIzQzEyLjU5NTEgNS40NDQ4OSAxMi41NDExIDUuMzY5MTIgMTIuNDczNSA1LjMwNjdaIiBmaWxsPSIjMTdBNTU1Ii8+Cjwvc3ZnPgo=");
    }
  }
`;

export const BaseStoreStockIndicatorViewGroup = ({ items }) => {
  // Since we know only 1 item exists inside items if it is Væntanleg or Sérpöntun.
  // And which don't have kind in it. so considering firstItem.
  const firstItem = items[0];
  if (!firstItem.kind) {
    return (
      <StoreStockIndicatorViewList items={items} asList />
    );
  }
  const availableStock = [];
  const noStock = [];
  items.map((item) => {
    if (item.status === 'yes') {
      availableStock.push(item.name);
    }
    if (item.status === 'no') {
      noStock.push(item.name);
    }
    return null;
  });
  return (
    <StoreStockIndicatorViewGroupWrapper>
      {availableStock.length >= 1 && (
        <div className="list">
          <TextBold14 className="active-icon">
            {translateV2('delivery.IN_STOCK')}
            :
          </TextBold14>
          <Text14>{availableStock.join(', ')}</Text14>
        </div>
      )}
      {noStock.length >= 1 && (
        <div className="list">
          <TextBold14 className="inactive-icon">
            {translateV2('delivery.OUT_OF_STOCK')}
            :
          </TextBold14>
          <Text14>{noStock.join(', ')}</Text14>
        </div>
      )}
    </StoreStockIndicatorViewGroupWrapper>
  );
};

BaseStoreStockIndicatorViewGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
export const StoreStockIndicatorViewGroup = withDependencySupport(BaseStoreStockIndicatorViewGroup, 'StoreStockIndicatorViewGroup');

export const StoreStocksView = ({
  storesList,
}) => {
  if (!storesList || (storesList && !storesList.length)) {
    return null;
  }

  return (
    <StoreStocksViewWrapper>
      <div>
        <SVGIcon heightPx={20}>
          <CollectIcon />
        </SVGIcon>
      </div>
      <div>
        {storesList && storesList.length > 0 && (
          <section>
            <div className="title-container">
              <TextBold14 as="strong">{translateV2('delivery.AVAILABLE_IN_STORES_TITLE')}</TextBold14>
              <CircleIcon heightPx={8} />
            </div>
            <StoreStockIndicatorViewGroup items={storesList} />
          </section>
        )}
      </div>

      {/* {showPieceStores && showPieceStores.length > 0 && (
        <section className="show-piece-container">
          <TextBold14 as="strong">Sýningareintök</TextBold14>
          {showPieceStores.map((storeName, i) => (
            <TextMedium14 key={i}>{storeName.label}</TextMedium14>
          ))}
        </section>
      )} */}

    </StoreStocksViewWrapper>
  );
};

StoreStocksView.propTypes = {
  storesList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    yes: PropTypes.bool,
    isAvailable: PropTypes.bool,
  })),
  // showPieceStores: PropTypes.arrayOf(PropTypes.object),
};

export const StoreStocksViewWrapper = withDependencySupport(BaseStoreStocksViewWrapper, 'StoreStocksViewWrapper');

export const StoreStockIndicatorViewList = withDependencySupport(BaseStoreStockIndicatorViewList, 'StoreStockIndicatorViewList');
