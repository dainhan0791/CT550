import React from 'react';

import styled from 'styled-components';
import AccountItem from '../items/AccountItem';
// firebase
import { collection, getDocs, query } from 'firebase/firestore';
import { fStore } from '../../firebase/init.firebase';
import { IAccountItem } from '../../interfaces/account.interface';
import { useAppSelector } from '../../redux/hooks/hooks';
import { Skeleton } from '@mui/material';

const SCSuggestedAccountsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 18rem;
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
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [suggestedAccounts, setSuggestedAccounts] = React.useState<any>([]);

  React.useEffect(() => {
    getSuggestedAccount();
  }, [accessToken]);

  const getSuggestedAccount = async () => {
    try {
      const q = query(collection(fStore, 'users'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      data && setSuggestedAccounts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SCSuggestedAccountsWrapper>
      <SCSuggestedAccountsLabel>Suggested accounts</SCSuggestedAccountsLabel>
      {!suggestedAccounts.length && (
        <Skeleton variant="rounded" style={{ width: '100%', height: '18rem' }}>
          <AccountItem name={''} nickname={''} photoURL={''} tick={false} uid={''} />
        </Skeleton>
      )}
      {suggestedAccounts &&
        suggestedAccounts.map((account: IAccountItem) => (
          <AccountItem
            key={account.uid}
            uid={account.uid}
            name={account.name}
            nickname={account.nickname}
            photoURL={account.photoURL}
            tick={account.tick}
          />
        ))}
      <SCSeeAll>See All</SCSeeAll>
    </SCSuggestedAccountsWrapper>
  );
};

export default SuggestedAccounts;
