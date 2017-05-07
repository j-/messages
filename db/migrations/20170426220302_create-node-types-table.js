exports.up = function (knex, Promise) {
	return knex.schema.createTable('node_types', function (table) {
		table.increments();
		table.string('type_name');
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable('node_types');
};
