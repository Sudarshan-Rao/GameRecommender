import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useLogout from '../CustomHooks/useLogout';

const NavBar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="relative flex items-center justify-between px-2 py-3 bg-yellow-500" data-testid="navbar">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <Link
            to="/"
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            data-testid="game-recommender-nav"
          >
            Game Recommender
          </Link>
        </div>
        <div
          className="lg:flex flex-grow items-center"
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none mr-auto">
            <li className="nav-item">
              <Link
                to="/trending"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                data-testid="trending-nav"
              >
                <span className="ml-2">Trending</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative flex items-center justify-between px-2 py-3 bg-yellow-500">
        <button
          onClick={handleLogout}
          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
          data-testid="logout-button"
        >
          <span className="ml-2">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
