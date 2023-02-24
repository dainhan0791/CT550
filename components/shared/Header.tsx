import React from 'react';

import Image from 'next/image';

import styled from 'styled-components';

// @mui
import { Button, Box, Container, IconButton, Tooltip, Avatar, Divider, Skeleton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

// @mui icons
import { Add, MoreVert, MessageOutlined, InboxOutlined, SearchOutlined } from '@mui/icons-material';
import LoginDialog from '../dialogs/LoginDialog';
import SearchDataDisplay from '../data/SearchDataDisplay';
import AccountSettingMenu from '../menus/AccountSettingMenu';
import MoreVertMenu from '../menus/MoreVertMenu';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { getAccessTokenFromLocalStorage } from '../../utils/auth.localstorage';

// firebase
import { collection, doc, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
import UploadVideoDialog from '../dialogs/UploadVideoDialog';
import { fAuth, fStore } from '../../firebase/init.firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

const SCLoginButton = styled(SCButton)`
  background-color: rgba(254, 44, 85, 1) !important;
`;

const SCMoreIconWrapper = styled.div``;

const Header = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // handle header menu
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorElMenu);

  // handle isLogin
  const [isLogin, setIsLogin] = React.useState(false);
  // profile
  const [profile, setProfile] = React.useState<any>();

  // handle open menu
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };
  // handle login-dialog
  const [openLogInDialog, setOpenLogInDialog] = React.useState(false);

  const handleOpenLogInDialog = () => {
    setOpenLogInDialog(true);
  };

  const handleCloseSignInDialog = () => {
    setOpenLogInDialog(false);
  };

  // handle open upload dialog
  const [openUploadVideoDialog, setOpenUploadVideoDialog] = React.useState(false);

  const handleOpenUploadVideoDialog = () => {
    if (accessToken) {
      setOpenUploadVideoDialog(true);
    } else {
      handleOpenLogInDialog();
    }
  };

  const handleCloseUploadVideoDialog = () => {
    setOpenUploadVideoDialog(false);
  };

  React.useEffect(() => {
    const checkIsLogin = () => {
      if (getAccessTokenFromLocalStorage()) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    };
    checkIsLogin();
  }, [accessToken]);

  React.useEffect(() => {
    onAuthStateChanged(fAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        const getProfileFromFirebase = async () => {
          try {
            if (fStore) {
              console.log('getProfile');
              const docRef = doc(fStore, 'users', uid);

              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                setProfile(docSnap.data());
              } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
        getProfileFromFirebase();
      } else {
        // User is signed out
        // ...
      }
    });
  }, [accessToken]);

  return (
    <>
      <UploadVideoDialog open={openUploadVideoDialog} onClose={handleCloseUploadVideoDialog} />
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
                <SCButton variant="outlined" startIcon={<Add />} size="medium" onClick={handleOpenUploadVideoDialog}>
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
                          {profile ? (
                            <Avatar
                              src={profile?.photoURL}
                              sx={{
                                width: 32,
                                height: 32,
                                backgroundSize: 'cover',
                                WebkitBackgroundSize: 'cover',
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            <Skeleton variant="circular" width={32} height={32} />
                          )}
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
                      <SCLoginButton variant="contained" size="medium" onClick={handleOpenLogInDialog}>
                        Log in
                      </SCLoginButton>
                      <LoginDialog open={openLogInDialog} onClose={handleCloseSignInDialog} />
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
    </>
  );
};

export default Header;
