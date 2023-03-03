import React from 'react';
import styled from 'styled-components';

import useElementOnScreen from '../../hooks/useElementOnScreen';
import { IVideo } from '../../interfaces/video.interface';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fStore } from '../../firebase/init.firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Clear } from '@mui/icons-material';
import Link from 'next/link';

const SCVideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SCVideo = styled.video`
  height: 100vh;
  width: 100%
  display: block;
  object-fit: cover;
  cursor: pointer;
`;

const SCBackButton = styled.button`
  position: absolute;
  z-index: 1;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(84, 84, 84, 0.5);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  outline: none;
  top: 20px;
  transition: opacity 0.3s ease 0s;
  left: 20px;
`;

const DetailsVideo = (props: IVideo) => {
  const router = useRouter();
  const profile = useAppSelector((state) => state.account.profile);
  const videoRef = React.useRef<any>();
  const linkRef = React.useRef<any>();

  const [playing, setPlaying] = React.useState(false);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  const autoPlayVideo = async () => {
    if (isVisibile) {
      if (!playing && props && fStore) {
        const docRef = doc(fStore, 'videos', props.vid);
        if (docRef && profile) {
          if (!props.views.includes(profile.uid)) {
            await updateDoc(docRef, {
              views: arrayUnion(profile.uid),
            });
          }

          videoRef.current.play();
          setPlaying(true);
        }
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  };

  React.useEffect(() => {
    autoPlayVideo();
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

  const handleBack = () => {
    if (linkRef) {
      linkRef.current.click();
    }
  };

  return (
    <SCVideoWrapper>
      {props.url && <SCVideo onClick={handleVideo} ref={videoRef} src={props.url} loop preload="true" />}
      <Link href="/" ref={linkRef} scroll={true}></Link>
      <SCBackButton onClick={handleBack}>
        <Clear />
      </SCBackButton>
    </SCVideoWrapper>
  );
};

export default DetailsVideo;
