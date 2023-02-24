// Mui
import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useAppSelector } from '../redux/hooks/hooks';

import styled from 'styled-components';

// Components
import Layout from '../components/shared/Layout';
import LeftSideBar from '../components/shared/LeftNavBar';
import Feeds from '../components/shared/Feeds';
import React from 'react';

const SCBodyWrapper = styled(Container)`
  margin-top: 80px;
`;

export default function Home() {
  return (
    <Layout title="Tik tok">
      <SCBodyWrapper maxWidth="lg">
        <Grid2 container>
          <Grid2 xs={4}>
            <LeftSideBar />
          </Grid2>
          <Grid2 xs={8}>
            <Feeds />
          </Grid2>
        </Grid2>
      </SCBodyWrapper>
    </Layout>
  );
}
