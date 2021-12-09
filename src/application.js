import cors from 'cors';
import express from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger.json';

import './database';
class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(
            '/api/v1/docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        );
    }

    routes() {
        this.server.use('/api/v1', routes);
    }
}

export default new App().server;
