const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key':
      'cdae9db55dmsh258b9fd9710aea9p1597f1jsn02d0f6ee3cf0',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
  },
};

const searchParams = {
  resultCount: 20,
  type: 'track',
};

//Search song from Spotify API
const useGameSearch = () => {
  async function searchGames(query, setGames) {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/search/?q=${query}&type=tracks&offset=0&limit=${searchParams.resultCount}&numberOfTopResults=${searchParams.resultCount}`,
        options
      );
      const data = await response.json();
      const songs = [];
      data.tracks.items.map((song) => {
        songs.push({
          id: song.data.id,
          title: song.data.name,
          artist: song.data.artists.items[0].profile.name,
          album: {
            title: song.data.albumOfTrack.name,
            coverURL: song.data.albumOfTrack.coverArt.sources[0].url,
          },
        });
      });

      console.log(songs);
      setGames(songs);
    } catch (err) {
      console.error(err);
    }
  }

  return { searchGames };
};

export default useGameSearch;
