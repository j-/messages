import * as knex from 'knex';

// Must be imported with `require`
const knexfile = require('../db/knexfile');
const env = process.env.NODE_ENV || 'development';
const config = knexfile[env];

export const db = knex(config);
