const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {
	async read(req, res) {
		const { user_id } = req.params;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to read all Users.' });
			}

			const users = await User.findAll();

			return res.json(users);
		} catch (err) {
			return res.json({ err });
		}
	},

	async create(req, res) {
		const { user_id } = req.params;
		const { name, email } = req.body;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to create a User.' });
			}

			const password = await bcrypt.hash(req.body.password, 10);

			const user = await User.create({ name, email, password });

			return res.json(user);
		} catch (err) {
			return res.json({ err });
		}
	},

	/*
		*** WARNING ***

		This method isn't working. Couldn't find sequelize ENUM update 
		treatment.
		Also, somehow I can't update only the fields that comes in body 
		with [Op.or] like in ReportConroller.tasksDTS.

	*/
	async update(req, res) {
		const { user_id } = req.params;
		const { id } = req.body;

		let name = null,
			email = null,
			password = null,
			role = null;

		if (req.body.name) { name = req.body.name; }
		else if (req.body.email) { email = req.body.email; }
		else if (req.body.password) { password = req.body.password; }
		else if (req.body.role) { role = req.body.role; }

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to update a User.' });
			}
			// Finding user to update
			const user = await User.findOne({
				where: { id }
			});

			if (password !== null) { await bcrypt.hash(password, 10); }

			// Update it
			await user.update({
				[Op.or]: [
					{ name }, { email }, { password }, { role }
				]
			});

			return res.json(user);
		} catch (err) {
			console.log(err);
			return res.json({ err });
		}
	},

	async delete(req, res) {
		// We need a User to delete another!
		const { user_id } = req.params;
		const { id } = req.body;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to delete a User.' });
			}

			// Finding user
			const user = await User.findOne({
				where: { id }
			});

			// Delete it!
			await user.destroy();

			return res.json('User destroyed.');
		} catch (err) {
			return res.json({ err });
		}
	},
};