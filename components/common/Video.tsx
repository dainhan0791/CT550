import React from 'react';
import styled from 'styled-components';
import HashtagChip from '../chips/HashtagChip';

import { Favorite, Textsms, Share } from '@mui/icons-material';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import { IVideo } from '../../interfaces/video.interface';

const SCVideoWrapper = styled.div`
  margin-left: 5.7rem;
`;
const SCHashtagWrapper = styled.div`
  margin-left: -0.6rem;
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

const Video = (props: IVideo) => {
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
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const onHandleLike = () => {
    if (props.handleLike) {
      props.handleLike();
    }
  };

  return (
    <SCVideoWrapper>
      <SCHashtagWrapper>
        <HashtagChip hashtag={props.hashtag} />
      </SCHashtagWrapper>
      <SCVideoInnerWrapper onClick={handleVideo}>
        {props.url && <SCVideo ref={videoRef} src={props.url} loop preload="true" />}
        <SCVideoActionWrapper>
          <SCVideoActionInnerWrapper onClick={onHandleLike}>
            {props.liked ? (
              <SCButton style={{ color: '#fff', background: '#ff2c55' }}>
                <Favorite />
              </SCButton>
            ) : (
              <SCButton>
                <Favorite />
              </SCButton>
            )}

            <SCView>{props.likes.length}</SCView>
          </SCVideoActionInnerWrapper>

          <SCVideoActionInnerWrapper>
            <SCButton>
              <Textsms />
            </SCButton>
            <SCView>{props.comments}</SCView>
          </SCVideoActionInnerWrapper>
          <SCVideoActionInnerWrapper>
            <SCButton>
              <Share />
            </SCButton>
            <SCView>{props.shares}</SCView>
          </SCVideoActionInnerWrapper>
        </SCVideoActionWrapper>
      </SCVideoInnerWrapper>
    </SCVideoWrapper>
  );
};

export default Video;
