import dotenv from 'dotenv';
import _toNumber from 'lodash/toNumber';

dotenv.config();

const {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USER_NAME,
  PORT,
  SECONDS_ALLOWED_TO_INCREASE_VIEWS,
} = process.env;

if (!PORT) {
  throw new Error('Missing environments [PORT]!');
}
if (!REDIS_HOST) {
  throw new Error('Missing environments [REDIS_HOST]!');
}
if (!REDIS_PORT) {
  throw new Error('Missing environments [REDIS_PORT]!');
}
if (!REDIS_USER_NAME) {
  throw new Error('Missing environments [REDIS_USER_NAME]!');
}
if (!REDIS_PASSWORD) {
  throw new Error('Missing environments [REDIS_PASSWORD]!');
}
if (!SECONDS_ALLOWED_TO_INCREASE_VIEWS) {
  throw new Error('Missing environments [SECONDS_ALLOWED_TO_INCREASE_VIEWS]!');
}

export const ENV = {
  PORT,
  REDIS_HOST,
  REDIS_PORT: _toNumber(REDIS_PORT),
  REDIS_USER_NAME,
  REDIS_PASSWORD,
  SECONDS_ALLOWED_TO_INCREASE_VIEWS: _toNumber(SECONDS_ALLOWED_TO_INCREASE_VIEWS),
};
