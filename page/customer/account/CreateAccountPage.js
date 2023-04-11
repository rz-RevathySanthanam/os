import React from 'react';
import { SEOHead } from '@/roanuz/document';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { StoreConfigConsumer } from '@/roanuz/store/core/context';
import { CreateAccountController } from '@/roanuz/controller/customer/createAccount';
import ContainerWidgets from '@/roanuz/widgets/ContainerWidgets';
import { filterRegisterWidgets } from '@/roanuz/store/layout/widget';
import { LayoutContainer } from '@/roanuz/store/layout/layout';
import { translateV2 } from '@/roanuz/lib/utils';

const CreateAccountPageWrapper = styled.div`
`;

const CreateAccountPage = ({ widgets }) => {
  const pageWidgets = filterRegisterWidgets({ widgets });

  return (
    <StoreConfigConsumer>
      {() => (
        <CreateAccountPageWrapper>
          <SEOHead
            title={translateV2('myPages.CREATE_ACCESS')}
          />
          <div>
            <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentTop} />
            <div>
              <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.Content} />
            </div>
            <CreateAccountController />
            <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentBottom} />
          </div>
        </CreateAccountPageWrapper>
      )}
    </StoreConfigConsumer>
  );
};

CreateAccountPage.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.object),
};

export default CreateAccountPage;
