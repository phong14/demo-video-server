import Redis from 'ioredis';
import { ENV } from '../configs/environments.configs';

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USER_NAME } = ENV;

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  username: REDIS_USER_NAME,
  password: REDIS_PASSWORD,
});

export default redis;
