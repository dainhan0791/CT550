import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import SettingsUserDialog from '../dialogs/SettingsUserDialog';
import { handleSignOutFirebase } from '../../firebase/utils.firebase';
import { Logout, Settings } from '@mui/icons-material';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import { LOGOUT_SUCCESS, LOGOUT_ERROR } from '../../constants/login.constant';
import { setIsLogin } from '../../redux/slices/auth.slice';

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
  const { enqueueSnackbar } = useSnackbar();
  const [openSettingsUserDialog, setOpenSettingsUserDialog] = React.useState<boolean>(false);
  const handleOpenSettingsUserDialog = () => {
    setOpenSettingsUserDialog(true);
  };
  const handleCloseSettingsUserDialog = () => {
    setOpenSettingsUserDialog(false);
  };

  const handleLogout = async () => {
    try {
      await handleSignOutFirebase();
      enqueueSnackbar(LOGOUT_SUCCESS, { variant: 'success' });
      dispatch(setIsLogin(false));
    } catch (error) {
      console.log(error);
      enqueueSnackbar(LOGOUT_ERROR, { variant: 'error' });
      dispatch(setIsLogin(true));
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
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          Settings
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
