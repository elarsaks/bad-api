# Bad Api
Repository for Reaktor job application

## Environments
Environment|URL
Testing| http://35.228.187.83:8080/ && http://35.228.187.83:3001/
Development-local|http://localhost:8080/ && http://localhost:3001/

## Local development
### Prerequisites
* Docker
* Docker Composer

## Setup and Running
  1. Download bad-api from GitHub
  2. Run 'docker-compose up --build' in project root
  3. Wait until application installs itself and populates database
  4. Test it on on http://localhost:8080/ && http://localhost:3001/

## Architecture
<img src="http://co2pop.s3.eu-north-1.amazonaws.com/architecture.png" />

### Reaktor api
Legacy api provided by client
* Has 2 api endpoints: 1.-products data, 2.-products stock situation
* Has cache 5 minutes

Known errors:
* Api endpoint nr.2 sometimes returns empty array

### proxy_api
* Serves as a proxy between legacy api and new api
* Fetches data from legacy api and feeds it into current api-s Postgres DB
* Schedules data fetching as follows: 
    1. Api endpoint nr.1 - Every midnight
    2. Api endpoint nr.2 - Currently after every 5 minutes - will be changed to - During workdays from 6-17 a clock, after every 5 minutes.
* Cleans data coming from legacy api

### Postgres
* Stores products data in 1 single 'Products' table

<!-- TODO: change name into 'client_api' -->
### redis_client_api
* Receives requests from client
* Checks if Redis has requested data and serves it to the client. 
* If Redis dont have data:
    1. Fetches requested data from the Postgres
    2. Serves it to the client
    3. Updates Redis with requested data
    4. Updates Redis with a data that possibily might be requested next
* Sets client's chache on 5 minutes when returning data

### Redis
* Stores products data for 5 minutes at a time
* JSON data is stored as a String
* Products are divided based on categories ('gloves', 'facemasks', 'beanies')

### Client
* Fetches data from redis_client_api and displays it to the user

