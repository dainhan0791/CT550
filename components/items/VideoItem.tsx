import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import AccountItem from './AccountItem';
import Video from '../common/Video';

const SCVideoItemWrapper = styled.div`
  scroll-snap-align: start;
  height: 650px;
`;

const VideoItem = ({ src }: { src: string }) => {
  return (
    <SCVideoItemWrapper id="videoItem">
      <AccountItem video />
      <Video src={src} />
      <Divider sx={{ margin: '1rem' }} />
    </SCVideoItemWrapper>
  );
};

export default VideoItem;
