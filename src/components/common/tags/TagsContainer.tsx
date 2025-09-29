import { FC } from 'react';
import TagPill, { MoreTagsPlaceholder, NoTagsPlaceholder } from './TagPill';

export interface TagsContainerProps {
  tags: string[];
  limit?: number;
}

const TagsContainer: FC<TagsContainerProps> = ({
  tags,
  limit,
}: TagsContainerProps) =>
  tags.length > 0 ? (
    <ul className="flex flex-row flex-wrap">
      {tags.slice(0, limit ?? tags.length).map((tag: string, idx: number) => (
        <TagPill key={idx} tag={tag} />
      ))}
      {limit && limit < tags.length && (
        <MoreTagsPlaceholder remaining={tags.length - limit} />
      )}
    </ul>
  ) : (
    <NoTagsPlaceholder />
  );

export default TagsContainer;
