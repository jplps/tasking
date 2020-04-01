const { Model, DataTypes } = require('sequelize');

class Task extends Model {
	// Sequelize defaults recieving the connection
	static init(sequelize) {
		// Passing table fields
		super.init({
			description: DataTypes.STRING,
			finished_at: DataTypes.DATE
		}, {
			sequelize
		})
	}

	// Creating the user relation
	static associate(models) {
		// A task belongs to a user
		this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
		// A task has one type and one status
		this.hasOne(models.TaskType, { foreignKey: 'type_id', as: 'type' });
		this.hasOne(models.TaskStatus, { foreignKey: 'status_id', as: 'status' });
	}
}

module.exports = Task;