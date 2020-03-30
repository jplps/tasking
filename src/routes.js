const express = require('express');

const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');
const ReportController = require('./controllers/ReportController');

const routes = express.Router();

// Users CRUD
routes.get('/users/:user_id', UserController.index);
routes.post('/users/:user_id', UserController.store);
routes.put('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.delete);

// Tasks CRUD
routes.get('/users/:user_id/tasks', TaskController.index);
routes.post('/users/:user_id/tasks', TaskController.store);
routes.put('/users/:user_id/tasks', TaskController.update);
routes.delete('/users/:user_id/tasks', TaskController.delete);

// Reports
routes.get('/users/:user_id/report/tasks/byuser', ReportController.tasksByUser);
routes.get('/users/:user_id/report/tasks/bydate', ReportController.tasksByDate);
routes.get('/users/:user_id/report/performance/users', ReportController.usersPerformances);


module.exports = routes;