import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import routes from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger.json'

import './database'

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  routes() {
    this.server.use('/api', routes)
  }
}

export default new App().server
