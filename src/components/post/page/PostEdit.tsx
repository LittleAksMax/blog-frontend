import { FC, useState } from 'react';
import { Post } from '../../../sdk/api/types';
import { CancelButton, SaveButton } from '../../common/general/buttons';

interface PostContentProps {
  post: Post;
}

const PostEdit: FC<PostContentProps> = ({ post }: PostContentProps) => {
  const [changesMade, setChangesMade] = useState<boolean>(true);
  // TODO: storing initial state line-by-line to compare
  return (
    <div className="mx-[20%] w-[80%]">
      {post.content.split('\n\n').map((line, idx) => (
        <div
          key={idx}
          className="w-[80%] focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 p-2 rounded"
        >
          {/* TODO: onchange checking against corresponding section */}
          <textarea
            className="text-base font-normal focus:outline-none bg-transparent w-[80%] h-auto"
            value={line}
          />
        </div>
      ))}
      <div>
        {/* TODO: onclicks for save and cancel */}
        {changesMade && (
          <>
            <SaveButton /> <CancelButton />
          </>
        )}
      </div>
    </div>
  );
};

export default PostEdit;
