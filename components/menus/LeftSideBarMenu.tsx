import React from 'react';

import { Box, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Home, People } from '@mui/icons-material';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const SCListItemText = styled.p<any>`
  font-weight: 700;
  font-size: 1.1rem;
  color: ${(props) => (props.home ? 'rgba(255,44,85,1)' : 'rgba(22, 24, 35, 1)')};
`;
const LeftSideBarMenu = () => {
  const router = useRouter();

  const goToHomePage = () => {
    router.push('/');
  };
  const goToFollowingPage = () => {
    router.push('/following');
  };
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding onClick={goToHomePage}>
            <ListItemButton>
              <ListItemIcon>
                <Home sx={{ color: 'rgba(254, 44, 85, 1)', fontSize: '1.8rem' }} />
              </ListItemIcon>
              <SCListItemText home>For You</SCListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={goToFollowingPage}>
            <ListItemButton>
              <ListItemIcon>
                <People sx={{ color: ' rgba(22, 24, 35, 1)', fontSize: '1.8rem' }} />
              </ListItemIcon>
              <SCListItemText>Following</SCListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default LeftSideBarMenu;
