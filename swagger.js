const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: '1.0.0',
    title: 'Rest Api Travel',
    description: 'Rest Api Travel',
  },
  host: 'http://localhost:3333/',
  servers: ['http://localhost:3333/api/docs'],
  basePath: 'api/docs',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Coin',
      description: 'CRUD operations about coins',
    },
    {
      name: 'CategoryAgent',
      description: 'CRUD operations about categories of agents',
    },
    {
      name: 'Customer',
      description: 'CRUD operations about categories of agents',
    },
    {
      name: 'Agent',
      description: 'CRUD operations about categories of agents',
    },
    {
      name: 'Hotel',
      description: 'CRUD operations about categories of agents',
    },
    {
      name: 'Room',
      description: 'CRUD operations about categories of agents',
    },
    {
      name: 'Service',
      description: 'CRUD operations about categories of agents',
    },
    {
      name: 'HotelCategoryAgent',
      description: 'CRUD operations about categories of agents',
    },
    {
      name: 'Offer',
      description: 'CRUD operations about categories of agents',
    },
  ],
  definitions: {
    Coin: {
      $name: 'Libra',
      $symbol: '£',
      $profit: 0.8,
      value: 1.9,
    },
    CategoryAgent: {
      $name: 'Agências',
      $profit: 0.6,
      $active: true,
    },
    Customer: {
      $name: 'Clistenio',
      $surname: 'Madeira',
      $phone: '85 985426655',
      $country: 'Brazil',
      address: 'Rua Desembargador Moreira, 1865 - Fortaleza - Ceará',
      $coin_id: 1,
      dependencie: {
        $ref: '#/definitions/Coin',
      },
    },
    Agent: {
      $name: 'Agência Fortaleza',
      address: 'Rua Desembargador Moreira, 1865 - Fortaleza - Ceará',
      $category_agent_id: 1,
      dependencie: {
        $ref: '#/definitions/CategoryAgent',
      },
    },
    Hotel: {
      $name: 'Hotel Vila Mango',
      $country: 'Brazil',
      details: 'Hotel com 30 anos de história',
      address: 'Av.Beira mar, 2356, Ceará',
    },
    Room: {
      $name: 'Quarto vista jardins',
      $type: 'DBL',
      $hotel_id: 1,
      dependencie: {
        $ref: '#/definitions/Hotel',
      },
    },
    Service: {
      $price: 500,
      $hotel_id: 1,
      $room_id: 1,
      $coin_id: 1,
      dependencie1: {
        $ref: '#/definitions/Hotel',
      },
      dependencie2: {
        $ref: '#/definitions/Room',
      },
      dependencie3: {
        $ref: '#/definitions/Coin',
      },
    },
    HotelCategoryAgent: {
      $profit: 0.3,
      $hotel_id: 1,
      $category_agent_id: 1,
      dependencie1: {
        $ref: '#/definitions/Hotel',
      },
      dependencie2: {
        $ref: '#/definitions/CategoryAgent',
      },
    },
    Offer: {
      $name: 'Oferta Reveilon',
      $checkin: '2022-10-23',
      $checkout: '2022-10-25',
      $customer_id: 2,
      $agent_id: 1,
      $service_id: 1,
      dependencie1: {
        $ref: '#/definitions/Customer',
      },
      dependencie2: {
        $ref: '#/definitions/Agent',
      },
      dependencie3: {
        $ref: '#/definitions/Service',
      },
    },
  },
}

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {})
