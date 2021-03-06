// Setting up the connection
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Task = require('../models/Task');
const Department = require('../models/Department');
const TaskStatus = require('../models/TaskStatus');
const TaskType = require('../models/TaskType');
const TaskActivity = require('../models/TaskActivity');

const connection = new Sequelize(dbConfig);

User.init(connection);
Task.init(connection);
Department.init(connection);
TaskStatus.init(connection);
TaskType.init(connection);
TaskActivity.init(connection);

User.associate(connection.models);
Task.associate(connection.models);
Department.associate(connection.models);
TaskStatus.associate(connection.models);
TaskType.associate(connection.models);
TaskActivity.associate(connection.models);

module.exports = connection;