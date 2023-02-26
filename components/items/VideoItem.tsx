import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Video from '../common/Video';
import { IVideoItem } from '../../interfaces/video.interface';

// firebase
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { fAuth, fStore } from '../../firebase/init.firebase';
import { useSnackbar } from 'notistack';
import AccountVideoItem from './AccountVideoItem';
import { IAccountVideoItem } from '../../interfaces/account.interface';

const SCVideoItemWrapper = styled.div`
  scroll-snap-align: start;
  height: 650px;
  width: 100%:
  z-index: 999;
  margin-top: 2rem;
`;

const VideoItem = (props: IVideoItem) => {
  const { enqueueSnackbar } = useSnackbar();
  const [profile, setProfile] = React.useState<IAccountVideoItem>();

  React.useEffect(() => {
    const getProfileFromFirebase = async () => {
      try {
        if (fStore) {
          const docRef = doc(fStore, 'users', props.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const profile: any = docSnap.data();
            setProfile(profile);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfileFromFirebase();
  }, []);

  const handleFollow = async () => {
    try {
      if (fStore && fAuth.currentUser && props) {
        const userRef = doc(fStore, 'users', props.uid);
        const currentUserRef = doc(fStore, 'users', fAuth.currentUser.uid);
        if (props.uid !== fAuth.currentUser.uid) {
          await updateDoc(userRef, {
            followers: arrayUnion(fAuth.currentUser.uid),
          });
          await updateDoc(currentUserRef, {
            following: arrayUnion(props.uid),
          });
          enqueueSnackbar(`Follow successfully`, { variant: 'success' });
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
        {profile && (
          <AccountVideoItem
            uid={profile.uid}
            name={profile.name}
            nickname={profile.nickname}
            desc={profile.desc}
            photoURL={profile.photoURL}
            handleFollow={handleFollow}
          />
        )}
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
