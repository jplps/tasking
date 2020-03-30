// Dealing with users to the frontend
const User = require('../models/User');

module.exports = {
	async index(req, res) {
		const { user_id } = req.params;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to read all Users.' });
		}

		const users = await User.findAll();

		return res.json(users);
	},

	async store(req, res) {
		const { user_id } = req.params;
		const { name, email } = req.body;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to create a User.' });
		}

		const user = await User.create({ name, email });

		return res.json(user);
	},

	async update(req, res) {
		// We need a User to edit another!
		const { user_id } = req.params;
		const { id, name, email } = req.body;

		// Check if we have and logged id
		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to update a User.' });
		}

		// Finding user to update
		const user = await User.findOne({
			where: { id }
		});

		// Update it
		await user.update({ name, email });

		return res.json(user);
	},

	async delete(req, res) {
		// We need a User to delete another!
		const { user_id } = req.params;
		const { id } = req.body;

		const logged = await User.findByPk(user_id);

		if (!logged) {
			return res.status(400).json({ error: 'You have to be logged in to delete a User.' });
		}

		// Finding user
		const user = await User.findOne({
			where: { id }
		});

		// Delete it!
		await user.destroy();

		return res.json('User destroyed.');
	},
};