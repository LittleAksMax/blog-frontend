import { FC, useEffect, useMemo, useState } from 'react';
import { Post } from '../../../sdk/api/types';
import { DeleteButton, UpdateButton } from './buttons';
import { useAuth } from '../../../contexts/auth';
import { ChildrenProp } from '../../props';
import { useS3 } from '../../../contexts/s3';
import logger from '../../../logging';

const NAMESPACE: string = 'components/common/general/PostCard.tsx';

export interface PostCardProps extends ChildrenProp {
  post: Post;
  withButtons?: boolean;
}

const PostCard: FC<PostCardProps> = ({
  post,
  withButtons,
  children,
}: PostCardProps) => {
  const { s3Client } = useS3();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    s3Client
      .getPostBannerUrl(post)
      .then((url: string) => {
        // logger.debug(NAMESPACE, 'image url', { url });
        setImageUrl(url);
      })
      .catch((err) => {
        logger.error(NAMESPACE, 'Error occurred while fetching image URL', err);
      });
  }, [s3Client, post]);

  const auth = useAuth();
  const url = useMemo(() => `/posts/${post.id}`, [post]);
  return (
    <div>
      <div>
        <a href={url}>
          <img
            src={imageUrl ? imageUrl : '/placeholder.svg'}
            alt={`${post.title}`}
          />
          <span>{post.title}</span>
          <div>{children}</div>
        </a>
      </div>
      {withButtons && auth.user && (
        <div>
          <UpdateButton />
          <DeleteButton />
        </div>
      )}
    </div>
  );
};

export default PostCard;
