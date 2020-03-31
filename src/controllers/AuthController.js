const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {
	async signUp(req, res) {
		const { name, email } = req.body;

		try {
			if (await User.findOne({ where: { email } })) {
				return res.json({ err: 'A user with this email already exists.' })
			}

			const password = await bcrypt.hash(req.body.password, 10);

			const user = await User.create({ name, email, password });

			return res.json(user);
		} catch (err) {
			console.log(err);
			return res.json({ err: 'User registration failed. See DB console for more info about the error.' });
		}
	},

	async signIn(req, res) {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({
				where: { email }
			});

			if (!user) {
				return res.json({ err: 'User not found.' });
			}

			if (!await bcrypt.compare(password, user.password)) {
				return res.json({ err: 'Invalid password.' });
			}

			return res.json({
				id: user.id,
				name: user.name,
				email: user.email,
			});
		} catch (err) {
			return res.json({ err });
		}
	}
};