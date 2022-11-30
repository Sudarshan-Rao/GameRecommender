import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import NotFound from './Components/NotFound';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Trending from './Components/Trending';
import Unauthorized from './Components/Unauthorized';
import PersistLogin from './Components/PersistentLogin';
import RequireAuth from './Components/RequireAuth';
import DashBoardLayout from './Components/DashBoardLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* private */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<DashBoardLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="trending" element={<Trending />} />
            </Route>
          </Route>
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
