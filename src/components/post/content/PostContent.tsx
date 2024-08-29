import { FC } from 'react';

// TODO: remove
// NOTE: we will split it on \n\n
// const ExampleContent: string = `
// # Example Heading 1

// This is a paragraph with some *bold* text.

// There are multiple things to talk about.

// # Example Heading 2

// # Conclusion

// Some subtopics are important

// `;

interface PostContentProps {
  content: string;
  // TODO: media from S3
}

const PostContent: FC<PostContentProps> = ({ content }: PostContentProps) => {
  // TODO: parsing the content into paragraphs, maths blocks, and media
  return (
    <div className="mx-[20%] w-full">
      <p>{content}</p>
    </div>
  );
};

export default PostContent;
