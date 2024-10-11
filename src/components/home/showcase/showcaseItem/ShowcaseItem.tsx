import { FC } from 'react';
import { Post } from '../../../../sdk/types';
import PostCard, { PostCardProps } from '../../../common/general/PostCard';

interface ShowcaseItemProps extends PostCardProps {
  post: Post;
}

const ShowcaseItem: FC<ShowcaseItemProps> = ({ post }: ShowcaseItemProps) => {
  return <PostCard post={post} />;
};

export default ShowcaseItem;
