import { FC } from 'react';
import { ChildrenProp } from '../../props';
import Navbar from '../navbar/Navbar';

interface PageProps extends ChildrenProp {}

const Page: FC<PageProps> = ({ children }: PageProps) => {
  // TODO: obtain logged in from firebase existence of current user
  return (
    <div className="dark:text-mygrey-100 bg-mygrey-100 dark:bg-mygrey-600">
      <Navbar loggedIn={false} />
      {children}
    </div>
  );
};

export default Page;
