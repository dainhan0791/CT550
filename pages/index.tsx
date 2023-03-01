import React from 'react';

// Mui
import { Container, Skeleton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import styled from 'styled-components';

// Components
import Layout from '../components/shared/Layout';
import LeftSideBar from '../components/shared/LeftNavBar';
import Feeds from '../components/shared/Feeds';

// Firebase
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { fStore } from '../firebase/init.firebase';
import { IVideoItem } from '../interfaces/video.interface';

const SCBodyWrapper = styled(Container)`
  margin-top: 80px;
`;

export default function Home() {
  const [feeds, setFeeds] = React.useState<Array<IVideoItem>>([]);
  React.useEffect(() => {
    const getVideos = async () => {
      try {
        const q = query(collection(fStore, 'videos'));
        onSnapshot(q, (querySnapshot) => {
          const data: Array<IVideoItem> = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data() as IVideoItem);
          });
          setFeeds(data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getVideos();
  }, []);

  return (
    <Layout title="Tik tok">
      <SCBodyWrapper maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 xs={4}>
            <LeftSideBar />
          </Grid2>
          <Grid2 xs={8}>{Array.isArray(feeds) && <Feeds feeds={feeds} />}</Grid2>
        </Grid2>
      </SCBodyWrapper>
    </Layout>
  );
}
