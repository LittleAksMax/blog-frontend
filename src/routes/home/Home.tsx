import { FC, useMemo, useState } from 'react';
import SlidingShowcase from '../../components/home/showcase/SlidingShowcase';
import StationaryShowcase from '../../components/home/showcase/StationaryShowcase';
import Page from '../../components/common/page/Page';
import { Post } from '../../sdk/types';
import { useApiClient } from '../../contexts/api';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title }: SectionTitleProps) => (
  <h1 className="text-2xl ml-4">{title}</h1>
);

const Home: FC = () => {
  const recent = useMemo<Post[]>(() => [], []);
  const featured = useMemo<Post[]>(() => [], []);
  const client = useApiClient();
  const [value, setValue] = useState<string>('');

  return (
    <Page>
      <main className="bg-mygrey-100 dark:bg-mygrey-600 dark:text-mygrey-100">
        <SectionTitle title="Most Recent Posts" />
        <SlidingShowcase posts={recent} />

        <SectionTitle title="Featured Posts" />
        <StationaryShowcase posts={featured} columns={3} />

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
      </main>
    </Page>
  );
};

export default Home;
