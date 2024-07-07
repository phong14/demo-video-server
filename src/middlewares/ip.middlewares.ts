import { NextFunction, Request, Response } from 'express';

export const withMiddlewareIP = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  req.clientIp = ip as string | undefined;
  next();
};
