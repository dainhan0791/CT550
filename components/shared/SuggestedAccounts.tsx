import React from 'react';

import styled from 'styled-components';
import AccountItem from '../items/AccountItem';

const SCSuggestedAccountsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SCSuggestedAccountsLabel = styled.p`
  margin: 1rem 1rem 0 1rem;
  color: rgba(22, 24, 35, 0.6);
  font-weight: 600;
`;

const SCSeeAll = styled.p`
  color: rgb(254, 44, 85);
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const SuggestedAccounts = () => {
  return (
    <SCSuggestedAccountsWrapper>
      <SCSuggestedAccountsLabel>Suggested accounts</SCSuggestedAccountsLabel>
      <AccountItem video={false} />
      <SCSeeAll>See All</SCSeeAll>
    </SCSuggestedAccountsWrapper>
  );
};

export default SuggestedAccounts;
