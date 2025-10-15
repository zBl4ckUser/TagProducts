import { Router, Request, Response } from 'express';

const v1_router = Router();

v1_router.get('/up', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Everything is up and running!' });
});

export default v1_router;
