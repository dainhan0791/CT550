import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar } from '@mui/material';
import { Check } from '@mui/icons-material';

import styled from 'styled-components';
import { IAccountItem, IIsVideoProps } from '../../interfaces/account.interface';

const SCAccountItemWrapper = styled.div`
  cursor: pointer;
  max-width: 500px;
`;
const SCAccountHeadItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-top: 0.4rem;
`;
const SCName = styled.p`
  font-family: SofiaPro, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2rem;
  max-width: 260px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const SCCheckIcon = styled(Check)`
  background: rgb(32, 213, 236);
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  color: white;
`;

const SCAvatar = styled(Avatar)<IIsVideoProps>`
  width: ${(props) => (props.isVideo ? '3.4rem' : '2.4rem')};
  height: ${(props) => (props.isVideo ? '3.4rem' : '2.4rem')};
`;

const SCListBodyItem = styled.div<IIsVideoProps>`
  margin-left: ${(props) => (props.isVideo ? '1rem' : ' 0rem')};
`;

const SCNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: SofiaPro, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  line-height: 25px;
  margin-right: 4px;
`;

const SCSubName = styled.p`
  font-family: ProximaNova, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 400;
  font-size: 0.78rem;
  display: inline-block;
  line-height: 28px;
  color: rgba(22, 24, 35, 0.75);
`;
const SCDescriptionVideo = styled.p`
  font-size: 1rem;
  line-height: 22px;
  font-weight: 400;
`;

const SCButtonFollow = styled.button`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  color: rgb(254, 44, 85);
  border-color: rgb(254, 44, 85);
  background-color: rgb(255, 255, 255);
  min-height: 28px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  font-family: ProximaNova, PingFangSC, sans-serif;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
  right: 0px;
  top: 28px;
  min-width: 88px;
  padding: 0px 10px;
  &:hover {
    background-color: rgba(254, 44, 85, 0.06);
  }
`;
1;

const AccountItem = (props: IAccountItem) => {
  return (
    <SCAccountItemWrapper>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{}}>
            <SCAvatar src={props.photoURL} isVideo={props.isVideo} />
          </ListItemAvatar>
          <SCListBodyItem isVideo={props.isVideo}>
            {props.isVideo ? (
              <>
                <SCAccountHeadItem>
                  <SCNameWrapper>
                    <SCName>{props.name}</SCName>
                    <SCSubName>{props.nickname}</SCSubName>
                  </SCNameWrapper>
                  <SCButtonFollow>Follow</SCButtonFollow>
                </SCAccountHeadItem>
                <SCDescriptionVideo>{props.desc}</SCDescriptionVideo>
              </>
            ) : (
              <SCAccountHeadItem style={{ flexDirection: 'column' }}>
                <SCNameWrapper>
                  <SCName style={{ fontSize: '0.9rem', lineHeight: '1.2rem' }}>{props.name}</SCName>
                  {props.tick && <SCCheckIcon />}
                </SCNameWrapper>
                <SCSubName style={{ lineHeight: '1.2rem' }}>{props.nickname}</SCSubName>
              </SCAccountHeadItem>
            )}
          </SCListBodyItem>
        </ListItem>
      </List>
    </SCAccountItemWrapper>
  );
};

export default AccountItem;
