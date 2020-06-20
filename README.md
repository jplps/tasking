# Tasking

Manage all your professional tasks!

## Concept

This is a simple [Node](https://nodejs.org/en/) REST API using [Sequelize](https://sequelize.org/) ORM to keep track of multiple tasks from users and/or departments of a company. It servers the necessary endpoints to the frontend, and it has a complete authentication flow with [JWT](https://jwt.io/) and a middleware check for a token.

## Structure

System: Dynamic Application  
Main lang(s): JavaScript (ECMA)
Stack: Node / Express & Sequelize
Pattern: RESTful

## Server - dockerizing Postgres

Inside the main dir, run the command to get the Postgres containerized, and start the container in detached mode

		$ docker build -t tasking_postgres .
		$ docker run -d -p 5432:5432 tasking_postgres

#### Creating DB

With the container running, let's create the db and execute the migrations & seeders

		$ yarn sequelize db:create
		$ yarn sequelize db:migrate
		$ yarn sequelize db:seed:all

## Check the app

We can start the app by running the scripts with yarn

		$ yarn dev

## Check the DB!

There are several programs to facilitate the db check. [Postbird](https://www.electronjs.org/apps/postbird) is cool to see stuff without getting inside the container. You can also test the queries and routes with a REST client like [Insomnia](https://insomnia.rest/).