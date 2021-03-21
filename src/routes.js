import { Router } from 'express'
import HotelController from './app/controllers/HotelController'
import RoomController from './app/controllers/RoomController'
const router = new Router()

/**
 * API
 */

// hotels
router.get('/hotels', HotelController.index)
router.post('/hotels', HotelController.store)

// rooms
router.get('/rooms', RoomController.index)
router.post('/rooms', RoomController.store)

export default router
