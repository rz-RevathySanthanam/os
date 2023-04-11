import React from 'react';
import { SEOHead } from '@/roanuz/document';
import { MyWishlistController } from '@/roanuz/controller/customer/myWishList';
import { NavigationSlugs } from '@/roanuz/controller/customer/types';
import { MyPagesBreadCrumbs } from '@/roanuz/view/myPagesBreadCrumbs';
import { MyPagesController } from '@/roanuz/controller/customer/myPages';
import { translateV2 } from '@/roanuz/lib/utils';

const MyWishlistPage = () => {
  const title = translateV2('myPages.WISHLIST');
  return (
    <>
      <SEOHead
        title={title}
      />
      <MyPagesController
        title={title}
        activeSlug={NavigationSlugs.Wishlist}
        breadCrumbs={(
          <MyPagesBreadCrumbs title={title} />
        )}
        content={(
          <MyWishlistController />
        )}
      />
    </>
  );
};

MyWishlistPage.propTypes = {
};

export default MyWishlistPage;
