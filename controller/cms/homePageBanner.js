import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { StoreConfigContext } from '@/roanuz/store/core/context';
import { HomePageBannersQuery } from '@/roanuz/store/cms/datoCmsQuery';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { GalleryView } from '@/roanuz/view/cms/galleryView';
import { selectHomePageGallery } from '@/roanuz/view/cms/gallery';
import PropTypes from 'prop-types';

export const HomePageBannerController = ({ dataSuppliedFromParent = null }) => {
  const storeConfig = useContext(StoreConfigContext);
  const { websiteId } = !dataSuppliedFromParent && storeConfig.websiteConfig;
  const { loading, error, data } = useQuery(HomePageBannersQuery, {
    variables: { websiteId },
    skip: dataSuppliedFromParent,
  });

  if (error) {
    return (
      <ErrorView error={error} />
    );
  }

  if (loading) {
    return (
      <LoadingView />
    );
  }

  const gallery = selectHomePageGallery(
    !dataSuppliedFromParent ? data.allHomePageBanners.galleries : dataSuppliedFromParent.model,
  );
  if (!gallery) {
    return null;
  }

  return (
    <GalleryView
      gallery={gallery}
      padded
      className="homepage-banner"
    />
  );
};

HomePageBannerController.propTypes = {
  dataSuppliedFromParent: PropTypes.object,
};
