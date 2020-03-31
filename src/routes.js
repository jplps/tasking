const express = require('express');

const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');
const ReportController = require('./controllers/ReportController');
const AuthController = require('./controllers/AuthController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

// Authentication
routes.post('/auth/signup', AuthController.signUp);
routes.post('/auth/signin', AuthController.signIn);

// Users CRUD
routes.post('/users/:user_id', authMiddleware, UserController.create);
routes.get('/users/:user_id', authMiddleware, UserController.read);
// Bellow method not working. See the warning inside it!
// routes.put('/users/:user_id', authMiddleware, UserController.update);
routes.delete('/users/:user_id', authMiddleware, UserController.delete);

// Tasks CRUD
routes.post('/users/:user_id/tasks', authMiddleware, TaskController.create);
routes.get('/users/:user_id/tasks', authMiddleware, TaskController.read);
routes.put('/users/:user_id/tasks', authMiddleware, TaskController.update);
routes.delete('/users/:user_id/tasks', authMiddleware, TaskController.delete);

// Reports
routes.get('/users/:user_id/report/tasks/byuser', authMiddleware, ReportController.tasksByUser);
// Bellow method not working. See the warning inside it!
// routes.get('/users/:user_id/report/tasks/bydate', authMiddleware, ReportController.tasksByDate);
routes.get('/users/:user_id/report/tasks/byDTS', authMiddleware, ReportController.tasksDTS);
routes.get('/users/:user_id/report/performance/users', authMiddleware, ReportController.usersPerformances);

module.exports = routes;