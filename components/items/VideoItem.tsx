import { Divider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Video from '../common/Video';
import { IVideoItem } from '../../interfaces/video.interface';

// firebase
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { fAuth, fStore } from '../../firebase/init.firebase';
import { useSnackbar } from 'notistack';
import AccountVideoItem from './AccountVideoItem';
import { IAccountVideoItem } from '../../interfaces/account.interface';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import LogInDialog from '../dialogs/LoginDialog';
import { useRouter } from 'next/router';

const SCVideoItemWrapper = styled.div`
  scroll-snap-align: start;
  height: 100vh;
  width: 690px;
  z-index: 999;
  margin-top: 2rem;
`;

const VideoItem = (props: IVideoItem) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const profile = useAppSelector((state) => state.account.profile);

  const [openLoginDialog, setOpenLoginDialog] = React.useState<boolean>(false);
  const [profileVideo, setProfileVideo] = React.useState<IAccountVideoItem>();

  const liked = props.likes.includes(profile?.uid as string);

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };
  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  React.useEffect(() => {
    const getProfileVideoFromFirebase = async () => {
      try {
        if (fStore) {
          const docRef = doc(fStore, 'users', props.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const profileVideo = docSnap.data() as IAccountVideoItem;
            setProfileVideo(profileVideo);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfileVideoFromFirebase();
  }, [profile]);

  const handleFollow = async () => {
    if (!isLogin) {
      handleOpenLoginDialog();
    }

    try {
      if (fStore && profile && props) {
        const userRef = doc(fStore, 'users', props.uid);
        const currentUserRef = doc(fStore, 'users', profile.uid);
        if (props.uid !== profile.uid) {
          await updateDoc(userRef, {
            followers: arrayUnion(profile.uid),
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

  const handleLike = async () => {
    if (!isLogin) {
      handleOpenLoginDialog();
    }
    try {
      if (fStore && profile && props) {
        const videoRef = doc(fStore, 'videos', props.vid);
        if (!liked) {
          await updateDoc(videoRef, {
            likes: arrayUnion(profile.uid),
          });
          enqueueSnackbar(`Like successfully`, { variant: 'success' });
        } else {
          await updateDoc(videoRef, {
            likes: arrayRemove(profile.uid),
          });
          enqueueSnackbar(`Dislike successfully`, { variant: 'success' });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToDetailsVideo = () => {
    router.push(`@${profileVideo?.name}/video/${props.vid}`);
  };

  return (
    <div>
      <LogInDialog open={openLoginDialog} onClose={handleCloseLoginDialog} />
      <SCVideoItemWrapper>
        {profileVideo && (
          <>
            <AccountVideoItem
              uid={profileVideo.uid}
              name={profileVideo.name}
              nickname={profileVideo.nickname}
              desc={props.desc}
              photoURL={profileVideo.photoURL}
              handleFollow={handleFollow}
              tick={profileVideo.tick}
            />
            <Video
              vid={props.vid}
              hashtag={props.hashtag}
              url={props.url}
              likes={props.likes}
              comments={props.comments}
              shares={props.shares}
              handleLike={handleLike}
              liked={liked}
              goToDetailsVideo={goToDetailsVideo}
              views={props.views}
              name={profileVideo.name}
              uid={props.uid}
            />
          </>
        )}

        <Divider sx={{ margin: '1rem' }} />
      </SCVideoItemWrapper>
    </div>
  );
};

export default VideoItem;
