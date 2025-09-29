import { FC } from 'react';
import { Post } from '../../../../sdk/api/types';
import PostCard, { PostCardProps } from '../../../common/general/PostCard';
import TagsContainer from '../../../common/tags/TagsContainer';

interface ShowcaseItemProps extends PostCardProps {
  post: Post;
}

const ShowcaseItem: FC<ShowcaseItemProps> = ({ post }: ShowcaseItemProps) => {
  return (
    <PostCard post={post}>
      <TagsContainer tags={post.tags} limit={3} />
    </PostCard>
  );
};

export default ShowcaseItem;
