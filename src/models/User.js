const { Model, DataTypes } = require('sequelize');

class User extends Model {
	// Sequelize defaults recieving the connection
	static init(sequelize) {
		// Passing table fields
		super.init({
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			role: DataTypes.ENUM('ADMIN', 'AGENT'),
		}, {
			sequelize
		})
	}

	// Create Relations
	static associate(models) {
		// User has many tasks
		this.hasMany(models.Task, { foreignKey: 'owner_id', as: 'tasks' });
		// User belongs to a Department
		this.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' });
	}
}

module.exports = User;