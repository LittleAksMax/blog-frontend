import { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArchiveButton,
  BackButton,
  DeleteButton,
} from '../../common/general/buttons';
import { useAuth } from '../../../contexts/auth';
import { useApiClient } from '../../../contexts/api';
import { Navigate, useNavigate } from 'react-router-dom';
import { PostStatusType } from '../../../sdk/api/types';
import TagsContainer, {
  TagsContainerProps,
} from '../../common/tags/TagsContainer';

interface TitleProps {
  title: string;
  status: PostStatusType;
  editable?: boolean;
  updateTitle: (newTitle: string) => Promise<boolean>;
}

const Title: FC<TitleProps> = ({
  title,
  editable,
  updateTitle,
}: TitleProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(editable ?? false);
  const [titleContent, setTitleContent] = useState<string>(title);
  const titleRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.setSelectionRange(
        titleRef.current.value.length,
        titleRef.current.value.length
      );
    }
  }, [isEditing]);

  return editable && isEditing ? (
    <div className="p-2 rounded focus-within:outline focus-within:outline-2 focus-within:outline-myorange-600 dark:focus-within:outline-myorange-400">
      <input
        ref={titleRef}
        className="w-auto h-auto focus:outline-none font-semibold text-lg bg-transparent text-myorange-600 dark:text-myorange-400"
        value={titleContent}
        onChange={(e) => {
          setTitleContent(e.target.value);
        }}
        onBlur={async () => {
          const success = await updateTitle(titleContent);
          setIsEditing(false);

          if (!success) {
            alert('Could not update title.');
          }
        }}
      />
    </div>
  ) : (
    <h1
      className="font-semibold text-lg text-myorange-600 dark:text-myorange-400"
      onClick={() => setIsEditing(true)}
    >
      {titleContent}
    </h1>
  );
};

interface PostDateProps {
  label: string;
  date: Date;
}

const PostDate: FC<PostDateProps> = ({ label, date }: PostDateProps) => (
  <div>
    <span>
      <strong>{label}</strong>
    </span>
    &nbsp;
    <span>
      <em>{date.toLocaleDateString()}</em>
    </span>
  </div>
);

interface DatesContainerProps {
  published: Date;
  lastModified: Date;
}

const DatesContainer: FC<DatesContainerProps> = ({
  published,
  lastModified,
}: DatesContainerProps) => (
  <div>
    <PostDate label="Published" date={published} />
    {published.getTime() !== lastModified.getTime() && (
      <PostDate label="Revised" date={lastModified} />
    )}
  </div>
);

interface AuthorProps {
  author: string;
}

const Author: FC<AuthorProps> = ({ author }: AuthorProps) => (
  <div>
    <span>
      <strong>By</strong>
    </span>
    &nbsp;
    <span className="text-gray-500 dark:text-gray-300">
      <em>{author}</em>
    </span>
  </div>
);

interface PostBannerProps
  extends TagsContainerProps,
    TitleProps,
    DatesContainerProps,
    AuthorProps {
  id: string;
  updateTitle: (newTitle: string) => Promise<boolean>;
}

const PostBanner: FC<PostBannerProps> = (props: PostBannerProps) => {
  const auth = useAuth();
  const id = useMemo(() => props.id, [props.id]);
  const title = useMemo(() => props.title, [props.title]);
  const tags = useMemo(() => props.tags, [props.tags]);
  const published = useMemo(() => props.published, [props.published]);
  const lastModified = useMemo(() => props.lastModified, [props.lastModified]);
  const author = useMemo(() => props.author, [props.author]);
  const status = useMemo(() => props.status, [props.status]);

  // for redirecting when the 'Back to all posts' button is clicked
  const navigate = useNavigate();

  const apiClient = useApiClient();

  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  if (shouldRedirect) {
    return <Navigate to="/posts" />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <Title
          title={title}
          status={status}
          updateTitle={props.updateTitle}
          editable
        />
        <BackButton
          text="Back to all posts"
          onClick={() => {
            navigate('/posts');
          }}
        />
      </div>
      <TagsContainer tags={tags} editable />
      <DatesContainer published={published} lastModified={lastModified} />
      <Author author={author} />
      {auth.user !== null && (
        <div className="flex flex-row">
          <DeleteButton
            onClick={async () => {
              const success = await apiClient.delete({ id });
              if (!success) {
                alert('Could not delete post.');
              }
              setShouldRedirect(true);
            }}
          />
          {status !== 'Archived' && (
            <ArchiveButton
              onClick={async () => {
                const success = await apiClient.archive({ id });
                if (!success) {
                  alert('Could not archive post.');
                }
                setShouldRedirect(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PostBanner;
