import React, { useEffect, useState } from 'react';
import { SEOHead } from '@/roanuz/document';
import { useRouter } from 'next/router';
import { MyOrdersController } from '@/roanuz/controller/customer/myOrders';
import { NavigationSlugs } from '@/roanuz/controller/customer/types';
import { MyPagesBreadCrumbs } from '@/roanuz/view/myPagesBreadCrumbs';
import { MyPagesController } from '@/roanuz/controller/customer/myPages';
import { translateV2 } from '@/roanuz/lib/utils';

const MyOrdersPage = () => {
  const router = useRouter();
  const { query } = router;
  const title = translateV2('myPages.ORDERS');
  const [orderNumber, setOrderNumber] = useState(query.id);

  useEffect(() => {
    const isParams = window.location.search;
    if (!isParams) {
      setOrderNumber();
    }
  }, [router]);

  const setOrderNumberHandler = (e) => {
    window.history.pushState(null, null, `?id=${e}`);
    setOrderNumber(e);
  };

  return (
    <>
      <SEOHead
        title={title}
      />
      <MyPagesController
        title={title}
        breadCrumbs={(
          <MyPagesBreadCrumbs title={title} slug={NavigationSlugs.Orders} subChild={orderNumber} />
        )}
        activeSlug={NavigationSlugs.Orders}
        content={(
          <MyOrdersController activeOrder={orderNumber} setOrderNumber={setOrderNumberHandler} />
        )}
      />
    </>
  );
};

MyOrdersPage.propTypes = {
};

export default MyOrdersPage;
