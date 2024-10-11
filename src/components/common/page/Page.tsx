import { FC } from 'react';
import { ChildrenProp } from '../../props';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Copyright from '../footer/Copyright';

interface PageProps extends ChildrenProp {}

const Page: FC<PageProps> = ({ children }: PageProps) => (
  <div className="dark:text-mygrey-100 bg-mygrey-100 dark:bg-mygrey-600">
    <Navbar />
    <main className="bg-mygrey-100 dark:bg-mygrey-600 dark:text-mygrey-100">
      {children}
    </main>
    <footer>
      <Footer />
      <Copyright />
    </footer>
  </div>
);

export default Page;
