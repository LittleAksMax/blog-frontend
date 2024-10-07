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

  // used for getting the columns right
  let column = 0;

  return (
    <div
      className={`grid grid-flow-row sm:grid-cols-${columns} grid-cols-1 sm:grid-rows-${
        posts.length / columns
      } grid-rows-${posts.length}`}
    >
      <div className="">
        {showcasePosts.map((post, idx) => {
          return (
            <>
              <ShowcaseItem key={idx} post={post} />
              {/* Conditionally render a break if required */}
              {++column % columns === 0 && <br />}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default StationaryShowcase;
