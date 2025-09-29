import { FC } from 'react';

interface MoreTagsPlaceholderProps {
  remaining: number;
}

export const MoreTagsPlaceholder: FC<MoreTagsPlaceholderProps> = ({
  remaining,
}) => (
  <li className="p-1 m-1 first:ml-0 text-mygrey-100 font-semibold text-sm rounded-lg">
    +{remaining} more...
  </li>
);

export const NoTagsPlaceholder: FC = () => (
  <li className="p-1 m-1 first:ml-0 text-mygrey-100 font-semibold text-sm rounded-lg">
    No Tags...
  </li>
);

interface TagPillProps {
  tag: string;
}

const TagPill: FC<TagPillProps> = ({ tag }: TagPillProps) => (
  <li className="p-1 m-1 first:ml-0 bg-myorange-500 text-mygrey-100 font-semibold text-sm rounded-lg">
    {tag.toUpperCase()}
  </li>
);

export default TagPill;
