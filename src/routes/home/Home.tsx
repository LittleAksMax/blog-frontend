import { FC, useState } from 'react';
import Navbar from '../../components/common/navbar/Navbar';
import Footer from '../../components/common/footer/Footer';
import SlidingShowcase from '../../components/home/showcase/SlidingShowcase';
import StationaryShowcase from '../../components/home/showcase/StationaryShowcase';
import { PostType } from '../../types';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title }: SectionTitleProps) => (
  <h1 className="text-2xl ml-4">{title}</h1>
);

const Home: FC = () => {
  const [recent, setRecent] = useState<PostType[]>([
    <p>Recent Post 1</p>,
    <p>Recent Post 2</p>,
  ]);
  const [featured, setFeatured] = useState<PostType[]>([
    <p>Featured Post 1</p>,
    <p>Featured Post 2</p>,
    <p>Featured Post 3</p>,
    <p>Featured Post 4</p>,
    <p>Featured Post 5</p>,
    <p>Featured Post 6</p>,
  ]);

  return (
    <>
      <Navbar />
      <main className="bg-mygrey-100 dark:bg-mygrey-600 dark:text-mygrey-100">
        <SectionTitle title="Most Recent Posts" />
        <SlidingShowcase posts={recent} />

        <SectionTitle title="Featured Posts" />
        <StationaryShowcase posts={featured} columns={3} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
