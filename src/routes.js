import { Router } from 'express'
import HotelController from './app/controllers/HotelController'
import RoomController from './app/controllers/RoomController'
const router = new Router()

/**
 * API
 */

// hotels
router.post('/hotels', HotelController.store)

// rooms
router.post('/rooms', RoomController.store)

export default router
