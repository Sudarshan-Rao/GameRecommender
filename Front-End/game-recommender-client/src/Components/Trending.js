import React from 'react';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../CustomHooks/useAxiosPrivate';
import Loading from './Loading';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getTrending = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get('/api/trending');
        console.log(`response: ${JSON.stringify(response)}`);
        setTrending(response?.data?.trending_games);
      } catch (err) {
        console.log(`getTrending error: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    getTrending();
  }, []);

  return (
    <div className="Trending">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center mt-5">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Trending Games
          </h1>
          <p className="text-xl text-center text-gray-600 mt-5">
            Check out the most popular games on Game Recommender!
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-14">
              {trending.map((game) => (
                <a key={game.app_id}
                  href={game.game_link ? game.game_link : '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center" data-testid="trending-card">
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

export default Trending;

