const { Model, DataTypes } = require('sequelize');

class Department extends Model {
	// Sequelize defaults recieving the connection
	static init(sequelize) {
		// Passing table fields
		super.init({
			name: DataTypes.STRING,
		}, {
			sequelize
		})
	}

	// Create tasks relation
	static associate(models) {
		// A department has many users
		this.hasMany(models.User, { foreignKey: 'department_id', as: 'users' });
	}
}

module.exports = Department;