import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TwoColumnSectionLayout } from '@/roanuz/layout/datocms/twoColumnArticleLayout';
import { DatoImageView } from '@/roanuz/view/cms/datoImageView';
import { Display50, Tiny } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Breakpoint, asRem } from '@/roanuz/lib/css';
import { RawHtmlView } from '@/roanuz/view/rawHtml';
import { DatoCMSLinkConfig } from './linkConfig';

export const BaseTwoColumnArticleViewWrapper = styled.div`
  .column-1 {
    .section-pretitle, .section-title {
      display: none;
    }
  }
  .section-link {
    a:not(.plain-text) {
      background-color: var(--color-button);
      color: var(--color-text-rev);
      border: ${asRem(1)} solid var(--color-button);
      display: inline-block;
      padding: ${asRem(10)} ${asRem(24)};
      border-radius: ${asRem(80)};
      transition: 0.3s ease;
      &:hover {
        text-decoration: none;
        background-color: var(--color-text-rev);
        color: var(--color-button);
      }
    }
    a.plain-text {
      &:hover {
        opacity: 0.8;
      }
    }
  }
  &.zig-zag-mode {
    >div {
      @media screen and (min-width: ${Breakpoint.sm}) {
        flex-direction: row;
      }
    }
    .section-desc {
      .rz-magento-html {
        a:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;

export const TwoColumnArticleView = ({ article }) => {
  const {
    displayMode,
    title,
    smallPreTitle,
    description,
    cssClass,
    sectionImage,
    linkSettings,
  } = article;
  return (
    <TwoColumnArticleViewWrapper className={cssClass}>
      <TwoColumnSectionLayout
        displayMode={displayMode}
        image={sectionImage && (
          <DatoImageView image={sectionImage} />
        )}
        title={title && (
          <Display50>{title}</Display50>
        )}
        smallPreTitle={smallPreTitle && (
          <Tiny>{smallPreTitle}</Tiny>
        )}
        desc={description && (
          <p>
            <RawHtmlView html={description} />
          </p>
        )}
        link={linkSettings && (
          <DatoCMSLinkConfig linkSettings={linkSettings} />
        )}
      />
    </TwoColumnArticleViewWrapper>
  );
};

TwoColumnArticleView.propTypes = {
  article: PropTypes.object.isRequired,
};

export const TwoColumnArticleViewWrapper = withDependencySupport(BaseTwoColumnArticleViewWrapper, 'TwoColumnArticleViewWrapper');
