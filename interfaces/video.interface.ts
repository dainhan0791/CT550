export interface ICurrentVideo {
  video: IVideoItem | null;
}

export interface IVideoItem {
  uid: string;
  vid: string;
  desc: string;
  hashtag: string;
  url: string;
  timestamp?: any;
  likes: Array<string>;
  comments: number;
  shares: number;
  views: Array<string>;
}
export interface IVideo {
  uid: string;
  vid: string;
  url: string;
  hashtag: string;
  likes: Array<string>;
  comments: number;
  shares: number;
  liked: boolean;
  handleLike?: Function;
  goToDetailsVideo?: Function;
  name?: string;
  views: Array<string>;
}

export interface IVideoActions {
  views: Array<string>;
  likes: Array<string>;
  comments: number;
  shares: number;
  handleLike: Function;
  liked: boolean;
}
