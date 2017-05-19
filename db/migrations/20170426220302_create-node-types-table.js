exports.up = function (knex, Promise) {
	console.log('up', __filename);
	return knex.schema.createTable('node_types', function (table) {
		table.increments();
		table.string('type_name');
	});
};

exports.down = function (knex, Promise) {
	console.log('down', __filename);
	return knex.schema.dropTable('node_types');
};
