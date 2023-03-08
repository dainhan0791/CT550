import { ITime } from './time.interface';
export interface IIsVideoProps {
  isvideo: boolean;
}

export interface IAuth {
  isLogin: boolean;
}

export interface IProfile {
  profile: IAccountItem | null;
}

export interface IAccountItem {
  uid: string;
  name: string;
  nickname: string;
  photoURL: string;
  tick: boolean;
  noAccentName?: string;
  followers?: Array<string>;
  following?: Array<string>;
}

export interface IAccountCommentItem {
  uid: string;
  name: string;
  photoURL: string;
  tick: boolean;
}

export interface IAccountVideoItem {
  uid: string;
  name: string;
  nickname: string;
  photoURL: string;
  desc: string;
  tick: boolean;
  timestamp?: ITime;
  handleFollow: Function;
}

export interface IAccountDetailsVideoItem {
  uid: string;
  name: string;
  nickname: string;
  photoURL: string;
  desc: string;
  tick: boolean;
  timestamp: ITime;
  handleFollow: Function;
}
