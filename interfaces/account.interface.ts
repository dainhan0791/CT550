export interface IIsVideoProps {
  isVideo?: boolean;
}

export interface IAuth {
  user: object;
}

export interface IAccountItem extends IIsVideoProps {
  uid?: string;
  name: string;
  nickname: string;
  photoURL: string;
  desc?: string;
  tick: boolean;
}
