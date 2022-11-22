import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../CustomHooks/useAuth';
import useLogout from '../CustomHooks/useLogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const { auth } = useAuth();

  const logout = useLogout();

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-yellow-500">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <Link
            to="/"
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
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
                to="/recommendations"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                <span className="ml-2">Recommendation</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                <i className="fab fa-twitter text-lg leading-lg text-white opacity-75" />{' '}
                <span className="ml-2">Profile</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/game:id"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                <span className="ml-2">Game</span>
              </Link>
            </li>
          </ul>
          <div className="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
            <div className="flex">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            >
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    // )
  );
};

export default NavBar;
