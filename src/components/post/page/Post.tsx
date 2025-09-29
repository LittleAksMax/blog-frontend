import { FC, useEffect, useState } from 'react';
import Page from '../../common/page/Page';
import PostBanner from './PostBanner';
import PostContent from './PostContent';
import { Navigate, useParams } from 'react-router-dom';
import { useApiClient } from '../../../contexts/api';
import { Post } from '../../../sdk/api/types';
import { useAuth } from '../../../contexts/auth';
import Spinner from '../../common/spinner/Spinner';
import logger from '../../../logging';
import EditModeToggle from './EditModeToggle';
import PostEdit from './PostEdit';
import {
  gruvboxDark,
  materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

const NAMESPACE: string = 'components/post/Post.tsx';

interface PostContainerProps {}

const PostContainer: FC<PostContainerProps> = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const apiClient = useApiClient();
  const { user } = useAuth();
  const [style, setStyle] = useState(gruvboxDark);

  // styling of code, this is lazy and doesn't toggle automatically
  // when the theme is switched
  useEffect(() => {
    setStyle(
      localStorage.getItem('theme') === 'dark' ? gruvboxDark : materialLight
    );
  }, []);

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

  if (!loading && !post) {
    return <Navigate to="/posts" />;
  }
  return (
    <Page>
      {!loading ? (
        <>
          <PostBanner
            id={post?.id ?? ''}
            tags={post?.tags ?? []}
            title={post?.title ?? ''}
            published={post?.published ?? new Date(0)}
            lastModified={post?.lastUpdated ?? new Date(0)}
            author={'David Rosental'}
            status={post?.status ?? 'Published'}
            updateTitle={async (newTitle) => {
              return post
                ? apiClient.update({ ...post, title: newTitle })
                : false;
            }}
          />
          {/* Logged in user can choose to edit the post */}
          {user && (
            <div className="flex justify-center my-4">
              <EditModeToggle
                editMode={editMode}
                toggleEditMode={() => setEditMode(!editMode)}
              />
            </div>
          )}
          {/* Not logged/not editing => show regular page. */}
          {post &&
            (!user || !editMode ? (
              <PostContent post={post} style={style} />
            ) : (
              <PostEdit post={post} apiClient={apiClient} style={style} />
            ))}
        </>
      ) : (
        <Spinner />
      )}
    </Page>
  );
};

export default PostContainer;
