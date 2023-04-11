import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

import { DisplayBold20 } from '@/roanuz/typopgraphy';
import { Button } from '../button';

export const BaseStepActionViewWrapper = styled.div`
  .form-next-step {
    margin-top: ${asRem(32)};
    text-align: right;
  }
`;

export const ShipmentActionView = ({
  saving,
  saveError,
  scrollViewTop,
  buttonLabel,
  validationRule,
}) => {
  return (
    <StepActionViewWrapper>
      <div className="error-message">
        {saveError && (
          <div>
            Villa:
            {saveError.message}
          </div>
        )}
      </div>
      <div className="form-next-step">
        <Button
          disabled={saving || validationRule}
          type="submit"
          large
          filled
          onClick={() => scrollViewTop()}
          ariaLabel={buttonLabel || 'Næsta skref'}
          fullWidthBtn
        >
          <DisplayBold20>{buttonLabel || 'Næsta skref'}</DisplayBold20>
        </Button>
      </div>
    </StepActionViewWrapper>
  );
};

ShipmentActionView.propTypes = {
  saving: PropTypes.bool,
  saveError: PropTypes.object,
  scrollViewTop: PropTypes.func,
  buttonLabel: PropTypes.string,
  validationRule: PropTypes.bool,
};

export const StepActionViewWrapper = withDependencySupport(BaseStepActionViewWrapper, 'StepActionViewWrapper');
