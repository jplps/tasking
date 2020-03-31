const express = require('express');

const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');
const ReportController = require('./controllers/ReportController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();

// Authentication service
routes.post('/auth/signup', AuthController.signUp);
routes.post('/auth/signin', AuthController.signIn);

// Users CRUD
routes.post('/users/:user_id', UserController.create);
routes.get('/users/:user_id', UserController.read);

// Bellow method not working. See the warning inside it!
// routes.put('/users/:user_id', UserController.update);

routes.delete('/users/:user_id', UserController.delete);

// Tasks CRUD
routes.post('/users/:user_id/tasks', TaskController.create);
routes.get('/users/:user_id/tasks', TaskController.read);
routes.put('/users/:user_id/tasks', TaskController.update);
routes.delete('/users/:user_id/tasks', TaskController.delete);

// Reports
routes.get('/users/:user_id/report/tasks/byuser', ReportController.tasksByUser);

// Bellow method not working. See the warning inside it!
// routes.get('/users/:user_id/report/tasks/bydate', ReportController.tasksByDate);

routes.get('/users/:user_id/report/tasks/byDTS', ReportController.tasksDTS);
routes.get('/users/:user_id/report/performance/users', ReportController.usersPerformances);

module.exports = routes;