import React from 'react';
import { ReactComponent as FacebookIcon } from '@/roanuz/view/imgs/FacebookIcon.svg';
import { ReactComponent as TwitterIcon } from '@/roanuz/view/imgs/TwitterIcon.svg';
import { ReactComponent as LinkedinIcon } from '@/roanuz/view/imgs/LinkedinIcon.svg';
import { ReactComponent as InstagramIcon } from '@/roanuz/view/imgs/InstagramIcon.svg';
import { ReactComponent as YoutubeIcon } from '@/roanuz/view/imgs/YoutubeIcon.svg';

export const SiteLinksData = {
  column1: {
    links: [
      {
        path: 'contact',
        title: 'Support',
      },
      {
        path: 'customer/account',
        title: 'Account',
      },
      {
        path: 'customer/account/wishlist',
        title: 'Wishlist',
      },
      {
        path: 'contact',
        title: 'Service',
      },
      {
        path: 'customer/account/wishlist',
        title: 'Gift Cards',
      },
    ],
  },
  column2: {
    links: [
      {
        path: 'customer/account/orders',
        title: 'Orders',
      },
      {
        path: 'contact',
        title: 'Return Policy',
      },
      {
        path: 'contact',
        title: 'Blog',
      },
      {
        path: 'contact',
        title: 'About Us',
      },
      {
        path: 'contact',
        title: 'Work',
      },
    ],
  },
};

export const SocialLinksData = {
  socialLinksList: [
    {
      alt: 'Facebook',
      path: 'https://www.facebook.com/roanuz/',
      icon: <FacebookIcon />,
    },
    {
      alt: 'Instagram',
      path: 'https://www.instagram.com/roanuz',
      icon: <InstagramIcon />,
    },
    {
      alt: 'Twitter',
      path: 'https://twitter.com/theroanuz',
      icon: <TwitterIcon />,
    },
    {
      alt: 'Youtube',
      path: 'https://www.youtube.com/roanuz',
      icon: <YoutubeIcon />,
    },
    {
      alt: 'Linkedin',
      path: 'https://www.linkedin.com/company/roanuz',
      icon: <LinkedinIcon />,
    },
  ],
};
