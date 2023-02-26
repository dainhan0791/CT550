import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import AccountItem from './AccountItem';
import Video from '../common/Video';
import { IVideoItem } from '../../interfaces/video.interface';

// firebase
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { fAuth, fStore } from '../../firebase/init.firebase';
import { useSnackbar } from 'notistack';
import AccountVideoItem from './AccountVideoItem';

const SCVideoItemWrapper = styled.div`
  scroll-snap-align: start;
  height: 650px;
  width: 100%:
  z-index: 999;
  margin-top: 2rem;
`;

const VideoItem = (props: IVideoItem) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleFollow = async () => {
    try {
      if (fStore && fAuth.currentUser && props) {
        const userRef = doc(fStore, 'users', props.uid);
        if (props.uid !== fAuth.currentUser.uid) {
          await updateDoc(userRef, {
            followes: arrayUnion(fAuth.currentUser.uid),
          });
          enqueueSnackbar(`Follow ${props.name}`, { variant: 'success' });
        } else {
          alert('no follow chinh minh');
          enqueueSnackbar('Follow failed', { variant: 'error' });
        }
      }
    } catch (error) {
      enqueueSnackbar('Follow failed', { variant: 'error' });

      console.log(error);
    }
  };
  return (
    <>
      <SCVideoItemWrapper id="videoItem">
        <AccountVideoItem
          uid={props.uid}
          name={props.name}
          nickname={props.nickname}
          desc={props.desc}
          photoURL={props.photoURL}
          handleFollow={handleFollow}
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
    </>
  );
};

export default VideoItem;
