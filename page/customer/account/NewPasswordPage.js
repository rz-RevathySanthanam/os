import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import { translateV2 } from '@/roanuz/lib/utils';
import { StoreConfigConsumer } from '@/roanuz/store/core/context';
import { NewPasswordController } from '@/roanuz/controller/customer/newPassword';

const NewPasswordPageWrapper = styled.div`
`;

const NewPasswordPage = ({ token }) => {
  return (
    <StoreConfigConsumer>
      {() => (
        <NewPasswordPageWrapper>
          <Head>
            <title>
              {translateV2('labelAndTitle.NEW_PASSWORD')}
            </title>
            <meta name="description" content={translateV2('labelAndTitle.NEW_PASSWORD')} />
          </Head>
          <div className="rz-section-content">
            <NewPasswordController token={token} />
          </div>
        </NewPasswordPageWrapper>
      )}
    </StoreConfigConsumer>
  );
};

NewPasswordPage.propTypes = {
  token: PropTypes.string,
};

export default NewPasswordPage;
