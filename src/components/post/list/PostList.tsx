import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Post } from '../../../sdk/api/types';
import { useApiClient } from '../../../contexts/api';
import logger from '../../../logging';
import Spinner from '../../common/spinner/Spinner';
import { ChildrenProp } from '../../props';
import PostCard from '../../common/general/PostCard';
import { PostDOMManipulation } from '../../common/general/interfaces';
import PostsCollection from '../../../util/PostsTrie';

const NAMESPACE = 'components/post/list/PostList.tsx';

const START_PAGE = 1;
const PAGE_SIZE = 10;

interface PageFilterProps {
  filter: string | null;
  setFilter: Dispatch<SetStateAction<string | null>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  numPages: number;
}

const PageFilter: FC<PageFilterProps> = ({
  filter,
  setFilter,
  page,
  setPage,
  numPages,
}: PageFilterProps) => {
  return (
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
      <input
        placeholder="Looking for something?"
        onChange={(e) => {
          const searchTerm = e.target.value.trim();
          setFilter(searchTerm.length === 0 ? null : searchTerm);
        }}
        value={filter ?? ''}
      />
    </div>
  );
};

interface PostListProps extends PostDOMManipulation {
  posts: Post[];
}

const PostList: FC<PostListProps> = ({
  posts,
  removePost,
  archivePost,
  publishPost,
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
            publishPost={publishPost}
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
  const [numPages, setNumPages] = useState<number>(1);
  const [filter, setFilter] = useState<string | null>(null);

  const postsTrie = useMemo(() => {
    const coll = new PostsCollection();
    for (const post of posts) {
      coll.put(post);
    }
    return coll;
  }, [posts]);

  const activePosts = useMemo<Post[]>(
    () => postsTrie.getAllWithPrefix(filter ?? ''),
    [filter, postsTrie]
  );

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
      <PageFilter
        filter={filter}
        setFilter={setFilter}
        page={page}
        setPage={setPage}
        numPages={numPages}
      />
      {!loading ? (
        <PostList
          posts={activePosts}
          removePost={(post) => {
            // filter out posts which don't match removed post
            setPosts(posts.filter((p) => p.id !== post.id));
          }}
          archivePost={(post) => {
            setPosts(
              posts.map((p) =>
                p.id !== post.id
                  ? p
                  : {
                      ...p,
                      status: 'Archived',
                    }
              )
            );
          }}
          publishPost={(post) => {
            setPosts(
              posts.map((p) =>
                p.id !== post.id
                  ? p
                  : {
                      ...p,
                      status: 'Published',
                    }
              )
            );
          }}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PostListContainer;
