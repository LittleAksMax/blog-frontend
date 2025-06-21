import { FC, useEffect, useMemo, useState } from 'react';
import { Post } from '../../../sdk/api/types';
import { ArchiveButton, DeleteButton, UpdateButton } from './buttons';
import { useAuth } from '../../../contexts/auth';
import { ChildrenProp } from '../../props';
import { useS3 } from '../../../contexts/s3';
import { useApiClient } from '../../../contexts/api';
import { PostDOMManipulation } from './interfaces';

// const NAMESPACE: string = 'components/common/general/PostCard.tsx';
const PLACEHOLDER_URL: string = '/placeholder.svg';

export interface PostCardProps extends ChildrenProp, PostDOMManipulation {
  post: Post;
  withButtons?: boolean;
}

const PostCard: FC<PostCardProps> = ({
  post,
  withButtons,
  removePost,
  archivePost,
  children,
}: PostCardProps) => {
  const { s3Client } = useS3();
  const apiClient = useApiClient();
  const [imageUrl, setImageUrl] = useState<string>(PLACEHOLDER_URL);

  useEffect(() => {
    if (post.banner.length !== 0) {
      setImageUrl(s3Client.getPostBannerUrl(post));
    }
  }, [s3Client, post]);

  const auth = useAuth();
  const url = useMemo(() => `/posts/${post.id}`, [post]);

  return (
    <div>
      <div>
        <a href={url}>
          <img src={imageUrl} alt={post.title} />
          <span>{post.title}</span>
          <div>{children}</div>
        </a>
      </div>
      {withButtons && auth.user && (
        <div className="flex flex-row">
          {/* TODO: update button implementations */}
          <UpdateButton />
          <DeleteButton
            onClick={async () => {
              const success = await apiClient.delete({ id: post.id });
              if (!success) {
                alert('Could not delete post');
              }

              // if there is an action to perform, then perform it
              if (withButtons && removePost) {
                removePost(post);
              }
            }}
          />
          {post.status !== 'Archived' && (
            <ArchiveButton
              onClick={async () => {
                const success = await apiClient.archive(post);
                if (!success) {
                  alert('Could not archive post');
                }

                // if there is an action to perform, then perform it
                if (withButtons && archivePost) {
                  archivePost(post);
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
