import { Request, Response, NextFunction } from 'express';

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === 'tagview-desafio-2024') {
    next();
  } else {
    res.status(401).send();
  }
};

export { apiKeyMiddleware };
