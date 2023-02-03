import React from 'react';
import styled from 'styled-components';
import HashtagChip from '../chips/HashtagChip';

import { Favorite, Textsms, Share } from '@mui/icons-material';
import useElementOnScreen from '../../hooks/useElementOnScreen';

const SCHashtagWrapper = styled.div``;
const SCVideoWrapper = styled.div`
  margin-left: 5.7rem;
`;
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

const SCVideoActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1.2rem;
`;

const SCVideoActionInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  &:hover {
    opacity: 0.7;
  }
`;

const SCButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  background-color: rgba(22, 24, 35, 0.18);
  border-radius: 100%;
  width: 50px;
  height: 50px;
`;
const SCView = styled.p`
     color: rgba(22, 24, 35, 0.75);
    font-size: 12px;
    line-height: 17px;
    text-align: center;
}
`;

const Video = ({ src }: { src: string }) => {
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
  }, [isVisibile]);

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
        <HashtagChip hashtag={'default'} />
      </SCHashtagWrapper>
      <SCVideoInnerWrapper onClick={handleVideo}>
        {src && <SCVideo ref={videoRef} src={src} loop preload="true" />}
        <SCVideoActionWrapper>
          <SCVideoActionInnerWrapper>
            <SCButton>
              <Favorite />
            </SCButton>
            <SCView>999 likes</SCView>
          </SCVideoActionInnerWrapper>
          <SCVideoActionInnerWrapper>
            <SCButton>
              <Textsms />
            </SCButton>
            <SCView>999</SCView>
          </SCVideoActionInnerWrapper>
          <SCVideoActionInnerWrapper>
            <SCButton>
              <Share />
            </SCButton>
            <SCView>999</SCView>
          </SCVideoActionInnerWrapper>
        </SCVideoActionWrapper>
      </SCVideoInnerWrapper>
    </SCVideoWrapper>
  );
};

export default Video;
