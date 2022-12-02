import React from 'react';
import { useState, useEffect, useRef } from 'react';
import useGameSearch from '../CustomHooks/useGameSearch';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);
  const { searchGames } = useGameSearch();
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  // useEffect(() => {
  //   console.log(`games: ${games}`);
  //   console.log(`length: ${games?.length}`);
  // }, [games]);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  // }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await searchGames(search, setGames, setError);
    } catch (err) {
      console.log(`handleSubmit error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Home">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center mt-5">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Welcome to Game Recommender!
          </h1>
          <p className="text-xl text-center text-gray-600 mt-5">
            Type in keywords of a game you like and we'll recommend
            similar games!
          </p>
        </div>
        <div className="flex items-center px-3 py-2 rounded-lg shadow-md mt-5 bg-gray-50 dark:bg-gray-700">
          <span className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-yellow-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <textarea
            type="text"
            placeholder="Search for a game"
            rows={1}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
            onChange={(e) => setSearch(e.target.value)}
            ref={searchRef}
            data-testid="search-input"
          />
          <button
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-yellow-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={handleSubmit}
            data-testid="search-button"
          >
            Search
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          {isLoading ? (
            <Loading />
          ) : error ? (
            <p className="text-xl text-center text-gray-600 mt-5">
              No games found. Please try another search with different
              keywords.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {games.map((game) => (
                <a
                  key={game.app_id}
                  className="p-4"
                  href={game.game_link ? game.game_link : '#'}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="game-card"
                >
                  <div className="flex flex-col items-center justify-center h-full p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="flex items-center justify-center mb-4 bg-gray-100 dark:bg-gray-700">
                      <img
                        src={
                          game.image_url
                            ? game.image_url
                            : 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG'
                        }
                        alt="game"
                      />
                    </div>
                    <h2 className="mb-2 text-lg font-medium text-gray-800 dark:text-white">
                      {game.name}
                    </h2>
                    {/* <p className="text-sm text-gray-600 dark:text-gray-400">
                      {game.game_desc}
                    </p> */}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
