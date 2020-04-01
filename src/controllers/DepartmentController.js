const Department = require('../models/Department');

module.exports = {
	async read(req, res) {
		try {
			const departments = await Department.findAll();

			return res.status(200).send(departments);
		} catch (err) {
			return res.status(400).send({ err });
		}
	},

	async create(req, res) {
		const { name } = req.body;

		try {
			const department = await Department.create({ name });

			return res.status(200).send(department);
		} catch (err) {
			return res.status(400).send({ err });
		}
	},

	async update(req, res) {
		const { id, name } = req.body;

		try {
			const department = await Department.findOne({ where: { id } });

			await department.update({ name });

			return res.status(200).send(department);
		} catch (err) {
			return res.status(400).send({ err });
		}
	},

	async delete(req, res) {
		const { id } = req.body;

		try {
			const department = await Department.findOne({ where: { id } });

			await department.destroy();

			return res.send('Department destroyed.');
		} catch (err) {
			return res.send({ err });
		}
	},
};