import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import {
  Text14,
  DisplayBold20,
  DisplayBold24,
} from '@/roanuz/typopgraphy';
import { SVGIcon } from '@/roanuz/view/icon';
import { RawHtmlView } from '@/roanuz/view/rawHtml';
import { Row } from '@/roanuz/layout';
import Link from 'next/link';
import { translateV2 } from '@/roanuz/lib/utils';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseSupportLinksWrapper = styled.div`
  max-width: ${asRem(700)};
  margin-bottom: ${asRem(40)};
  .store-title {
    margin-bottom: ${asRem(24)};
  }
  >.rz-row {
    flex-wrap: wrap;
    gap: ${asRem(30)};
    @media screen and (min-width: ${Breakpoint.md}) {  
      gap: ${asRem(48)};
    }
    >.rz-row {
      align-items: center;
      gap: ${asRem(16)};
      min-width: ${asRem(235)};
      flex: 1;
      h4 {
        margin-bottom: ${asRem(4)};
      }
      a {
        color: inherit;
        margin: 0;
      }
      >.rz-svg-icon {
        background-color: var(--color-button);
        border-radius: 50%;
        width: ${asRem(60)};
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          height: ${asRem(22)};
        }
      }
    }
  }
`;

export const SupportLinks = ({ data }) => {
  return (
    <SupportLinksWrapper>
      <DisplayBold24 className="store-title">
        {translateV2('footer.STORE_TITLE')}
      </DisplayBold24>
      <Row>
        {data?.map((item) => (
          <Row>
            {item.icon && (
            <SVGIcon heightPx={60}>
              {item.icon}
            </SVGIcon>
            )}
            <div>
              {item.title && (
              <DisplayBold20>
                <RawHtmlView html={item.title} />
              </DisplayBold20>
              )}
              {item.content && (
              <Text14>
                <Link href={item.link || '/'}>
                  <a>
                    <RawHtmlView html={item.content} />
                  </a>
                </Link>
              </Text14>
              )}
            </div>
          </Row>
        ))}
      </Row>
    </SupportLinksWrapper>
  );
};

SupportLinks.propTypes = {
  data: PropTypes.array,
};

export const SupportLinksWrapper = withDependencySupport(BaseSupportLinksWrapper, 'SupportLinksWrapper');
