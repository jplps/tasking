const User = require('../models/User');

async function check(user_id, res, next) {
	try {
		const user = await User.findOne({ where: { id: user_id } });

		if (user.role === 'AGENT') return res.status(401).send({ err: 'You cannot perform this task.' })
		if (user.role === 'ADMIN') return next();
	} catch (err) {
		return res.status(400).send({ err });
	}
}

// Checking user role
module.exports = (req, res, next) => {
	// Get the user id setted by authMiddleware		
	const { user_id } = req;

	check(user_id, res, next);
};