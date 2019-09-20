import React from 'react';
import PropTypes from 'prop-types';
import { HeaderLayoutWrapper } from '../styles/layout';
import { PageTitle, SmallText, CapitalText } from './typography';

function Header({ isSocketConnected }) {
  return (
    <HeaderLayoutWrapper>
      <PageTitle>Entropy Party</PageTitle>
      <SmallText>
        Connection:{' '}
        <CapitalText>{isSocketConnected ? 'open' : 'closed'}</CapitalText>
      </SmallText>
    </HeaderLayoutWrapper>
  );
}

Header.propTypes = {
  isSocketConnected: PropTypes.bool,
};

export default Header;
