/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { css } from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import PropTypes from 'prop-types';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import {
  DisplayBold18, DisplayBold20,
} from '@/roanuz/typopgraphy';
import Link from 'next/link';
import { SocialLinks } from './socialLinks';
import { SiteLinksData } from './siteLinks.data';

/* Possible Modes
Row - default
Column
*/

export const SiteLinksViewStyle = {
  Row: 'Row',
  Column: 'Column',
};

export const BaseSiteLinks = ({
  className,
  mode = SiteLinksViewStyle.Row,
}) => {
  return (
    <SiteLinksView siteLinks={SiteLinksData} className={className} mode={mode} />
  );
};

BaseSiteLinks.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
};

export const SiteLinks = withDependencySupport(BaseSiteLinks, 'SiteLinks');

export const BaseSiteLinksViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${Breakpoint.sm}) {
    flex-direction: row;
    ${(p) => p.mode !== SiteLinksViewStyle.Column && css`
      gap: ${asRem(20)};
    `}
    ${(p) => p.mode === SiteLinksViewStyle.Column && css`
      flex-direction: column;
    `}
  }

  @media screen and (min-width: ${Breakpoint.lg}) {
    ${(p) => p.mode !== SiteLinksViewStyle.Column && css`
      gap: ${asRem(90)};
    `}
  }

  .column-wrapper {
    h4, .link-item {
      &:not(:empty) {
        margin-bottom: ${asRem(32)};
      }
    }
    >.individual-column {
      display: flex;
      flex-direction: column;
      min-width: ${asRem(180)};
      @media screen and (min-width: ${Breakpoint.sm}) {
        ${(p) => p.mode === SiteLinksViewStyle.Column && css`
          flex-direction: row;
          flex-flow: row wrap;
        `}
      }
      padding-bottom: ${asRem(20)};
      h4, a {
        ${(p) => p.mode === SiteLinksViewStyle.Column && css`
          padding-right: ${asRem(20)};
        `}
      }
      a:hover {
        color: inherit;
        text-decoration: underline;
      }
    }
  }
`;

export const SiteLinksView = ({ siteLinks, className, mode }) => {
  const siteLinksRef = Object.keys(siteLinks);
  return (
    <SiteLinksViewWrapper className={className} mode={mode}>
      {siteLinksRef.map((column, colIndex) => (
        <div key={colIndex} className="column-wrapper">
          <DisplayBold18>{siteLinks[column].header}</DisplayBold18>
          <div className="individual-column">
            {siteLinks[column].links.map((link, linkIndex) => (
              !link.socialLinksList ? (
                <div className="link-item">
                  <Link href={`/${link.path}`} prefetch={false} key={linkIndex}>
                    <a alt={`Link to ${link.title}`} className="plain">
                      <DisplayBold20 as="span">
                        {link.title}
                      </DisplayBold20>
                    </a>
                  </Link>
                </div>
              ) : (
                <SocialLinks
                  socialLinks={link.socialLinksList}
                  key={linkIndex}
                  mode={mode}
                />
              )
            ))}
          </div>
        </div>
      ))}
    </SiteLinksViewWrapper>
  );
};

SiteLinksView.propTypes = {
  siteLinks: PropTypes.object,
  className: PropTypes.string,
  mode: PropTypes.string,
};

export const SiteLinksViewWrapper = withDependencySupport(BaseSiteLinksViewWrapper, 'SiteLinksViewWrapper');
