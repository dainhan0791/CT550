import React from 'react';

// Mui
import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import styled from 'styled-components';

// Components
import Layout from '../../components/shared/Layout';
import LeftSideBar from '../../components/shared/LeftNavBar';

// Typescript
import { IVideoItem } from '../../interfaces/video.interface';

// Firebase
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { fStore } from '../../firebase/init.firebase';
import { useAppSelector } from '../../redux/hooks/hooks';
import Feeds from '../../components/shared/Feeds';

const SCBodyWrapper = styled(Container)`
  margin-top: 80px;
`;

export default function Following() {
  const profile = useAppSelector((state) => state.account.profile);

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
          setFeeds(data.filter((feed: IVideoItem) => profile?.following?.includes(feed.uid)));
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
