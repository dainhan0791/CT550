import React from 'react';
import styled from 'styled-components';
import VideoItem from '../items/VideoItem';

// firebase
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fStore } from '../../firebase/init.firebase';

const SCFeedstWrapper = styled.div`
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: scroll;
`;

const Feeds = () => {
  const [feeds, setFeeds] = React.useState<any>();
  const [maxResults, setMaxResults] = React.useState(10);

  React.useEffect(() => {
    getVideos();
    focusVideo();
  }, []);

  const getVideos = async () => {
    try {
      const q = query(collection(fStore, 'videos'));
      const videoSnapshot = await getDocs(q);
      const data = videoSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      data && setFeeds(data);
    } catch (error) {
      console.log(error);
    }
  };

  const focusVideo = () => {
    const element = document.getElementById('targetVideo');
    element && element.focus();
  };

  return (
    <SCFeedstWrapper id="targetVideo">
      {feeds && feeds.map((videoItem: any, index: number) => <VideoItem key={index} {...videoItem} />)}
    </SCFeedstWrapper>
  );
};

export default Feeds;
