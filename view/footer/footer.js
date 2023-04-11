import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { FooterLayout } from '@/roanuz/layout/footer';
import { Row } from '@/roanuz/layout';
import { SocialLinksData } from '@/roanuz/view/footer/siteLinks.data';
import { PrivacyLinksView } from './privacyLinks';
import { SiteLinks } from './siteLinks';
import { StoreInformationStaticData } from './storeInformation.data';
import { CertifyMarksView } from './certifyMarks';
import { SocialLinks } from './socialLinks';
import { SupportLinks } from './supportLinks';

export const BaseFooterViewWrapper = styled.div`
  color: var(--color-text-rev);
`;

export const BaseFooterView = ({
  newsLetter,
}) => {
  return (
    <FooterViewWrapper>
      <FooterLayout
        className="footer-view hide-on-print"
        leftItems={(
          <>
            {newsLetter}
            <CertifyMarksView />
          </>
        )}
        centerItems={(
          <>
            <Row spaceBetween>
              <SupportLinks data={StoreInformationStaticData} />
              <SiteLinks />
            </Row>
            <SocialLinks socialLinks={SocialLinksData.socialLinksList} />
          </>
        )}
        secondaryRowItems={(<PrivacyLinksView />)}
      />
    </FooterViewWrapper>
  );
};

BaseFooterView.propTypes = {
  newsLetter: PropTypes.element,
};

export const FooterView = withDependencySupport(BaseFooterView, 'FooterView');
export const FooterViewWrapper = withDependencySupport(BaseFooterViewWrapper, 'FooterViewWrapper');
