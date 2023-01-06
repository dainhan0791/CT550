import { Button } from '@mui/material';
import React from 'react';
import SignInDialog from './SignInDialog';

const LeftNavBarSignInTo = () => {
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  const [openSignInDialog, setOpenSignInDialog] = React.useState(false);
  const [selectedValueSignInDialog, setSelectedValueSignInDialog] = React.useState(emails[1]);

  const handleClickOpenSignInDialog = () => {
    setOpenSignInDialog(true);
  };

  const handleCloseSignInDialog = (value: string) => {
    setOpenSignInDialog(false);
    setSelectedValueSignInDialog(value);
  };
  return (
    <>
      <Button variant="contained" size="medium" onClick={handleClickOpenSignInDialog} color="info">
        Log in
      </Button>
      <SignInDialog
        selectedValue={selectedValueSignInDialog}
        open={openSignInDialog}
        onClose={handleCloseSignInDialog}
      />
    </>
  );
};

export default LeftNavBarSignInTo;
