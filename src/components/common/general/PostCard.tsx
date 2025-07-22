import { FC, useEffect, useMemo, useState } from 'react';
import { Post } from '../../../sdk/api/types';
import {
  ArchiveButton,
  DeleteButton,
  PublishButton,
  UpdateButton,
} from './buttons';
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
  publishPost,
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
    <div className="bg-mygrey-100 dark:bg-mygrey-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-mygrey-300 dark:border-mygrey-500">
      <div className="group">
        <a href={url} className="block">
          <div className="relative overflow-hidden">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-64 h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-myorange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <div className="p-4 group-hover:bg-myorange-50 dark:group-hover:bg-mygrey-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-mygrey-800 dark:text-mygrey-100 group-hover:text-myorange-600 dark:group-hover:text-myorange-400 transition-colors duration-300 mb-2">
              {post.title + (post.status === 'Archived' ? ' (archived)' : '')}
            </h3>
            <div className="text-mygrey-600 dark:text-mygrey-300">
              {children}
            </div>
          </div>
        </a>
      </div>
      {withButtons && auth.user && (
        <div className="flex flex-row gap-2 p-4 bg-mygrey-50 dark:bg-mygrey-700 border-t border-mygrey-200 dark:border-mygrey-600">
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
          {post.status !== 'Archived' ? (
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
          ) : (
            <PublishButton
              onClick={async () => {
                const success = await apiClient.publish(post);
                if (!success) {
                  alert('Could not publish post');
                }

                // if there is an action to perform, then perform it
                if (withButtons && publishPost) {
                  publishPost(post);
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
