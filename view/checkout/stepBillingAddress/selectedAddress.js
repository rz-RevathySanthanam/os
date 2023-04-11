import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { AddressDisplayCard } from '@/roanuz/view/customer/addressDisplayCard';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ReactComponent as PencilIcon } from '@/roanuz/view/imgs/PencilIcon.svg';
import { Button } from '../../button';

export const BaseSelectedBillingAddressWrapper = styled.div`
  padding-bottom: ${asRem(20)};
  margin-top: ${asRem(38)};
  .container-heading {
    margin-bottom: ${asRem(10)};
    padding-bottom: ${asRem(10)};
    border-bottom: ${asRem(1)} solid var(--color-disabled-3);
  }
  .value {
    .rz-svg-icon {
      height: ${asRem(16)};
    }
  }
  
`;

export const SelectedBillingAddress = ({
  billingAddress, onEdit,
}) => {
  return (
    <SelectedBillingAddressWrapper>
      <AddressDisplayCard
        title="Greiðandi"
        address={billingAddress}
        actionButtons={(
          <div className="value">
            <Button
              icon={<PencilIcon />}
              mode="primary"
              noborder
              nomargin
              onClick={() => onEdit()}
              ariaLabel="Breyta"
            >
              Breyta
            </Button>
          </div>
        )}
      />
    </SelectedBillingAddressWrapper>
  );
};

SelectedBillingAddress.propTypes = {
  billingAddress: PropTypes.object,
  onEdit: PropTypes.func,
};

export const SelectedBillingAddressWrapper = withDependencySupport(BaseSelectedBillingAddressWrapper, 'SelectedBillingAddressWrapper');
