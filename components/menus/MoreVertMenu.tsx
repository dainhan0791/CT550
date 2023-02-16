import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import React from 'react';

const MoreVertMenu = ({
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
  return (
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
      <MenuItem>
        <Avatar /> Theme
      </MenuItem>

      <Divider />
    </Menu>
  );
};

export default MoreVertMenu;
