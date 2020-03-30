const express = require('express');

const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');

const routes = express.Router();

routes.get('/', (req, res) => {
	return res.json({ hello: 'World' });
})

// Get Users list
routes.get('/users', UserController.index);
// Create user registry
routes.post('/users', UserController.store);

// Tasks by User
routes.get('/users/:owner_id/tasks', TaskController.index);
// Create task registry with routing
routes.post('/users/:owner_id/tasks', TaskController.store);

module.exports = routes;