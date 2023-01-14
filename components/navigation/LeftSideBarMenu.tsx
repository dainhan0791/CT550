import React from 'react';

import { Box, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Home, People } from '@mui/icons-material';
import styled from 'styled-components';

const SCListItemText = styled.p<any>`
  font-family: ProximaNova, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${(props) => (props.home ? 'rgba(255,44,85,1)' : 'rgba(22, 24, 35, 1)')};
`;
const LeftSideBarMenu = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home sx={{ color: 'rgba(254, 44, 85, 1)', fontSize: '1.8rem' }} />
              </ListItemIcon>
              <SCListItemText home>For You</SCListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
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
