import { FC, useMemo } from 'react';
import { ShowcaseProps } from './common';
import ShowcaseItem from './showcaseItem/ShowcaseItem';

interface StationaryShowcaseProps extends ShowcaseProps {
  columns: 1 | 2 | 3 | 4 | 5; // just some values
}

const StationaryShowcase: FC<StationaryShowcaseProps> = ({
  posts,
  columns,
}: StationaryShowcaseProps) => {
  const showcasePosts = useMemo(() => posts, [posts]);

  return (
    <ul className="flex flex-wrap md:flex-row flex-col">
      {showcasePosts.map((post, idx) => {
        return (
          // TODO: this doesn't work because of the interpolated string
          <li key={idx} className={`md:w-1/${columns} w-full`}>
            <ShowcaseItem post={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default StationaryShowcase;
