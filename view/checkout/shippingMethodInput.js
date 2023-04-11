import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { Text14, DisplayBold20, TextBold14 } from '@/roanuz/typopgraphy';
import { RawHtmlView } from '@/roanuz/view/rawHtml';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { daysContext, translateV2 } from '@/roanuz/lib/utils';
import { FormItem } from '../input';

export const BaseShippingMethodInputWrapper = styled.div`
  margin-bottom: ${asRem(16)};
  padding: ${asRem(16)};
  border: ${asRem(1)} solid var(--color-disabled-3);
  border-radius: ${asRem(6)};
  background-color: var(--color-text-rev);

  &:first-child {
    margin-top: 0;
  }

  .help:not(:empty) {
    margin-top: ${asRem(10)};
    margin-bottom: 0;

    p {
      font-size: ${asRem(14)};
      line-height: ${asRem(20)};
      >strong {
        display: block;
      }
      &+div {
        margin-top: ${asRem(14)};
      }
    }
    >strong {
      padding-bottom: ${asRem(6)};
      display: block;
    }
  }

  .sameday {
    color: var(--color-active);
  }

  .container {
    &, .content-container {
      display: flex;
      align-items: center;
    }

    .content-container {
      width: 100%;
      justify-content: space-between;

      .method-price {
        margin-left: ${asRem(5)};
      }
    }

    >.rz-form-item {
      margin-bottom: 0;
      .type-radio {
        margin-bottom: 0;

        input {
          margin-right: ${asRem(16)};
        }
      }

      label {
        .input-label {
          display: none;
        }
      }
    }
  }
`;

export const BaseShippingMethodInput = ({
  field,
  method,
  saving,
}) => {
  return (
    <ShippingMethodInputWrapper>
      <div className="container">
        <FormItem
          field={field}
          disabled={saving}
        />
        <div className="content-container">
          <div className="method-details">
            <div className="selection">
              <DisplayBold20 className="method-title">{method.method.title}</DisplayBold20>
            </div>
            <div className="help">
              {method.method.deliveryTimeFrom && method.method.deliveryTimeTo && (
                <TextBold14 as="strong">
                  {translateV2('orders.PROCESSING_TIME')}
                  :&nbsp;
                  {daysContext(
                    method.method.deliveryTimeFrom,
                    method.method.deliveryTimeTo,
                  )}
                </TextBold14>
              )}
              {method.method.description && (
                <Text14 className="method-desc">
                  <RawHtmlView html={method.method.description} />
                </Text14>
              )}
            </div>
          </div>
          <DisplayBold20 className="method-price">{method.priceText}</DisplayBold20>
        </div>
      </div>
    </ShippingMethodInputWrapper>
  );
};

BaseShippingMethodInput.propTypes = {
  field: PropTypes.shape(FormItem.propTypes.field),
  method: PropTypes.object.isRequired,
  saving: PropTypes.bool,
};

export const ShippingMethodInput = withDependencySupport(BaseShippingMethodInput, 'ShippingMethodInput');
export const ShippingMethodInputWrapper = withDependencySupport(BaseShippingMethodInputWrapper, 'ShippingMethodInputWrapper');
