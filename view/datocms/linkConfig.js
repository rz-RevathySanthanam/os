import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

export const LinkType = {
  link: 'link',
  button: 'button',
  linkToEntireSection: 'linkToEntireSection',
};

const DatoCMSLinkConfigWrapper = styled.div`
`;

export const DatoCMSLinkConfig = ({ linkSettings }) => {
  const [linkSettingsRef] = linkSettings;
  const {
    link,
    linkTitle,
    isExternalLink,
    format,
  } = linkSettingsRef;

  if (!link) return null;

  return (
    <DatoCMSLinkConfigWrapper>
      {format === LinkType.button && (
        <Link href={link} rel="noreferrer">
          <a alt={linkTitle}>
            {linkTitle}
          </a>
        </Link>
      )}
      {format === LinkType.link && (
        <Link href={link} rel="noreferrer">
          <a alt={linkTitle} className="plain-text" target={isExternalLink === 'true' ? '_blank' : ''}>
            {linkTitle}
          </a>
        </Link>
      )}
    </DatoCMSLinkConfigWrapper>
  );
};

DatoCMSLinkConfig.propTypes = {
  linkSettings: PropTypes.object.isRequired,
};
