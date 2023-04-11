import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import ContainerWidgets from '@/roanuz/widgets/ContainerWidgets';
import MagentoHtml from '@/roanuz/widgets/MagentoHtml';
import { LayoutContainer } from '@/roanuz/store/layout/layout';
import { StoreConfigConsumer, StoreConfigContext } from '@/roanuz/store/core/context';
import { CmsPageQuery } from '@/roanuz/store/cms/query';
import { filterPageWidgets } from '@/roanuz/store/layout/widget';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { DisplayBold40 } from '@/roanuz/typopgraphy';
import styled from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { SEOHead } from '@/roanuz/document';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { NotFound } from '@/roanuz/page/404';
import Config from '@/config';
import DatoCmsPage from './DatoCmsPage';
import { translateV2 } from '../lib/utils';

export const BaseCmsPageWrapper = styled.div.attrs({ className: 'rz-section-content' })`
  h1 {
    padding-top: ${asRem(30)};
  }
  .rz-magento-html {
    .rz-image-view {
      img {
        max-width: 100%;
      }
    }
  }
`;

export const BaseHomeLandingPageBuilder = ({
  cmsPage,
}) => {
  return (
    <>
      {/* <HomePageBannerController /> Uncomment Later */}
      <MagentoHtml html={cmsPage.content} />
    </>
  );
};

BaseHomeLandingPageBuilder.propTypes = {
  cmsPage: PropTypes.object,
};

const CmsPage = ({
  urlMeta,
  widgets,
  // eslint-disable-next-line no-unused-vars
  userContext,
}) => {
  console.debug(`Left for future use ${userContext}`);
  const pageId = urlMeta.relative_url;
  const {
    loading: pageLoading,
    error: pageError,
    data: pageaData,
  } = useQuery(CmsPageQuery, { variables: { identifier: pageId } });
  const storeConfigInstance = useContext(StoreConfigContext);

  if ((!pageaData) && pageLoading) return (<PageLoadingView message={translateV2('loadingMsg.CMS_PAGE')} />);
  if ((!pageaData) && pageError) return (<PageErrorView error={pageError} />);
  const { cmsPage } = pageaData;
  const isHome = pageId === storeConfigInstance.storeConfig.cms_home_page;
  const pageWidgets = filterPageWidgets({ widgets, isHome });

  if (!cmsPage) {
    if (Config.EnableGetPageFromDatoCMS) {
      return (
        <DatoCmsPage
          // May need below, thats the reason for placing <DatoCmsPage /> in two places.
          // urlMeta={urlMeta}
          // userContext={userContext}
          // widgets={widgets}
          pageId={pageId}
        />
      );
    }
    return (<NotFound />);
  }

  return (
    <StoreConfigConsumer>
      {({ categoryTreeData }) => (
        <CmsPageWrapper className="rz-section-content">
          <SEOHead
            title={cmsPage.meta_title || cmsPage.title}
            desc={cmsPage.meta_description}
            keywords={cmsPage.meta_keywords}
          />
          <div>
            {cmsPage.content_heading && (
              <DisplayBold40 as="h1" className="page-main-title">{cmsPage.content_heading}</DisplayBold40>
            )}
            <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentTop} />
            <div>
              <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.Content} />
            </div>
            {isHome && (
              <HomeLandingPageBuilder categoryTreeData={categoryTreeData} cmsPage={cmsPage} />
            )}
            {!isHome && (<MagentoHtml html={cmsPage.content} className="custom-cms-content" />)}
            {/* {isHome && Config.ShowCatgoriesListOnHome && (
              <BottomCategoriesController categoryTreeData={categoryTreeData} />
            )} */}
            <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentBottom} />
          </div>
        </CmsPageWrapper>
      )}
    </StoreConfigConsumer>
  );
};

CmsPage.propTypes = {
  urlMeta: PropTypes.object.isRequired,
  widgets: PropTypes.arrayOf(PropTypes.object),
  userContext: PropTypes.object,
};

export default CmsPage;

export const HomeLandingPageBuilder = withDependencySupport(BaseHomeLandingPageBuilder, 'HomeLandingPageBuilder');
export const CmsPageWrapper = withDependencySupport(BaseCmsPageWrapper, 'CmsPageWrapper');
