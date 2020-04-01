const { Model, DataTypes } = require('sequelize');

class TaskActivity extends Model {
	// Sequelize defaults recieving the connection
	static init(sequelize) {
		// Passing table fields
		super.init({
			activity_description: DataTypes.STRING,
		}, {
			sequelize
		})
	}

	// Creating the relation
	static associate(models) {
		// An activity belongs to a task
		this.belongsTo(models.Task, { foreignKey: 'task_id', as: 'activity' });
		// An activity belongs to a user
		this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
	}
}

module.exports = TaskActivity;