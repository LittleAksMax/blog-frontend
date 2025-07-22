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
import { generateSlug } from '../postUtil';

const NAMESPACE = 'components/post/list/PostList.tsx';

const START_PAGE = 1;
const PAGE_SIZE = 10;

interface PageFilterProps {
  setFilter: Dispatch<SetStateAction<string | null>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  numPages: number;
}

const PageFilter: FC<PageFilterProps> = ({
  setFilter,
  page,
  setPage,
  numPages,
}: PageFilterProps) => {
  return (
    <div className="px-[10%] min-h-[10vh] flex justify-center py-4">
      <div className="flex flex-col gap-4 p-6 bg-mygrey-200 dark:bg-mygrey-700 rounded-lg shadow-sm max-w-4xl w-full">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="search-input"
            className="text-sm font-medium text-mygrey-700 dark:text-mygrey-100"
          >
            Search Posts
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Looking for something?"
            className="px-3 py-2 border border-mygrey-400 dark:border-mygrey-500 rounded-md focus:outline-none focus:ring-2 focus:ring-myorange-500 bg-mygrey-100 dark:bg-mygrey-600 dark:text-mygrey-100"
            onChange={(e) => {
              const searchTerm = e.target.value;
              setFilter(
                searchTerm.length === 0 ? null : generateSlug(searchTerm)
              );
            }}
          />
        </div>

        <div className="flex flex-row gap-4 items-end">
          <div className="flex flex-col gap-2 flex-1">
            <label
              htmlFor="tags-input"
              className="text-sm font-medium text-mygrey-700 dark:text-mygrey-100"
            >
              Filter by Tags
            </label>
            <input
              id="tags-input"
              type="text"
              placeholder="Enter tags separated by commas"
              className="px-3 py-2 border border-mygrey-400 dark:border-mygrey-500 rounded-md focus:outline-none focus:ring-2 focus:ring-myorange-500 bg-mygrey-100 dark:bg-mygrey-600 dark:text-mygrey-100"
              onChange={(e) => {
                // TODO: Implement tag filtering functionality
                console.log('Tags filter:', e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label
              htmlFor="collections-select"
              className="text-sm font-medium text-mygrey-700 dark:text-mygrey-100"
            >
              Filter by Collection
            </label>
            <select
              id="collections-select"
              className="px-3 py-2 border border-mygrey-400 dark:border-mygrey-500 rounded-md focus:outline-none focus:ring-2 focus:ring-myorange-500 bg-mygrey-100 dark:bg-mygrey-600 dark:text-mygrey-100"
              onChange={(e) => {
                // TODO: Implement collection filtering functionality
              }}
            >
              <option value="">All Collections</option>
              {/* TODO: Populate with actual collections */}
              <option value="tech">Tech</option>
              <option value="personal">Personal</option>
              <option value="tutorials">Tutorials</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-4 mt-2">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
            className="px-4 py-2 bg-myorange-500 text-mygrey-100 rounded-md disabled:bg-mygrey-400 disabled:cursor-not-allowed hover:bg-myorange-600 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-mygrey-700 dark:text-mygrey-100">
            Page <span className="font-bold">{page}</span> of{' '}
            <span className="font-bold">{numPages}</span>
          </span>
          <button
            disabled={page === numPages}
            onClick={() => {
              setPage(page + 1);
            }}
            className="px-4 py-2 bg-myorange-500 text-mygrey-100 rounded-md disabled:bg-mygrey-400 disabled:cursor-not-allowed hover:bg-myorange-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
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
}: PostListItemProps) => <li className="mb-6 px-4">{children}</li>;

// TODO: test if filter works
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
