import { FC, useMemo, useState } from 'react';
import SlidingShowcase from '../../components/home/showcase/SlidingShowcase';
import StationaryShowcase from '../../components/home/showcase/StationaryShowcase';
import Page from '../../components/common/page/Page';
import { Post } from '../../sdk/types';
import { useApiClient } from '../../contexts/api';
import { useAuth } from '../../contexts/auth';
import logger from '../../logging';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title }: SectionTitleProps) => (
  <h1 className="text-2xl ml-4">{title}</h1>
);

const Home: FC = () => {
  const recent = useMemo<Post[]>(() => [], []);
  const featured = useMemo<Post[]>(() => [], []);
  const auth = useAuth();
  const client = useApiClient();
  const [value, setValue] = useState<string>('');
  const [valueDel, setValueDel] = useState<string>('');

  return (
    <Page>
      <main className="bg-mygrey-100 dark:bg-mygrey-600 dark:text-mygrey-100">
        <SectionTitle title="Most Recent Posts" />
        <SlidingShowcase posts={recent} />

        <SectionTitle title="Featured Posts" />
        <StationaryShowcase posts={featured} columns={3} />

        <div>
          <button
            onClick={(_) => {
              client
                .getAll({
                  paginationFilter: {
                    pageSize: 10,
                    pageNum: 1,
                  },
                })
                .then((res) => {
                  logger.debug('routes/home/Home.tsx', 'GET ALL Result', res);
                });
            }}
          >
            Get All
          </button>
        </div>
        <div>
          <label htmlFor="idOrSlug">Id Or Slug:</label>
          <input
            id="idOrSlug"
            name="idOrSlug"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <br />
          <button
            onClick={(_) => {
              client.getOne({ idOrSlug: value });
            }}
          >
            Get One
          </button>
        </div>
        <div>
          <button
            onClick={(_) => {
              client.create({
                title: 'CSharp: Not the same Windows Language you knew?',
                content: 'Some content.',
                collections: ['programming'],
                tags: ['csharp', 'dotnet'],
                featured: true,
              });
            }}
          >
            Create
          </button>
        </div>
        <div>
          <button
            onClick={(_) => {
              client.update({
                id: 'asdasd',
                title: '',
                content: '',
                collections: [],
                tags: [],
                status: 'Draft',
                featured: false,
              });
            }}
          >
            Update
          </button>
        </div>
        <div>
          <label htmlFor="idOrSlug-del">Id Or Slug:</label>
          <input
            id="idOrSlug-del"
            name="idOrSlug-del"
            value={valueDel}
            onChange={(e) => setValueDel(e.target.value)}
          />
          <br />
          <button
            onClick={(_) => {
              auth.user?.getIdToken().then((token) => {
                client.delete({ id: valueDel });
              });
            }}
          >
            Delete
          </button>
        </div>
      </main>
    </Page>
  );
};

export default Home;
