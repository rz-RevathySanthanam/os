import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '../lib/css';

export const BasePageWrapper = styled.div`

  @media screen and (min-width: ${Breakpoint.sm}) {
    margin-bottom: 0;
  }
`;

export const Container = styled.div`
  &.rz-page-bottom-content {
    margin-top: ${asRem(80)};
  }

  &.rz-page-bottom-links {
     background-color: var(--color-footer-background);
  }

  &.rz-page-legal {
    >div:not(:empty) {
      border-top: 1px solid var(--color-disabled-4);
    }
  }

  &.rz-page-sticky {
    >.default-style {
      padding-top: ${asRem(40)};
      >.container-widgets {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        padding: ${asRem(20)};
        background: #fff;
        text-align: center;
        box-shadow: -2px -3px 8px -1px rgba(0,0,0,0.25);
      }
    }
  }
`;

const TopWrapper = styled.div`
  @media screen and (min-width: ${Breakpoint.sm}) {
    position: sticky;
    top: 0;
    z-index: 100;
  }
`;

const TopContainer = styled(Container)`
`;

export const PageLayout = ({
  topBrands,
  topSticky,
  topContent,
  content,
  bottomContent,
  bottomLinks,
  bottomLegal,
  bottomSticky,
  announcementBar,
}) => {
  return (
    <PageWrapper>
      {announcementBar && (
        <Container>{announcementBar}</Container>
      )}
      {topBrands && (
        <Container className="hide-mobile">{topBrands}</Container>
      )}
      {topSticky && (
        <TopWrapper>
          <TopContainer>
            {topSticky}
          </TopContainer>
        </TopWrapper>
      )}
      {topContent && (
        <Container>{topContent}</Container>
      )}
      {content && (
        <Container className="rz-main-content-backup">{content}</Container>
      )}
      {bottomContent && (
        <Container className="rz-page-bottom-content">{bottomContent}</Container>
      )}
      {bottomLinks && (
        <Container className="rz-page-bottom-links">{bottomLinks}</Container>
      )}
      {bottomLegal && (
        <Container className="rz-page-legal">{bottomLegal}</Container>
      )}
      {bottomSticky && (
        <Container className="rz-page-sticky">{bottomSticky}</Container>
      )}
    </PageWrapper>
  );
};

PageLayout.propTypes = {
  topBrands: PropTypes.element,
  topSticky: PropTypes.element,
  topContent: PropTypes.element,
  content: PropTypes.element,
  bottomContent: PropTypes.element,
  bottomLinks: PropTypes.element,
  bottomLegal: PropTypes.element,
  bottomSticky: PropTypes.element,
  announcementBar: PropTypes.element,
};

export const PageWrapper = withDependencySupport(BasePageWrapper, 'PageWrapper');

export default PageLayout;
