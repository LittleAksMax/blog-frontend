import { FC } from 'react';
import { Post } from '../../../../sdk/types';
import PostCard, { PostCardProps } from '../../../common/general/PostCard';

interface SlidingShowcaseItemProps extends PostCardProps {
  post: Post;
  main: boolean;
}

const SlidingShowcaseItem: FC<SlidingShowcaseItemProps> = ({
  post,
  main,
}: SlidingShowcaseItemProps) => {
  if (!main) {
    return (
      <div className="scale-75 h-full">
        <PostCard post={post} />
      </div>
    );
  } else {
    return (
      <div className="h-full">
        <PostCard post={post} />
      </div>
    );
  }
};

export default SlidingShowcaseItem;
