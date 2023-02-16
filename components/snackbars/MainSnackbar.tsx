import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import styled from 'styled-components';

interface ISnackbarProps {
  message: string;
  open: boolean;
  close: Function;
  severity: any;
}
const MainSnackbar = (props: ISnackbarProps) => {
  const handleCloseSnackBar = () => {
    props.close && props.close();
  };

  return (
    <SCSnackbar
      open={props.open}
      autoHideDuration={2000}
      onClose={handleCloseSnackBar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <SCAlert
        onClose={handleCloseSnackBar}
        severity={props.severity ? props.severity : 'success'}
        sx={{ width: '100%' }}
      >
        {props.message}
      </SCAlert>
    </SCSnackbar>
  );
};
const SCSnackbar = styled(Snackbar)``;
const SCAlert = styled(Alert)``;

export default MainSnackbar;
