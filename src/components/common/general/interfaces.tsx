import { Post } from '../../../sdk/api/types';

export interface PostDOMManipulation {
  removePost?: (post: Post) => void; // remove post from DOM
  archivePost?: (post: Post) => void; // remove post from DOM
}
