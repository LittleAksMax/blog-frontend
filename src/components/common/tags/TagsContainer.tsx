import { FC, useState } from 'react';
import TagPill, {
  CreateTagPill,
  MoreTagsPlaceholder,
  NoTagsPlaceholder,
} from './TagPill';
import { useAuth } from '../../../contexts/auth';

export interface TagsContainerProps {
  tags: string[];
  limit?: number;
  editable?: boolean;
}

const TagsContainer: FC<TagsContainerProps> = ({
  tags,
  limit,
  editable,
}: TagsContainerProps) => {
  const [editedTags, setEditedTags] = useState<string[]>(tags);
  const { user } = useAuth();

  // ensure you can only edit or limit, not both
  if (editable && limit) {
    throw new Error(
      'TagsContainer: editable and limit cannot be used together'
    );
  }

  const numTagsToEnumerate = Math.min(limit ?? tags.length, tags.length);

  return (
    <ul className="flex flex-row flex-wrap">
      {editedTags.length > 0 ? (
        editedTags
          .slice(0, numTagsToEnumerate)
          .map((tag: string, idx: number) => (
            <TagPill
              key={idx}
              tag={tag}
              // if editable is true, pass onDelete handler
              {...(editable && { onDelete: (tag) => console.log(tag) })}
            />
          ))
      ) : (
        <NoTagsPlaceholder />
      )}
      {limit && limit < tags.length && (
        <MoreTagsPlaceholder remaining={tags.length - limit} />
      )}
      {editable && user && <CreateTagPill onCreate={(tag) => null} />}
    </ul>
  );
};

export default TagsContainer;
