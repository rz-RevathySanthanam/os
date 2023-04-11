import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Row, Col, StyledCheckbox } from '@/roanuz/layout';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseBillingAddressEnableOptionWrapper = styled.div`
  padding: ${asRem(8)} ${asRem(16)};
  padding-left: 0;
  cursor: pointer;

  .billing-address-wrapper {
    margin: ${asRem(10)} 0 ${asRem(20)};
    gap: ${asRem(30)};
  }

  .billing-address-desc {
    margin-top: ${asRem(10)};
  }

  .input {
    display: flex;
    align-items: center;
    gap: ${asRem(8)};
  
    input {
      &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }
    }

    .rz-custom-checkbox {
      display: flex;
      align-items: center;
    }
  }
`;

export const BaseBillingAddressEnableOption = ({
  billingIsSameAsShipping,
  setBillingIsSameAsShipping,
}) => {
  return (
    <BillingAddressEnableOptionWrapper>
      <Row className="billing-address-wrapper">
        <Col>
          <div className="input">
            <StyledCheckbox>
              <input
                type="checkbox"
                name="switch"
                checked={billingIsSameAsShipping}
                onChange={(event) => {
                  setBillingIsSameAsShipping(event.target.checked);
                }}
              />
            </StyledCheckbox>
            <label className="input-label">{translateV2('orders.SAME_BILLING_ADDRESS_AND_SHIPPING_ADDRESS')}</label>
          </div>
        </Col>
      </Row>
    </BillingAddressEnableOptionWrapper>
  );
};

BaseBillingAddressEnableOption.propTypes = {
  billingIsSameAsShipping: PropTypes.bool,
  setBillingIsSameAsShipping: PropTypes.func,
};

export const BillingAddressEnableOption = withDependencySupport(BaseBillingAddressEnableOption, 'BillingAddressEnableOption');
export const BillingAddressEnableOptionWrapper = withDependencySupport(BaseBillingAddressEnableOptionWrapper, 'BillingAddressEnableOptionWrapper');
