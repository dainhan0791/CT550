import Layout from '../components/shared/Layout';
import Header from '../components/shared/Header';
import LeftNavBar from '../components/shared/LeftNavBar';

import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import styled from 'styled-components';

const SCBodyWrapper = styled(Container)`
  margin-top: 80px;
`;

export default function Home() {
  return (
    <Layout title="Tik tok">
      <SCBodyWrapper maxWidth="lg">
        <Grid2 container>
          <Grid2 xs={4}>
            <LeftNavBar />
          </Grid2>
          <Grid2 xs={8}>Video Content</Grid2>
        </Grid2>
      </SCBodyWrapper>
    </Layout>
  );
}
