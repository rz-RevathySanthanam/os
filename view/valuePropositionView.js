import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { ImageView, NoImageView } from '@/roanuz/view/image';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Text16, DisplayBold24 } from '@/roanuz/typopgraphy';
import { LinkType } from '@/roanuz/view/datocms/linkConfig';
import { testIfMatchedSpecifiedModelType } from '@/roanuz/view/datocms/types';

export const BaseValuePropositionViewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: ${Breakpoint.sm}) {
    justify-content: space-around;
  }
  
 .value-proposition-item {
    margin-bottom: ${asRem(60)};
    padding: 0 ${asRem(20)};
    text-align: center;
    flex: 1;

    .rz-image-view {
      margin: 0 auto ${asRem(30)};
      height: ${asRem(40)};
      img {
        max-height: 100%;
      }
    }
    
    .value-proposition-title {
      margin-bottom: ${asRem(10)};
      white-space: nowrap;
    }

    a {
      display: inline-block;
      :hover {
        cursor: pointer;
        .value-proposition-desc {
          color: var(--color-text);
        }
      }
    }
 }
`;

export const PropositionContent = ({ item }) => {
  return (
    <>
      {item.iconOrImage ? (
        <ImageView
          src={item.iconOrImage.url}
          alt={item.iconOrImage.alt || 'Value Proposition Icon'}
        />
      ) : (<NoImageView />)}
      <DisplayBold24 className="value-proposition-title">{item.title}</DisplayBold24>
      <Text16 className="value-proposition-desc">{item.description}</Text16>
    </>
  );
};

PropositionContent.propTypes = {
  item: PropTypes.object,
};

export const ValuePropositionView = ({ article }) => {
  return (
    <ValuePropositionViewWrapper className="rz-section-content">
      {article?.model?.slice()
        .sort((x, y) => x.sortOrder - y.sortOrder)
        .filter((item) => {
          return (
            testIfMatchedSpecifiedModelType(item, article.specifiedModelType)
          );
        })
        .map((item) => {
          const isLink = item.linkSettings[0].link
          && (item.linkSettings[0].format === LinkType.linkToEntireSection);

          return (
            <div className="value-proposition-item">
              {isLink ? (
                <Link
                  href={item.linkSettings[0].link}
                  key={item.id}
                >
                  <a className="plain" key={item.title}>
                    <PropositionContent item={item} />
                  </a>
                </Link>
              ) : (
                <PropositionContent item={item} />
              )}
            </div>
          );
        })}
    </ValuePropositionViewWrapper>
  );
};

ValuePropositionView.propTypes = {
  article: PropTypes.object,
};

export const ValuePropositionViewWrapper = withDependencySupport(BaseValuePropositionViewWrapper, 'ValuePropositionViewWrapper');
