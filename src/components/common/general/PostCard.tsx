import { FC, useMemo } from 'react';
import { Post } from '../../../sdk/types';

export interface PostCardProps {
  post: Post;
  // TODO: background image
}

const PostCard: FC<PostCardProps> = ({ post }: PostCardProps) => {
  const url = useMemo(() => `/posts/${post.id}`, [post]);
  return (
    <span>
      <a href={url}>{post.title}</a>
    </span>
  );
};

export default PostCard;
