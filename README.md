## REST API TRAVEL

## REST API Travel with Node.js, Express.js, Sequelize, Sucrase, Swagger, Docker and PostgresSQL

> `API RESTful` - Tourism agency specialized in bringing tourists from around the world to visit Brazil's beaches, savannahs and forests

![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![NODE](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![EXPRESS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)![GITHUB](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![YARN](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![POSTGRES](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![VSCODE](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## Components

- NodeJs
- Insomnia
- Container Docker Postgres
- Postbird
- Swagger

## Dependecies

- Express
- Sequelize
- Nodemon
- Sucrase
- Eslint
- Prettier
- dotEnv
- Cors

## Usage

1. Clone the application

```sh
$ https://github.com/naldomadeira/rest-api-travel.git
$ cd rest-api-travel
$ yarn install
```

Project setup it is necessary to rename `.env.example` for `.env` and make the necessary adjustments to connect your database

2. Create docker container PostgresSQL

```sh
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

3. After configuring and creating the database,execute migrations

```sh
$ yarn sequelize db:migrate
```

4.Use the command below to start the project:

```bash
$ yarn dev
```

5.Run the project and access the documentation at:
[http://localhost:3333/api/doc](http://localhost:3000/api/doc)

## Database Model

![database-api-travel](https://user-images.githubusercontent.com/1483851/112417763-000be880-8d07-11eb-85fd-d48efecb5923.PNG)

## Tests

They were entirely carried out in the automated environment of insomnia. Insomnia is an extremely useful tool for testing manually or automating the testing of any REST API.

![insomnia-api-rest-travel](https://user-images.githubusercontent.com/1483851/112418370-149cb080-8d08-11eb-8cee-cf119079929f.PNG)

## Screenshots

![row-1-col-1](https://user-images.githubusercontent.com/1483851/112431201-f6da4600-8d1d-11eb-9c8c-8ded8ec93c25.png)
![row-2-col-1](https://user-images.githubusercontent.com/1483851/112431208-f9d53680-8d1d-11eb-8d09-2c8b90b491e5.png)
![row-3-col-1](https://user-images.githubusercontent.com/1483851/112431214-fc379080-8d1d-11eb-89aa-584fc4e00a7d.png)
![row-4-col-1](https://user-images.githubusercontent.com/1483851/112431223-fe99ea80-8d1d-11eb-9bc1-e276ca923b43.png)
![row-5-col-1](https://user-images.githubusercontent.com/1483851/112431228-0063ae00-8d1e-11eb-969c-24f45bdc5b94.png)
![row-6-col-1](https://user-images.githubusercontent.com/1483851/112431238-02c60800-8d1e-11eb-9ad8-fd040eae13a4.png)
![row-7-col-1](https://user-images.githubusercontent.com/1483851/112431246-05286200-8d1e-11eb-98db-e09e70ba9244.png)

## Credits

This API was developed by Francinaldo Madeira

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/francinaldomadeira/)](https://www.linkedin.com/in/francinaldomadeira/)
