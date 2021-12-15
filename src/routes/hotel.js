import { Router } from 'express';
import HotelController from '../app/controllers/HotelController';

const router = new Router();

// hotels
router.get('/', HotelController.index);
router.post('/', HotelController.store);
router.get('/:id', HotelController.show);
router.put('/:id', HotelController.update);
router.delete('/:id', HotelController.destroy);

export default router;
