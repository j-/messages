exports.up = function (knex, Promise) {
	console.log('up', __filename);
	return knex.schema.table('message', function (table) {
		table.dropColumn('date_modified');
	});
};

exports.down = function (knex, Promise) {
	console.log('down', __filename);
	return knex.schema.table('message', function (table) {
		table.timestamp('date_modified');
	});
};
