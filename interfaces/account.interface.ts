export interface IIsVideoProps {
  isvideo: boolean;
}

export interface IAuth {
  accessToken: string;
}

export interface IAccountItem extends IIsVideoProps {
  uid?: string;
  name: string;
  nickname: string;
  photoURL: string;
  desc?: string;
  tick: boolean;
  handleFollow?: Function;
}
