const { Op } = require('sequelize');

const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {
	async tasksByUser(req, res) {
		const { user_id } = req.params;
		const { id } = req.body;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to read Tasks by User.' });
			}

			// Find methods recieves an object that allows to include the association
			const user = await User.findByPk(id, {
				// The User model needs to have this relation bind
				include: { association: 'tasks' }
			});

			return res.json(user.tasks);
		} catch (err) {
			return res.json({ err });
		}
	},

	/*
		*** WARNING ***

		This method isn't working. Couldn't find the solution for the date
		format, to apply the regex like "2020-03-30%" to deal with the 
		[Op.startsWith]

	*/
	async tasksByDate(req, res) {
		const { user_id } = req.params;
		const { date } = req.body

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to read Tasks by date.' });
			}

			// Not working!
			// See Operators in https://sequelize.org/v5/manual/querying.html#operators
			const tasks = await Task.findAll({
				where: {
					createdAt: {
						[Op.startsWith]: date
					}
				}
			});

			return res.json(tasks);
		} catch (err) {
			return res.json({ err });
		}
	},

	// async tasksByDepartment(req, res) {},

	async tasksDTS(req, res) {
		const { user_id } = req.params;

		// Getting vars to use, setting to null if they don't come in req.body
		let description = null,
			type = null,
			status = null;

		if (req.body.description) { description = req.body.description; }
		else if (req.body.type) { type = req.body.type; }
		else if (req.body.status) { status = req.body.status; }

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to read Tasks by User.' });
			}

			// Allow to search for description, type or status
			const tasks = await Task.findAll({
				where: {
					[Op.or]: [
						{ description },
						{ type },
						{ status }
					]
				}
			});

			return res.json(tasks);
		} catch (err) {
			return res.json({ err });
		}
	},

	async usersPerformances(req, res) {
		const { user_id } = req.params;

		// Converting time stamp function
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

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to read all Tasks by User.' });
			}

			// Find all users
			const users = await User.findAll({ include: { association: 'tasks' } });

			// Get each user info and set performances object
			const usersPerformances = users.map(user => {
				// Get the response time - between creation and finish
				let responseSum = 0;
				let responseCounter = 0;

				user.tasks.map(task => {
					if (task.finished_at !== null) {
						responseSum += task.finished_at.getTime() - task.createdAt.getTime();
						responseCounter++
					}
				})

				// Calculating average response
				const averageResponse = responseSum / responseCounter;

				// Returning each object with performance values and user reference
				const userPerformance = {
					username: user.name,
					attended_amount: user.tasks.length,
					average_response: user.tasks.length === 0 ? 0 : msToTime(averageResponse),
				};

				return userPerformance;
			});

			return res.json(usersPerformances);
		} catch (err) {
			return res.json({ err });
		}
	},
};