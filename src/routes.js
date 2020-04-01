const express = require('express');

const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');
const ReportController = require('./controllers/ReportController');
const AuthController = require('./controllers/AuthController');

const authMiddleware = require('./middlewares/auth');
const checkRole = require('./middlewares/checkRole');

const routes = express.Router();

// Authentication
routes.post('/auth/signup', AuthController.signUp);
routes.post('/auth/signin', AuthController.signIn);

// Users CRUD
routes.post('/users', authMiddleware, UserController.create);
routes.get('/users', authMiddleware, UserController.read);
// Bellow method not working. See the warning inside it!
// routes.put('/users', authMiddleware, UserController.update);
routes.delete('/users', authMiddleware, UserController.delete);

// Department

// Tasks CRUD
routes.post('/tasks', authMiddleware, checkRole, TaskController.create);
routes.get('/tasks', authMiddleware, TaskController.read);
routes.put('/tasks', authMiddleware, TaskController.update);
routes.delete('/tasks', authMiddleware, TaskController.delete);

// Reports
routes.get('/tasks/byuser', authMiddleware, ReportController.tasksByUser);
// Bellow method not working. See the warning inside it!
// routes.get('/report/tasks/bydate', authMiddleware, ReportController.tasksByDate);
routes.get('/tasks/byDTS', authMiddleware, ReportController.tasksDTS);
routes.get('/users/performance', authMiddleware, ReportController.usersPerformances);

module.exports = routes;