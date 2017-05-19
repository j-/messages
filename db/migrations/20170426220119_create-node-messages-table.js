exports.up = function (knex, Promise) {
	console.log('up', __filename);
	return knex.schema.createTable('node_messages', function (table) {
		table.uuid('id').primary();
		table.uuid('node_id');
		table.uuid('message_id');
		table.foreign('node_id').references('nodes.id');
		table.foreign('message_id').references('messages.id');
	});
};

exports.down = function (knex, Promise) {
	console.log('down', __filename);
	return knex.schema.dropTable('node_messages');
};
