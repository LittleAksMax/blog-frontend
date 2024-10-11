import { FC } from 'react';
import Page from '../../components/common/page/Page';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

interface PostEditorProps {}

const PostEditor: FC<PostEditorProps> = () => {
  const auth = useAuth();

  // if not logged in, we are not authorised to view this page
  if (!auth.user) {
    alert('Please log in to access this page.');
    return <Navigate to="/" />;
  }

  return (
    <Page>
      <h1>Update Page</h1>
    </Page>
  );
};

export default PostEditor;
