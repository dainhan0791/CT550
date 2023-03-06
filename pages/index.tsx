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
import { MediaDeviceMax } from '../styles/device-size';

const SCBodyWrapper = styled(Container)`
  margin-top: 70px;
`;

const SCGridLeftSideBar = styled(Grid2)`
  height: 100vh;
  overflow: hidden scroll;

  -ms-overflow-style: none; /* cho  Internet Explorer, Edge */
  scrollbar-width: none; /* cho Firefox */
  &::-webkit-scrollbar {
    display: none; /* cho Chrome, Safari, and Opera */
  }

  &:hover {
    -ms-overflow-style: block; /* cho  Internet Explorer, Edge */
    scrollbar-width: block; /* cho Firefox */
    &::-webkit-scrollbar {
      display: block; /* cho Chrome, Safari, and Opera */
    }
  }
  @media${MediaDeviceMax.tablet} {
    display: none;
  }
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

  // const getVideos = async () => {
  //   try {
  //     const q = query(collection(fStore, 'videos'));
  //     const videoSnapshot = await getDocs(q);
  //     const data = videoSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     data && setFeeds(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // };

  return (
    <Layout title="Tik tok">
      <SCBodyWrapper maxWidth="lg">
        <Grid2 container spacing={5}>
          <SCGridLeftSideBar md={4}>
            <LeftSideBar />
          </SCGridLeftSideBar>
          <Grid2 xs={12} md={8}>
            {Array.isArray(feeds) && <Feeds feeds={feeds} />}
          </Grid2>
        </Grid2>
      </SCBodyWrapper>
    </Layout>
  );
}
