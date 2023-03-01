import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
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
        <Discover />
        <SCDivider />
      </SCBox>
      <SCBox>
        <AboutMeFooter />
      </SCBox>
    </SCLeftNavBarWapper>
  );
};

export default LeftSideBar;
