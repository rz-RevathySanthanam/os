import React from 'react';
import PropTypes from 'prop-types';
import { DisplayBold20 } from '@/roanuz/typopgraphy';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import Link from 'next/link';
import { ReactComponent as BaseDeliveryIcon } from '@/roanuz/view/imgs/DeliveryIcon.svg';
import { ReactComponent as BaseUserIcon } from '@/roanuz/view/imgs/UserIcon.svg';
import { ReactComponent as CartIcon } from '@/roanuz/view/imgs/CartIcon.svg';
import { ReactComponent as HeartIcon } from '@/roanuz/view/imgs/HeartIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { UserConsumer } from '@/roanuz/store/core/context';
import { Button } from '@/roanuz/view/button';
import { ReactComponent as AccessIcon } from '@/roanuz/view/imgs/AccessIcon.svg';
import ArrowRight from '@/roanuz/view/imgs/ArrowRight.svg';
import { translateV2, convertStringToTranslationKey } from '@/roanuz/lib/utils';

export const DeliveryIcon = withDependencySupport(BaseDeliveryIcon, 'DeliveryIcon');
export const UserIcon = withDependencySupport(BaseUserIcon, 'UserIcon');

export const navigationLinks = [
  {
    title: 'Orders',
    slug: 'orders',
    icon: <CartIcon />,
    order: 1,
  },
  {
    title: 'Wishlist',
    slug: 'wishlist',
    icon: <HeartIcon />,
    order: 2,
  },
  {
    title: 'Address',
    slug: 'address',
    icon: <DeliveryIcon />,
    order: 3,
  },
  {
    title: 'Account',
    slug: 'edit-account',
    icon: <UserIcon />,
    order: 4,
  },
];

export const BaseMyPagesSideBarNavigationWrapper = styled.div`
  --navigation-link-spacing: ${asRem(56)};

  .navigation-link-wrapper {
    padding-top: var(--navigation-link-spacing);
    width: 100%;
    display: inline-flex;
    flex-direction: column;
  }
  a, a:hover {
    color: inherit;
    text-decoration: none;
  }
  .navigation-link {
    display: flex;
    gap: ${asRem(30)};
    width: 100%;
    text-align: left;
    margin-bottom: ${asRem(25)};
    padding: 0;
    position: relative;
    padding-right: ${asRem(20)};
    align-items: center;
    .rz-svg-icon {
      width: ${asRem(44)};
      height: ${asRem(44)};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      svg {
        height: ${asRem(25)};
      }
    }
    &.active {
      .rz-svg-icon {
        color: var(--color-text-rev);
        background-color: var(--color-button);
      }
      &::before {
        content: "";
        display: block;
        width: ${asRem(16)};
        height: ${asRem(16)};
        position: absolute;
        background: url(${ArrowRight}) 100% no-repeat;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
  ${(p) => p.isLandingView && css`
    --navigation-link-spacing: ${asRem(60)};
    .navigation-link-wrapper {
      width: 100%;
      @media screen and (min-width: ${Breakpoint.sm}) {
        width: auto;
      }
      .navigation-link {
        @media screen and (min-width: ${Breakpoint.sm}) {
          padding-right: ${asRem(100)};
        }
        &::before {
          content: "";
          display: block;
          width: ${asRem(16)};
          height: ${asRem(16)};
          position: absolute;
          background: url(${ArrowRight}) 100% no-repeat;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
  `}
`;

export const LinkOrderWrapper = styled.a`
  ${(props) => props.order && css`
    order: ${props.order};
  `}
`;

export const BaseMyPagesSideBarNavigation = ({
  activeSlug,
}) => {
  const isLandingView = !activeSlug;
  return (
    <MyPagesSideBarNavigationWrapper isLandingView={isLandingView}>
      <div className="navigation-link-wrapper">
        {navigationLinks.slice().sort((x, y) => x.order - y.order).map((link) => (
          <Link href={`/customer/account/${link.slug}/`} key={link.slug}>
            <LinkOrderWrapper order={link.order} title={link.title}>
              <Button
                className={`${link.slug === activeSlug ? 'active' : ''} navigation-link`}
                noborder
                icon={link.icon}
              >
                <DisplayBold20 className="navigation-link-title">{translateV2(`myPages.${convertStringToTranslationKey(link.title)}`)}</DisplayBold20>
              </Button>
            </LinkOrderWrapper>
          </Link>
        ))}
        <UserConsumer>
          {({ logoutUser }) => (
            <LinkOrderWrapper order={20}>
              <Button
                className="navigation-link"
                onClick={() => logoutUser()}
                noborder
                as="a"
                icon={<AccessIcon />}
              >
                <DisplayBold20 className="navigation-link-title">{translateV2('myPages.LOGOUT')}</DisplayBold20>
              </Button>
            </LinkOrderWrapper>
          )}
        </UserConsumer>
      </div>
    </MyPagesSideBarNavigationWrapper>
  );
};

BaseMyPagesSideBarNavigation.propTypes = {
  activeSlug: PropTypes.string,
};

export const MyPagesSideBarNavigation = withDependencySupport(BaseMyPagesSideBarNavigation, 'MyPagesSideBarNavigation');
export const MyPagesSideBarNavigationWrapper = withDependencySupport(BaseMyPagesSideBarNavigationWrapper, 'MyPagesSideBarNavigationWrapper');
