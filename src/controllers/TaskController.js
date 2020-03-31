const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {
	async read(req, res) {
		const { user_id } = req.params;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).send({ error: 'You have to be logged in to read all Tasks.' });
			}

			const user = await User.findByPk(user_id, {
				include: { association: 'tasks' }
			});

			// Grabbing tasks and filtering open ones
			const tasks = user.tasks.filter(task => {
				if (task.status === 'open') {
					return true;
				}
				return false;
			}).map(task => { return task; });

			return res.send(tasks);
		} catch (err) {
			return res.send({ err });
		}
	},

	async create(req, res) {
		// We need a User to create a task!
		const { user_id } = req.params;
		const { description, type, status } = req.body;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).send({ error: 'You have to be logged to create a Task.' });
			}

			const task = await Task.create({
				description, type, status, owner_id: user_id
			});

			return res.send(task);
		} catch (err) {
			return res.send({ err });
		}
	},

	async update(req, res) {
		// We need a User to edit a task!
		const { user_id } = req.params;
		const { id, description, type, status } = req.body;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).send({ error: 'You have to be logged to edit a Task.' });
			}

			// Finding task
			const task = await Task.findOne({
				where: { id }
			});

			// If the task is done, status = closed, set finished_at
			let finished_at = null;
			if (status === "closed") {
				finished_at = new Date();
			}

			// Update it
			await task.update({ description, type, status, finished_at });

			return res.send(task);

		} catch (err) {
			return res.send({ err });
		}
	},

	async delete(req, res) {
		// We need a User to delete a task!
		const { user_id } = req.params;
		const { id } = req.body;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).send({ error: 'You have to be logged to delete a Task.' });
			}

			// Finding task
			const task = await Task.findOne({
				where: { id }
			});

			// Delete it!
			await task.destroy();

			return res.send('Task destroyed.');
		} catch (err) {
			return res.send({ err });
		}
	},
};