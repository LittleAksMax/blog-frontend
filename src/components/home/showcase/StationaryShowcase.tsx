import { FC } from 'react';
import { ShowcaseProps } from './common';

interface StationaryShowcaseProps extends ShowcaseProps {
  columns: number;
}

const StationaryShowcase: FC<StationaryShowcaseProps> = ({
  posts,
  columns,
}: StationaryShowcaseProps) => {
  return <div></div>;
};

export default StationaryShowcase;
