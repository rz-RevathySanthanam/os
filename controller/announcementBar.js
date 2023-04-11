import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { AnnouncementBarView } from '@/roanuz/view/announcementBarView';
import { UserContext } from '@/roanuz/store/core/context';
import { CookieManager } from '@/roanuz/lib/cookie';
import { AnnouncementsQuery } from '@/roanuz/store/cms/datoCmsQuery';
import Config from '@/config';
import { useWaitForClientSide } from '@/roanuz/hooks/core';
import { hideComponentView } from '../lib/utils';

export const AnnouncementBarController = ({ dontRenderComponentOn }) => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  const [captured, setCaptured] = useState();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(false);

  const clientReady = useWaitForClientSide();

  const shouldHideAnnouncementBarView = hideComponentView(router, dontRenderComponentOn);

  const [fetchAnnouncements, {
    loading, error, data, called: fetchAnnouncementsCalled,
  }] = useLazyQuery(AnnouncementsQuery);

  useEffect(() => {
    if (shouldHideAnnouncementBarView) {
      return;
    }
    if (clientReady) {
      const isExixts = CookieManager.get('roanuz_custom_announcement') === undefined;
      setShowAnnouncementBar(isExixts);
      if (!fetchAnnouncementsCalled && isExixts && Config.GetAnnouncementsFromDatoCMS) {
        fetchAnnouncements();
      }
    }
  }, [clientReady]);

  if (error) {
    console.error(error);
    console.log(error.graphQLErrors);
  }

  useEffect(() => {
    if (data && !loading && !error && !captured) {
      if (
        data
        && data.rzfAnnouncements
        && data.rzfAnnouncements.length > 0
      ) {
        const list = data.rzfAnnouncements;
        const refineList = list.map((l) => l.content);
        setCaptured(refineList);
      }
    }
  }, [data]);

  if (shouldHideAnnouncementBarView) {
    return null;
  }

  if (Config.GetAnnouncementsFromDatoCMS && !captured) {
    return null;
  }

  const onCloseAnnouncement = () => {
    setShowAnnouncementBar(false);
    userContext.setRoanuzCustomCookie('announcement', false);
  };

  return (
    <AnnouncementBarView
      showAnnouncement={showAnnouncementBar}
      closeAnnouncement={onCloseAnnouncement}
      announcements={!Config.GetAnnouncementsFromDatoCMS ? Config.AnnouncementContent : captured}
    />
  );
};

AnnouncementBarController.propTypes = {
  dontRenderComponentOn: PropTypes.array,
};
