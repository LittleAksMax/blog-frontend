import { FC } from 'react';
import { Post } from '../../../../sdk/types';

interface PostCardProps {
  post: Post;
  // TODO: background image
}

const PostCard: FC<PostCardProps> = ({ post }: PostCardProps) => {
  return <div>{post.title}</div>;
};

interface ShowcaseItemProps extends PostCardProps {
  post: Post;
}

const ShowcaseItem: FC<ShowcaseItemProps> = ({ post }: ShowcaseItemProps) => {
  return (
    <div className="flex flex-grow w-full">
      <PostCard post={post} />
    </div>
  );
};

export default ShowcaseItem;
