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
// User specific attended tasks amount
routes.get('/users/:user_id/report/user/attendedamount', ReportController.tasksAmountByUser);
// Response time by user
routes.get('/users/:user_id/report/user/responsetime', ReportController.tasksResponseTimeByUser);
// Tasks by user
routes.get('/users/:user_id/report/tasks/byuser', ReportController.tasksByUser);
// Tasks by date
routes.get('/users/:user_id/report/tasks/bydate', ReportController.tasksByDate);


module.exports = routes;