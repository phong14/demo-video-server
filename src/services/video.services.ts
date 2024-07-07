import redis from '../connections/init.redis';
import _uniqueId from 'lodash/uniqueId';
import { EKeyRedis } from '../enums/redis.enum';
import { generateKey } from '../helpers/redis.helpers';
import { ENV } from '../configs/environments.configs';
import _toNumber from 'lodash/toNumber';

const { VIDEO: KEY_VIDEO, VIEW: KEY_VIEW, USER: KEY_USER } = EKeyRedis;

class Video {
  public create = async (url: string, title: string) => {
    try {
      const videoId = _uniqueId();
      const payloadVideo = { videoId, title, url };
      await Promise.all([
        redis.set(generateKey([KEY_VIDEO, videoId]), JSON.stringify(payloadVideo), 'NX'),
        redis.set(generateKey([KEY_VIEW, videoId]), 0, 'NX'),
      ]);

      return {
        ...payloadVideo,
        totalView: 0,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  public getDetail = async (videoId: string) => {
    try {
      const [dataVideo, totalView] = await Promise.all([
        redis.get(generateKey([KEY_VIDEO, videoId])),
        redis.get(generateKey([KEY_VIEW, videoId])),
      ]);

      if (!dataVideo || !totalView) {
        throw new Error('Video does not exist');
      }

      return {
        ...JSON.parse(dataVideo),
        totalView: _toNumber(totalView),
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  public increaseView = async (videoId: string, clientId: string) => {
    try {
      const secondsAllowedToIncreaseViews = ENV.SECONDS_ALLOWED_TO_INCREASE_VIEWS;
      const response = await redis.set(
        generateKey([KEY_USER, clientId, videoId]),
        'playing',
        'EX',
        secondsAllowedToIncreaseViews,
        'NX',
      );

      if (response === null) {
        return false;
      }

      await redis.incrby(generateKey([KEY_VIEW, videoId]), 1);

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default Video;
