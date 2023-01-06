import { Divider } from '@mui/material';
import React from 'react';
import LeftNavBarSignInTo from '../feedback/LeftNavBarSignInTo';
import LeftNavBarMenu from '../navigation/LeftNavBarMenu';

const LeftNavBar = () => {
  return (
    <>
      <LeftNavBarMenu />
      <Divider />
      <LeftNavBarSignInTo />
      <Divider />
    </>
  );
};

export default LeftNavBar;
