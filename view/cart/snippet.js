import styled from 'styled-components';
import React from 'react';
import { asRem } from '@/roanuz/lib/css';
import { Row } from '@/roanuz/layout';
import { DisplayBold20, Text16 } from '@/roanuz/typopgraphy';
import PropTypes from 'prop-types';
import { RawHtmlView } from '@/roanuz/view/rawHtml';
import { SVGIcon } from '../icon';

const SnippetViewWrapper = styled.div`
  margin-top: ${asRem(40)};
  .rz-row {
    gap: ${asRem(16)};
    margin-bottom: ${asRem(56)};
    .snippet-content {
      .snippet-title {
        margin-bottom: ${asRem(8)};
      }
    }
  }
`;

export const SnippetsView = ({ snippets }) => {
  return (
    <SnippetViewWrapper>
      {snippets?.map((snippet) => (
        <Row key={snippet.title}>
          <SVGIcon heightPx={22}>
            {snippet.icon}
          </SVGIcon>
          <div className="snippet-content">
            <DisplayBold20 className="snippet-title">{snippet.title}</DisplayBold20>
            <Text16>
              <RawHtmlView html={snippet.content} />
            </Text16>
          </div>
        </Row>
      ))}
    </SnippetViewWrapper>
  );
};

SnippetsView.propTypes = {
  snippets: PropTypes.object.isRequired,
};
