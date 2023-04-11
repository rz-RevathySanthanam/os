import React, { useContext } from 'react';
import { withDependencySupport } from '@/roanuz/lib/dep';
import styled from 'styled-components';
import { ReactComponent as BaseAccountIcon } from '@/roanuz/view/imgs/AccountIcon.svg';
import { QuickLinkItem } from '@/roanuz/components/quickLinkView';
import { UserContext } from '@/roanuz/store/core/context';
import { ReactComponent as DownArrowLineIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { asRem } from '@/roanuz/lib/css';
import { translateV2 } from '@/roanuz/lib/utils';

export const UserSessionViewWrapper = styled.div`
  .user-name {
    display: flex;
    align-items: center;
    svg {
      width: ${asRem(15)};
      height: ${asRem(15)};
      margin-left: ${asRem(5)};
      display: none;
      path {
        transition: all 0.5s ease-out;
      }
    } 
  }
`;

export const BaseUserSessionView = () => {
  const userContext = useContext(UserContext);
  const isUserLoggedIn = userContext.token;
  return (
    <UserSessionViewWrapper
      className={`${!(isUserLoggedIn && userContext.customerFirstName) ? 'cta-btn' : ''}`}
    >
      <QuickLinkItem
        name={isUserLoggedIn && userContext.customerFirstName ? (
          <div className="user-name">
            <span>{userContext.customerFirstName.slice(0, 11)}</span>
            {' '}
            <DownArrowLineIcon />
          </div>
        ) : translateV2('button.CHECK_IN')}
        href="/customer/account/"
      >
        <AccountIcon />
      </QuickLinkItem>
    </UserSessionViewWrapper>
  );
};

BaseUserSessionView.propTypes = {};

export const UserSessionView = withDependencySupport(BaseUserSessionView, 'UserSessionView');
export const AccountIcon = withDependencySupport(BaseAccountIcon, 'AccountIcon');
