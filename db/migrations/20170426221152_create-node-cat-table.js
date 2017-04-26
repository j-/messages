exports.up = function (knex, Promise) {
	return knex.schema.createTable('node_cat', function (table) {
		table.uuid('input_node_id').primary();
		table.uuid('output_node_id').primary();
		table.foreign('input_node_id').references('messages.id');
		table.foreign('output_node_id').references('nodes.id');
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable('node_cat');
};
