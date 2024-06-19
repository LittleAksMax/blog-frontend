import { FC, useState, MouseEvent } from 'react';
import { ShowcaseProps } from './common';
import ShowcaseItem from './showcaseItem/ShowcaseItem';

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

interface ChangeSlideProps {
  disabled: boolean;
  direction: 'left' | 'right';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
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

interface SlidingShowcaseProps extends ShowcaseProps {}

const SlidingShowcase: FC<SlidingShowcaseProps> = ({
  posts,
}: SlidingShowcaseProps) => {
  const [index, setIndex] = useState<number>(0);
  // TODO: small screens => move change slide onto next line
  if (posts.length === 0) {
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
          <ShowcaseItem post={posts[index]} />
          <ChangeSlide
            disabled={index === posts.length - 1}
            direction="right"
            onClick={() => setIndex(index + 1)}
          />
        </div>
        <SlideshowPosition index={index} total={posts.length} />
      </div>
    );
  }
};

export default SlidingShowcase;
