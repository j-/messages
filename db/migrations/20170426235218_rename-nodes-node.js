exports.up = function (knex, Promise) {
	return knex.schema.renameTable('nodes', 'node');
};

exports.down = function (knex, Promise) {
	return knex.schema.renameTable('node', 'nodes');
};
