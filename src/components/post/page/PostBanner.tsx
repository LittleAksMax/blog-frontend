import { FC, useMemo, useState } from 'react';
import {
  ArchiveButton,
  BackButton,
  DeleteButton,
  UpdateButton,
} from '../../common/general/buttons';
import { useAuth } from '../../../contexts/auth';
import { useApiClient } from '../../../contexts/api';
import { Navigate, useNavigate } from 'react-router-dom';
import { PostStatusType } from '../../../sdk/api/types';

interface TagPillProps {
  tag: string;
}

const TagPill: FC<TagPillProps> = ({ tag }: TagPillProps) => (
  <li className="p-1 m-1 first:ml-0 bg-myorange-500 text-mygrey-100 font-semibold text-sm rounded-lg">
    {tag.toUpperCase()}
  </li>
);

interface TagsContainerProps {
  tags: string[];
}

const TagsContainer: FC<TagsContainerProps> = ({
  tags,
}: TagsContainerProps) => (
  <ul className="flex flex-row flex-wrap">
    {tags.map((tag: string, idx: number) => (
      <TagPill key={idx} tag={tag} />
    ))}
  </ul>
);

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }: TitleProps) => (
  <h1 className="font-semibold text-lg text-myorange-600 dark:text-myorange-400">
    {title}
  </h1>
);

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
  status: PostStatusType;
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
        <Title title={title} />
        <BackButton
          text="Back to all posts"
          onClick={() => {
            navigate('/posts');
          }}
        />
      </div>
      <TagsContainer tags={tags} />
      <DatesContainer published={published} lastModified={lastModified} />
      <Author author={author} />
      {auth.user !== null && (
        <div className="flex flex-row">
          <UpdateButton
            onClick={async () => {
              // TODO: implement
              console.log('Update');
            }}
          />
          <DeleteButton
            onClick={async () => {
              const success = await apiClient.delete({ id });
              if (!success) {
                alert('Could not delete post');
              }
              setShouldRedirect(true);
            }}
          />
          {status !== 'Archived' && (
            <ArchiveButton
              onClick={async () => {
                const success = await apiClient.archive({ id });
                if (!success) {
                  alert('Could not archive post');
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
