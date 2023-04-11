import React from 'react';
import PropTypes from 'prop-types';
import { DisplayBold24 } from '@/roanuz/typopgraphy';
import styled, { css } from 'styled-components';
import { ReactComponent as BaseDeliveryIcon } from '@/roanuz/view/imgs/DeliveryIcon.svg';
import { ReactComponent as BaseUserIcon } from '@/roanuz/view/imgs/UserIcon.svg';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { MyPagesSideBarNavigation } from './sideBarNavigation';

export const DeliveryIcon = withDependencySupport(BaseDeliveryIcon, 'DeliveryIcon');
export const UserIcon = withDependencySupport(BaseUserIcon, 'UserIcon');

export const BaseMyPagesSideBarViewWrapper = styled.div`
  ${(props) => props.isLandingPage && css`
    @media screen and (min-width: ${Breakpoint.md}) {
      padding-left: ${asRem(120)};
    }
    .mypages-title {
      @media screen and (min-width: ${Breakpoint.md}) {
        font-size: ${asRem(70)};
        line-height: ${asRem(86)};
      }
      .greeting {
        display: block;
      }
    }
  `}
`;

export const MyPagesSideBarView = ({
  title,
  activeSlug,
  isB2BUser,
}) => {
  return (
    <MyPagesSideBarViewWrapper isLandingPage={!activeSlug} className="hide-on-print">
      <DisplayBold24 as="h1" className="mypages-title">
        <span className="greeting">{translateV2('myPages.Hi')}</span>
        {' '}
        {title}
      </DisplayBold24>
      <MyPagesSideBarNavigation activeSlug={activeSlug} isB2BUser={isB2BUser} />
    </MyPagesSideBarViewWrapper>
  );
};

MyPagesSideBarView.propTypes = {
  title: PropTypes.string,
  activeSlug: PropTypes.string,
  isB2BUser: PropTypes.bool,
};

export const MyPagesSideBarViewWrapper = withDependencySupport(BaseMyPagesSideBarViewWrapper, 'MyPagesSideBarViewWrapper');
