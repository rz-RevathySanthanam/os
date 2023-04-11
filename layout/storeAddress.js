import React from 'react';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { TextMedium16Anchor } from '@/roanuz/typopgraphy';
import { SVGIcon } from '@/roanuz/view/icon';
import { ReactComponent as RightArrow } from '@/roanuz/view/imgs/RightArrow.svg';

export const BaseStoreAddressLayout = ({
  storeTitle,
  storeAddress,
  storeLocation,
  storeTelephone,
  storeTiming,
}) => {
  return (
    <>
      {storeTitle && (
        <div className="store-title">
          {storeTitle}
        </div>
      )}
      {storeAddress && (
        <div className="store-address">
          {storeAddress}
        </div>
      )}
      {storeTelephone && (
        <div className="store-contact">
          {storeTelephone}
        </div>
      )}
      {storeLocation && (
        <div className="store-mapLocation">
          <TextMedium16Anchor
            target="_blank"
            href={storeLocation}
            className="link blue"
            title="Get directions"
          >
            Sýna leið
            <span className="direction-arrow">
              <SVGIcon
                heightPx={10}
              >
                <RightArrow />
              </SVGIcon>
            </span>
          </TextMedium16Anchor>
        </div>
      )}
      {storeTiming && (
        <div className="opening-hours">
          {storeTiming}
        </div>
      )}
    </>
  );
};

BaseStoreAddressLayout.propTypes = {
  storeTitle: PropTypes.element,
  storeAddress: PropTypes.element,
  storeLocation: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  storeTelephone: PropTypes.element,
  storeTiming: PropTypes.element,
};

export const StoreAddressLayout = withDependencySupport(BaseStoreAddressLayout, 'StoreAddressLayout');
