import { gql } from '@apollo/client';

export const ResponsiveImageFragment = gql`
  fragment ResponsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    base64
  }
`;

export const GalleryImageRecordFragment = gql`
  ${ResponsiveImageFragment}
  fragment GalleryImageRecordFragment on GalleryImageRecord {
    id
    cssClass
    link
    image {
      responsiveImage(imgixParams: {fit: fill, w: "1280"}) {
        ...ResponsiveImageFragment
      }
    }
    imageTablet {
      responsiveImage(imgixParams: {fit: fill, w: "1280"}) {
        ...ResponsiveImageFragment
      }
    }
    imageMobile {
      responsiveImage(imgixParams: {fit: fill, w: "670"}) {
        ...ResponsiveImageFragment
      }
    }
  }
`;

export const HomePageBannersQuery = gql`
  ${GalleryImageRecordFragment}
  query HomePageBannersQuery($websiteId: ItemId!) {
    allHomePageBanners(first: 100, filter: {website: {eq: $websiteId}, enable: {eq: true}}) {
      online
      offline
      useAsFallback
      images {
        ...GalleryImageRecordFragment
      }
    }
  }
`;

const RzLinkSettings = 'linkSettings {link linkTitle isExternalLink format}';

const RzfSmallImage = 'url alt';

export const DatoCmsPageQuery = gql`
  query DatoCmsPageQuery (
      $pageId: String!
    ) {
    rzfDatoCmsPage (
      pageId: $pageId
    ) {
      pageTitle
      rzdPageId
      seoSet {
        meta_title: metaTitle
        meta_description: metaDescription
        meta_keywords: metaKeywords
      }
      pageDetail {
        __typename
        ... on RzTwoColumnArticle {
          title
          smallPreTitle
          description
          displayMode
          cssClass
          sectionImage {
            responsiveImage {
              ... on RzImageResponsiveImage {
                src
                width
                height
                aspectRatio
                alt
                title
                base64
              }
            }
          }
          enableArticle
          ${RzLinkSettings}
        }
        ... on RzDynamicSectionArticle {
          title
          slug
          description
          enableArticle
        }
        ... on RzMagentoBlockArticle {
          title
          titleLink
          description
          blockIdentifier
          cssClass
          enableArticle
        }
        ... on RzMarqueBlockArticle {
          marqueText
          enableArticle
        }
        ... on RzChooseExistingModelArticle {
          privateNote
          title
          specifiedModelType
          enableArticle
          model {
            ... on RzPageBannerModel {
              online
              offline
              enable
              images {
                ${RzLinkSettings}
                image {
                  responsiveImage {
                    ... on RzImageResponsiveImage {
                      srcSet
                      webpSrcSet
                      sizes
                      src
                      width
                      height
                      aspectRatio
                      alt
                      title
                      base64
                    }
                  }
                }
                imageTablet {
                  responsiveImage {
                    ... on RzImageResponsiveImage {
                      srcSet
                      webpSrcSet
                      sizes
                      src
                      width
                      height
                      aspectRatio
                      alt
                      title
                      base64
                    }
                  }
                }
                imageMobile {
                  responsiveImage {
                    ... on RzImageResponsiveImage {
                      srcSet
                      webpSrcSet
                      sizes
                      src
                      width
                      height
                      aspectRatio
                      alt
                      title
                      base64
                    }
                  }
                }
              }
            }
            ... on RzdValuePropositionModel {
              iconOrImage { ${RzfSmallImage} }
              ${RzLinkSettings}
              sortOrder
              privateNote
              title
              description
            }
            ... on RzdTestimonialModel {
              image { ${RzfSmallImage} }
              ${RzLinkSettings}
              sortOrder
              privateNote
              title
              description
            }
            ... on RzdFaqModel {
              faqLink
              privateNote
              sortOrder
              title
              description
            }
            ... on RzdStaffModel {
              firstname
              lastname
              designation
              email
              telephone
              staffImage { ${RzfSmallImage} }
              sortOrder
            }
            ... on RzdCocktailModel {
              title
              id
              image { 
                url
                alt
              }
              brand {
                name
                id
              }
            }
          }
        }
        ... on RzStaticPageBlockArticle {
          staticPageContent
          contentClassName
        }
      }
    }
  }
`;

export const AnnouncementsQuery = gql`
  query AnnouncementsQuery {
    rzfAnnouncements {
      content
    }
  }
`;
