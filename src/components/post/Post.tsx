import { FC, useEffect, useState } from 'react';
import Page from '../common/page/Page';
import PostBanner from './banner/PostBanner';
import PostContent from './content/PostContent';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../../contexts/api';
import { Post } from '../../sdk/types';
import { useAuth } from '../../contexts/auth';
import Spinner from '../common/spinner/Spinner';
import logger from '../../logging';

const NAMESPACE: string = 'components/post/Post.tsx';

interface PostContainerProps {}

const PostContainer: FC<PostContainerProps> = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const apiClient = useApiClient();
  const { user } = useAuth();

  // TODO: media from S3

  useEffect(() => {
    if (!id) {
      throw new Error('id route parameter not set');
    }
    apiClient
      .getOne({
        idOrSlug: id,
      })
      .then(([post, err]) => {
        if (err) {
          logger.error(NAMESPACE, err.message, err.stack);
          setPost(null);
          return;
        }
        setPost(post);
      })
      .catch((err) => {
        if (err instanceof Error) {
          logger.error(NAMESPACE, err.message, err.stack);
        }
        setPost(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, apiClient, id]);

  return (
    <Page>
      {!loading ? (
        <>
          <PostBanner
            tags={post?.tags ?? []}
            title={post?.title ?? ''}
            published={post?.published ?? new Date(0)}
            lastModified={post?.lastUpdated ?? new Date(0)}
            author={'David Rosental'}
          />
          <PostContent content={post?.content ?? ''} />
        </>
      ) : (
        <Spinner />
      )}
    </Page>
  );
};

export default PostContainer;
