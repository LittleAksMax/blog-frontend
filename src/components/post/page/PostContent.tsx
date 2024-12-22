import { FC, useEffect, useMemo, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { gruvboxDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import logger from '../../../logging';

const NAMESPACE: string = 'components/post/page/PostContent';

const extractCode = (section: string, style: any) => (
  <pre>
    <SyntaxHighlighter
      language={section.slice(3, section.indexOf('\n'))} // section after ~~~[lang]
      style={style}
      PreTag="div"
      children={section.substring(section.indexOf('\n') + 1, section.length - 3)} // strips ~~~[lang] from beginning and ~~~ from end
    />
  </pre>
)

const extractMarkdown = (section: string) => (
  <Markdown
    remarkPlugins={[remarkGfm, remarkMath]}
    rehypePlugins={[rehypeKatex]}
  >
    {section}
  </Markdown>
)

interface PostContentProps {
  content: string;
}

const PostContent: FC<PostContentProps> = (props: PostContentProps) => {
  // styling of code, this is lazy and doesn't toggle automatically
  // when the theme is switched
  const [style, setStyle] = useState(gruvboxDark);
  useEffect(() => {
    setStyle(localStorage.getItem('theme') === 'dark' ? gruvboxDark : materialLight);
  }, []);

  const content = useMemo(() => props.content, [props.content]);
  // TODO: images and shit
  return (
    <div className="mx-[20%] w-[80%]">
      {content.split('\n\n').map((section, idx) => (
        <div key={idx}>
          {section.startsWith('~~~') && section.endsWith('~~~')
            ? extractCode(section, style) : extractMarkdown(section)}
        </div>
      ))}
    </div>
  );
};

export default PostContent;
