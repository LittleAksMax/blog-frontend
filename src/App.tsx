import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import Home from './routes/home/Home';
import NotFound from './routes/status/NotFound';
import Login from './components/auth/login/Login';
import Logout from './components/auth/logout/Logout';
import { Auth as FirebaseAuth } from 'firebase/auth';
import AuthProvider from './providers/AuthProvider';
import Post from './components/post/Post';
import ApiProvider from './providers/ApiProvider';
import { IBlogClient } from './sdk/client';

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
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ApiProvider>
    </AuthProvider>
  );
};

export default App;
