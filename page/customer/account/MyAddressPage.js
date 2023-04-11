import React from 'react';
import { SEOHead } from '@/roanuz/document';
import { MyAddressController } from '@/roanuz/controller/customer/myAddress';
import { NavigationSlugs } from '@/roanuz/controller/customer/types';
import { MyPagesBreadCrumbs } from '@/roanuz/view/myPagesBreadCrumbs';
import { MyPagesController } from '@/roanuz/controller/customer/myPages';
import { translateV2 } from '@/roanuz/lib/utils';

const MyAddressPage = () => {
  const title = translateV2('myPages.ADDRESS');
  return (
    <>
      <SEOHead
        title={title}
      />
      <MyPagesController
        title={title}
        activeSlug={NavigationSlugs.Address}
        breadCrumbs={(
          <MyPagesBreadCrumbs title={title} />
        )}
        content={(
          <MyAddressController />
        )}
      />
    </>
  );
};

MyAddressPage.propTypes = {
};

export default MyAddressPage;
