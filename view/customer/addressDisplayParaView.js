import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from '@/roanuz/layout';
import { TextMedium16, TextBold16 } from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseParagraphDisplayViewWrapper = styled.div`
  .columns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    >.label {
      padding-right: ${asRem(10)};
    }
  }
`;

export const ParagraphDisplayView = ({ title, data, actionButtons }) => {
  return (
    <ParagraphDisplayViewWrapper>
      <Row alignCenter spaceBetween>
        <Col className="columns">
          <TextBold16 className="label">{title}</TextBold16>
          <TextMedium16 className="content">
            {data.firstname && (
              <span>
                {data.firstname}
                {' '}
                {data.lastname && data.lastname !== '-' && data.lastname}
                {', '}
              </span>
            )}
            {data.street && (
              <span>
                {data.street}
                {', '}
              </span>
            )}
            {data.postcode && (
              <span>
                {data.postcode}
                {', '}
              </span>
            )}
            {data.city && (
              <span>
                {data.city}
              </span>
            )}
            {data.shippingChargeText && (
              <span>
                {data.shippingChargeText}
                {', '}
              </span>
            )}
            {data.shippingMethod && (
              <span>
                {data.shippingMethod.title}
              </span>
            )}
            {data.deliveryInfo && (
              <span>
                {data.deliveryInfo}
              </span>
            )}
          </TextMedium16>
        </Col>
        <Col className="action-btn">
          {actionButtons && (
            <div className="actions">
              {actionButtons}
            </div>
          )}
        </Col>
      </Row>
    </ParagraphDisplayViewWrapper>
  );
};

ParagraphDisplayView.propTypes = {
  data: PropTypes.object.isRequired,
  actionButtons: PropTypes.object,
  title: PropTypes.string,
};

export const ParagraphDisplayViewWrapper = withDependencySupport(BaseParagraphDisplayViewWrapper, 'ParagraphDisplayViewWrapper');
