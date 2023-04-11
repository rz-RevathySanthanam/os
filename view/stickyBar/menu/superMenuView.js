import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { DisplayBold24, Display30 } from '@/roanuz/typopgraphy';
import { UserContext } from '@/roanuz/store/core/context';
import { translateV2 } from '@/roanuz/lib/utils';
import { QuickLinks } from './quickLinks';
import { CategoryMenuTreeColumnView } from '../categoryMenuTree';

export const BaseSuperMenuViewWrapper = styled.div`
  margin-left: ${asRem(40)};

  display: flex;
  >div:not(:empty) {
    min-width: ${asRem(250)};
  }
  .link-wrapper {
    margin-bottom: ${asRem(32)};

    a {
      width: 100%;
      display: inline-block;

      :hover {
        color: var(--color-text);
      }
    }
  }
  .item-label {
    cursor: pointer;
    
    &:is(a) {
      :hover {
        text-decoration: underline;
      }
    }
  }

  .left-side {
    .user-name {
      margin-bottom: ${asRem(20)};
    }
  }
  ${(p) => p.toggle && p.animationMode !== 'SplitScreen' && css`
    .left-side {
      display: none;
    }
  `}
`;

export const BaseSuperMenuView = ({
  superMenuSettings,
  superMenuTrigger,
  menuContext,
  animationMode,
}) => {
  const { items } = superMenuSettings;
  const { quickLinks } = superMenuSettings;
  const userContext = useContext(UserContext);

  return (
    <SuperMenuViewWrapper
      animationMode={animationMode}
      toggle={menuContext.superMenuModalActiveFrame >= 1}
    >
      <div className="left-side">
        {userContext.token && (
          <Display30 className="user-name">
            {translateV2('myPages.Hi')}
            {' '}
            <p>{userContext.customerName}</p>
          </Display30>
        )}
        {items && items.map((item, index) => (
          <div
            className="link-wrapper"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {item.menuActionFrame && (
              <div
                className={`
                  ${item.menuActionFrame === menuContext.superMenuModalActiveFrame ? 'active' : ''} item-label`}
              >
                <DisplayBold24
                  role="presentation"
                  onClick={() => superMenuTrigger(true, false, item.menuActionFrame)}
                  onKeyPress={() => superMenuTrigger(true, false, item.menuActionFrame)}
                  as="p"
                >
                  {item.label}
                </DisplayBold24>
              </div>
            )}
            {item.href && (
              <Link href={item.href} prefetch={false}>
                <a alt={item.label} target={item.target} className={`plain  ${item.target ? 'external' : 'item-label'}`}>
                  <DisplayBold24 as="span">{item.label}</DisplayBold24>
                </a>
              </Link>
            )}
          </div>
        ))}
        {quickLinks && (<QuickLinks quickLinks={quickLinks} />)}
      </div>
    </SuperMenuViewWrapper>
  );
};

BaseSuperMenuView.propTypes = {
  superMenuSettings: PropTypes.object,
  superMenuTrigger: PropTypes.func,
  menuContext: PropTypes.object,
  animationMode: PropTypes.string,
};

export const SuperMenuView = withDependencySupport(BaseSuperMenuView, 'SuperMenuView');
export const SuperMenuViewWrapper = withDependencySupport(BaseSuperMenuViewWrapper, 'SuperMenuViewWrapper');

export const BaseSuperMenuFrameWrapper = styled.div`
  display: flex;
  @media screen and (min-width: ${Breakpoint.md}) {
    display: block;
  }
  .right-side:not(:empty) {
    width: 100vw;
    height: 100%;
    z-index: 3;
    @media screen and (min-width: ${Breakpoint.sm}) {
      width: auto;
    }
  }
`;

export const BaseSuperMenuFrame = ({
  menuContext,
  categoryTree,
  serviceTree,
  superMenuTrigger,
}) => {
  return (
    <SuperMenuFrameWrapper>
      <div className="right-side">
        {menuContext.superMenuModalActiveFrame === 1 && (
          <CategoryMenuTreeColumnView
            tree={categoryTree.tree}
            loading={categoryTree.treeLoading}
            resetMenu={() => superMenuTrigger(true, false)}
          />
        )}
        {menuContext.superMenuModalActiveFrame === 2 && (
          <CategoryMenuTreeColumnView
            tree={serviceTree}
            loading={false}
            isServiceLinks
            resetMenu={() => superMenuTrigger(true, false)}
          />
        )}
      </div>
    </SuperMenuFrameWrapper>
  );
};

BaseSuperMenuFrame.propTypes = {
  superMenuTrigger: PropTypes.func,
  menuContext: PropTypes.object,
  categoryTree: PropTypes.object,
  serviceTree: PropTypes.object,
};

export const SuperMenuFrame = withDependencySupport(BaseSuperMenuFrame, 'SuperMenuFrame');
export const SuperMenuFrameWrapper = withDependencySupport(BaseSuperMenuFrameWrapper, 'SuperMenuFrameWrapper');
