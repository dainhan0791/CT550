export interface IVideoItem {
  uid: string;
  vid: string;
  desc: string;
  hashtag: string;
  url: string;
  likes: Array<string>;
  commens: number;
  shares: number;
}
export interface IVideo {
  hashtag: string;
  url: string;
  likes: Array<string>;
  comments: number;
  shares: number;
  liked: boolean;
  handleLike?: Function;
}
