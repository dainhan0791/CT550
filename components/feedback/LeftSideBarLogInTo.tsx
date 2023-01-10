import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import LoginDialog from './LoginDialog';

const LeftSideBarLogInTo = () => {
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  const [openLogInDialog, setOpenLogInDialog] = React.useState(false);
  const [selectedValueSignInDialog, setSelectedValueSignInDialog] = React.useState(emails[1]);

  const handleClickOpenLogInDialog = () => {
    setOpenLogInDialog(true);
  };

  const handleCloseSignInDialog = (value: string) => {
    setOpenLogInDialog(false);
    setSelectedValueSignInDialog(value);
  };

  const SCTextLoginTo = styled.p`
    color: rgba(22, 24, 35, 0.5);
    font-size: 1rem;
    line-height: 22px;
    margin-top: 1rem;
    margin-left: 1rem;
  `;
  return (
    <>
      <SCTextLoginTo>Log in to follow creators, like videos, and view comments.</SCTextLoginTo>
      <Button
        variant="outlined"
        size="medium"
        onClick={handleClickOpenLogInDialog}
        color="info"
        sx={{ width: '90%', margin: '1rem', height: '3rem' }}
      >
        Log in
      </Button>
      <LoginDialog selectedValue={selectedValueSignInDialog} open={openLogInDialog} onClose={handleCloseSignInDialog} />
    </>
  );
};

export default LeftSideBarLogInTo;
