var dotenv = require('dotenv');

let path;
switch (process.env.NODE_ENV) {
    case 'production':
        path = `${__dirname}/../../.env`;
        break;
    case 'test':
        path = `${__dirname}/../../.env.test`;
        break;
    case 'stage':
        path = `${__dirname}/../../.env.stage`;
        break;
    case 'development':
        path = `${__dirname}/../../.env.development`;
        break;
    default:
        path = `${__dirname}/../../.env.development`;
}

dotenv.config({ path: path });

const environment = {
    application: {
        name: process.env.APP_NAME || 'rest-travel-api',
        port: process.env.PORT || 3333,
        env: process.env.ENV,
        uri: process.env.APP_URL,
    },
    db: {
        dialect: process.env.DB_DIALECT || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USERNAME || 'postgress',
        password: process.env.DB_PASSWORD || 'docker',
        database: process.env.DB_DATABASE || 'traveldb',
        port: process.env.DB_PORT || '5432',
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
    },
};

module.exports = environment;
