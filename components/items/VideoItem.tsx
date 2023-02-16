import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import AccountItem from './AccountItem';
import Video from '../common/Video';
import { IVideoItem } from '../../interfaces/video.interface';

const SCVideoItemWrapper = styled.div`
  scroll-snap-align: start;
  height: 650px;
  z-index: 999;
  margin-top: 2rem;
`;

const VideoItem = (props: IVideoItem) => {
  return (
    <SCVideoItemWrapper id="videoItem">
      <AccountItem
        isVideo={true}
        name={props.name}
        nickname={props.nickname}
        desc={props.desc}
        tick={false}
        photoURL={''}
      />
      <Video
        hashtag={props.hashtag}
        url={props.url}
        likes={props.likes}
        comments={props.commens}
        shares={props.shares}
      />
      <Divider sx={{ margin: '1rem' }} />
    </SCVideoItemWrapper>
  );
};

export default VideoItem;
