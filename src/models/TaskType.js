const { Model, DataTypes } = require('sequelize');

class TaskType extends Model {
	// Sequelize defaults recieving the connection
	static init(sequelize) {
		// Passing table fields
		super.init({
			name: DataTypes.STRING,
		}, {
			sequelize
		})
	}

	// Creating the user relation
	static associate(models) {
		// A task type belongs to many tasks
		this.belongsToMany(models.Task, { through: 'task_types', foreignKey: 'task_id', as: 'type' });
	}
}

module.exports = TaskType;