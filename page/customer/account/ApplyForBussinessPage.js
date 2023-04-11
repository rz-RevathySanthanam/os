import React from 'react';
import { SEOHead } from '@/roanuz/document';
import styled from 'styled-components';

import { StoreConfigConsumer } from '@/roanuz/store/core/context';
import { ApplyForBussinessController } from '@/roanuz/controller/customer/applyForBussiness';
import { translateV2 } from '@/roanuz/lib/utils';

const ApplyForBussinessPageWrapper = styled.div`
`;

const ApplyForBussinessPage = () => {
  return (
    <StoreConfigConsumer>
      {() => (
        <ApplyForBussinessPageWrapper>
          <SEOHead
            title={translateV2('labelAndTitle.APPLY_FOR_ENTERPRISE_ACCESS')}
          />
          <ApplyForBussinessController />
        </ApplyForBussinessPageWrapper>
      )}
    </StoreConfigConsumer>
  );
};

ApplyForBussinessPage.propTypes = {
};

export default ApplyForBussinessPage;
