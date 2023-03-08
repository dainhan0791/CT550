import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar } from '@mui/material';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import { Check, FavoriteBorder, Favorite } from '@mui/icons-material';
import styled from 'styled-components';
import moment from 'moment';

import {
  IAccountCommentItem,
  IAccountItem,
  IAccountVideoItem,
  IIsVideoProps,
} from '../../interfaces/account.interface';
import { fAuth, fStore } from '../../firebase/init.firebase';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAppSelector } from '../../redux/hooks/hooks';
import { useRouter } from 'next/router';
import { IComment } from '../../interfaces/comment.interface';
import { useSnackbar } from 'notistack';

const SCAccountItemWrapper = styled.div``;
const SCAccountHeadItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  margin-top: 0.4rem;
`;
const SCName = styled.p`
  font-family: SofiaPro, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  max-width: 260px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 0.3rem;
`;

const SCCreator = styled.div`
  font-size: 0.9rem;
  color: rgb(254, 44, 85);
  font-weight: bold;
`;

const SCAvatar = styled(Avatar)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const SCListBodyItem = styled.div`
  margin-left: 1rem;
  width: 100%;
`;

const SCWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
const SCContactWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const SCContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SCCheckIcon = styled(Check)`
  background: rgb(32, 213, 236);
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  color: white;
`;
const SCText = styled.p`
  width: 85%;
`;
const SCTime = styled.div`
  font-size: 0.83rem;
  margin-top: 0.2rem;
`;
const SCReplay = styled.div`
  font-size: 0.83rem;
  margin-top: 0.2rem;
  color: rgb(254, 44, 85);
  cursor: pointer;
  opacity: 0.8;
`;
const SCLoveIconWrapper = styled.div`
  cursor: pointer;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`;
const SCLikes = styled.div`
  font-size: 0.9rem;
`;

const AccountCommentItem = (props: IComment) => {
  const profile = useAppSelector((state) => state.account.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [profileComment, setProfileComment] = React.useState<IAccountCommentItem>();

  React.useEffect(() => {
    const getProfileVideoFromFirebase = async () => {
      try {
        if (fStore) {
          const docRef = doc(fStore, 'users', props.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const profileComment = docSnap.data() as IAccountCommentItem;
            setProfileComment(profileComment);
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
  }, []);

  const handleLikeComment = async () => {
    try {
      if (props.cid && profile) {
        const commentRef = doc(fStore, 'comments', props.cid);
        if (props.liked) {
          await updateDoc(commentRef, {
            likes: arrayRemove(profile.uid),
          });
          enqueueSnackbar(`UnLike successfully`, { variant: 'success' });
        } else {
          await updateDoc(commentRef, {
            likes: arrayUnion(profile.uid),
          });
          enqueueSnackbar(`Like successfully`, { variant: 'success' });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SCAccountItemWrapper>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <SCAvatar src={profileComment?.photoURL} />
          </ListItemAvatar>
          <SCListBodyItem>
            <SCAccountHeadItem>
              <SCWrapper>
                <SCName>{profileComment?.name}</SCName>

                {profileComment?.tick && <SCCheckIcon />}

                {props.creator && <SCCreator>Creator</SCCreator>}
              </SCWrapper>
              <SCContentWrapper>
                <SCText>{props.text}</SCText>
                <SCLoveIconWrapper onClick={handleLikeComment}>
                  {props.liked ? <Favorite sx={{ color: 'rgb(254, 44, 85)' }} /> : <FavoriteBorder />}
                  <SCLikes>{props.likes.length}</SCLikes>
                </SCLoveIconWrapper>
              </SCContentWrapper>

              <SCContactWrapper>
                {props.timestamp && <SCTime> {moment(props.timestamp.seconds * 1000).fromNow()}</SCTime>}
                <SCReplay>Replay</SCReplay>
              </SCContactWrapper>
            </SCAccountHeadItem>
          </SCListBodyItem>
        </ListItem>
      </List>
    </SCAccountItemWrapper>
  );
};

export default AccountCommentItem;
