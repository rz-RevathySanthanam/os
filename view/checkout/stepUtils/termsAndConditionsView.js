import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Config from '@/config';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { FormItem } from '../../input';

export const TAndCViewWrapper = styled.div`
  .terms-container {
    display: flex;
    align-items: center;
    margin-bottom: ${asRem(20)};
    
    >.rz-form-item {
      margin: 0;

      >.rz-form-field {
        padding: 0;
        margin: 0;
      }
    }
  }
`;

export const BaseTAndCView = ({
  isGuestUser,
  fields,
}) => {
  return (
    <TAndCViewWrapper>
      {isGuestUser && fields.termsAndConditions && (
        <div className="terms-container">
          <FormItem field={fields.termsAndConditions} />
          I accept the&nbsp;
          <a href={Config.TermsAndConditionsLink} target="_blank" rel="noreferrer">
            terms and conditions
          </a>
          .
        </div>
      )}
    </TAndCViewWrapper>
  );
};

BaseTAndCView.propTypes = {
  isGuestUser: PropTypes.bool,
  fields: PropTypes.object,
};

export const TAndCView = withDependencySupport(BaseTAndCView, 'TAndCView');
