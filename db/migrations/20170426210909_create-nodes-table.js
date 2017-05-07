exports.up = function (knex, Promise) {
	return knex.schema.createTable('nodes', function (table) {
		table.uuid('id').primary();
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable('nodes');
};
