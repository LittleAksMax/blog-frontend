import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import Home from './routes/home/Home';
import NotFound from './routes/status/NotFound';

const App: FC = () => {
  return (
   <Router>
    <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />
    </Routes>
   </Router>
  );
}

export default App;
