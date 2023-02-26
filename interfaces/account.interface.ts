export interface IIsVideoProps {
  isvideo: boolean;
}

export interface IAuth {
  accessToken: string;
}

export interface IAccountItem {
  uid: string;
  name: string;
  nickname: string;
  photoURL: string;
  tick: boolean;
}

export interface IAccountVideoItem {
  uid: string;
  name: string;
  nickname: string;
  photoURL: string;
  desc: string;
  handleFollow?: Function;
}
