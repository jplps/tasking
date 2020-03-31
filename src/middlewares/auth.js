const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(401).send({ err: 'No token provided.' });

	const parts = authHeader.split(' ');

	if (!parts.length === 2) return res.status(401).send({ err: 'Token error.' });

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ err: 'Token malformatted.' });

	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) return res.status(401).send({ err: 'Invalid token.' });

		// Now we have the user ID!
		// Including id in the reqs to the controller
		req.user_id = decoded.id;

		return next();
	});
};