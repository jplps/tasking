const Department = require('../models/Department');

module.exports = {
	async read(req, res) {
		try {
			return res.send();
		} catch (err) {
			return res.send({ err });
		}
	},

	async create(req, res) {
		try {
			return res.send(task);
		} catch (err) {
			return res.send({ err });
		}
	},

	async update(req, res) {
		try {
			return res.send(task);
		} catch (err) {
			return res.send({ err });
		}
	},

	async delete(req, res) {
		try {
			return res.send('Task destroyed.');
		} catch (err) {
			return res.send({ err });
		}
	},
};