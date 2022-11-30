import merge from 'lodash/merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'dev';

let envConfig;

if (stage === 'production') {
  envConfig = require('./prod').default;
} else if (stage === 'test') {
  envConfig = require('./test').default;
} else {
  envConfig = require('./dev').default;
}

const defaultConfig = {
  stage,
  dbUrl: process.env.MONGO_URI,
  jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  pythonGameRecommendationApi:
    process.env.PYTHON_GAME_RECOMMENDATION_API,
  port: process.env.PORT,
  logging: false,
};

export default merge(defaultConfig, envConfig);
