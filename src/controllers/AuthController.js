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


};