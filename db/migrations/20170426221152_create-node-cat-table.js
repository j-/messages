exports.up = function (knex, Promise) {
	console.log('up', __filename);
	return knex.schema.createTable('node_cat', function (table) {
		table.uuid('input_node_id');
		table.uuid('output_node_id');
		table.foreign('input_node_id').references('nodes.id');
		table.foreign('output_node_id').references('nodes.id');
		table.unique(['input_node_id', 'output_node_id']);
	});
};

exports.down = function (knex, Promise) {
	console.log('down', __filename);
	return knex.schema.dropTable('node_cat');
};
