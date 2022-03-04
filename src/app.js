import cors from 'cors';
import express from 'express';
import routes from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger.json';
import errorHandler from './middlewares/errorHandler';
import db from './database';

class App {
    constructor() {
        this.server = express();
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

    initErrorHandler() {
        this.server.use(errorHandler);
    }

    initDatabase() {
        db.init();
    }

    setup() {
        this.middlewares();
        this.routes();
        this.initErrorHandler();
        this.initDatabase();

        return this.server;
    }
}

export default new App().setup();
