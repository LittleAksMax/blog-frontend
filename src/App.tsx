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
import { IBlogClient } from './sdk/client';
import Posts from './routes/posts/Posts';
import PostEditor from './routes/update/PostEditor';
import CreatePost from './routes/create/CreatePost';

interface AppProps {
  auth: FirebaseAuth;
  client: IBlogClient;
}

const App: FC<AppProps> = ({ auth, client }: AppProps) => {
  return (
    <AuthProvider auth={auth}>
      <ApiProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/:id/editor" element={<PostEditor />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/posts" element={<Posts />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ApiProvider>
    </AuthProvider>
  );
};

export default App;
