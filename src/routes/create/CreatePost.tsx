import { FC } from 'react';
import Page from '../../components/common/page/Page';
import { useAuth } from '../../contexts/auth';
import { Navigate } from 'react-router-dom';

interface CreatePostProps {}

const CreatePost: FC<CreatePostProps> = () => {
  const auth = useAuth();

  // if not logged in, we are not authorised to view this page
  if (!auth.user) {
    alert('Please log in to access this page.');
    return <Navigate to="/" />;
  }

  return (
    <Page>
      <h1>Create Page</h1>
    </Page>
  );
};

export default CreatePost;
