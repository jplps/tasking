const express = require('express');

const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');

const routes = express.Router();

routes.get('/', (req, res) => {
	return res.json({ hello: 'World' });
})

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
// Tasks By User
routes.get('/users/:user_id/tasks/user', TaskController.tasksByUser);
// User specific attended tasks amount
routes.get('/users/:user_id/tasks/user/amount', TaskController.tasksAmountByUser);
// Response time by user
routes.get('/users/:user_id/tasks/user/responsetime', TaskController.tasksResponseTimeByUser);

module.exports = routes;