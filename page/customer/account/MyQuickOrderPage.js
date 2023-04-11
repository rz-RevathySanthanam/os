import React from 'react';
import { SEOHead } from '@/roanuz/document';
import { MyQuickOrderController } from '@/roanuz/controller/customer/myQuickOrder';
import { NavigationSlugs } from '@/roanuz/controller/customer/types';
import { MyPagesBreadCrumbs } from '@/roanuz/view/myPagesBreadCrumbs';
import { MyPagesController } from '@/roanuz/controller/customer/myPages';
import { translateV2 } from '@/roanuz/lib/utils';

const MyQuickOrderPage = () => {
  const title = translateV2('myPages.QUICK_ORDER');
  return (
    <>
      <SEOHead
        title={title}
      />
      <MyPagesController
        title={title}
        activeSlug={NavigationSlugs.QuickOrder}
        breadCrumbs={(
          <MyPagesBreadCrumbs title={title} />
        )}
        content={(
          <MyQuickOrderController />
        )}
      />
    </>
  );
};

MyQuickOrderPage.propTypes = {
};

export default MyQuickOrderPage;
