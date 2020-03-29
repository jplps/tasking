// Exporting db config from dockerized postgres
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