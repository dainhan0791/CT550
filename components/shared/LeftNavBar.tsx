import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import LeftSideBarLogInTo from '../common/LeftSideBarLogInTo';
import LeftSideBarMenu from '../menus/LeftSideBarMenu';
import AboutMeFooter from './AboutMeFooter';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';

const SCLeftNavBarWapper = styled.div``;

const SCDivider = styled(Divider)`
  margin: 0 1rem;
`;

const LeftSideBar = () => {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <SCLeftNavBarWapper>
      <>
        <LeftSideBarMenu />
        <SCDivider />
      </>
      <>
        {!isLogin && <LeftSideBarLogInTo />}
        <SCDivider />
      </>

      <>
        <SuggestedAccounts />
        <SCDivider />
      </>
      <>
        <Discover />
        <SCDivider />
      </>
      <>
        <AboutMeFooter />
      </>
    </SCLeftNavBarWapper>
  );
};

export default LeftSideBar;
