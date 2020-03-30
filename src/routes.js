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
// Attended tasks amount:
routes.get('/users/:user_id/tasks/amount', TaskController.tasksAmountByUser);
// Response time:
routes.get('/users/:user_id/tasks/responsetime', TaskController.tasksResponseTimeByUser);
routes.post('/users/:user_id/tasks', TaskController.store);
routes.put('/users/:user_id/tasks', TaskController.update);
routes.delete('/users/:user_id/tasks', TaskController.delete);

module.exports = routes;