exports.up = function (knex) {
	console.log('up', __filename);
	return knex.schema.table('nodes', function (table) {
		table.integer('node_type').unsigned();
		table.foreign('node_type').references('node_types.id');
	});
};

exports.down = function (knex) {
	console.log('down', __filename);
	return knex.schema.table('nodes', function (table) {
		table.dropColumn('node_type');
	});
};
