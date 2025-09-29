import Markdown from "react-markdown";
import S3Client from "../../../sdk/s3/client";
import { Post } from "../../../sdk/api/types";
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export const extractCode = (section: string, style: any) => (
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

export const extractMarkdown = (section: string) => (
  <Markdown
    remarkPlugins={[remarkGfm, remarkMath]}
    rehypePlugins={[rehypeKatex]}
  >
    {section}
  </Markdown>
);

export const extractImage = (post: Post, filename: string, s3Client: S3Client) => (
  <img alt="media" src={s3Client.getMediaUrl(post, filename)} />
);

export const getAppropriate = (
  post: Post,
  section: string,
  style: any,
  s3Client: S3Client
) => {
  // first match is whole string and second is
  const matches = section.match(/!\[([\w_\-. ]+)\]/);
  if (matches?.length === 2) {
    return extractImage(post, matches[1], s3Client);
  } else if (section.startsWith('~~~') && section.endsWith('~~~')) {
    return extractCode(section, style);
  } else {
    return extractMarkdown(section);
  }
};