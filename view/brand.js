import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { ImageView } from '@/roanuz/view/image';
import SiteLogo from '@/public/SiteLogo.svg';

export const BaseLogoView = ({ logo = SiteLogo, href = '/', className }) => {
  return (
    <Link href={href}>
      <a alt="Goto Home" className="plain">
        <ImageView
          src={logo}
          alt="Logo"
          className={className}
        />
      </a>
    </Link>
  );
};

BaseLogoView.propTypes = {
  logo: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
};

export const LogoView = withDependencySupport(BaseLogoView, 'LogoView');
