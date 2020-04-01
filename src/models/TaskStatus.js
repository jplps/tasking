const { Model, DataTypes } = require('sequelize');

class TaskStatus extends Model {
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
		// A task status belongs to many tasks
		this.belongsToMany(models.Task, { through: 'tasksstatus', foreignKey: 'task_id', as: 'status' });
	}
}

module.exports = TaskStatus;