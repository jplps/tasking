# TasKing

This is a simple Node REST API using Sequelize ORM to keep track of multiple tasks from users and/or departments of a company. It servers the necessary endpoints to the frontend, and it has a complete authentication flow.

## Run Node Project

We can view the app by running the scripts with yarn

		$ yarn dev

## Dockerizing Postgres

Inside the main dir, run the command to get the Postgres containerized, and start the container in detached mode

		$ docker build -t tasking_postgres .
		$ docker run -d -p 5432:5432 tasking_postgres

## Creating DB

With the container running, let's create the db and execute the migrations (defines in src/migrations/)

		$ yarn sequelize db:create
		$ yarn sequelize db:migrate

