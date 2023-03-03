import React from 'react';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// local
import { IVideo } from '../../../interfaces/video.interface';

// firebase
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { fStore } from '../../../firebase/init.firebase';
import Video from '../../../components/common/Video';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { IAccountItem } from '../../../interfaces/account.interface';

const SCWrapper = styled.div``;

const DetailVideo = () => {
  const profile = useAppSelector((state) => state.account.profile);
  const router = useRouter();
  const { user, videoId } = router.query;
  const [video, setVideo] = React.useState<IVideo>();
  const [profileVideo, setProfileVideo] = React.useState<IAccountItem>();

  React.useEffect(() => {
    const getDetailVideo = async () => {
      if (!videoId) {
        return;
      }
      try {
        if (fStore && videoId) {
          console.log(videoId);
          const docRef = doc(fStore, 'videos', videoId.toString());

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setVideo(docSnap.data() as IVideo);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetailVideo();
  }, [videoId]);

  return (
    <SCWrapper>
      <Grid container>
        <Grid item md={7}>
          {video && (
            <Video
              url={video?.url}
              hashtag={video?.hashtag}
              likes={video?.likes}
              comments={video?.comments}
              shares={video?.shares}
              liked={video?.likes.includes(profile?.uid as string)}
            />
          )}
        </Grid>
        <Grid item md={5}></Grid>
      </Grid>
    </SCWrapper>
  );
};

export default DetailVideo;
