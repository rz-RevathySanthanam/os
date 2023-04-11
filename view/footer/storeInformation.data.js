import React from 'react';
import { ReactComponent as ChatIcon } from '@/roanuz/view/imgs/ChatIcon.svg';
import { ReactComponent as ClockIcon } from '@/roanuz/view/imgs/ClockIcon.svg';
import { ReactComponent as LocationIcon } from '@/roanuz/view/imgs/LocationIcon.svg';
import { ReactComponent as MailIcon } from '@/roanuz/view/imgs/MailIcon.svg';
import { translateV2 } from '@/roanuz/lib/utils';

export const StoreInformationData = [{
  addressLine1: 'Austurstræti 17, 4. Hæð',
  addressLine2: '101 Reykjavík',
  id: 2,
  name: 'Reykjavík',
  openHoursDesc: 'Mon-Fri: 8am-5pm GMT',
  sortOrder: 2,
  storeMapPoint: 'Find the nearist store',
  telephone: '+18552776784',
}];

export const StoreInformationStaticData = [
  {
    title: translateV2('footer.OPENING_HOURS'),
    content: 'Mon-Fri: 8am-5pm GMT',
    icon: <ClockIcon />,
    link: '/contact',
  },
  {
    title: translateV2('footer.LOCATION'),
    content: translateV2('footer.FIND_STORE'),
    icon: <LocationIcon />,
    link: '/contact',
  },
  {
    title: translateV2('footer.EMAIL'),
    content: translateV2('footer.EMAIL_RESPONSE'),
    icon: <MailIcon />,
    link: '/contact',
  },
  {
    title: translateV2('footer.CHAT'),
    content: translateV2('footer.CHAT_RESPONSE'),
    icon: <ChatIcon />,
    link: '/contact',
  }];
