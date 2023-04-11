import React from 'react';
import { SEOHead } from '@/roanuz/document';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { EditAccountController } from '@/roanuz/controller/customer/editAccount';
import { EditPasswordController } from '@/roanuz/controller/customer/changePassword';
import { NewsLetterSwitchController } from '@/roanuz/controller/customer/newsLetterSwitch';
import { DisplayBold24 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { NavigationSlugs } from '@/roanuz/controller/customer/types';
import { MyPagesBreadCrumbs } from '@/roanuz/view/myPagesBreadCrumbs';
import { MyPagesController } from '@/roanuz/controller/customer/myPages';
import { translateV2 } from '@/roanuz/lib/utils';

export const BaseMiniCardWrapper = styled.div`
  margin-bottom: ${asRem(70)};
  .account-page-subtitle {
    padding-bottom: ${asRem(24)};
    margin-bottom: ${asRem(24)};
    border-bottom: ${asRem(1)} solid var(--color-inner-border);
  }
`;

const EditAccountPage = () => {
  const title = translateV2('myPages.ACCOUNT');
  return (
    <>
      <SEOHead
        title={title}
      />
      <MyPagesController
        title={title}
        breadCrumbs={(
          <MyPagesBreadCrumbs title={title} />
        )}
        activeSlug={NavigationSlugs.EditAccount}
        content={(
          <>
            <MiniCardWrapper>
              <DisplayBold24 className="account-page-subtitle">{translateV2('myPages.PERSONAL_INFORMATION')}</DisplayBold24>
              <EditAccountController />
            </MiniCardWrapper>

            <MiniCardWrapper>
              <DisplayBold24 className="account-page-subtitle">{translateV2('myPages.PASSWORD')}</DisplayBold24>
              <EditPasswordController />
            </MiniCardWrapper>

            <MiniCardWrapper>
              <DisplayBold24 className="account-page-subtitle">{translateV2('myPages.NEWSLETTERS')}</DisplayBold24>
              <NewsLetterSwitchController />
            </MiniCardWrapper>
          </>
        )}
      />
    </>
  );
};

EditAccountPage.propTypes = {
};

export default EditAccountPage;

export const MiniCardWrapper = withDependencySupport(BaseMiniCardWrapper, 'MiniCardWrapper');
