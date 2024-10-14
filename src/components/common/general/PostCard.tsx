import { FC, useMemo } from 'react';
import { Post } from '../../../sdk/types';
import { DeleteButton, UpdateButton } from './buttons';
import { useAuth } from '../../../contexts/auth';

export interface PostCardProps {
  post: Post;
  withButtons?: boolean;
  // TODO: background image
}

const PostCard: FC<PostCardProps> = ({ post, withButtons }: PostCardProps) => {
  const auth = useAuth();
  const url = useMemo(() => `/posts/${post.id}`, [post]);
  return (
    <span>
      <a href={url}>{post.title}</a>
      {withButtons && auth.user && <UpdateButton />}
      {withButtons && auth.user && <DeleteButton />}
    </span>
  );
};

export default PostCard;
