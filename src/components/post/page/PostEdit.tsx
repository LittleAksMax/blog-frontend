import { FC, useEffect, useRef, useState } from 'react';
import { Post } from '../../../sdk/api/types';
import { CancelButton, SaveButton } from '../../common/general/buttons';
import { IBlogClient } from '../../../sdk/api/client';
import { getAppropriate } from './pageUtil';
import { useS3 } from '../../../contexts/s3';

interface PostEditSectionProps {
  content: string;
  getFormatted: (content: string) => JSX.Element;
  onChange: (newLineContent: string) => void;
}

const PostEditSection: FC<PostEditSectionProps> = ({
  content,
  getFormatted,
  onChange,
}: PostEditSectionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  return isEditing ? (
    <textarea
      ref={textareaRef}
      className="text-base font-normal focus:outline-none bg-transparent w-[80%] h-auto"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setIsEditing(false)}
      onClick={() => setIsEditing(true)}
    />
  ) : (
    <div className="w-[80%]" onClick={() => setIsEditing(true)} tabIndex={0}>
      {getFormatted(content)}
    </div>
  );
};

interface PostContentProps {
  post: Post;
  apiClient: IBlogClient;
  style: any;
}

const PostEdit: FC<PostContentProps> = ({
  post,
  apiClient,
  style,
}: PostContentProps) => {
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [content, setContent] = useState<string[]>(post.content.split('\n\n'));
  const { s3Client } = useS3();

  return (
    <div className="mx-[20%] w-[80%]">
      {content.map((line, idx) => (
        <div
          key={idx}
          className="w-[80%] focus-within:outline focus-within:outline-2 focus-within:outline-myorange-600 dark:focus-within:outline-myorange-400 p-2 rounded"
        >
          <PostEditSection
            content={line}
            getFormatted={(content: string) =>
              getAppropriate(post, content, style, s3Client)
            }
            onChange={(newLineContent: string) => {
              const newContent = [...content];
              newContent[idx] = newLineContent;
              setContent(newContent);
              setChangesMade(true);
            }}
          />
        </div>
      ))}
      <div>
        {changesMade && (
          <>
            <SaveButton
              onClick={async () => {
                // Save changes in S3
                const success = await apiClient.update({
                  ...post,
                  content: content.join('\n\n'),
                });

                // Reset changes made to reflect
                setChangesMade(false);

                if (!success) {
                  alert('Could not save post changes.');
                }
              }}
            />
            <CancelButton
              onClick={() => {
                setContent(post.content.split('\n\n'));
                setChangesMade(false);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PostEdit;
