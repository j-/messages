exports.up = function (knex, Promise) {
	console.log('up', __filename);
	return knex.schema.createTable('messages', function (table) {
		table.uuid('id').primary();
		table.string('title');
		table.text('body');
		table.string('tag');
		table.string('icon');
		table.json('data');
		table.string('url');
		table.timestamp('timestamp');
		table.timestamp('date_created');
		table.timestamp('date_modified');
	});
};

exports.down = function (knex, Promise) {
	console.log('down', __filename);
	return knex.schema.dropTable('messages');
};
