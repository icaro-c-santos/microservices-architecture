import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const traceId = req.headers['trace-id'] || uuidv4();
    req.headers['trace-id'] = traceId;
    res.setHeader('trace-id', traceId);
    next();
  }
}
