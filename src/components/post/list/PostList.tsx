import { Dispatch, FC, useEffect, useState } from 'react';
import { Post } from '../../../sdk/types';
import { useApiClient } from '../../../contexts/api';
import logger from '../../../logging';
import Spinner from '../../common/spinner/Spinner';
import { ChildrenProp } from '../../props';
import PostCard from '../../common/general/PostCard';

const NAMESPACE = 'components/post/list/PostList.tsx';

const START_PAGE = 1;
const PAGE_SIZE = 10;

interface PageFilterProps {
  page: number;
  setPage: Dispatch<number>;
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

interface PostListProps {
  posts: Post[];
}

const PostList: FC<PostListProps> = ({ posts }: PostListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <PostListItem key={post.id}>
          <PostCard post={post} withButtons />
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
  const [numPages, setNumPages] = useState<number>(1);

  useEffect(() => {
    setLoading(true);

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
      {!loading ? <PostList posts={posts} /> : <Spinner />}
    </div>
  );
};

export default PostListContainer;
