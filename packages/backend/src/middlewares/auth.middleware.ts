import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import { CustomError } from '../error/custom.error';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';
  const [tokenType, token]: string[] = authHeader.split(' ');

  if (tokenType === 'Bearer' && token.length > 10) {
    const { id } = verify(token, process.env.JWT_SECRET) as JwtPayload;

    const user = await User.findById(id);
    if (!user) {
      next(new CustomError(401, 'Not authorized'));
    }
    if (!user?.token) {
      next(new CustomError(401, 'Not authorized'));
    }
    req.user = user!;
    return next();
  }

  return next(new CustomError(401, 'No Token'));
};
