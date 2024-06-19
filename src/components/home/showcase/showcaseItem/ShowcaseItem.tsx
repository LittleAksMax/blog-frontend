import { FC } from 'react';
import { PostType } from '../../../../types';

interface ShowcaseItemProps {
  post: PostType;
}

const ShowcaseItem: FC<ShowcaseItemProps> = ({ post }: ShowcaseItemProps) => {
  return <div className="flex flex-grow w-full">{post}</div>;
};

export default ShowcaseItem;
