const Department = require('../models/Department');

module.exports = {
	async read(req, res) {
		const { user_id } = req;

		try {
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
		const { user_id } = req;
		const { description, type, status } = req.body;

		console.log(description, type, status);

		try {
			const task = await Task.create({
				description, type, status, owner_id: user_id
			});

			return res.send(task);
		} catch (err) {
			return res.send({ err });
		}
	},

	async update(req, res) {
		const { id, description, type, status } = req.body;

		try {
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
		const { id } = req.body;

		try {
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