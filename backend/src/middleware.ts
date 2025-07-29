import jwt from 'jsonwebtoken';
import JWT_SECRET from './config';
import { NextFunction, Request, Response, RequestHandler } from 'express';

declare global {
    namespace Express {
      interface Request {
        userId?: string; 
      }
    }
  }
export const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: "Missing or invalid auth header" });
      return;
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      if (decoded.userId) {
        req.userId = decoded.userId;
        next();
      } else {
        res.status(403).json({ message: "Unauthorized" });
      }
    } catch (e) {
      res.status(403).json({ message: "Token verification failed" });
    }
  };