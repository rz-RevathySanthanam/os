import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import Link from 'next/link';
import { BlogItemLayout } from '@/roanuz/layout/blogItemLayout';
import {
  DisplayBold20,
  Display32,
  Text16,
  DisplayBold18,
} from '../typopgraphy';
import { DatoCMSLinkConfig } from './datocms/linkConfig';
import { testIfMatchedSpecifiedModelType } from './datocms/types';
import { DatoImageView } from './cms/datoImageView';

export const BaseBlogViewWrapper = styled.div`
  .blog-items {
    display: flex;
    gap: ${asRem(40)};
    align-items: center;
    justify-content: space-between;
    @media screen and (min-width: ${Breakpoint.sm}) {
      gap: ${asRem(20)};
    }
    .blog-item {
      flex: 1;
      box-shadow: 0 0 ${asRem(6)} 0 #00000040;
      .blog-image {
        img {
          width: 100%;
          height: 100%;
        }
      }
      .blog-content {
        padding: ${asRem(20)};
        >p {
          margin-bottom: ${asRem(20)};
        }
      } 
      .blog-description {
        min-height: ${asRem(100)};
      }
    }
  }
  .all-blog-link {
    margin-top: ${asRem(24)};
    text-align: right;
    a {
      text-decoration: underline;
    }
  }
`;

export const BlogItemView = ({
  title,
  link,
  linkTitle,
  subtitle,
  description,
  image,
  linkWholeBlock = false,
}) => {
  const content = (
    <div className="blog-item">
      <BlogItemLayout
        title={title}
        link={link}
        linkTitle={linkTitle}
        subtitle={subtitle}
        description={description}
        image={image}
      />
    </div>
  );
  if (linkWholeBlock) {
    return (
      <Link href={link}>
        <a className="plain">
          {content}
        </a>
      </Link>
    );
  }
  return content;
};

BlogItemView.propTypes = {
  title: PropTypes.element,
  link: PropTypes.element,
  subtitle: PropTypes.element,
  description: PropTypes.element,
  image: PropTypes.element,
  linkWholeBlock: PropTypes.bool,
};

export const BaseBlogView = ({
  article,
}) => {
  const {
    title,
    model,
    specifiedModelType,
    linkSettings,
  } = article;

  return (
    <BlogViewWrapper className="rz-section-content">
      <DisplayBold18 className="blog-title">{title}</DisplayBold18>
      <div className="blog-items">
        {model.slice()
          .filter((item) => {
            return (
              testIfMatchedSpecifiedModelType(item, specifiedModelType)
            );
          })
          .map((data) => (
            <div className="blog-item">
              <DatoImageView className="blog-image" image={data.image} />
              <div className="blog-content">
                <Display32 as="h6" className="blog-title">{data.blogTitle}</Display32>
                <DisplayBold20 as="p" className="blog-subtitle">{data.subtitle}</DisplayBold20>
                <Text16 as="p" className="blog-description">{data.description}</Text16>
                <div className="blog-link">
                  <DatoCMSLinkConfig linkSettings={data.linkSettings} />
                </div>
              </div>
            </div>
          ))}
      </div>
      {linkSettings.length > 0 && (
        <div className="all-blog-link">
          <DatoCMSLinkConfig linkSettings={linkSettings} />
        </div>
      )}
    </BlogViewWrapper>
  );
};

BaseBlogView.propTypes = {
  article: PropTypes.object,
};

export const BlogView = withDependencySupport(BaseBlogView, 'BlogView');
export const BlogViewWrapper = withDependencySupport(BaseBlogViewWrapper, 'BlogViewWrapper');
