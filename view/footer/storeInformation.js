/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import PropTypes from 'prop-types';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import {
  Bold,
  TextMedium16,
} from '@/roanuz/typopgraphy';
import { RawHtmlView } from '@/roanuz/view/rawHtml';
import { StoreAddressLayout } from '@/roanuz/layout/storeAddress';
import { StoreInformationData } from './storeInformation.data';
import { NoImageView } from '../image';

/* Possible Modes
Row
Column - default
*/

export const StoreInformationViewStyle = {
  Row: 'Row',
  Column: 'Column',
};

export const BaseStoreInformation = ({
  className,
  mode = StoreInformationViewStyle.Column,
  displayBasedOnSelection = false,
}) => {
  return (
    <StoreInformationView
      stores={StoreInformationData}
      className={className}
      mode={mode}
      displayBasedOnSelection={displayBasedOnSelection}
    />
  );
};

BaseStoreInformation.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
  displayBasedOnSelection: PropTypes.bool,
};

export const StoreInformation = withDependencySupport(BaseStoreInformation, 'StoreInformation');

export const BaseStoreInformationViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${asRem(20)};
  gap: ${asRem(20)};
  ${(p) => p.mode === StoreInformationViewStyle.Row && css`
    flex-direction: row;
    gap: ${asRem(40)};
  `}

  .stores {
    display: flex;
    width: auto;
    overflow-x: auto;
    ${(p) => p.mode === StoreInformationViewStyle.Row && css`
      flex-direction: column;
    `}
  }

  .individual-store {
    text-align: center;
    margin-right: ${asRem(12)};
    img {
      max-width: ${asRem(54)};
      max-height: ${asRem(54)};
      height: 100%;
      object-fit: cover;
    }

    .image-wrapper {
      margin-top: ${asRem(10)};
      border-radius: 50%;
      width: ${asRem(68)};
      height: ${asRem(68)};
      border: ${asRem(2)} solid var(--color-text-rev);
      cursor: pointer;
      transition: all 800ms;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        border-radius: 50%;
      }
      &.active {
        border-color: var(--color-button);
      }
      &:hover {
        border-color: var(--color-button);
      }
    }

  }
`;

export const StoreInformationView = ({
  stores, className, mode, displayBasedOnSelection,
}) => {
  const [storeData, setStoreData] = useState(stores[0]);
  const clickHandler = (store) => {
    setStoreData(store);
  };
  return (
    <StoreInformationViewWrapper
      className={className}
      mode={mode || null}
    >
      <div className="stores">
        {stores
          .slice()
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((store) => (
            displayBasedOnSelection ? (
              <div
                key={store.id}
                className="individual-store"
              >
                <Bold small className="title">
                  {store.name}
                </Bold>
                <div
                  role="presentation"
                  className={`image-wrapper ${store.id === storeData.id ? 'active' : ''}`}
                  onClick={() => clickHandler(store)}
                  onKeyPress={() => clickHandler(store)}
                  onMouseEnter={() => clickHandler(store)}
                >
                  {store.displayImage
                    ? (
                      <img
                        src={store.displayImage.url}
                        alt={`${store.displayImage.alt} Store logo`}
                      />
                    )
                    : <NoImageView />}
                </div>
              </div>
            ) : (
              <StoreAddressView key={store.id} storeData={store} />
            )
          ))}
      </div>
      {displayBasedOnSelection && <StoreAddressView storeData={storeData} />}
    </StoreInformationViewWrapper>
  );
};

StoreInformationView.propTypes = {
  stores: PropTypes.array,
  className: PropTypes.string,
  mode: PropTypes.string,
  displayBasedOnSelection: PropTypes.bool,
};

export const BaseStoreAddressViewWrapper = styled.div`
  min-width: ${asRem(166)};
  padding-bottom: ${asRem(15)};

  @media screen and (min-width: ${Breakpoint.sm}) {  
    min-width: ${asRem(200)};
  }
  strong {
    font-weight: bold;
  }

  h4,
  p,
  a {
    margin-bottom: ${asRem(10)};
  }

  h4 {
    font-family: var(--tg-bold-family);
    font-weight: bold;
    font-size: ${asRem(20)};
    line-height: ${asRem(26)};
  }

  .contact-number {
    display: block;
    color: var(--color-text);
  }

  .direction-arrow {
    padding-left: ${asRem(5)};
  }

  .opening-hours {
    padding: ${asRem(15)} 0;
    h4 {
      font-family: var(--tg-bold-family);
      font-weight: bold;
      font-size: ${asRem(20)};
      line-height: ${asRem(26)};
      margin-bottom: ${asRem(10)};
    }
    // To Remove unwanted <br> tags.
    .rz-magento-html {
      br {
        display: block;
        content: ' ';
        padding-bottom: ${asRem(10)};
      }
    }
  }
`;

export const BaseStoreAddressView = ({
  storeData,
}) => {
  const storeTitle = storeData.addressLine1 && (
    <h4>{storeData.addressLine1}</h4>
  );

  const storeAddress = storeData.addressLine2 && (
    <TextMedium16 as="div">
      {storeData.addressLine2 && (
        <RawHtmlView
          html={storeData.addressLine2 || ''}
        />
      )}
    </TextMedium16>
  );

  const storeTelephone = storeData.telephone && (
    <a href={`tel:${storeData.telephone}`} className="contact-number">
      {storeData.telephone}
    </a>
  );

  const storeTiming = storeData.openHoursDesc && (
    <RawHtmlView
      html={storeData.openHoursDesc || ''}
    />
  );

  return (
    <StoreAddressViewWrapper>
      <StoreAddressLayout
        storeTitle={storeTitle}
        storeAddress={storeAddress}
        storeLocation={storeData.storeMapPoint}
        storeTelephone={storeTelephone}
        storeTiming={storeTiming}
      />
    </StoreAddressViewWrapper>
  );
};

BaseStoreAddressView.propTypes = {
  storeData: PropTypes.object,
};

export const StoreAddressView = withDependencySupport(BaseStoreAddressView, 'StoreAddressView');
export const StoreAddressViewWrapper = withDependencySupport(BaseStoreAddressViewWrapper, 'StoreAddressViewWrapper');
export const StoreInformationViewWrapper = withDependencySupport(BaseStoreInformationViewWrapper, 'StoreInformationViewWrapper');
