# TasKing

This is a simple Node REST API using Sequelize ORM to keep track of multiple tasks from users and/or departments of a company. It servers the necessary endpoints to the frontend, and it has a complete authentication flow.

## Node

We can view the app by running the scripts with yarn

		$ yarn dev

## Postgres

Inside the main dir, run the following to get the Postgres containerized

		$ docker build -t tasking_postgres .

Run container in detached mode

		$ docker run -d -p 5432:5432 tasking_postgres

### Creating DB

With the running container, run

		$ yarn sequelize db:create

### Creating Migrations

Creating linear migrations (with the timestamp in the filename in src/database/migrations)

		$ yarn sequelize migration:create --name=create-users
