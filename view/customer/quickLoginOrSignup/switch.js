import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { Text14 } from '@/roanuz/typopgraphy';
import { Button } from '@/roanuz/view/button';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { ReactComponent as ArrowRight } from '@/roanuz/view/imgs/ArrowRight.svg';

export const BaseAccessTypeSwitchViewWrapper = styled.div`
  display: flex;
  gap: ${asRem(20)};
  .rz-button {
    transition: all 0.2s ease, border 0s;
    svg {
      width: ${asRem(10)};
    }
  }
`;

export const BaseAccessTypeSwitchView = ({
  accessTypes,
  selectedAccessType,
  setSelectedAccessType,
}) => {
  return (
    <AccessTypeSwitchViewWrapper>
      <Button
        mode="primary"
        ariaLabel={translateV2('orders.LOG_IN')}
        icon={selectedAccessType === accessTypes.QuickLogin && <ArrowRight />}
        onClick={() => setSelectedAccessType(accessTypes.QuickLogin)}
        noborder={selectedAccessType !== accessTypes.QuickLogin}
        className={(selectedAccessType === accessTypes.QuickLogin) ? 'active' : ''}
      >
        <Text14 as="span">
          {translateV2('orders.LOG_IN')}
        </Text14>
      </Button>
      <Button
        mode="primary"
        ariaLabel={translateV2('orders.SIGN_UP')}
        icon={selectedAccessType === accessTypes.QuickSignup && <ArrowRight />}
        onClick={() => setSelectedAccessType(accessTypes.QuickSignup)}
        noborder={selectedAccessType !== accessTypes.QuickSignup}
        className={(selectedAccessType === accessTypes.QuickSignup) ? 'active' : ''}
      >
        <Text14 as="span">
          {translateV2('orders.SIGN_UP')}
        </Text14>
      </Button>
    </AccessTypeSwitchViewWrapper>
  );
};

BaseAccessTypeSwitchView.propTypes = {
  accessTypes: PropTypes.object.isRequired,
  selectedAccessType: PropTypes.string.isRequired,
  setSelectedAccessType: PropTypes.func.isRequired,
};

export const AccessTypeSwitchView = withDependencySupport(BaseAccessTypeSwitchView, 'AccessTypeSwitchView');
export const AccessTypeSwitchViewWrapper = withDependencySupport(BaseAccessTypeSwitchViewWrapper, 'AccessTypeSwitchViewWrapper');
