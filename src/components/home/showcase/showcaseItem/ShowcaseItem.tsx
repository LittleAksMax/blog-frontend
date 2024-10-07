import { FC, useMemo } from 'react';
import { Post } from '../../../../sdk/types';

interface PostCardProps {
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

interface ShowcaseItemProps extends PostCardProps {
  post: Post;
}

const ShowcaseItem: FC<ShowcaseItemProps> = ({ post }: ShowcaseItemProps) => {
  return <PostCard post={post} />;
};

export default ShowcaseItem;
