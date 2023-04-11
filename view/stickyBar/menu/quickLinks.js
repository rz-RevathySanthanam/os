import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Text16 } from '@/roanuz/typopgraphy';
import { asRem } from '@/roanuz/lib/css';
import { ReactComponent as CallIcon } from '@/roanuz/view/imgs/CallIcon.svg';
import { ReactComponent as CardIcon } from '@/roanuz/view/imgs/CardIcon.svg';
import { ReactComponent as UserIcon } from '@/roanuz/view/imgs/UserIcon.svg';
import { ReactComponent as BaseAccessIcon } from '@/roanuz/view/imgs/AccessIcon.svg';
import { UserConsumer, UserContext } from '@/roanuz/store/core/context';
import { Button } from '@/roanuz/view/button';
import { QuickLinkItem } from '@/roanuz/components/quickLinkView';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { MenuLinkIconTypes } from '../featureTypes';

export const QuickLinkItemCss = css`
  display: flex;
  align-items: center;
  .rz-svg-icon {
    margin-right: ${asRem(6)};
    vertical-align: middle;
  }
`;

export const QuickLinksWrapper = styled.div`
  ${(p) => p.sectionView && css`
    margin: ${asRem(30)} 0;
    padding: ${asRem(28)} 0 ${asRem(10)} 0;
    border-top: 1px solid var(--color-disabled-3);
    border-bottom: 1px solid var(--color-disabled-3);
    .quick-links-outer {
      margin-bottom: ${asRem(28)};
      font-weight: 500;
    }
  `}

  padding-top: ${asRem(16)};
  .quick-links-outer {
    margin-bottom: ${asRem(24)};
  }

  .rz-quick-link-item {
    margin-bottom: ${asRem(28)};
    font-weight: 500;
    &:last-child{
      margin-right: 0;
    }
    a {
      color: var(--color-text);
      font-family: var(--tg-bold-family);
      display: flex;
      align-items: center;
      .rz-svg-icon {
        margin-right: ${asRem(13)};
        vertical-align: middle;
      }
    }

    .rz-svg-icon {
      min-width: ${asRem(20)};
    }
  }

  .button-wrapper {
    margin-bottom: ${asRem(28)};
    button {
      padding: 0;
      color: var(--color-error)
    }
  }
`;

function pickIcon(iconName) {
  let iconRef = null;
  switch (iconName) {
    case MenuLinkIconTypes.CallIcon:
      iconRef = <CallIcon />;
      break;
    case MenuLinkIconTypes.CardIcon:
      iconRef = <CardIcon />;
      break;
    case MenuLinkIconTypes.UserIcon:
      iconRef = <UserIcon />;
      break;
    case MenuLinkIconTypes.AccessIcon:
      iconRef = <AccessIcon />;
      break;
    default:
      iconRef = null;
  }
  return iconRef;
}

export const QuickLinks = ({
  quickLinks,
  sectionView = false,
}) => {
  const userContext = useContext(UserContext);

  const DefaultQuickLink = ({ index, link }) => {
    return (
      <div
        className="quick-links-outer"
      // eslint-disable-next-line react/no-array-index-key
        key={index}
      >
        <QuickLinkItem name={link.label} href={link.href}>
          {link.icon && (
            pickIcon(link.icon)
          )}
        </QuickLinkItem>
      </div>
    );
  };

  DefaultQuickLink.propTypes = {
    index: PropTypes.number,
    link: PropTypes.array,
  };

  const buildQuickLinks = (link, index) => {
    if (link.hideAfterLogin && userContext.token) { return null; }

    if (link.authRequired) {
      return userContext.token
        ? <DefaultQuickLink index={index} link={link} /> : null;
    }

    if (link.isLogoutButton && userContext.token) {
      return (
        <UserConsumer
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          {({ logoutUser }) => (
            <div className="button-wrapper">
              <Button
                onClick={() => logoutUser()}
                noborder
              >
                <Text16>
                  Útskrá
                </Text16>
              </Button>
            </div>
          )}
        </UserConsumer>
      );
    }

    return (
      <DefaultQuickLink index={index} link={link} />
    );
  };

  return (
    <QuickLinksWrapper sectionView={sectionView}>
      {quickLinks && quickLinks.map((link, index) => (
        buildQuickLinks(link, index)
      ))}
    </QuickLinksWrapper>
  );
};

QuickLinks.propTypes = {
  quickLinks: PropTypes.array,
  sectionView: PropTypes.bool,
};

export const AccessIcon = withDependencySupport(BaseAccessIcon, 'AccessIcon');
