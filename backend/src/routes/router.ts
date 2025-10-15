import Router from 'express';
import v1_router from './v1/v1_router';

const router = Router();

router.use('/v1', v1_router);

export default router;
