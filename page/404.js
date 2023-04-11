import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageView } from '@/roanuz/view/image';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Display50 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { translateV2 } from '@/roanuz/lib/utils';
import Graphics404 from '@/public/Graphics404.svg';

export const BaseNotFoundWrapper = styled.div`
  text-align: center;
  margin: ${asRem(50)}  ${asRem(20)};
  @media screen and (min-width: ${Breakpoint.lg}) {
    margin-top: ${asRem(180)};
    margin-bottom: ${asRem(180)};
  }

  >.notfound-container {
    h1 {
      margin-top: ${asRem(50)};
      margin-bottom: ${asRem(25)};
    }

    .rz-image-view {
      img {
        max-width: 50%;
        max-height: ${asRem(370)};
      }
    }
  }
`;

export const NotFound = () => {
  return (
    <NotFoundWrapper>
      <div className="notfound-container">
        <div className="graphics">
          <ImageView
            src={Graphics404}
            alt="Not found image"
          />
        </div>
        <Display50 as="h1">
          {translateV2('loadingMsg.PAGE_NOT_FOUND')}
        </Display50>
        <p>
          {translateV2('loadingMsg.PAGE_NOT_FOUND_BRIEF')}
          <Link href="/" prefetch={false}>
            <a alt="Links to Home">
              {translateV2('breadcrumb.HOME')}
            </a>
          </Link>
        </p>
      </div>
    </NotFoundWrapper>
  );
};

NotFound.propTypes = {
};

export const NotFoundWrapper = withDependencySupport(BaseNotFoundWrapper, 'NotFoundWrapper');
