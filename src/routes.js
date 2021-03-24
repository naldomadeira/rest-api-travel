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
router.get('/rooms/:id', RoomController.show)
router.put('/rooms/:id', RoomController.update)
router.delete('/rooms/:id', RoomController.destroy)

// coins
router.get('/coins', CoinController.index)
router.put('/coins/update', CoinController.updateAllCurrency)
router.post('/coins', CoinController.store)

// services
router.get('/services', ServiceController.index)
router.post('/services', ServiceController.store)

// categories agents
router.get('/categories_agents', CategoryAgentController.index)
router.get('/categories_agents/:id', CategoryAgentController.show)
router.post('/categories_agents', CategoryAgentController.store)
router.put('/categories_agents/:id', CategoryAgentController.update)
router.delete('/categories_agents/:id', CategoryAgentController.destroy)

// agents
router.get('/agents', AgentController.index)
router.post('/agents', AgentController.store)
router.get('/agents/:id', AgentController.show)
router.put('/agents/:id', AgentController.update)
router.delete('/agents/:id', AgentController.destroy)

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
