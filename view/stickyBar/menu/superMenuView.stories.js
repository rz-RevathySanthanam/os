/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styled from 'styled-components';
import categoryTreeData from '@/stories/sample-data/categoryTree.json';
import { ServicesTree } from '@/roanuz/lib/servicesTree';
import stickyBarSettings from '@/data/stickyBar/settings';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { SuperMenuFrame, SuperMenuView } from './superMenuView';

export default {
  title: 'Omni Shop / View / Menu',
  component: SuperMenuView,
};

const Wrapper = styled.div`
  position: relative;
  height: ${asRem(450)};
  &.active {
    > div {
      display: none;
      &:last-child {
        display: block;
      }
    }
    @media screen and (min-width: ${Breakpoint.md}) {
      > div {
        display: block;
      }
    }
  }

  > div {
    padding: ${asRem(10)};
    max-width: ${asRem(320)};
    &:last-child {
      @media screen and (min-width: ${Breakpoint.md}) {
        position: absolute;
        left: ${asRem(320)};
        top: 0;
      }
    }
    .level-n-wrapper > ul {
      overflow-y: scroll;
      height: ${asRem(360)};
    }
  }
`;

const Template = (args) => {
  const [superMenuModalActiveFrame, setSuperMenuModalActiveFrame] = useState(-1);
  const updateFrame = (frame) => {
    setSuperMenuModalActiveFrame(frame);
  };
  return (
    <Wrapper className={`${superMenuModalActiveFrame > 0 && 'active'}`}>
      {args.superMenuSettings ? (
        <>
          <SuperMenuView
            superMenuSettings={args.superMenuSettings}
            superMenuTrigger={() => updateFrame(1)}
            menuContext={{
              superMenuModalActiveFrame,
            }}
            categoryTree={{
              treeLoading: false,
              tree: categoryTreeData.data,
            }}
            serviceTree={ServicesTree}
          />
          <SuperMenuFrame
            menuContext={{
              superMenuModalActiveFrame,
            }}
            superMenuTrigger={() => updateFrame(-1)}
            categoryTree={{
              treeLoading: false,
              tree: categoryTreeData.data,
            }}
            serviceTree={ServicesTree}
          />
        </>
      ) : <h1>SuperMenu Items not available</h1>}
    </Wrapper>
  );
};

export const SuperMenu = Template.bind({});
SuperMenu.args = {
  superMenuSettings: stickyBarSettings.features.menu.superMenuSettings,
};
