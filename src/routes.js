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
import ExchangeProfitController from './app/controllers/ExchangeProfitController'
import CurrencyApiController from './app/controllers/CurrencyApiController'

const router = new Router()

/**
 * API
 */

// coins
router.get('/coins', CoinController.index)
router.post('/coins', CoinController.store)
router.get('/coins/:id', CoinController.show)
router.put('/coins/:id', CoinController.update)
router.delete('/coins/:id', CoinController.destroy)
router.put(
  '/coins/update_values_internet',
  CurrencyApiController.updateAllCoins
)

// exchange profit
router.post('/exchange_profit', ExchangeProfitController.store)
router.get('/exchange_profit/:id', ExchangeProfitController.show)
router.put('/exchange_profit/:id', ExchangeProfitController.update)
router.delete('/exchange_profit/:id', ExchangeProfitController.destroy)

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

// customers
router.get('/customers', CustomerController.index)
router.post('/customers', CustomerController.store)
router.get('/customers/:id', CustomerController.show)
router.put('/customers/:id', CustomerController.update)
router.delete('/customers/:id', CustomerController.destroy)

// hotels
router.get('/hotels', HotelController.index)
router.post('/hotels', HotelController.store)
router.get('/hotels/:id', HotelController.show)
router.put('/hotels/:id', HotelController.update)
router.delete('/hotels/:id', HotelController.destroy)

// rooms
router.get('/rooms', RoomController.index)
router.post('/rooms', RoomController.store)
router.get('/rooms/:id', RoomController.show)
router.put('/rooms/:id', RoomController.update)
router.delete('/rooms/:id', RoomController.destroy)

// services
router.get('/services', ServiceController.index)
router.post('/services', ServiceController.store)
router.get('/services/:id', ServiceController.show)
router.put('/services/:id', ServiceController.update)
router.delete('/services/:id', ServiceController.destroy)

// hotels categories profit
router.get('/hotels_categories', HotelCategoryProfitController.index)
router.post('/hotels_categories', HotelCategoryProfitController.store)
router.get('/hotels_categories/:id', HotelCategoryProfitController.show)
router.put('/hotels_categories/:id', HotelCategoryProfitController.update)
router.delete('/hotels_categories/:id', HotelCategoryProfitController.destroy)

// exchanges
router.get('/exchanges', ExchangeController.index)
router.post('/exchanges', ExchangeController.destroy)

// offers
router.get('/offers', OfferController.index)
router.post('/offers', OfferController.store)
router.put('/offers/:id', OfferController.update)

export default router
