import { Router } from 'express'
import HotelController from './app/controllers/HotelController'
import RoomController from './app/controllers/RoomController'
import CoinController from './app/controllers/CoinController'
import CategoryAgentController from './app/controllers/CategoryAgentController'
import AgentController from './app/controllers/AgentController'
import ServiceController from './app/controllers/ServiceController'
import CustomerController from './app/controllers/CustomerController'
import HotelCategoryProfitController from './app/controllers/HotelCategoryProfitController'
import ExchangeController from './app/controllers/ExchangeController'
import OfferController from './app/controllers/OfferController'

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

// services
router.get('/services', ServiceController.index)
router.post('/services', ServiceController.store)

// categories agents
router.get('/categories_agents', CategoryAgentController.index)
router.post('/categories_agents', CategoryAgentController.store)

// agents
router.get('/agents', AgentController.index)
router.post('/agents', AgentController.store)

// hotels categories profit
router.get('/hotels_categories', HotelCategoryProfitController.index)
router.post('/hotels_categories', HotelCategoryProfitController.store)

// customers
router.get('/customers', CustomerController.index)
router.post('/customers', CustomerController.store)

// exchanges
router.get('/exchanges', ExchangeController.index)
router.post('/exchanges', ExchangeController.store)

// offers
router.get('/offers', OfferController.index)
router.post('/offers', OfferController.store)

export default router
