import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Text16,
  Bold16,
  TextMedium14,
} from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { StatusIndicator } from '@/roanuz/components/statusIndicator';
import { translateV2 } from '@/roanuz/lib/utils';
import { Button } from '../button';

export const BaseDetailsWrapper = styled.div`
  .details-card {
    margin: 0 0 ${asRem(24)};
  }
  .status {
    display: flex;
    align-items: center;
    gap: ${asRem(10)};
  }
`;

export const MyAccountDetails = ({
  customerData,
  onEdit,
}) => {
  return (
    <DetailsWrapper>
      <div className="details-card">
        <Bold16 className="detail-username">
          {customerData.firstname}
          &nbsp;
          {customerData.lastname}
        </Bold16>
        <Text16 className="detail-useremail">{customerData.email}</Text16>
      </div>
      <Button
        mode="primary"
        alt={translateV2('button.EDIT')}
        href={{}}
        ariaLabel={translateV2('button.EDIT')}
        onClick={onEdit}
      >
        {translateV2('button.EDIT')}
      </Button>
    </DetailsWrapper>
  );
};

MyAccountDetails.propTypes = {
  customerData: PropTypes.object,
  onEdit: PropTypes.func,
};

export const MyPasswordDetails = ({
  onEdit,
}) => {
  return (
    <DetailsWrapper>
      <div className="details-card">
        <Text16>
          •••••••••••••
        </Text16>
      </div>
      <Button
        mode="primary"
        alt={translateV2('button.EDIT')}
        href={{}}
        ariaLabel={translateV2('button.EDIT')}
        onClick={onEdit}
      >
        {translateV2('button.EDIT')}
      </Button>
    </DetailsWrapper>
  );
};

MyPasswordDetails.propTypes = {
  onEdit: PropTypes.func,
};

export const indicatorColor = (cData) => {
  let color = '--color-newsletter-indicator-unsubscribed';
  if (cData.is_subscribed) {
    color = '--color-newsletter-indicator-subscribed';
  }
  return color;
};

export const NewsLetterStatusIndicator = ({
  customerData,
}) => {
  return (
    <DetailsWrapper>
      <div className="details-card">
        <div className="status">
          <StatusIndicator color={indicatorColor(customerData)} />
          <TextMedium14 className="detail-status">{customerData.is_subscribed ? translateV2('myPages.SUBSCRIBED') : translateV2('myPages.UN_SUBSCRIBED') }</TextMedium14>
        </div>
      </div>
    </DetailsWrapper>
  );
};

NewsLetterStatusIndicator.propTypes = {
  customerData: PropTypes.object,
};

export const DetailsWrapper = withDependencySupport(BaseDetailsWrapper, 'DetailsWrapper');
