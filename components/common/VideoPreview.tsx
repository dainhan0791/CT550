import React from 'react';
import styled from 'styled-components';
import HashtagChip from '../chips/HashtagChip';

import useElementOnScreen from '../../hooks/useElementOnScreen';

const SCHashtagWrapper = styled.div``;
const SCVideoWrapper = styled.div``;
const SCVideoInnerWrapper = styled.div`
  width: 280px;
  height: 500px;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: start;
  cursor: pointer;
`;

const SCVideo = styled.video`
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 0.4rem;
`;

interface IVideo {
  hashtag: string;
  url: string;
}

const VideoPreview = (video: IVideo) => {
  const videoRef = React.useRef<any>();

  const [playing, setPlaying] = React.useState(false);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  React.useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile, playing]);

  const handleVideo = () => {
    if (playing && videoRef) {
      videoRef.current.play();
      setPlaying(false);
    } else {
      videoRef.current.pause();
      setPlaying(true);
    }
  };

  return (
    <SCVideoWrapper>
      <SCHashtagWrapper>
        <HashtagChip hashtag={video.hashtag} />
      </SCHashtagWrapper>
      <SCVideoInnerWrapper>
        {video.url && <SCVideo ref={videoRef} src={video.url} loop preload="true" />}
      </SCVideoInnerWrapper>
    </SCVideoWrapper>
  );
};

export default VideoPreview;
