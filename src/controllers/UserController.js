const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {
	async read(req, res) {
		try {
			const users = await User.findAll();

			return res.send(users);
		} catch (err) {
			return res.send({ err });
		}
	},

	async create(req, res) {
		const { name, email } = req.body;

		try {
			const password = await bcrypt.hash(req.body.password, 10);

			const user = await User.create({ name, email, password });

			return res.send(user);
		} catch (err) {
			return res.send({ err });
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

			return res.send(user);
		} catch (err) {
			console.log(err);
			return res.send({ err });
		}
	},

	async delete(req, res) {
		const { id } = req.body;

		try {
			// Finding user
			const user = await User.findOne({
				where: { id }
			});

			// Delete it!
			await user.destroy();

			return res.send('User destroyed.');
		} catch (err) {
			return res.send({ err });
		}
	},
};