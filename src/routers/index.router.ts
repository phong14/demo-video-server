import express, { Request, Response } from 'express';
import _toNumber from 'lodash/toNumber';
import { StatusEnum } from '../enums/response.enum';
import { transformResponse, transformResponseErrors } from '../helpers/transform.helpers';
import Video from '../services/video.services';

const video = new Video();

const router = express.Router();

router.post('/createVideo', async (req: Request, res: Response) => {
  try {
    const { url, title } = req.body;
    if (!url) {
      throw new Error('Missing require field [url]');
    }

    if (!title) {
      throw new Error('Missing require field [title]');
    }

    const data = await video.create(url, title);
    res.json(transformResponse({ status: StatusEnum.OK, data }));
  } catch (error) {
    res.json(transformResponseErrors(error));
  }
});

router.post('/getVideo', async (req: Request, res: Response) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      throw new Error('Missing require field [videoId]');
    }

    const data = await video.getDetail(videoId);
    res.json(
      transformResponse({
        status: StatusEnum.OK,
        data,
      }),
    );
  } catch (error) {
    res.json(transformResponseErrors(error));
  }
});

router.post('/increaseView', async (req: Request, res: Response) => {
  try {
    const { videoId, userId } = req.body;
    const ip = req.clientIp || userId;

    if (!videoId) {
      throw new Error('Missing require field [videoId]');
    }

    if (!userId) {
      throw new Error('Missing require field [userId]');
    }

    const data = await video.increaseView(videoId, ip);
    res.json(transformResponse({ status: StatusEnum.OK, data }));
  } catch (error) {
    res.json(transformResponseErrors(error));
  }
});

export default router;
