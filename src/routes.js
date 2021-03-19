import { Router } from 'express'
import HotelController from './app/controllers/HotelController'

const router = new Router()

/**
 * API
 */
router.post('/hotels', HotelController.store)

export default router
