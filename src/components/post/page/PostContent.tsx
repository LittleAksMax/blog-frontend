import { FC, useEffect, useMemo, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  gruvboxDark,
  materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import logger from '../../../logging';
import { useS3 } from '../../../contexts/s3';
import S3Client from '../../../sdk/s3/client';
import { Post } from '../../../sdk/api/types';

const NAMESPACE: string = 'components/post/page/PostContent';

const extractCode = (section: string, style: any) => (
  <pre>
    <SyntaxHighlighter
      language={section.slice(3, section.indexOf('\n'))} // section after ~~~[lang]
      style={style}
      PreTag="div"
      children={section.substring(
        section.indexOf('\n') + 1,
        section.length - 3
      )} // strips ~~~[lang] from beginning and ~~~ from end
    />
  </pre>
);

const extractMarkdown = (section: string) => (
  <Markdown
    remarkPlugins={[remarkGfm, remarkMath]}
    rehypePlugins={[rehypeKatex]}
  >
    {section}
  </Markdown>
);

const extractImage = (post: Post, filename: string, s3Client: S3Client) => (
  <img alt="media" src={s3Client.getMediaUrl(post, filename)} />
);

const getAppropriate = (
  post: Post,
  section: string,
  style: any,
  s3Client: S3Client
) => {
  // first match is whole string and second is
  const matches = section.match(/!\[([\w_\-\. ]+)\]/);
  logger.debug(NAMESPACE, 'matches', matches);
  if (matches?.length === 2) {
    return extractImage(post, matches[1], s3Client);
  } else if (section.startsWith('~~~') && section.endsWith('~~~')) {
    return extractCode(section, style);
  } else {
    return extractMarkdown(section);
  }
};

interface PostContentProps {
  post: Post;
}

const PostContent: FC<PostContentProps> = ({ post }: PostContentProps) => {
  // styling of code, this is lazy and doesn't toggle automatically
  // when the theme is switched
  const [style, setStyle] = useState(gruvboxDark);
  useEffect(() => {
    setStyle(
      localStorage.getItem('theme') === 'dark' ? gruvboxDark : materialLight
    );
  }, []);

  const content = useMemo(() => post?.content ?? '', [post]);
  const { s3Client } = useS3();
  // TODO: images and shit
  return (
    <div className="mx-[20%] w-[80%]">
      {content.split('\n\n').map((section, idx) => (
        <div key={idx} className="w-[80%]">
          {getAppropriate(post, section, style, s3Client)}
        </div>
      ))}
    </div>
  );
};

export default PostContent;
