const TaskActivity = require('../models/TaskActivity');
const User = require('../models/User');

module.exports = {
	async create(req, res) {
		const { user_id } = req;
		const { activity_description, task_id } = req.body;

		try {
			// Create a activity with "open" state (id: 1)
			const activity = await TaskActivity.create({
				activity_description, task_id, owner_id: user_id
			});

			const user = await User.findOne({ attributes: [{ name }], where: { user_id } });

			return res.status(200).send({
				registered_by: user.name,
				last_modified: activity.created_at,
			});
		} catch (err) {
			return res.status(400).send({ err });
		}
	},

	async update(req, res) {
		const { user_id } = req.body;
		const { id, activity_description } = req.body;

		try {
			// Finding activity
			const activity = await TaskActivity.findOne({
				where: { id }
			});

			const last_user_id = activity.owner_id;

			const user = await User.findOne({ attributes: [{ name }], where: { last_user_id } });

			const last_user = user.name
			const last_activity = activity.activity_description;

			// Update it
			await activity.update({ activity_description, owner_id: user_id });

			return res.status(200).send({
				last_user: last_user,
				last_activity: last_activity,
				current_activity: activity
			});
		} catch (err) {
			return res.status(400).send({ err });
		}
	},
};