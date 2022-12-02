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
        setTrending(response.data);
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
            <div className="flex flex-col items-center justify-center">
              {trending.map((game) => (
                <div key={game.id} className="flex flex-col items-center justify-center" data-testid="trending-cards">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-64 h-64"
                  />
                  <p className="text-xl text-center text-gray-600 mt-5">
                    {game.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trending;

