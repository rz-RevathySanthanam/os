import React from 'react';
import PropTypes from 'prop-types';
import { HomePageBannerController } from '@/roanuz/controller/cms/homePageBanner';
import { DynamicSectionArticleController } from '@/roanuz/controller/dynamicSectionArticle';
import { BlocksListView } from '@/roanuz/widgets/Block';
import MagentoHtml from '@/roanuz/widgets/MagentoHtml';
import { parser } from '@/roanuz/store/modelParser';
import { TwoColumnArticleView } from './twoColumnArticle';
import { ValuePropositionView } from '../valuePropositionView';
import { DatoCmsArticleTypes, SpecifiedModelType, testIfMatchedSpecifiedModelType } from './types';
import { TestimonialView } from '../testimonial';
import { FaqView } from '../faqView';
import { MarqueScrollView } from '../marqueScrollView';
import { DatoCmsDynamicBlockView } from './datoCmsDynamicBlockView';
import { StaffListView } from '../staffListView';

export const DatoCMSPageSectionsView = ({ article }) => {
  if (!article.enableArticle && Object.keys(article).includes('enableArticle')) {
    return null;
  }
  // eslint-disable-next-line no-underscore-dangle
  const kind = article.__typename;
  if (kind === DatoCmsArticleTypes.RzTwoColumnArticle) {
    return (
      <TwoColumnArticleView article={article} />
    );
  }
  if (kind === DatoCmsArticleTypes.RzChooseExistingModelArticle) {
    if (article.specifiedModelType === SpecifiedModelType.PageBanner) {
      const articleRef = {
        ...article,
        model: article.model.filter((item) => {
          return (
            testIfMatchedSpecifiedModelType(item, article.specifiedModelType)
          );
        }),
      };
      return (
        <HomePageBannerController dataSuppliedFromParent={articleRef} />
      );
    }
    if (article.specifiedModelType === SpecifiedModelType.ValueProposition) {
      return (
        <ValuePropositionView article={article} />
      );
    }
    if (article.specifiedModelType === SpecifiedModelType.Testimonial) {
      return (
        <TestimonialView article={article} />
      );
    }
    if (article.specifiedModelType === SpecifiedModelType.Faq) {
      return (
        <FaqView article={article} />
      );
    }
    if (article.specifiedModelType === SpecifiedModelType.StaffModel) {
      return (
        <StaffListView article={article} />
      );
    }
    return parser('any.getCustomisedView', article);
  }
  if (kind === DatoCmsArticleTypes.RzDynamicSectionArticle) {
    return (
      <DatoCmsDynamicBlockView>
        <DynamicSectionArticleController article={article} />
      </DatoCmsDynamicBlockView>
    );
  }
  if (kind === DatoCmsArticleTypes.RzMagentoBlockArticle) {
    return (
      <DatoCmsDynamicBlockView className="cms-block-view">
        <BlocksListView blockIds={[article.blockIdentifier]} />
      </DatoCmsDynamicBlockView>
    );
  }
  if (kind === DatoCmsArticleTypes.RzMarqueBlockArticle) {
    return (
      <MarqueScrollView text={article.marqueText} />
    );
  }
  if (kind === DatoCmsArticleTypes.RzStaticPageBlockArticle) {
    return (
      <div className={`${article.contentClassName} rz-section-content`}>
        <MagentoHtml html={article.staticPageContent} className={article.contentClassName} />
      </div>
    );
  }
  console.log('Unhandled Section', kind);

  return null;
};

DatoCMSPageSectionsView.propTypes = {
  article: PropTypes.object.isRequired,
};
