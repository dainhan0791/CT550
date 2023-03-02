import { Divider } from '@mui/material';
import { collection, getDocs, query } from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components';
import { fStore } from '../../firebase/init.firebase';
import { IDiscoverItem } from '../../interfaces/discover.interface';
import { useAppSelector } from '../../redux/hooks/hooks';
import LeftSideBarLogInTo from '../common/LeftSideBarLogInTo';
import LeftSideBarMenu from '../menus/LeftSideBarMenu';
import AboutMeFooter from './AboutMeFooter';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';

const SCLeftNavBarWapper = styled.div`
  width: 100%;
`;
const SCBox = styled.div`
  width: 360px;
`;

const SCDivider = styled(Divider)`
  margin: 0 1rem;
  height: 1px;
`;

const LeftSideBar = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const [discover, setDiscover] = React.useState<Array<IDiscoverItem>>([]);

  const getDiscover = async () => {
    try {
      const q = query(collection(fStore, 'discover'));
      const videoSnapshot = await getDocs(q);
      const data = videoSnapshot.docs.map((doc) => doc.data());
      data && setDiscover(data as Array<IDiscoverItem>);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDiscover();
  }, []);

  return (
    <SCLeftNavBarWapper>
      <SCBox>
        <LeftSideBarMenu />
        <SCDivider />
      </SCBox>

      {!isLogin && (
        <SCBox>
          <LeftSideBarLogInTo />
          <SCDivider />
        </SCBox>
      )}

      <SCBox>
        <SuggestedAccounts />
        <SCDivider />
      </SCBox>
      <SCBox>
        <Discover discover={discover} />
        <SCDivider />
      </SCBox>
      <SCBox>
        <AboutMeFooter />
      </SCBox>
    </SCLeftNavBarWapper>
  );
};

export default LeftSideBar;
