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

	// Create tasks relation
	static associate(models) {
		this.hasMany(models.Task, { foreignKey: 'owner_id', as: 'tasks' });
	}
}

module.exports = User;