import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { clearUser } from '../../redux/slices/auth.slice';
import SettingsUserDialog from '../dialogs/SettingsUserDialog';
import { handleSignOutFirebase } from '../../firebase/utils.firebase';
import MainSnackbar from '../snackbars/MainSnackbar';
import { SIGN_OUT_ERROR, SIGN_OUT_SUCESS, SNACKBAR_ERROR, SNACKBAR_SUCESS } from '../../constants/snackbar.constant';
import { removeIdTokenFromLocalStorage } from '../../utils/auth.localstorage';
import LogoutIcon from '@mui/icons-material/Logout';
import { Logout } from '@mui/icons-material';
import styled from 'styled-components';

const AccountSettingMenu = ({
  anchorEl,
  id,
  open,
  onClose,
  onClick,
  PaperProps,
  transformOrigin,
  anchorOrigin,
}: {
  anchorEl: any;
  id: string;
  open: any;
  onClose: any;
  onClick: any;
  PaperProps: object;
  transformOrigin: any;
  anchorOrigin: any;
}) => {
  const dispatch = useAppDispatch();
  const [openSettingsUserDialog, setOpenSettingsUserDialog] = React.useState<boolean>(false);
  const handleOpenSettingsUserDialog = () => {
    setOpenSettingsUserDialog(true);
  };
  const handleCloseSettingsUserDialog = () => {
    setOpenSettingsUserDialog(false);
  };
  // handle open snackbar
  // const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  // const [messageSnackbar, setMessageSnackbar] = React.useState<string>('');
  // const [severitySnackbar, setSeveritySnackbar] = React.useState<string>('');

  // const handleOpenSnackbar = () => {
  //   setOpenSnackbar(true);
  // };
  // const handleCloseSnackbar = () => {
  //   setOpenSnackbar(false);
  // };

  // const openSnackbarSignOutSuccess = () => {
  //   setMessageSnackbar(SIGN_OUT_SUCESS);
  //   handleOpenSnackbar();
  //   setSeveritySnackbar(SNACKBAR_SUCESS);
  // };

  // const openSnackbarSignOutError = () => {
  //   setMessageSnackbar(SIGN_OUT_ERROR);
  //   handleOpenSnackbar();
  //   setSeveritySnackbar(SNACKBAR_ERROR);
  // };

  const handleLogout = async () => {
    try {
      dispatch(clearUser());
      removeIdTokenFromLocalStorage();
      await handleSignOutFirebase();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SettingsUserDialog open={openSettingsUserDialog} onClose={handleCloseSettingsUserDialog} />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={onClose}
        onClick={onClose}
        PaperProps={PaperProps}
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
      >
        <SCMenuItem onClick={handleOpenSettingsUserDialog}>
          <Avatar /> Settings
        </SCMenuItem>

        <Divider />
        <SCMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </SCMenuItem>
      </Menu>
    </>
  );
};

const SCMenuItem = styled(MenuItem)`
  min-width: 9rem;
  display: flex;
  justify-content: start;
`;

export default AccountSettingMenu;
