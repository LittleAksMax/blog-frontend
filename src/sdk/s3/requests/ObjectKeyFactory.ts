import { Post } from '../../api/types';

export interface IObjectKeyFactory {
  createObjectKey(post: Post, filename: string): string;
  createBannerObjectKey(post: Post): string;
}

class ObjectKeyFactory implements IObjectKeyFactory {
  public createObjectKey(post: Post, filename: string): string {
    return `${post.id}/${filename}`;
  }

  public createBannerObjectKey(post: Post): string {
    // NOTE: might be easier to put banner as a field into Post
    return `${post.id}/${post.banner}`;
  }
}

export default ObjectKeyFactory;
