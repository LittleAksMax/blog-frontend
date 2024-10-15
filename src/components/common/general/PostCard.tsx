import { FC, useMemo } from 'react';
import { Post } from '../../../sdk/types';
import { DeleteButton, UpdateButton } from './buttons';
import { useAuth } from '../../../contexts/auth';
import { ChildrenProp } from '../../props';

export interface PostCardProps extends ChildrenProp {
  post: Post;
  withButtons?: boolean;
  // TODO: background image
}

const PostCard: FC<PostCardProps> = ({
  post,
  withButtons,
  children,
}: PostCardProps) => {
  const auth = useAuth();
  const url = useMemo(() => `/posts/${post.id}`, [post]);
  return (
    <div>
      <div>
        <a href={url}>
          <img src="/placeholder.svg" alt={`${post.title}`} />
          <span>{post.title}</span>
          <div>{children}</div>
        </a>
      </div>
      {withButtons && auth.user && (
        <div>
          <UpdateButton />
          <DeleteButton />
        </div>
      )}
    </div>
  );
};

export default PostCard;
