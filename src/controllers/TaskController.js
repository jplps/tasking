const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {
	async index(req, res) {
		const { user_id } = req.params;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to read all Tasks.' });
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

		// If the task is done, status = closed, set finished_at
		let finished_at = null;
		if (status === "closed") {
			finished_at = new Date();
		}

		// Update it
		await task.update({ description, type, status, finished_at });

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

	async tasksAmountByUser(req, res) {
		const { user_id } = req.params;
		const { id } = req.body;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to read all Tasks by User.' });
		}

		// Find methods recieves an object that allows to include the association
		const user = await User.findByPk(id, {
			// The User model needs to have this relation bind
			include: { association: 'tasks' }
		});

		// Get the total number of tasks for a user
		const taskLength = user.tasks.length;

		return res.json(taskLength);
	},

	async tasksResponseTimeByUser(req, res) {
		const { user_id } = req.params;
		const { id } = req.body;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to read all Tasks by User.' });
		}

		// Find methods recieves an object that allows to include the association
		const user = await User.findByPk(id, {
			// The User model needs to have this relation bind
			include: { association: 'tasks' }
		});

		// Get the response time - between creation and finish
		let responseSum = 0;
		let responseCounter = 0;
		const responses = user.tasks.map(task => {
			if (task.finished_at !== null) {
				responseSum += task.finished_at.getTime() - task.createdAt.getTime();
				responseCounter++
			}
		})

		// Calculating average response
		const averageResponse = responseSum / responseCounter;

		function msToTime(duration) {
			let milliseconds = parseInt((duration % 1000) / 100),
				seconds = Math.floor((duration / 1000) % 60),
				minutes = Math.floor((duration / (1000 * 60)) % 60),
				hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

			hours = (hours < 10) ? "0" + hours : hours;
			minutes = (minutes < 10) ? "0" + minutes : minutes;
			seconds = (seconds < 10) ? "0" + seconds : seconds;

			return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
		}

		return res.json(msToTime(averageResponse));
	},
};