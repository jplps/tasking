// Setting up the connection
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Task = require('../models/Task');
const Department = require('../models/Department');

const connection = new Sequelize(dbConfig);

User.init(connection);
Task.init(connection);
Department.init(connection);

User.associate(connection.models);
Task.associate(connection.models);
Department.associate(connection.models);

module.exports = connection;