import { FC } from 'react';
import { ChildrenProp } from '../../props';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

interface PageProps extends ChildrenProp {}

const Page: FC<PageProps> = ({ children }: PageProps) => (
  <div className="dark:text-mygrey-100 bg-mygrey-100 dark:bg-mygrey-600">
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default Page;
