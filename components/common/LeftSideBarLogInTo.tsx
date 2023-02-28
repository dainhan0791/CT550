import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/hooks/hooks';
import LoginDialog from '../dialogs/LoginDialog';

const LeftSideBarLogInTo = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const [openLogInDialog, setOpenLogInDialog] = React.useState(false);

  const handleClickOpenLogInDialog = () => {
    setOpenLogInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenLogInDialog(false);
  };

  return (
    <>
      {!isLogin && (
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
          <LoginDialog open={openLogInDialog} onClose={handleCloseSignInDialog} />
        </>
      )}
    </>
  );
};
const SCTextLoginTo = styled.p`
  color: rgba(22, 24, 35, 0.5);
  font-size: 1rem;
  line-height: 22px;
  margin-top: 1rem;
  margin-left: 1rem;
`;
export default LeftSideBarLogInTo;
