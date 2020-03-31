const { Op } = require('sequelize');

const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {
	async tasksByUser(req, res) {
		const { id } = req.body;

		try {
			// Find methods recieves an object that allows to include the association
			const user = await User.findByPk(id, {
				// The User model needs to have this relation bind
				include: { association: 'tasks' }
			});

			return res.status(200).send(user.tasks);
		} catch (err) {
			return res.status(400).send({ err });
		}
	},

	/*
		*** WARNING ***

		This method isn't working. Couldn't find the solution for the date
		format, to apply the regex like "2020-03-30%" to deal with the 
		[Op.startsWith].

	*/
	async tasksByDate(req, res) {
		const { date } = req.body

		try {
			// Not working!
			// See Operators in https://sequelize.org/v5/manual/querying.html#operators
			const tasks = await Task.findAll({
				where: {
					createdAt: {
						[Op.startsWith]: date
					}
				}
			});

			return res.status(200).send(tasks);
		} catch (err) {
			return res.status(400).send({ err });
		}
	},

	// async tasksByDepartment(req, res) {},

	async tasksDTS(req, res) {
		// Getting vars to use, setting to null if they don't come in req.body
		let description = null,
			type = null,
			status = null;

		if (req.body.description) { description = req.body.description; }
		else if (req.body.type) { type = req.body.type; }
		else if (req.body.status) { status = req.body.status; }

		try {
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

			return res.status(200).send(tasks);
		} catch (err) {
			return res.status(400).send({ err });
		}
	},

	async usersPerformances(req, res) {
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

			return res.status(200).send(usersPerformances);
		} catch (err) {
			return res.status(400).send({ err });
		}
	},
};