// Dealing with users to the frontend
const User = require('../models/User');

module.exports = {
	async index(req, res) {
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

	async store(req, res) {
		const { user_id } = req.params;
		const { name, email } = req.body;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to create a User.' });
			}

			const user = await User.create({ name, email });

			return res.json(user);
		} catch (err) {
			return res.json({ err });
		}
	},

	async update(req, res) {
		// We need a User to edit another!
		const { user_id } = req.params;
		const { id, name, email } = req.body;

		try {
			if (!await User.findByPk(user_id)) {
				return res.status(400).json({ error: 'You have to be logged in to update a User.' });
			}
			// Finding user to update
			const user = await User.findOne({
				where: { id }
			});

			// Update it
			await user.update({ name, email });

			return res.json(user);
		} catch (err) {
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