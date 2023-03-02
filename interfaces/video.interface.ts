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
  uid: string;
  vid: string;
  name: string;
  url: string;
  hashtag: string;
  likes: Array<string>;
  comments: number;
  shares: number;
  liked: boolean;
  handleLike?: Function;
}
