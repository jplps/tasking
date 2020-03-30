const { Model, DataTypes } = require('sequelize');

class Task extends Model {
	// Sequelize defaults recieving the connection
	static init(sequelize) {
		// Passing table fields
		super.init({
			description: DataTypes.STRING,
			type: DataTypes.STRING,
			status: DataTypes.STRING,
			finished_at: DataTypes.DATE
		}, {
			sequelize
		})
	}

	// Creating the user relation
	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
	}
}

module.exports = Task;