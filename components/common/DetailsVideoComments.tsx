import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import InputEmoji from 'react-input-emoji';
import { useSnackbar } from 'notistack';
import { ICommentProps } from '../../interfaces/comment.interface';
import AccountCommentItem from '../items/AccountCommentItem';
import { useAppSelector } from '../../redux/hooks/hooks';

const SCDetailsVideoComments = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  height: 52%;
`;

const SCBoxComments = styled.div`
  min-height: 18rem;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(248, 248, 248);
  border-top: 1px solid rgba(22, 24, 35, 0.2);
  border-bottom: 1px solid rgba(22, 24, 35, 0.2);
  overflow: hidden auto;
  -webkit-box-flex: 1;
  flex-grow: 1;
  position: relative;
`;

const SCInput = styled(InputEmoji)`
  height: 2rem;
  width: 100%;
`;

const DetailsVideoComments = (props: ICommentProps) => {
  const profile = useAppSelector((state) => state.account.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [text, setText] = React.useState<string>('');

  function handleOnEnter(text: string) {
    if (props.handleComment && text) {
      props.handleComment(text);
    } else {
      enqueueSnackbar('Please enter a comment', {
        variant: 'default',
      });
    }
  }

  return (
    <SCDetailsVideoComments>
      <SCBoxComments>
        {Array.isArray(props.comments) &&
          profile &&
          props.comments.map((comment) => (
            <AccountCommentItem
              key={comment.cid}
              cid={comment.cid}
              vid={comment.vid}
              uid={comment.uid}
              text={comment.text}
              timestamp={comment.timestamp}
              likes={comment.likes}
              childrens={comment.childrens}
              creator={comment.creator}
              liked={comment.likes.includes(profile.uid)}
            />
          ))}
      </SCBoxComments>
      <SCInput value={text} onChange={setText} cleanOnEnter onEnter={handleOnEnter} placeholder="message..." />
    </SCDetailsVideoComments>
  );
};

export default DetailsVideoComments;
