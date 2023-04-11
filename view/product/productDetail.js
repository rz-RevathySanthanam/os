import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as DownArrowIcon } from '@/roanuz/view/imgs/DownArrowLineIcon.svg';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { DisplayBold24, DisplayMedium18, Text14 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import MagentoHtml from '@/roanuz/widgets/MagentoHtml';
import { translateV2 } from '@/roanuz/lib/utils';
import { SVGIcon } from '../icon';
import { ImageView } from '../image';

export const BaseProductPageDetailViewWrapper = styled.div`
  >section {
    padding: ${asRem(20)} 0;

    >.section-title {
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: space-between;
      .rz-svg-icon {
        padding-right: ${asRem(10)};
      }
    }

    >.section-content {
      padding: ${asRem(5)} 0;
      display: flex;
      flex-direction: column;
      @media screen and (min-width: ${Breakpoint.sm}) {
        flex-direction: initial;
      }
      .rz-magento-html { 
        iframe {
          padding: ${asRem(20)} 0;
          max-width: 100%;
        }
        // To Remove unwannted <br> tags.
        br {
          display: block;
          content: ' ';
        }
      }
      >.left {
        padding-right: ${asRem(20)};

        p {
          min-width: ${asRem(240)};
          font-weight: 500;
          margin-bottom: ${asRem(5)};
        }
      }

      >.right {
        p {
          max-width: ${asRem(700)};
        }
        .rz-image-view {
          text-align: center;
          img {
              max-width: ${asRem(250)};
              max-height: ${asRem(300)};

              @media screen and (min-width: ${Breakpoint.sm}) {
                max-height: ${asRem(500)};              
              }
          }
        }
      }
    }

    &.detail-desc {
      .section-content {
        .right {
          font-size: ${asRem(16)};
          line-height: ${asRem(26)};
          ul {
            list-style: disc inside none;
          }
          p {
            &:not(:last-child) {
              padding-bottom: ${asRem(10)};
            }
          }
        }
      }
    }
    &.detail-spec {
      scroll-margin-top: ${asRem(82)}; // Height of Header
      .section-content {
        display: block;
      }
    }

    &.detail-energy {
      .section-content {
        .left {
          text-transform: uppercase;
        }
      }
    }
  }
`;

export const BaseProductPageDetailView = ({
  product, specificationsList, closedGroupsList, alsoCloseAble = null,
}) => {
  const [closedGroups, setClosedGroups] = useState(closedGroupsList);
  const canSwitchableGroups = [...closedGroupsList, alsoCloseAble];

  const tabGroups = [];

  if (product.detailDesc || product.shortDesc) {
    tabGroups.push({
      key: 'desc',
      class: 'detail-desc',
      title: translateV2('labelAndTitle.DETAIL_DESCRIPTION_TAB_TITLE'),
      id: 'product_detail_description',
    });
  }

  if (specificationsList && specificationsList.length) {
    tabGroups.push({
      key: 'spec',
      class: 'detail-spec',
      title: translateV2('labelAndTitle.SPECIFICATION_TAB_TITLE'),
      id: 'specification',
    });
  }

  // if (product.gallery.energyLabelImage) {
  //   tabGroups.push({
  //     key: 'energy',
  //     class: 'detail-energy',
  //     title: 'Orkunotkun',
  //   });
  // }

  const toggleGroup = (group) => {
    const index = closedGroups.indexOf(group);
    if (index === -1) {
      setClosedGroups([
        ...closedGroups,
        group,
      ]);
    } else {
      const newItems = closedGroups.filter((x) => x !== group);
      setClosedGroups(newItems);
    }
  };

  return (
    <ProductPageDetailViewWrapper className="product-detail-wrapper">
      {tabGroups.map((tabGroup) => (

        <section
          key={tabGroup.key}
          className={`product-detail-section ${tabGroup.class}`}
          id={tabGroup.id}
        >
          {canSwitchableGroups.includes(tabGroup.key) ? (
            <div
              className={`section-title ${(closedGroups.indexOf(tabGroup.key) > -1) ? 'closed' : ''}`}
              onClick={() => toggleGroup(tabGroup.key)}
              onKeyDown={() => toggleGroup(tabGroup.key)}
              role="presentation"
              id={tabGroup.id}
            >
              <DisplayBold24>{tabGroup.title}</DisplayBold24>
              <SVGIcon
                heightPx={22}
                upsideDown={closedGroups.indexOf(tabGroup.key) > -1}
              >
                <DownArrowIcon />
              </SVGIcon>
            </div>
          ) : (
            <div className="section-title">
              <DisplayBold24>{tabGroup.title}</DisplayBold24>
            </div>
          )}
          {closedGroups.indexOf(tabGroup.key) === -1 && (
            <div className="section-content">
              {(tabGroup.key === 'desc') && (
                <>
                  {/* <div className="left">
                    <DisplayMedium18>Nánari tæknilýsing</DisplayMedium18>
                  </div> */}
                  <div className="right">
                    <Text14>
                      {product.detailDesc ? (
                        <MagentoHtml
                          html={product.detailDesc}
                        />
                      ) : (
                        <MagentoHtml
                          html={product.shortDesc}
                        />
                      )}
                    </Text14>
                  </div>
                </>
              )}
              {/* {(tabGroup.key === 'spec') && spec} */}
              {(tabGroup.key === 'spec') && specificationsList}
              {(tabGroup.key === 'energy') && (
                <>
                  <div className="left">
                    <DisplayMedium18>{product.energyLabel}</DisplayMedium18>
                  </div>
                  <div className="right">
                    <ImageView
                      src={product.gallery.energyLabelImage.url}
                      alt="Product's Energy label"
                      skipMediaUrlFix={!product.gallery.hasRzGalleryMeta}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      ))}
    </ProductPageDetailViewWrapper>
  );
};

BaseProductPageDetailView.propTypes = {
  product: PropTypes.object,
  specificationsList: PropTypes.element,
  closedGroupsList: PropTypes.array,
  alsoCloseAble: PropTypes.string,
};

export const ProductPageDetailView = withDependencySupport(BaseProductPageDetailView, 'ProductPageDetailView');
export const ProductPageDetailViewWrapper = withDependencySupport(BaseProductPageDetailViewWrapper, 'ProductPageDetailViewWrapper');
