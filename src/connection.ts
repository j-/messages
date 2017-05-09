import * as knex from 'knex';

// Must be imported with `require`
const knexfile = require('../db/knexfile');
const env = process.env.NODE_ENV || 'development';
const config = knexfile[env];

/**
 * The main database connection object. Connects automatically.
 */
export const db = knex(config);

/**
 * Disconnect from the active database. Should only be called when shutting
 * down the server.
 */
export function destroy () {
	return Promise.resolve<void>(db.destroy());
}
