import React from 'react';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// local
import { IVideo } from '../../../interfaces/video.interface';

// firebase
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { fStore } from '../../../firebase/init.firebase';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { IAccountItem } from '../../../interfaces/account.interface';
import DetailsVideo from '../../../components/common/DetailsVideo';

const SCWrapper = styled.div``;
const SCVideoWrapper = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #191d1e; /* Old browsers */
  background: -moz-linear-gradient(0deg, #191d1e 50%, #283139 100%); /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(50%, #191d1e),
    color-stop(100%, #283139)
  ); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(0deg, #191d1e 50%, #283139 100%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(0deg, #191d1e 50%, #283139 100%); /* Opera 11.10+ */
  background: -ms-linear-gradient(0deg, #191d1e 50%, #283139 100%); /* IE10+ */
  background: linear-gradient(0deg, #191d1e 50%, #283139 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#191d1e', endColorstr='#283139',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  background-attachment: fixed;
`;

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
        <SCVideoWrapper item md={7}>
          {video && (
            <DetailsVideo
              url={video?.url}
              hashtag={video?.hashtag}
              likes={video?.likes}
              comments={video?.comments}
              shares={video?.shares}
              liked={video?.likes.includes(profile?.uid as string)}
              vid={video.vid}
              views={video.views}
            />
          )}
        </SCVideoWrapper>
        <Grid item md={5}></Grid>
      </Grid>
    </SCWrapper>
  );
};

export default DetailVideo;
