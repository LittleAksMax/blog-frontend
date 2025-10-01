import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import Home from './routes/home/Home';
import NotFound from './routes/status/NotFound';
import Login from './components/auth/login/Login';
import Logout from './components/auth/logout/Logout';
import { Auth as FirebaseAuth } from 'firebase/auth';
import AuthProvider from './providers/AuthProvider';
import Post from './components/post/page/Post';
import ApiProvider from './providers/ApiProvider';
import { IBlogClient } from './sdk/api/client';
import Posts from './routes/posts/Posts';
import PostEditor from './routes/update/PostEditor';
import S3Provider from './providers/S3Provider';
import S3Client from './sdk/s3/client';
import Drafts from './routes/posts/Drafts';

interface AppProps {
  auth: FirebaseAuth;
  client: IBlogClient;
  s3Client: S3Client;
  bucketName: string;
}

const App: FC<AppProps> = ({
  auth,
  client,
  s3Client,
  bucketName,
}: AppProps) => {
  return (
    <AuthProvider auth={auth}>
      <ApiProvider client={client}>
        <S3Provider s3Client={s3Client} bucketName={bucketName}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id/editor" element={<PostEditor />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/drafts" element={<Drafts />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </S3Provider>
      </ApiProvider>
    </AuthProvider>
  );
};

export default App;
