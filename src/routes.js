const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => {
	return res.json({ hello: 'World' });
})

// Get Users list
routes.get('/users', UserController.index);
// Creating users registry
routes.post('/users', UserController.store);

module.exports = routes;