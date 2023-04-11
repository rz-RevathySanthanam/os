import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import {
  TextBold14,
  Text14,
} from '@/roanuz/typopgraphy';
import { ReactComponent as DeliveryIcon } from '@/roanuz/view/imgs/TruckIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { UserContext } from '@/roanuz/store/core/context';
import { translateV2 } from '@/roanuz/lib/utils';
import { SVGIcon, CircleIcon } from '../icon';

export const BaseDeliveryPickupViewWrapper = styled.div`
  display: flex;
  gap: ${asRem(8)};

  strong {
    font-weight: 700;
  }
  p {
    margin-bottom: ${asRem(13)};
  }

  >.option-title {
    display: block;
    strong {
      display: block;
    }
  }
  .sameday {
    color: var(--color-active);
    font-weight: 700;
  }

  >.delivery-line {
    margin-bottom: ${asRem(10)};
    display: flex;
    align-items: center;
    align-content: center;
    >span {
      display: block;
    }
    >.rz-svg-icon {
      width: ${asRem(26)};
    }
  }

  .home-delivery-section {
    font-weight: 600;
  }

  .title-container {
    padding-bottom: ${asRem(10)};
    .rz-svg-icon {
      margin-left: ${asRem(10)};
      color: var(--stock-indicatore-color-active);
    }
  }

  .view-container {
    a {
      text-decoration: underline;
    }
  }
`;

export const daysContext = (min, max) => {
  const minV = parseInt(min, 10);
  const maxV = parseInt(max, 10);
  if ((Number.isNaN(minV) || Number.isNaN(maxV))) {
    return '-'; // This case won't come i guess.
  }
  return (
    <>
      {minV === 0 && maxV === 0 && (
        <span className="sameday">{translateV2('delivery.SAME_DAY')}</span>
      )}
      {((minV !== 0 || maxV !== 0) && (
        <span>
          {minV}

          {minV !== maxV
            && (
            <span>
              -
              {maxV}
            </span>
            )}
            {' '}
          {translateV2(`${(minV > 1 || maxV > 1) ? 'delivery.DAYS' : 'delivery.DAY'}`)}
        </span>
      ))}
    </>
  );
};

export const DeliveryPickupView = ({
  deliveryPickupTimes,
  loading,
}) => {
  const userContext = useContext(UserContext);
  if (loading) {
    return <Text14>{translateV2('loadingMsg.LOADING')}</Text14>;
  }
  return (
    <DeliveryPickupViewWrapper className="rz-delivery-pickup-view">
      <div>
        <SVGIcon heightPx={20}>
          <DeliveryIcon />
        </SVGIcon>
      </div>
      <div>
        <div className="title-container">
          <TextBold14 as="strong">
            {translateV2('delivery.PICKUP_AND_DELIVERY_TITLE')}
          </TextBold14>
          <CircleIcon heightPx={8} />
        </div>
        {deliveryPickupTimes && deliveryPickupTimes.assembly_time > 0 && (
          <Text14 as="p" className="delivery-line">
            <span>
              {translateV2('delivery.COMPILATION_TIME')}
              &nbsp;
            </span>
            <span>
              {deliveryPickupTimes.assembly_time}
              {translateV2(`${deliveryPickupTimes.assembly_time > 1 ? 'delivery.WORKING_DAYS' : 'delivery.WORKING_DAY'}`)}
            </span>
          </Text14>
        )}
        {deliveryPickupTimes && deliveryPickupTimes.delivery_time && (
          <Text14 as="p" className="delivery-line home-delivery-section">
            <span>
              {translateV2('delivery.HOME_DELIVERY')}
              &nbsp;
            </span>
            {
              daysContext(
                deliveryPickupTimes.delivery_time.min,
                deliveryPickupTimes.delivery_time.max,
              )
            }
          </Text14>
        )}
        {deliveryPickupTimes && deliveryPickupTimes.pickup_time && (
          <Text14 as="p" className="delivery-line">
            <span>Sækja&nbsp;</span>
            {
              daysContext(
                deliveryPickupTimes.pickup_time.min,
                deliveryPickupTimes.pickup_time.max,
              )
            }
          </Text14>
        )}
        {!userContext.token && (
          <Text14 as="p" className="view-container">
            <Link href="/customer/account/login/" prefetch={false}>
              <a alt="Login" className="plain">
                {translateV2('delivery.ENTER_POSTCODE')}
              </a>
            </Link>
          </Text14>
        )}
      </div>
    </DeliveryPickupViewWrapper>
  );
};

DeliveryPickupView.propTypes = {
  deliveryPickupTimes: PropTypes.object,
  loading: PropTypes.bool,
};

export const DeliveryPickupViewWrapper = withDependencySupport(BaseDeliveryPickupViewWrapper, 'DeliveryPickupViewWrapper');
