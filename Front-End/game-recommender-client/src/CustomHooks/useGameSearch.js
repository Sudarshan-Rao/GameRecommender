import useAxiosPrivate from './useAxiosPrivate';

const useGameSearch = () => {
  const axiosPrivate = useAxiosPrivate();
  async function searchGames(query, setGames, setError) {
    try {
      const response = await axiosPrivate.post(
        '/api/searchrecomendations',
        JSON.stringify({ search_string: query }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`response: ${JSON.stringify(response)}`);
      if (
        response?.data?.game_recommendation &&
        response?.data?.game_recommendation?.length > 0
      ) {
        setGames(response?.data?.game_recommendation);
        setError('');
      } else {
        setGames([]);
        setError('No games found');
      }
    } catch (err) {
      console.log(`useGameSearch error: ${err}`);
      setGames([]);
      setError(`Server Error: ${err}`);
    }
  }
  return { searchGames };
};

export default useGameSearch;
