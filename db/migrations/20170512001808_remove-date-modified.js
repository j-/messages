exports.up = function (knex, Promise) {
	return knex.schema.table('message', function (table) {
		table.dropColumn('date_modified');
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.table('message', function (table) {
		table.timestamp('date_modified');
	});
};
