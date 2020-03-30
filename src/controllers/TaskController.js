const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {
	async index(req, res) {
		const { owner_id } = req.params;

		// Find methods recieves an object that allows to include the association
		const user = await User.findByPk(owner_id, {
			// The User model needs to have this relation bind
			include: { association: 'tasks' }
		});

		return res.json(user.tasks);
	},

	async store(req, res) {
		// We need a User to create a task!
		const { owner_id } = req.params;
		const { description, type, status } = req.body;

		const user = await User.findByPk(owner_id);

		if (!user) {
			return res.status(400).json({ error: 'User not found.' });
		}

		const task = await Task.create({
			description, type, status, owner_id
		});

		return res.json(task);
	}
};