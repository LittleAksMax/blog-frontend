import { FC, useMemo } from 'react';
import { ShowcaseProps } from './common';
import ShowcaseItem from './showcaseItem/ShowcaseItem';

interface StationaryShowcaseProps extends ShowcaseProps {
  columns: number;
}

const StationaryShowcase: FC<StationaryShowcaseProps> = ({
  posts,
  columns,
}: StationaryShowcaseProps) => {
  const showcasePosts = useMemo(() => posts, [posts]);
  return (
    <div
      className={`grid grid-flow-row sm:grid-cols-${columns} grid-cols-1 sm:grid-rows-${
        posts.length / columns
      } grid-rows-${posts.length}`}
    >
      <div className="">
        {showcasePosts.map((post, idx) => (
          <ShowcaseItem key={idx} post={post} />
        ))}
      </div>
    </div>
  );
};

export default StationaryShowcase;
