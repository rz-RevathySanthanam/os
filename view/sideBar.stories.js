/* eslint-disable prefer-spread */
import React, { useState } from 'react';
import styled from 'styled-components';
import { SideBarView } from './sideBar';

export default {
  title: 'Omni Shop / View / SideBar',
  component: SideBarView,
};

export const Simple = () => {
  return (
    <>
      <div id="portalmodal" />
      <SideBarView
        titleText="Omni Shop"
        showClose
        onClose={() => {}}
        confirmText="Yes, Delete"
        onConfirm={() => {}}
        show
        containerWidth="320px"
      >
        <h1>Hey Hi 👋</h1>
      </SideBarView>
    </>
  );
};

export const Bigger = () => {
  const items = Array.apply(null, { length: 40 }).map((e, i) => i);
  const cols = Array.apply(null, { length: 10 }).map((e, i) => i);
  return (
    <>
      <div id="portalmodal" />
      <SideBarView
        titleText="Omni Shop"
        showClose
        onClose={() => {}}
        confirmText="Yes, Delete"
        onConfirm={() => {}}
        show
      >
        <h1>Hey Hi 👋👋</h1>
        <br />
        <table>
          {items.map((i) => (
            <tr key={i}>
              {cols.map((j) => (
                <td key={j}>
                  Hello
                  {' '}
                  {i}
                  {'-'}
                  {j}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </SideBarView>
    </>
  );
};

const Wrapper = styled.div`
  display : flex;
  justify-content: space-around;
`;

export const OnClickEvent = () => {
  const [show, setShow] = useState(false);
  const [animationMode, setanimationMode] = useState();

  return (
    <>
      <div id="portalmodal" />
      <div>
        <SideBarView
          titleText="Omni Shop"
          showClose
          confirmText="Yes, Delete"
          show={show}
          onClose={() => setShow(false)}
          onConfirm={() => setShow(false)}
          animationMode={animationMode}
        >
          <h1>Hi 👋👋👋</h1>
        </SideBarView>
        <Wrapper>
          <button
            onClick={() => { setShow(true); setanimationMode('SlideInLeft'); }}
            type="button"
          >
            From Left
          </button>
          <button
            onClick={() => { setShow(true); setanimationMode('SplitScreen'); }}
            type="button"
          >
            SplitScreen
          </button>
          <button
            onClick={() => { setShow(true); setanimationMode('SlideInRight'); }}
            type="button"
          >
            From Right
          </button>
        </Wrapper>
      </div>
    </>
  );
};
