import { FC } from 'react';
import { Post } from '../../../../sdk/api/types';
import PostCard, { PostCardProps } from '../../../common/general/PostCard';
import TagsContainer from '../../../common/tags/TagsContainer';

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
        <PostCard post={post}>
          <TagsContainer tags={post.tags} limit={3} />
        </PostCard>
      </div>
    );
  } else {
    return (
      <div className="h-full">
        <PostCard post={post}>
          <TagsContainer tags={post.tags} limit={3} />
        </PostCard>
      </div>
    );
  }
};

export default SlidingShowcaseItem;
