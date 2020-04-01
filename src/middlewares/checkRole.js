const User = require('../models/User');

// Checking user role
module.exports = async (req, res, next) => {
	// Get the user id setted by authMiddleware		
	const { user_id } = req;


	try {
		console.log(user_id);
		const user = await User.findOne({ where: { user_id } });


		if (user.role === 'AGENT') return res.status(401).send({ err: 'You cannot perform this task.' })
		if (user.role === 'ADMIN') return next();
	} catch (err) {
		return res.status(400).send({ err });
	}
};