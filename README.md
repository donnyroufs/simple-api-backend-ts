# About

Grabbed a bunch of existing libraries to create a very solid backend with TypeScript, Prisma and Swagger as it's drivers. The
project aims to have very clean and clear boundaries by using dependency injections, dtos and the Result pattern for handling
your regular errors.

# How to run the project?

## Use with Docker

_You need to have docker & docker-compose installed_

- Clone the repository
- Clone and rename env.example to .env
- Run docker-compose up

## Use without Docker

_You need to have a Postgres server up and running_
_You need to have node installed_

- Clone the repository
- Run yarn
- Clone and rename env.example to .env
- Run yarn dev
