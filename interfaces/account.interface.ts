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

export interface IAccountVideoItem {
  uid: string;
  name: string;
  nickname: string;
  photoURL: string;
  desc: string;
  tick: boolean;
  handleFollow: Function;
}
