import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Config from '@/config';

import { LayoutContainer } from '@/roanuz/store/layout/layout';
import ContainerWidgets from '@/roanuz/widgets/ContainerWidgets';

import { StoreConfigConsumer, UserConsumer } from '@/roanuz/store/core/context';
import { UrlResolverQuery } from '@/roanuz/store/cms/query';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { NotFound } from '@/roanuz/page/404';
import { parser } from '@/roanuz/store/modelParser';
import CategoryPage from './CategoryPage';
import ProductPageV2 from './ProductPage';
import CartPage from './CartPage';
import CmsPage from './CmsPage';
import DatoCmsPage from './DatoCmsPage';
import ContactUsPage from './ContactPage';
import { translateV2 } from '../lib/utils';

export const Page = ({ reqPath }) => {
  let reqPathRef = reqPath;
  if (reqPathRef.includes(Config.CategoryPageSettings.FiltersQueryPrefix)) {
    [reqPathRef] = reqPathRef.split(Config.CategoryPageSettings.FiltersQueryPrefix);
  }
  if (reqPathRef.includes(Config.ProductDisplaySettings.FiltersQueryPrefix)) {
    [reqPathRef] = reqPathRef.split(Config.ProductDisplaySettings.FiltersQueryPrefix);
    reqPathRef = `${reqPathRef}.html`;
  }
  const {
    loading: urlMetaLoading,
    error: urlMetaError,
    data: urlMetaData,
  } = useQuery(UrlResolverQuery, { variables: { url: reqPathRef } });

  if ((!urlMetaData) && urlMetaLoading) return (<PageLoadingView message={translateV2('loadingMsg.PAGE_LOADING')} />);
  if ((!urlMetaData) && urlMetaError) return (<PageErrorView error={urlMetaError} />);
  if (!urlMetaData) return (<PageErrorView error={{ message: 'Meta Missing' }} />);
  // console.log('Resolved', urlMetaData);
  const urlMeta = urlMetaData.urlResolver || {};
  // let pageType = urlMeta.type;

  // if (!pageType) {
  //   if (reqPath.startsWith('/cart')) {
  //     pageType = 'CART';
  //   }
  // }

  const pageType = parser('any.getPageType', urlMeta.type, reqPath);

  let pageView = null;
  switch (pageType) {
    case 'CMS_PAGE':
      pageView = (userContext, storeConfig, storeWidgets, defaultWidgets) => (
        <CmsPage
          urlMeta={urlMeta}
          userContext={userContext}
          defaultWidgets={defaultWidgets}
          widgets={storeWidgets}
          storeConfig={storeConfig}
        />
      );
      break;
    case 'CATEGORY':
      pageView = (userContext, storeConfig, storeWidgets, defaultWidgets) => {
        return (
          <CategoryPage
            urlMeta={urlMeta}
            userContext={userContext}
            defaultWidgets={defaultWidgets}
            widgets={storeWidgets}
            storeConfig={storeConfig}
          />
        );
      };
      break;
    case 'PRODUCT':
      pageView = (userContext, storeConfig, storeWidgets, defaultWidgets, attributeMeta) => {
        return (
          <ProductPageV2
            reqPath={reqPath}
            urlMeta={urlMeta}
            userContext={userContext}
            defaultWidgets={defaultWidgets}
            widgets={storeWidgets}
            storeConfig={storeConfig}
            attributeMeta={attributeMeta}
          />
        );
      };
      break;
    case 'CART':
      pageView = (userContext, storeConfig, storeWidgets, defaultWidgets) => (
        <CartPage
          urlMeta={urlMeta}
          userContext={userContext}
          defaultWidgets={defaultWidgets}
          widgets={storeWidgets}
          storeConfig={storeConfig}
        />
      );
      break;
    case 'CONTACT':
      pageView = (userContext, storeConfig, storeWidgets, defaultWidgets) => (
        <ContactUsPage
          urlMeta={urlMeta}
          userContext={userContext}
          defaultWidgets={defaultWidgets}
          widgets={storeWidgets}
          storeConfig={storeConfig}
        />
      );
      break;
    // case 'CHECKOUT':
    //   pageView = (userContext, storeConfig, storeWidgets, defaultWidgets) => (
    //     <CheckoutPage
    //       urlMeta={urlMeta}
    //       userContext={userContext}
    //       defaultWidgets={defaultWidgets}
    //       widgets={storeWidgets}
    //       storeConfig={storeConfig}
    //     />
    //   );
    //   break;
    default:
      pageView = null;
  }

  pageView = parser('any.getPageView', pageType, pageView);

  if (!pageView) {
    if (Config.EnableGetPageFromDatoCMS) {
      const missingPath = reqPath.split('/');
      return (
        <DatoCmsPage
          pageId={missingPath[1]}
        />
      );
    }
  }

  return (
    <UserConsumer>
      {(userContext) => (
        <StoreConfigConsumer>
          {({
            storeConfig,
            storeWidgets,
            defaultWidgets,
            attributeMeta,
          }) => (
            <div>
              <main>
                {pageView ? pageView(
                  userContext, storeConfig, storeWidgets,
                  defaultWidgets, attributeMeta,
                ) : (
                  <div>
                    <NotFound />
                  </div>
                )}
              </main>

              <footer>
                <div className="rz-section-content">
                  <ContainerWidgets
                    widgets={defaultWidgets}
                    container={LayoutContainer.FooterLinks}
                  />
                </div>
              </footer>
            </div>
          )}
        </StoreConfigConsumer>
      )}
    </UserConsumer>

  );
};

Page.propTypes = {
  reqPath: PropTypes.string.isRequired,
};

export default Page;
