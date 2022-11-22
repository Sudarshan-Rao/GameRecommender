import React from 'react';
import { useState, useEffect } from 'react';
import useGameSearch from '../CustomHooks/useGameSearch';
import Loading from './Loading';
import NavBar from './NavBar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [search, setSearch] = useState('');
  const [games, setGames] = useState([]);
  const searchGames = useGameSearch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(`games: ${games}`);
  }, [games]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data } = await searchGames(search);
    setGames(data.results);
    setIsLoading(false);
  };

  return (
    <div className="Home">
      <NavBar />
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center mt-5">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Welcome to Game Recommender!
          </h1>
          <p className="text-xl text-center text-gray-600 mt-5">
            Search for a game to get started!
          </p>
        </div>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <span className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <textarea
            type="text"
            placeholder="Search for a game"
            rows={1}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {games.map((game) => (
                <div key={game.id} className="p-4">
                  <div className="flex flex-col items-center justify-center h-full p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-full dark:bg-indigo-700">
                      <img
                        src={
                          game.image
                            ? game.image
                            : 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG'
                        }
                        alt="game"
                      />
                    </div>
                    <h2 className="mb-2 text-lg font-medium text-gray-800 dark:text-white">
                      {game.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {game.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
