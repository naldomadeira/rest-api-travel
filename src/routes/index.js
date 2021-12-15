import { Router } from 'express';
import hotelsRoute from './hotel';

const router = new Router();

router.use('hotels', hotelsRoute);

export default router;
