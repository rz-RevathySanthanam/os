import React from 'react';
import { SEOHead } from '@/roanuz/document';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { StoreConfigConsumer } from '@/roanuz/store/core/context';
import { ResetPasswordController } from '@/roanuz/controller/customer/resetPassword';
import { translateV2 } from '@/roanuz/lib/utils';

const ResetPasswordPageWrapper = styled.div`
`;

const ResetPasswordPage = ({ isB2BUser }) => {
  return (
    <StoreConfigConsumer>
      {() => (
        <ResetPasswordPageWrapper>
          <SEOHead
            title={isB2BUser ? translateV2('labelAndTitle.RESET_PASSWORD') : translateV2('labelAndTitle.FORGET_PASSWORD')}
          />
          <div className="rz-section-content">
            <ResetPasswordController isB2BUser={isB2BUser} />
          </div>
        </ResetPasswordPageWrapper>
      )}
    </StoreConfigConsumer>
  );
};

ResetPasswordPage.propTypes = {
  isB2BUser: PropTypes.bool,
};

export default ResetPasswordPage;
