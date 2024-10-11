import { FC, useMemo } from 'react';
import { ShowcaseProps } from './common';
import ShowcaseItem from './showcaseItem/ShowcaseItem';

const COLS_1 = 'w-full';
const COLS_2 = 'w-full md:w-1/2';
const COLS_3 = 'w-full md:w-1/3';
const COLS_4 = 'w-full md:w-1/4';
const COLS_5 = 'w-full md:w-1/5';

const dynamicClassName = (columns: 1 | 2 | 3 | 4 | 5): string => {
  switch (columns) {
    case 1:
      return COLS_1;
    case 2:
      return COLS_2;
    case 3:
      return COLS_3;
    case 4:
      return COLS_4;
    case 5:
      return COLS_5;
    default:
      throw new Error(`Invalid column value: ${columns}`);
  }
};

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
          <li key={idx} className={dynamicClassName(columns)}>
            <ShowcaseItem post={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default StationaryShowcase;
