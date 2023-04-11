export const DatoCmsArticleTypes = {
  RzTwoColumnArticle: 'RzTwoColumnArticle',
  RzChooseExistingModelArticle: 'RzChooseExistingModelArticle',
  RzDynamicSectionArticle: 'RzDynamicSectionArticle',
  RzMagentoBlockArticle: 'RzMagentoBlockArticle',
  RzMarqueBlockArticle: 'RzMarqueBlockArticle',
  RzStaticPageBlockArticle: 'RzStaticPageBlockArticle',
};

export const TwoColumnArticleLayoutTypes = {
  Left_Side_Image_Right_Side_Content: 'Left_Side_Image_Right_Side_Content',
  Right_Side_Image_Left_Side_Content: 'Right_Side_Image_Left_Side_Content',
  Image_At_Top_Content_At_Bottom: 'Image_At_Top_Content_At_Bottom',
  Image_At_Bottom_Content_At_Top: 'Image_At_Bottom_Content_At_Top',
  Zig_Zag_Layout_Based_on_Class: 'Zig_Zag_Layout_Based_on_Class',
};

export const SpecifiedModelType = {
  PageBanner: 'PageBanner',
  ValueProposition: 'ValueProposition',
  Testimonial: 'Testimonial',
  Faq: 'Faq',
  StaffModel: 'StaffModel',
  Cocktail: 'Cocktail',
};

export function testIfMatchedSpecifiedModelType(item, modelType) {
  // eslint-disable-next-line no-underscore-dangle
  return item.__typename.includes(modelType.trim());
}
