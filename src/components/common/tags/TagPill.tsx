import { FC, useState } from 'react';

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
  onDelete?: (tag: string) => void; // If this prop is set, the tag is editable
}

const TagPill: FC<TagPillProps> = ({ tag, onDelete }: TagPillProps) => {
  const [hovered, setHovered] = useState(false);
  const editable: boolean = onDelete !== undefined;

  return (
    <li
      className="p-1 m-1 first:ml-0 bg-myorange-500 text-mygrey-100 font-semibold text-sm rounded-lg flex items-center cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (!editable) {
          return;
        }
        onDelete!(tag);
      }}
    >
      {editable && hovered ? (
        // Simple bin/trash SVG icon
        <span
          className="flex items-center justify-center text-center"
          style={{ minWidth: `${tag.length}ch` }}
        >
          {/* TODO: extract SVG to file in public/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-red-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 7h12M9 7V4h6v3m-7 4v9a2 2 0 002 2h4a2 2 0 002-2V11"
            />
          </svg>
        </span>
      ) : (
        tag.toUpperCase()
      )}
    </li>
  );
};

interface CreateTagPillProps {
  onCreate: (tag: string) => void;
}

export const CreateTagPill: FC<CreateTagPillProps> = ({
  onCreate,
}: CreateTagPillProps) => {
  const [newTag, setNewTag] = useState<string | null>(null);

  return (
    <li className="select-none p-1 m-1 first:ml-0 border border-transparent hover:border-green-500 hover:cursor-pointer text-green-500 font-semibold text-sm rounded-lg">
      {newTag ? newTag : '+ Add'}
    </li>
  );
};

export default TagPill;
