const path = require('path');

module.exports = {

	development: {
		client: 'postgresql',
		connection: process.env.CONNECTION_STRING,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
		seeds: {
			directory: path.resolve(__dirname, './seeds/development'),
		},
	},

	production: {
		client: 'postgresql',
		connection: process.env.CONNECTION_STRING,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
		seeds: {
			directory: path.resolve(__dirname, './seeds/production'),
		},
	},

};
