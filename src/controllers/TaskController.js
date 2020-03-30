const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {
	async index(req, res) {
		const { user_id } = req.params;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to read all Users.' });
		}

		// Find methods recieves an object that allows to include the association
		const user = await User.findByPk(user_id, {
			// The User model needs to have this relation bind
			include: { association: 'tasks' }
		});

		return res.json(user.tasks);
	},

	async store(req, res) {
		// We need a User to create a task!
		const { user_id } = req.params;
		const { description, type, status } = req.body;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged to create a Task.' });
		}

		const task = await Task.create({
			description, type, status, owner_id: user_id
		});

		return res.json(task);
	},

	async update(req, res) {
		// We need a User to edit a task!
		const { user_id } = req.params;
		const { id, description, type, status } = req.body;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged to edit a Task.' });
		}

		// Finding task
		const task = await Task.findOne({
			where: { id }
		});

		// Update it
		await task.update({ description, type, status });

		return res.json(task);
	},

	async delete(req, res) {
		// We need a User to delete a task!
		const { user_id } = req.params;
		const { id } = req.body;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged to delete a Task.' });
		}

		// Finding task
		const task = await Task.findOne({
			where: { id }
		});

		// Delete it!
		await task.destroy();

		return res.json('Task destroyed.');
	},
};