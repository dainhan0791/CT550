import React, { useState } from 'react';

import Image from 'next/image';

import styled from 'styled-components';

// @mui
import { Button, Box, Container, IconButton, Tooltip, Avatar, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
// @mui icons
import { UploadFile, MoreVert, MessageOutlined, InboxOutlined, SearchOutlined } from '@mui/icons-material';
import LoginDialog from '../feedback/LoginDialog';
import AccountSettingMenu from '../navigation/AccountSettingMenu';
import MoreVertMenu from '../navigation/MoreVertMenu';
import SearchDataDisplay from '../data/SearchDataDisplay';
// components feedback

const SCHeader = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: space-around;
  -ms-flex-pack: space-around;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  box-shadow: 0px 1px 1px rgb(0 0 0 / 12%);
  height: 60px;
  width: 100%;
  top: 0;
  position: fixed;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  z-index: 1000;
  flex-direction: column;
  flex-wrap: wrap;
`;
const SCHeaderWrapper = styled(Container)`
  text-align: center;
`;
const SCInputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 10px;
`;

const SCHeaderGrid = styled(Grid2)`
  align-items: center;
`;

const SCHeaderLogo = styled(Image)`
  text-align: start;
`;

const SCHeaderForm = styled(Box)`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 12px 16px;
  background: rgba(22, 24, 35, 0.06);
  border-radius: 92px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  margin: 0 auto;
  gap: 10px;
`;
const SCHeaderInput = styled.input`
  font-family: 'IBM Plex Sans', ProximaNova, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  max-width: 292px;
  color: rgba(22, 24, 35, 1);
  caret-color: rgba(254, 44, 85, 1);
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  -ms-appearance: textfield;
  appearance: textfield;
  margin-right: auto;
`;

const SCHeaderNavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SCButton = styled(Button)`
  width: ${(props) => (props.startIcon ? '110px' : '100px')};
`;

const SCMoreIconWrapper = styled.div``;

const Header = () => {
  // handle header menu
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorElMenu);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };
  // handle isLogin
  const [isLogin, setIsLogin] = useState(false);
  // handle login-dialog
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

  return (
    <SCHeader>
      <SCHeaderWrapper maxWidth="lg">
        <SCHeaderGrid container spacing={2}>
          <Grid2 xs={2}>
            <SCHeaderLogo src="/images/logo.png" alt="Logo" width={100} height={50} />
          </Grid2>
          <Grid2 xs={7}>
            <SCHeaderForm
              component="form"
              sx={{
                width: 360,
                height: 46,
              }}
            >
              <SearchDataDisplay title={'data accounts '}>
                <SCInputWrapper>
                  <SCHeaderInput />
                  <Divider orientation="vertical" />
                  <SearchOutlined sx={{ fontSize: 28 }} color="action" />
                </SCInputWrapper>
              </SearchDataDisplay>
            </SCHeaderForm>
          </Grid2>
          <Grid2 xs={3}>
            <SCHeaderNavigationWrapper>
              <SCButton variant="outlined" startIcon={<UploadFile />} size="medium" color="secondary">
                Upload
              </SCButton>
              {isLogin ? (
                <>
                  <MessageOutlined />
                  <InboxOutlined />
                  <SCMoreIconWrapper>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleOpenMenu}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar
                          alt="Profile Image"
                          src="/images/profile.jpg"
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundSize: 'cover',
                            WebkitBackgroundSize: 'cover',
                            objectFit: 'cover',
                          }}
                        />
                      </IconButton>
                    </Tooltip>

                    <AccountSettingMenu
                      anchorEl={anchorElMenu}
                      id="account-menu"
                      open={open}
                      onClose={handleCloseMenu}
                      onClick={handleCloseMenu}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    />
                  </SCMoreIconWrapper>
                </>
              ) : (
                <>
                  <>
                    <SCButton variant="contained" size="medium" onClick={handleClickOpenLogInDialog} color="info">
                      Log in
                    </SCButton>
                    <LoginDialog
                      selectedValue={selectedValueSignInDialog}
                      open={openLogInDialog}
                      onClose={handleCloseSignInDialog}
                    />
                  </>
                  <SCMoreIconWrapper>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleOpenMenu}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <MoreVert />
                      </IconButton>
                    </Tooltip>
                    <MoreVertMenu
                      anchorEl={anchorElMenu}
                      id="account-menu"
                      open={open}
                      onClose={handleCloseMenu}
                      onClick={handleCloseMenu}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    />
                  </SCMoreIconWrapper>
                </>
              )}
            </SCHeaderNavigationWrapper>
          </Grid2>
        </SCHeaderGrid>
      </SCHeaderWrapper>
    </SCHeader>
  );
};

export default Header;
