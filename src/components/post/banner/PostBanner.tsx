import { FC } from 'react';

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
    {tags.map((tag: string) => (
      <TagPill tag={tag} />
    ))}
  </ul>
);

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }: TitleProps) => (
  <h1 className="font-semibold text-lg">{title}</h1>
);

interface PostDateProps {
  label: string;
  date: Date;
}

const PostDate: FC<PostDateProps> = ({ label, date }: PostDateProps) => (
  <div>
    <span>{label}</span>
    &nbsp;
    <span>{date.toISOString()}</span>
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
    <PostDate label="Last modified" date={lastModified} />
  </div>
);

interface AuthorProps {
  author: string;
}

const Author: FC<AuthorProps> = ({ author }: AuthorProps) => (
  <div>
    <span>By</span>
    &nbsp;
    <span>{author}</span>
  </div>
);

interface PostBannerProps
  extends TagsContainerProps,
    TitleProps,
    DatesContainerProps,
    AuthorProps {}

const PostBanner: FC<PostBannerProps> = ({
  title,
  tags,
  published,
  lastModified,
  author,
}: PostBannerProps) => {
  return (
    <div className="p-4">
      <Title title={title} />
      <TagsContainer tags={tags} />
      <DatesContainer published={published} lastModified={lastModified} />
      <Author author={author} />
    </div>
  );
};

export default PostBanner;
