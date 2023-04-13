# Bikecheck API
## Introduction
Bikecheck API is a simple express API to add, modify and list bikecheck of your bike with PostgreSQL database.
## Project Support Features
* User can login to admin account
* Public (non-authenticated) users can access only GET requests.
* Authenticated user can access all endpoints as well as create a new parts, edit created parts and also delete created parts.
## Installation Guide
* Clone this repository [here](https://github.com/PawelBorkowy/express-api-bikecheck.git).
* Run npm install to install all dependencies
  ```
  npm i
  ```
* Create an .env file in your project root folder and add your variables to PostgreSQL, JWT secret key and username and password to authentication.
  ```
  PG_USER= <your_postgres_username>
  PG_HOST= <your_postgres_host>
  PG_DATABASE= <your_postgres_database>
  PG_PASSWORD= <your_postgres_password>
  PG_PORT= <your_postgres_port>
  JWT_SECRET= <your_JWT_secret>
  JWT_USERNAME= <your_API_username>
  JWT_PASSWORD= <yout_API_password>
  ```
## Usage
* Run the application.
  ```
  npm start
  ```
* Connect to the API using Postman.
  ```
  http://localhost:3000/
  ```
## Authentication
* Run the application
* Send POST request on:
  ```
  http://localhost:3000/login
  ```
  with body filled with JSON:
  ```
  {
   "username": "your_username", 
   "password": "your_password"
  }
  ```
 * Retrive authentication token from response.
 * Fill `Authorization` header with retrived token sending `POST`, `PUT` and `DELETE` requests.
## API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /bike/:part | To retrieve specific bike part by its name |
| GET | /bike | To list all bike parts created with their id, name, brand and model |
| POST | /login | To login and get response with authentication token (authentication needed) |
| POST | /bike | To create a new bike part (authentication needed) |
| PUT | /bike/:id | To edit the details of a specific part by id (authentication needed) |
| DELETE | /bike/:id | To delete a specific part by id (authentication needed) |
## Technologies Used
* [NodeJS](https://nodejs.org/) 
* [ExpressJS](https://www.expresjs.org/) 
* [PostgreSQL](https://www.postgresql.org/)
* [JSON Web Token](https://jwt.io/)
### License
This project is available for use under the ISC License.