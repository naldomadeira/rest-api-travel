import { Router } from 'express'
import HotelController from './app/controllers/HotelController'
import RoomController from './app/controllers/RoomController'
import CoinController from './app/controllers/CoinController'

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

// coins
router.get('/coins', CoinController.index)
router.post('/coins', CoinController.store)

export default router
