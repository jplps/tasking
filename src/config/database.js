// Exporting db config from elephantsql
module.exports = {
	dialect: 'postgres',
	host: 'localhost',
	username: 'docker',
	password: 'docker',
	database: 'tasking',
	define: {
		timestamps: true,
		underscored: true,
	},
};