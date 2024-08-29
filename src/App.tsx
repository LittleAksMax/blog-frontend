import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import Home from './routes/home/Home';
import NotFound from './routes/status/NotFound';
import Login from './components/auth/login/Login';
import Logout from './components/auth/logout/Logout';
import { Auth as FirebaseAuth } from 'firebase/auth';
import AuthProvider from './providers/AuthProvider';
import Post from './components/post/Post';

interface AppProps {
  auth: FirebaseAuth;
}

const App: FC<AppProps> = ({ auth }: AppProps) => {
  return (
    <AuthProvider auth={auth}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
