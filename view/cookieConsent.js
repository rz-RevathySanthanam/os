import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { asRem } from '@/roanuz/lib/css';
import { Button, ButtonList } from '@/roanuz/view/button';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';

const BaseCookieConsentWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 200;
  transform-origin: bottom left;
  transition: all 450ms cubic-bezier(0.16, 1, 0.3, 1);    
  transform: scale(0);

  ${(p) => p.show && css`
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
    transform: scale(1);
  `}

  >.container {
    margin: ${asRem(20)};
    max-width: ${asRem(300)};
    padding: ${asRem(20)};
    border-radius: ${asRem(5)};
    background: var(--color-text-rev);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);


    >.actions {
      padding-top: ${asRem(20)};
    }
  }
`;

export const BaseCookieConsent = ({
  learnMoreLink,
  show,
  onAcceptAll,
  onDenyAll,
}) => {
  return (
    <CookieConsentWrapper show={show} className="hide-on-print">
      <div className="container">
        <p>
          {translateV2('cookie.MESSAGE')}
          &nbsp;
          <Link href={learnMoreLink} prefetch={false}>
            <a alt="Links to Detail">
              Link
            </a>
          </Link>
        </p>
        <div className="actions">
          <ButtonList asList block>
            <Button
              mode="primary"
              filled
              onClick={() => (onAcceptAll && onAcceptAll())}
            >
              {translateV2('cookie.ACCEPT_ALL')}
            </Button>
            <Button
              onClick={() => (onDenyAll && onDenyAll())}
            >
              {translateV2('cookie.DENY_ALL')}
            </Button>
          </ButtonList>
        </div>
      </div>
    </CookieConsentWrapper>
  );
};

BaseCookieConsent.propTypes = {
  learnMoreLink: PropTypes.string.isRequired,
  show: PropTypes.bool,
  onAcceptAll: PropTypes.func,
  onDenyAll: PropTypes.func,
};

export const CookieConsentWrapper = withDependencySupport(BaseCookieConsentWrapper, 'CookieConsentWrapper');
export const ClientCookieConsent = withDependencySupport(BaseCookieConsent, 'ClientCookieConsent');
