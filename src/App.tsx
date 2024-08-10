import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import Home from './routes/home/Home';
import NotFound from './routes/status/NotFound';
import Login from './components/auth/login/Login';
import Logout from './components/auth/logout/Logout';
import { AuthProp } from './components/props';

interface AppProps extends AuthProp {}

const App: FC<AppProps> = ({ auth }: AppProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login auth={auth} />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
