// Importing stuff to use
const express = require('express');

const DepartmentController = require('./controllers/DepartmentController');
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

// Users CRUD - Only ADMIN access
routes.post('/users', authMiddleware, checkRole, UserController.create);
routes.get('/users', authMiddleware, checkRole, UserController.read);
// Bellow method not working. See the warning inside it!
// routes.put('/users', authMiddleware, checkRole, UserController.update);
routes.delete('/users', authMiddleware, checkRole, UserController.delete);

// Departments CRUD - Only ADMIN access
routes.post('/departments', authMiddleware, checkRole, DepartmentController.create);
routes.get('/departments', authMiddleware, checkRole, DepartmentController.read);
routes.put('/departments', authMiddleware, checkRole, DepartmentController.update);
routes.delete('/departments', authMiddleware, checkRole, DepartmentController.delete);

// Tasks CRUD
routes.post('/tasks', authMiddleware, TaskController.create);
routes.get('/tasks', authMiddleware, TaskController.read);
routes.put('/tasks', authMiddleware, TaskController.update);
// AGENT cannot delete tasks
routes.delete('/tasks', authMiddleware, checkRole, TaskController.delete);

// Activity CRUD - Only create and edit
routes.post('/activities', authMiddleware, TaskController.create);
routes.put('/activities', authMiddleware, TaskController.update);

// Reports - Logged access
routes.get('/tasks/byuser', authMiddleware, ReportController.tasksByUser);
// Bellow method not working. See the warning inside it!
// routes.get('/report/tasks/bydate', authMiddleware, ReportController.tasksByDate);
routes.get('/tasks/byDTS', authMiddleware, ReportController.tasksDTS);
routes.get('/tasks/bydepartment', authMiddleware, ReportController.tasksByDepartment);
routes.get('/users/performances', authMiddleware, ReportController.usersPerformances);
routes.get('/departments/performances', authMiddleware, ReportController.departmentsPerformances);

module.exports = routes;