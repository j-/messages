exports.up = function (knex) {
	return knex.transaction(function (transaction) {
		return transaction.schema.dropTable('nodes').then(function () {
			return transaction.schema.createTable('nodes', function (table) {
				table.uuid('id').primary();
				table.integer('node_type').unsigned();
				table.foreign('node_type').references('node_types.id');
			});
		});
	});
};

exports.down = function (knex) {
	return knex.transaction(function (transaction) {
		return transaction.schema.dropTable('nodes').then(function () {
			return transaction.schema.createTable('nodes', function (table) {
				table.uuid('id').primary();
			});
		});
	});
};
