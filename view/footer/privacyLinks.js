import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';

export const BasePrivacyLinksViewWrapper = styled.div`
  padding: ${asRem(20)} 0;
  padding-bottom: ${asRem(100)};
  ul {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    gap: ${asRem(10)};

    @media screen and (min-width: ${Breakpoint.md}) {
      flex-direction: row;
      align-items: center;
      gap: ${asRem(40)};
    }
    .copy-right {
      margin-bottom: ${asRem(40)};
      @media screen and (min-width: ${Breakpoint.md}) {
        margin-right: auto;
        margin-bottom: 0;
      }
    }
    li {
      a:hover {
        color: inherit;
        text-decoration: underline;
      }
      &:last-child {
        span {
          display: none;
        }
      }
    }
  }
`;

export const BasePrivacyLinksView = () => {
  const links = [
    { name: translateV2('footer.PRIVACY_POLICY'), href: '/', alt: 'Links to Privacy Policy' },
    { name: translateV2('footer.COOKIES_POLICY'), href: '/', alt: 'Links to Cookies' },
    { name: translateV2('footer.COOKIES_SETTINGS'), href: '/', alt: 'Links to Cookies' },
    { name: translateV2('footer.TERMS_OF_BUSINESS'), href: '/', alt: 'Links to Terms of Business' },
  ];
  return (
    <PrivacyLinksViewWrapper>
      <ul className="rz-section-content">
        <li className="copy-right">{translateV2('footer.COPYRIGHT_TEXT')}</li>
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} prefetch={false}>
              <a alt={link.alt} className="plain">{link.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </PrivacyLinksViewWrapper>
  );
};

BasePrivacyLinksView.propTypes = {
};

export const PrivacyLinksView = withDependencySupport(BasePrivacyLinksView, 'PrivacyLinksView');
export const PrivacyLinksViewWrapper = withDependencySupport(BasePrivacyLinksViewWrapper, 'PrivacyLinksViewWrapper');
