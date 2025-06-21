import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Post } from '../../../sdk/api/types';
import { useApiClient } from '../../../contexts/api';
import logger from '../../../logging';
import Spinner from '../../common/spinner/Spinner';
import { ChildrenProp } from '../../props';
import PostCard from '../../common/general/PostCard';
import { PostDOMManipulation } from '../../common/general/interfaces';

const NAMESPACE = 'components/post/list/PostList.tsx';

const START_PAGE = 1;
const PAGE_SIZE = 10;

interface PageFilterProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  numPages: number;
}

const PageFilter: FC<PageFilterProps> = ({
  page,
  setPage,
  numPages,
}: PageFilterProps) => (
  <div className="flex flex-row">
    <button
      disabled={page === 1}
      onClick={() => {
        setPage(page - 1);
      }}
    >
      &lt;
    </button>
    <span>
      <span>{page}</span> of <span>{numPages}</span>
    </span>
    <button
      disabled={page === numPages}
      onClick={() => {
        setPage(page + 1);
      }}
    >
      &gt;
    </button>
  </div>
);

interface PostListProps extends PostDOMManipulation {
  posts: Post[];
}

const PostList: FC<PostListProps> = ({
  posts,
  removePost,
  archivePost,
}: PostListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <PostListItem key={post.id}>
          <PostCard
            post={post}
            withButtons
            removePost={removePost}
            archivePost={archivePost}
          />
        </PostListItem>
      ))}
    </ul>
  );
};

interface PostListItemProps extends ChildrenProp {}

const PostListItem: FC<PostListItemProps> = ({
  children,
}: PostListItemProps) => <li>{children}</li>;

const PostListContainer: FC = () => {
  const apiClient = useApiClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(START_PAGE);
  const [posts, setPosts] = useState<Post[]>([]);
  const [archivedPosts, setArchivedPosts] = useState<Post[] | null>(null);
  const [numPages, setNumPages] = useState<number>(1);

  useEffect(() => {
    setLoading(true);

    // get posts which are published
    apiClient
      .getAll({
        paginationFilter: {
          pageSize: PAGE_SIZE,
          pageNum: page,
        },
      })
      .then(([posts, totalCount, _, __, err]) => {
        if (err) {
          logger.error(NAMESPACE, err.message, err.stack);
          setPosts([]);
          setNumPages(0);
          return;
        }
        setPosts(posts);
        setNumPages(Math.floor(totalCount / PAGE_SIZE));
      })
      .catch((err) => {
        if (err instanceof Error) {
          logger.error(NAMESPACE, err.message, err.stack);
        }
        setNumPages(1);
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, apiClient]);

  return (
    <div className="mv-[1/4]">
      <PageFilter page={page} setPage={setPage} numPages={numPages} />
      {!loading ? (
        <PostList
          posts={posts}
          removePost={(post) => {
            // filter out posts which don't match removed post
            setPosts(posts.filter((p) => p.id !== post.id));
          }}
          archivePost={(post) => {
            // filter out posts which don't match archived post
            setPosts(posts.filter((p) => p.id !== post.id));
          }}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PostListContainer;
