import axios from 'axios';

export const getGameRecommendationsHandler = async (
  req,
  res,
  next
) => {
  try {
    // console.log(req.body);
    const url =
      process.env.PYTHON_GAME_RECOMMENDATION_API +
      '/get-recommendation';

    // construct request body
    const body = {
      search_string: req.body.search_string,
    };

    // send request to backend
    const response = await axios.post(url, body);
    // console.log(response.data);

    // send the response back to the client
    res.status(200);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

export const getTrendingGamesHandler = async (req, res, next) => {
  try {
    const url =
      process.env.PYTHON_GAME_RECOMMENDATION_API + '/get-trending';

    // send request to backend
    const response = await axios.get(url);
    console.log(response.data);

    // send the response back to the client
    res.status(200);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};
