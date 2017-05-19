exports.up = function (knex, Promise) {
	console.log('up', __filename);
	return knex.schema.createTable('nodes', function (table) {
		table.uuid('id').primary();
	});
};

exports.down = function (knex, Promise) {
	console.log('down', __filename);
	return knex.schema.dropTable('nodes');
};
