import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Game from './Components/Game';
import Search from './Components/Search';
import Recommendations from './Components/Recommendations';
import NotFound from './Components/NotFound';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <nav className='App-Navbar'>
          <Link to="/">Home</Link>
          <Link to="profile">Profile</Link>
          <Link to="search">Search</Link>
          <Link to="recommendations">Recommendations</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="game" element={<Game />} />
          <Route path="search" element={<Search />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
