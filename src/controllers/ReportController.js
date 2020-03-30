const { Op } = require('sequelize');
const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {
	async tasksByDate(req, res) {
		const { user_id } = req.params;
		const { date } = req.body

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to read Tasks by date.' });
		}

		const data = date + '%';
		console.log(data)
		const tasks = await Task.findAll({
			where: {
				createdAt: {
					[Op.iLike]: data
				}
			}
		});

		return res.json(tasks);
	},

	// async tasksByDepartment(req, res) {},
	// async tasksByDescription(req, res) {},
	// async tasksByStatus(req, res) {},
	// async tasksByType(req, res) {},

	async tasksByUser(req, res) {
		const { user_id } = req.params;
		const { id } = req.body

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to read Tasks by User.' });
		}

		// Find methods recieves an object that allows to include the association
		const user = await User.findByPk(id, {
			// The User model needs to have this relation bind
			include: { association: 'tasks' }
		});

		return res.json(user.tasks);
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

		// Converting time stamp
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