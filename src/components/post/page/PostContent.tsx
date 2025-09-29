import { FC, useMemo } from 'react';
import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import { useS3 } from '../../../contexts/s3';
import { Post } from '../../../sdk/api/types';
import { getAppropriate } from './pageUtil';

// const NAMESPACE: string = 'components/post/page/PostContent';

interface PostContentProps {
  post: Post;
  style: any;
}

const PostContent: FC<PostContentProps> = ({
  post,
  style,
}: PostContentProps) => {
  const content = useMemo(() => post?.content ?? '', [post]);
  const { s3Client } = useS3();
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
