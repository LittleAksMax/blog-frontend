import { FC, useEffect, useState } from 'react';
import SlidingShowcase from '../../components/home/showcase/SlidingShowcase';
import StationaryShowcase from '../../components/home/showcase/StationaryShowcase';
import Page from '../../components/common/page/Page';
import { Post } from '../../sdk/types';
import { useApiClient } from '../../contexts/api';
import logger from '../../logging';
import Spinner from '../../components/common/spinner/Spinner';

const NAMESPACE: string = 'routes/home/Home.tsx';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title }: SectionTitleProps) => (
  <h1 className="text-2xl ml-4">{title}</h1>
);

const NUM_FEATURED = 20;
const NUM_RECENT = 15;

const Home: FC = () => {
  const [recent, setRecent] = useState<Post[]>([]);
  const [featured, setFeatured] = useState<Post[]>([]);
  const [recentLoading, setRecentLoading] = useState<boolean>(true);
  const [featuredLoading, setFeaturedLoading] = useState<boolean>(true);
  const apiClient = useApiClient();

  useEffect(() => {
    Promise.all([
      // get top featured posts
      apiClient
        .getAll(
          {
            paginationFilter: {
              pageSize: NUM_FEATURED,
              pageNum: 1,
            },
            featured: true,
          },
          false // force no authentication token => faster + no archived
        )
        .then(([posts, _count, _prev, _next, err]) => {
          if (err) {
            logger.error(NAMESPACE, err.message, err.stack);
            setFeatured([]);
            return;
          }
          setFeatured(posts);
        })
        .catch((err) => {
          if (err instanceof Error) {
            logger.error(NAMESPACE, err.message, err.stack);
          }
          setFeatured([]);
        })
        .finally(() => {
          setFeaturedLoading(false);
        }),

      // get most recent posts
      apiClient
        .getAll(
          {
            paginationFilter: {
              pageSize: NUM_RECENT,
              pageNum: 1,
            },
          },
          false // force no authentication token => faster + no archived
        )
        .then(([posts, _count, _prev, _next, err]) => {
          if (err) {
            logger.error(NAMESPACE, err.message, err.stack);
            setRecent([]);
            return;
          }
          setRecent(posts);
        })
        .catch((err) => {
          if (err instanceof Error) {
            logger.error(NAMESPACE, err.message, err.stack);
          }
          setRecent([]);
        })
        .finally(() => {
          setRecentLoading(false);
        }),
    ]);
  }, [apiClient]);

  return (
    <Page>
        <SectionTitle title="Most Recent Posts" />
        {!recentLoading ? <SlidingShowcase posts={recent} /> : <Spinner />}

        <SectionTitle title="Featured Posts" />
        {!featuredLoading ? (
          <StationaryShowcase posts={featured} columns={3} />
        ) : (
          <Spinner />
        )}
    </Page>
  );
};

export default Home;
