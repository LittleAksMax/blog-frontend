import { FC, useState, useMemo } from 'react';
import { ShowcaseProps } from './common';
import { ClickableProp } from '../../props';
import { Post } from '../../../sdk/types';
import SlidingShowcaseItem from './showcaseItem/SlidingShowcaseItem';

interface SlideshowPositionProps {
  index: number; // position (from 0)  (array index)
  total: number; // number of elements (array length)
}

const SlideshowPosition: FC<SlideshowPositionProps> = ({
  index,
  total,
}: SlideshowPositionProps) => {
  return (
    <div>
      <span>{index + 1}</span> of <span>{total}</span>
    </div>
  );
};

interface ChangeSlideProps extends ClickableProp {
  disabled: boolean;
  direction: 'left' | 'right';
}

const ChangeSlide: FC<ChangeSlideProps> = ({
  direction,
  disabled,
  onClick,
}: ChangeSlideProps) => {
  return (
    <div className="h-full pl-4 pr-4 text-3xl">
      <button
        disabled={disabled}
        onClick={onClick}
        className="h-3/5 border-solid border-2 text-orange-400 border-orange-400 hover:border-orange-600 hover:text-orange-600 disabled:border-mygrey-400 disabled:text-mygrey-400 p-4"
      >
        {direction === 'left' ? <code>&lt;</code> : <code>&gt;</code>}
      </button>
    </div>
  );
};

const doesPostExist = (posts: Post[], index: number): boolean =>
  index >= 0 && index < posts.length;

const relativeSlideIndices = [-1, 0, 1];

interface SlidingShowcaseProps extends ShowcaseProps {}

const SlidingShowcase: FC<SlidingShowcaseProps> = ({
  posts,
}: SlidingShowcaseProps) => {
  const [index, setIndex] = useState<number>(0);
  const showcasePosts = useMemo(() => posts, [posts]);
  // TODO: small screens => move change slide onto next line
  if (showcasePosts.length === 0) {
    return (
      <div>
        <span>No posts to display</span>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row min-h-40 items-center w-full">
          <ChangeSlide
            disabled={index === 0}
            direction="left"
            onClick={() => setIndex(index - 1)}
          />
          <ul className="flex flex-row items-center justify-center flex-grow w-full h-full">
            <div className="max-md:hidden w-full h-full">
              {relativeSlideIndices.map((delta) =>
                doesPostExist(posts, index + delta) ? (
                  <li key={index + delta} className="inline-block h-full w-1/3">
                    <SlidingShowcaseItem
                      key={index}
                      post={showcasePosts[index + delta]}
                      main={delta === 0}
                    />
                  </li>
                ) : (
                  <li
                    key={index + delta}
                    className="inline-block h-full w-1/3"
                  ></li>
                )
              )}
            </div>
            <div className="md:hidden w-full">
              <div>
                <SlidingShowcaseItem post={showcasePosts[index]} main />
              </div>
            </div>
          </ul>
          <ChangeSlide
            disabled={index === showcasePosts.length - 1}
            direction="right"
            onClick={() => setIndex(index + 1)}
          />
        </div>
        <SlideshowPosition index={index} total={showcasePosts.length} />
      </div>
    );
  }
};

export default SlidingShowcase;
