import React from 'react';
import { SEOHead } from '@/roanuz/document';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { StoreConfigConsumer } from '@/roanuz/store/core/context';
import { LoginAccountController } from '@/roanuz/controller/customer/loginAccount';
import ContainerWidgets from '@/roanuz/widgets/ContainerWidgets';
import { filterLoginWidgets } from '@/roanuz/store/layout/widget';
import { LayoutContainer } from '@/roanuz/store/layout/layout';

const LoginAccountPageWrapper = styled.div`
`;

const LoginAccountPage = ({ widgets }) => {
  const pageWidgets = filterLoginWidgets({ widgets });

  return (
    <StoreConfigConsumer>
      {() => (
        <LoginAccountPageWrapper>
          <SEOHead
            title="Login"
          />
          <div className="rz-section-content">
            <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentTop} />
            <div>
              <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.Content} />
            </div>
            <LoginAccountController />
            <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentBottom} />
          </div>
        </LoginAccountPageWrapper>
      )}
    </StoreConfigConsumer>
  );
};

LoginAccountPage.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.object),
};

export default LoginAccountPage;
