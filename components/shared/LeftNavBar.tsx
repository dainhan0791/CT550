import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import LeftSideBarLogInTo from '../feedback/LeftSideBarLogInTo';
import LeftSideBarMenu from '../navigation/LeftSideBarMenu';
import SuggestedAccounts from './SuggestedAccounts';

const SCDivider = styled(Divider)`
  margin: 0 1rem;
`;

const LeftSideBar = () => {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <>
      <LeftSideBarMenu />
      <SCDivider />
      {!isLogin && <LeftSideBarLogInTo />}
      <SCDivider />
      <SuggestedAccounts />
    </>
  );
};

export default LeftSideBar;
