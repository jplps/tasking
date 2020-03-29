const { Model, DataTypes } = require('sequelize');

class User extends Model {
	// Sequelize defaults recieving the connection
	static init(sequelize) {
		// Passing table fields
		super.init({
			name: DataTypes.STRING,
			email: DataTypes.STRING,
		}, {
			sequelize
		})
	}
}

module.exports = User;