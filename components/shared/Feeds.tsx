import React from 'react';
import styled from 'styled-components';
import VideoItem from '../items/VideoItem';

// firebase
import { Skeleton } from '@mui/material';
import { IVideoItem } from '../../interfaces/video.interface';

const SCFeedstWrapper = styled.div`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
  max-width: 690px;
  width: 690px;
  -ms-overflow-style: none; /* cho  Internet Explorer, Edge */
  scrollbar-width: none; /* cho Firefox */
  &::-webkit-scrollbar {
    display: none; /* cho Chrome, Safari, and Opera */
  }
`;

const Feeds = ({ feeds }: { feeds: Array<IVideoItem> }) => {
  const focusVideo = () => {
    if (Array.isArray(feeds)) {
      const element = document.getElementById('targetVideo');
      element && element.focus();
    }
  };
  React.useEffect(() => {
    focusVideo();
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
    <SCFeedstWrapper id="targetVideo">
      {!feeds.length && (
        <Skeleton variant="rounded">
          <VideoItem
            uid={''}
            vid={''}
            desc={''}
            hashtag={''}
            url={''}
            comments={0}
            shares={0}
            likes={[]}
            views={[]}
            timestamp={undefined}
          />
        </Skeleton>
      )}
      {Array.isArray(feeds) && feeds.map((videoItem: any, index: number) => <VideoItem key={index} {...videoItem} />)}
    </SCFeedstWrapper>
  );
};

export default Feeds;
