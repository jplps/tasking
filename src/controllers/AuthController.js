const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../models/User');

module.exports = {
	async signUp(req, res) {
		const { name, email } = req.body;

		try {
			if (await User.findOne({ where: { email } })) {
				return res.status(400).send({ err: 'A user with this email already exists.' })
			}

			const password = await bcrypt.hash(req.body.password, 10);

			const user = await User.create({ name, email, password });

			return res.status(200).send(user);
		} catch (err) {
			console.log(err);
			return res.status(400).send({ err: 'User registration failed. See DB console for more info about the error.' });
		}
	},

	async signIn(req, res) {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({
				where: { email }
			});

			if (!user) {
				return res.status(400).send({ err: 'User not found.' });
			}

			if (!await bcrypt.compare(password, user.password)) {
				return res.status(400).send({ err: 'Invalid password.' });
			}

			const token = jwt.sign(
				{ id: user.id },
				authConfig.secret,
				{ expiresIn: 86400 },
			);

			return res.status(200).send({
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
				token
			});
		} catch (err) {
			return res.status(400).send({ err });
		}
	},
};