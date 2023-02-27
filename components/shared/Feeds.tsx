import React from 'react';
import styled from 'styled-components';
import VideoItem from '../items/VideoItem';

// firebase
import { collection, query, where, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { fAuth, fStore } from '../../firebase/init.firebase';
import { Skeleton } from '@mui/material';
import { IVideo } from '../../interfaces/video.interface';

const SCFeedstWrapper = styled.div`
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: scroll;
`;

const Feeds = () => {
  const [feeds, setFeeds] = React.useState<any>([]);
  const [maxResults, setMaxResults] = React.useState(10);

  const focusVideo = () => {
    const element = document.getElementById('targetVideo');
    element && element.focus();
  };
  const getVideos = async () => {
    try {
      const q = query(collection(fStore, 'videos'));
      onSnapshot(q, (querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        data && setFeeds(data);
      });
    } catch (error) {
      console.log(error);
    }
  };
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

  React.useEffect(() => {
    getVideos();
    focusVideo();
  }, []);

  return (
    <SCFeedstWrapper id="targetVideo">
      {!feeds.length && (
        <Skeleton variant="rounded">
          <VideoItem uid={''} vid={''} desc={''} hashtag={''} url={''} commens={0} shares={0} likes={[]} />
        </Skeleton>
      )}
      {feeds && feeds.map((videoItem: any, index: number) => <VideoItem key={index} {...videoItem} />)}
    </SCFeedstWrapper>
  );
};

export default Feeds;
